import { useEffect, useState } from 'react';

import { WhatsAppIcon } from '@/components/ui/icons';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

import styles from './FloatingWhatsApp.module.css';

/** Marque com este atributo os CTAs principais: enquanto visíveis, o botão flutuante se esconde. */
const COMPETING_CTA_SELECTOR = '[data-hides-floating-cta]';

export function FloatingWhatsApp() {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setIsHidden(visible.size > 0);
      },
      { rootMargin: '-72px 0px 0px 0px' },
    );

    document.querySelectorAll(COMPETING_CTA_SELECTOR).forEach((cta) => observer.observe(cta));
    return () => observer.disconnect();
  }, []);

  return (
    <aside aria-label="Pedido rápido">
      <a
        className={`${styles.button} ${isHidden ? styles.hidden : ''}`}
        href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir pelo WhatsApp (abre em nova aba)"
        title="Pedir pelo WhatsApp"
      >
        <WhatsAppIcon size="1.75rem" />
      </a>
    </aside>
  );
}
