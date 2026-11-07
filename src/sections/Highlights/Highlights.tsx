import { Eyebrow } from '@/components/ui/Eyebrow';
import { HIGHLIGHTS } from '@/data/highlights';

import styles from './Highlights.module.css';

export function Highlights() {
  return (
    <section id="proposta" className="section" aria-labelledby="proposta-title">
      <div className={`container ${styles.layout}`}>
        <header className={styles.header}>
          <Eyebrow>A proposta</Eyebrow>
          <h2 id="proposta-title" className="display-md">
            O que faz parte da Skullizza.
          </h2>
        </header>

        <ol className={styles.list}>
          {HIGHLIGHTS.map((highlight, index) => (
            <li key={highlight.title} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.itemTitle}>{highlight.title}</h3>
              <p className={styles.itemText}>{highlight.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
