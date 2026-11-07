import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/brand/Logo';
import { InstagramIcon } from '@/components/ui/icons';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BUSINESS } from '@/data/business';
import { NAV_ITEMS } from '@/data/navigation';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';

import styles from './MobileMenu.module.css';

const DESKTOP_QUERY = '(min-width: 1024px)';

interface MobileMenuProps {
  className?: string;
}

/**
 * Usa `<dialog>` nativo: a retenção de foco, o Esc e o bloqueio do fundo vêm do navegador,
 * e o foco volta sozinho ao botão que abriu o menu.
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialogRef.current?.close();

  // Ao girar a tela ou redimensionar para desktop, o botão de fechar deixaria de fazer sentido.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => {
      if (query.matches) dialogRef.current?.close();
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={open}
      >
        <span className={styles.bars} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Menu"
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.top}>
          <Logo decorative height="1.375rem" />
          <button type="button" className={styles.toggle} aria-label="Fechar menu" onClick={close}>
            <span className={styles.cross} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menu principal">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className={styles.link} href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.general}
            label="Pedir pelo WhatsApp"
            size="lg"
            className={styles.cta}
          >
            Pedir pelo WhatsApp
          </WhatsAppButton>
          <a
            className={styles.instagram}
            href={BUSINESS.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Skullizza (abre em nova aba)"
          >
            <InstagramIcon />
            {BUSINESS.contact.instagramHandle}
          </a>
        </div>
      </dialog>
    </div>
  );
}
