import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { seoPlugin } from './build/seoPlugin.ts';

interface HostingHeaders {
  headers: { source: string; headers: { key: string; value: string }[] }[];
}

/**
 * Headers de segurança da hospedagem (vercel.json). `npm run preview` serve o build com eles, para a
 * CSP ser testada localmente; o servidor de desenvolvimento fica sem, porque o HMR usa scripts inline.
 */
function hostingHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as HostingHeaders;
  const global = config.headers.find((rule) => rule.source === '/(.*)');
  return Object.fromEntries(global?.headers.map(({ key, value }) => [key, value]) ?? []);
}

export default defineConfig(({ mode }) => {
  // BASE_PATH: subpasta onde o site é servido (no GitHub Pages, "/skullizza/").
  // SITE_NOINDEX: "true" pede aos buscadores para não indexar (versão de prévia).
  const { SITE_URL, BASE_PATH, SITE_NOINDEX } = loadEnv(mode, process.cwd(), '');
  const headers = hostingHeaders();

  return {
    base: BASE_PATH || '/',
    plugins: [
      react(),
      seoPlugin({
        siteUrl: SITE_URL,
        noindex: SITE_NOINDEX === 'true',
        contentSecurityPolicy: headers['Content-Security-Policy'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      headers,
    },
  };
});
