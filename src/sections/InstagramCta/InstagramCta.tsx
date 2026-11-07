import { BrandSymbol } from '@/components/brand/BrandSymbol';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { InstagramIcon } from '@/components/ui/icons';
import { BUSINESS } from '@/data/business';

import styles from './InstagramCta.module.css';

/** Apenas chamada e link para o perfil: sem feed nem publicações simuladas. */
export function InstagramCta() {
  const { instagramHandle, instagramUrl } = BUSINESS.contact;

  return (
    <section
      id="instagram"
      className={`theme-accent section ${styles.section}`}
      aria-labelledby="instagram-title"
    >
      <BrandSymbol className={styles.symbol} size="var(--symbol-size)" />
      <div className={`container ${styles.content}`}>
        <Eyebrow>Instagram</Eyebrow>
        <h2 id="instagram-title" className={styles.handle}>
          {instagramHandle}
        </h2>
        <p className={styles.text}>Siga o perfil para acompanhar a Skullizza.</p>
        <Button
          href={instagramUrl}
          target="_blank"
          size="lg"
          icon={<InstagramIcon />}
          aria-label="Abrir o Instagram da Skullizza (abre em nova aba)"
        >
          Abrir o Instagram
        </Button>
      </div>
    </section>
  );
}
