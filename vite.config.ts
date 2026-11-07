import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { seoPlugin } from './build/seoPlugin.ts';

interface HostingHeaders {
  headers: { source: string; headers: { key: string; value: string }[] }[];
}

/**
 * `npm run preview` serve o build com os mesmos headers de segurança da hospedagem (vercel.json),
 * para a CSP ser testada localmente. O servidor de desenvolvimento fica sem eles: o HMR usa scripts
 * inline que a política bloquearia.
 */
function hostingHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as HostingHeaders;
  const global = config.headers.find((rule) => rule.source === '/(.*)');
  return Object.fromEntries(global?.headers.map(({ key, value }) => [key, value]) ?? []);
}

export default defineConfig(({ mode }) => {
  const { SITE_URL } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), seoPlugin(SITE_URL)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      headers: hostingHeaders(),
    },
  };
});
