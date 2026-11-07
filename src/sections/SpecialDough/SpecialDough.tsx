import { Stamp } from '@/components/decor/Stamp';
import { TapeBand } from '@/components/decor/TapeBand';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { SPECIAL_DOUGH_IMAGE } from '@/data/images';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';

import styles from './SpecialDough.module.css';

const TAPE_ITEMS = ['Massa integral', 'Batata-doce'];

/**
 * Campanha da massa integral com batata-doce.
 * Só afirma o que a cliente informou: nada de benefício nutricional, dieta ou outro ingrediente.
 */
export function SpecialDough() {
  const image = SPECIAL_DOUGH_IMAGE;

  return (
    <section id="massa-integral" className="theme-accent" aria-labelledby="massa-integral-title">
      <div className={styles.stage}>
        <figure className={styles.visual}>
          <ResponsiveImage
            className={styles.photo}
            image={image}
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          {image.isProvisional && (
            <figcaption className={styles.notice}>
              Foto ilustrativa provisória. Não é a massa da Skullizza.
            </figcaption>
          )}
        </figure>

        <Stamp
          className={styles.stamp}
          size="var(--stamp-size)"
          text="Massa integral · Batata-doce · Skullizza · "
        />

        <div className={styles.copy}>
          <Eyebrow>Massa integral com batata-doce</Eyebrow>
          <h2 id="massa-integral-title" className={styles.title}>
            Uma massa com personalidade.
          </h2>
          <p className={styles.text}>
            Conheça nossa proposta de massa integral com{' '}
            <span className={styles.noBreak}>batata-doce</span>. Uma alternativa que faz parte da
            personalidade gastronômica da Skullizza.
          </p>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.specialDough}
            label="Quero conhecer a massa integral com batata-doce, pelo WhatsApp"
            size="lg"
            className={styles.cta}
          >
            Quero conhecer
          </WhatsAppButton>
        </div>
      </div>

      <TapeBand items={TAPE_ITEMS} tone="dark" />
    </section>
  );
}
