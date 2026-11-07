import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';

import styles from './FinalCta.module.css';

/** Fecho da página: uma única ação. Enquanto visível, o botão flutuante se esconde. */
export function FinalCta() {
  return (
    <section
      id="pedido"
      className={`theme-accent section ${styles.section}`}
      aria-labelledby="pedido-title"
      data-hides-floating-cta
    >
      <div className={`container ${styles.layout}`}>
        <h2 id="pedido-title" className={styles.title}>
          Deu vontade? Peça agora.
        </h2>
        <div className={styles.action}>
          <p className={styles.text}>Fale direto com a Skullizza pelo WhatsApp.</p>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.order}
            label="Pedir pelo WhatsApp"
            size="lg"
            className={styles.cta}
          >
            Pedir pelo WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
