import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { ABOUT_IMAGE } from '@/data/images';

import styles from './About.module.css';

export function About() {
  return (
    <section id="sobre" className="theme-light section" aria-labelledby="sobre-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Eyebrow>A Skullizza</Eyebrow>
          <h2 id="sobre-title" className={`display-lg ${styles.title}`}>
            Feita para o seu dia. Pensada para surpreender.
          </h2>
          <p className={styles.text}>
            A Skullizza nasceu com uma proposta simples: oferecer pizzas leves e saborosas para
            fazer parte do seu dia a dia. Uma experiência que vai além da fome.
          </p>
        </div>

        <MediaFrame
          className={styles.photo}
          variant="offset"
          ratio="4/5"
          caption={ABOUT_IMAGE.isProvisional ? 'Foto ilustrativa provisória' : undefined}
        >
          <ResponsiveImage
            image={ABOUT_IMAGE}
            sizes="(min-width: 1024px) min(37vw, 540px), (min-width: 768px) 448px, 100vw"
          />
        </MediaFrame>
      </div>
    </section>
  );
}
