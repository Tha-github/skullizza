// Insere em dist/index.html o HTML da página, gerado pelo build de SSR, e remove os temporários.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ROOT_PLACEHOLDER = '<div id="root"></div>';
const htmlPath = resolve('dist/index.html');
const serverDir = resolve('dist-ssr');

const { render } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href);
const html = await readFile(htmlPath, 'utf8');

if (!html.includes(ROOT_PLACEHOLDER)) {
  throw new Error('prerender: <div id="root"></div> não encontrado em dist/index.html.');
}

await writeFile(htmlPath, html.replace(ROOT_PLACEHOLDER, `<div id="root">${render()}</div>`));
await rm(serverDir, { recursive: true });
console.log('prerender: dist/index.html gerado com o conteúdo da página.');
