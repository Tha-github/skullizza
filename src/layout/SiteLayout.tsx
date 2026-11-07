import type { ReactNode } from 'react';

import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './SiteLayout.module.css';

interface SiteLayoutProps {
  children: ReactNode;
}

/** Casca da página: atalho de teclado, header, `main`, footer e botão flutuante. */
export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <a className={styles.skipLink} href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
