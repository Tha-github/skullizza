import { Stamp } from '@/components/decor/Stamp';
import { TapeBand } from '@/components/decor/TapeBand';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BUSINESS } from '@/data/business';
import { HERO_IMAGE } from '@/data/images';
import { MENU_CATEGORIES } from '@/data/menu';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';

import styles from './Hero.module.css';

export function Hero() {
  const { city, state } = BUSINESS.address;

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.panel} aria-hidden="true" />

        <div className={`container ${styles.layout}`}>
          <div className={styles.copy}>
            <Eyebrow>Pizzaria em {city}</Eyebrow>
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.titleFirst}>Não é só pizza.</span>{' '}
              <span className={styles.titleAccent}>É Skullizza.</span>
            </h1>
            <p className={styles.lead}>
              Pizzas, calzones e massas para quem acredita que comer bem faz parte do dia.
            </p>
            <div className={styles.actions}>
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.general}
                label="Pedir pelo WhatsApp"
                size="lg"
                className={styles.primaryCta}
                data-hides-floating-cta
              >
                Pedir pelo WhatsApp
              </WhatsAppButton>
              <Button href="#cardapio" variant="ghost" withArrow className={styles.secondaryCta}>
                Explorar cardápio
              </Button>
            </div>
          </div>

          <div className={styles.visual}>
            <figure className={styles.photoFrame}>
              <div className={styles.photoShadow}>
                <ResponsiveImage
                  className={styles.photo}
                  image={HERO_IMAGE}
                  sizes="(min-width: 1024px) min(42vw, 620px), 100vw"
                  priority
                />
              </div>
              {HERO_IMAGE.isProvisional && (
                <figcaption className={styles.notice}>Foto ilustrativa provisória</figcaption>
              )}
            </figure>
            <Stamp
              className={styles.stamp}
              size="var(--stamp-size)"
              text={`Skullizza · ${city} · Skullizza · ${city} · `}
            />
            <p className={styles.sideLabel} aria-hidden="true">
              {city} · {state}
            </p>
          </div>
        </div>
      </div>

      <TapeBand items={MENU_CATEGORIES.map((category) => category.label)} />
    </section>
  );
}
