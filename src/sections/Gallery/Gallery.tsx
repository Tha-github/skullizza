import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { GALLERY_PHOTOS, type GallerySlot } from '@/data/images';

import styles from './Gallery.module.css';

type FrameProps = Pick<Parameters<typeof MediaFrame>[0], 'variant' | 'ratio'>;

/** Moldura e `sizes` de cada posição: a variação é o que dá ritmo editorial à composição. */
const SLOTS: Record<GallerySlot, FrameProps & { sizes: string }> = {
  whole: { ratio: '3/2', sizes: '(min-width: 768px) min(56vw, 784px), 100vw' },
  calzone: {
    ratio: '3/4',
    variant: 'offset',
    sizes: '(min-width: 768px) min(40vw, 560px), 100vw',
  },
  slices: { ratio: '1/1', sizes: '(min-width: 768px) min(32vw, 448px), 50vw' },
  pasta: { ratio: '1/1', variant: 'notch', sizes: '(min-width: 768px) min(40vw, 560px), 50vw' },
  tomatoes: { ratio: '1/1', sizes: '(min-width: 768px) min(56vw, 784px), 50vw' },
};

export function Gallery() {
  const hasProvisional = GALLERY_PHOTOS.some((photo) => photo.image.isProvisional);

  return (
    <section id="galeria" className="section" aria-labelledby="galeria-title">
      <div className="container">
        <header className={styles.header}>
          <Eyebrow>Galeria</Eyebrow>
          <h2 id="galeria-title" className="display-lg">
            Para abrir o apetite.
          </h2>
          {hasProvisional && (
            <p className={styles.notice}>
              Fotos ilustrativas provisórias. Não são produtos da Skullizza.
            </p>
          )}
        </header>

        <div className={styles.grid}>
          {GALLERY_PHOTOS.map(({ slot, label, image }) => {
            const { sizes, ...frame } = SLOTS[slot];
            return (
              <MediaFrame
                key={slot}
                className={styles[slot]}
                caption={label}
                captionPlacement="overlay"
                {...frame}
              >
                <ResponsiveImage image={image} sizes={sizes} />
              </MediaFrame>
            );
          })}

          {/* Sem foto confirmada de focaccia: bloco tipográfico até a foto real chegar. */}
          <div className={`theme-accent ${styles.focaccia}`}>
            <p className={styles.tileTitle}>Focaccias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
