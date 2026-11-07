import type { ReactNode } from 'react';

import styles from './Card.module.css';

type CardVariant = 'surface' | 'outline' | 'accent';

interface CardProps {
  variant?: CardVariant;
  /** Geralmente um `MediaFrame` ou `<img>`. */
  media?: ReactNode;
  eyebrow?: string;
  title: string;
  titleAs?: 'h2' | 'h3' | 'h4';
  /** Etiqueta curta sobre a mídia, como destaque do produto. */
  badge?: string;
  /** Área de ação, sempre alinhada à base do card. */
  footer?: ReactNode;
  /** Abaixo de 640px, foto à esquerda e texto à direita: listas longas ocupam metade da altura. */
  compactOnMobile?: boolean;
  children?: ReactNode;
}

export function Card({
  variant = 'surface',
  media,
  eyebrow,
  title,
  titleAs: Title = 'h3',
  badge,
  footer,
  compactOnMobile,
  children,
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    variant === 'accent' && 'theme-accent',
    compactOnMobile && styles.compactOnMobile,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      {media && (
        <div className={styles.media}>
          {media}
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
      )}
      <div className={styles.body}>
        {eyebrow && <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>}
        <Title className={styles.title}>{title}</Title>
        {children && <div className={styles.text}>{children}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </article>
  );
}
