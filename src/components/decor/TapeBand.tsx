import styles from './TapeBand.module.css';

interface TapeBandProps {
  items: readonly string[];
  /** Movimento lento em loop; fica parado com `prefers-reduced-motion`. */
  animated?: boolean;
  tone?: 'accent' | 'dark';
}

const REPEAT_PER_HALF = 4;

/** Fita tipográfica entre seções. Decorativa: o conteúdo real está nas próprias seções. */
export function TapeBand({ items, animated = true, tone = 'accent' }: TapeBandProps) {
  const half = Array.from({ length: REPEAT_PER_HALF }, () => items).flat();
  const track = [...half, ...half];

  return (
    <div
      className={`${styles.band} ${tone === 'accent' ? 'theme-accent' : 'theme-dark'}`}
      aria-hidden="true"
    >
      <div className={`${styles.track} ${animated ? styles.animated : ''}`}>
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
