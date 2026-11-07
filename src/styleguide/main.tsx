import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/index.css';

import { Styleguide } from './Styleguide';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado em styleguide.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <Styleguide />
  </StrictMode>,
);
