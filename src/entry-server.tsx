import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from '@/App';

/** Usado só no build (scripts/prerender.mjs): gera o HTML que robôs leem sem executar JavaScript. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
