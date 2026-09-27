// Build de produção: gera a pasta dist/ com a versão otimizada do site.
// Rodar com: npm run build
import { build, transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
import sharp from 'sharp';
import { readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';

const DIST = 'dist';

// começa sempre do zero
await rm(DIST, { recursive: true, force: true });
await mkdir(`${DIST}/css`, { recursive: true });
await mkdir(`${DIST}/js`, { recursive: true });
await mkdir(`${DIST}/img`, { recursive: true });

// 1) JavaScript: junta todos os módulos num arquivo só e minifica
await build({
  entryPoints: ['js/main.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2020',
  outfile: `${DIST}/js/main.min.js`,
});

// no dist o index.html fica na raiz, então o caminho da imagem nos templates muda
const js = await readFile(`${DIST}/js/main.min.js`, 'utf8');
await writeFile(`${DIST}/js/main.min.js`, js.replaceAll('../img/', 'img/'));

// 2) CSS: junta os 3 arquivos na ordem certa e minifica
const arquivosCss = ['reset', 'variaveis', 'style'];
const css = (await Promise.all(arquivosCss.map((nome) => readFile(`css/${nome}.css`, 'utf8')))).join('\n');
const cssMinificado = await transform(css, { loader: 'css', minify: true });
await writeFile(`${DIST}/css/style.min.css`, cssMinificado.code);

// 3) HTML: vai pra raiz do dist, aponta pros arquivos minificados e é minificado também
let html = await readFile('html/index.html', 'utf8');
html = html
  .replace(/\s*<link rel="stylesheet" href="\.\.\/css\/reset\.css">/, '')
  .replace(/\s*<link rel="stylesheet" href="\.\.\/css\/variaveis\.css">/, '')
  .replace('href="../css/style.css"', 'href="css/style.min.css"')
  .replace('src="../js/main.js"', 'src="js/main.min.js"');

const htmlMinificado = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
});
await writeFile(`${DIST}/index.html`, htmlMinificado);

// 4) Imagem: comprime o PNG usando paleta de cores (o desenho tem poucas cores)
await sharp('img/resgate.png')
  .png({ palette: true, compressionLevel: 9, effort: 10 })
  .toFile(`${DIST}/img/resgate.png`);

// mostra o antes e depois de cada arquivo
async function tamanho(caminho) {
  return (await stat(caminho)).size;
}

async function somar(caminhos) {
  const tamanhos = await Promise.all(caminhos.map(tamanho));
  return tamanhos.reduce((total, t) => total + t, 0);
}

const modulosJs = ['main', 'modules/acessibilidade', 'modules/armazenamento', 'modules/dados', 'modules/formulario',
  'modules/mascaras', 'modules/menu', 'modules/modal', 'modules/rotas', 'modules/templates', 'modules/toast', 'modules/validacoes']
  .map((nome) => `js/${nome}.js`);

const comparacao = [
  ['HTML', await tamanho('html/index.html'), await tamanho(`${DIST}/index.html`)],
  ['CSS (3 arquivos -> 1)', await somar(arquivosCss.map((nome) => `css/${nome}.css`)), await tamanho(`${DIST}/css/style.min.css`)],
  ['JS (12 arquivos -> 1)', await somar(modulosJs), await tamanho(`${DIST}/js/main.min.js`)],
  ['Imagem', await tamanho('img/resgate.png'), await tamanho(`${DIST}/img/resgate.png`)],
];

console.log('Build concluído em dist/\n');
for (const [nome, antes, depois] of comparacao) {
  const reducao = Math.round((1 - depois / antes) * 100);
  console.log(`${nome.padEnd(24)} ${(antes / 1024).toFixed(1).padStart(6)} KB -> ${(depois / 1024).toFixed(1).padStart(6)} KB  (-${reducao}%)`);
}
