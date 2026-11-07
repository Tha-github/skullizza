import type { CSSProperties, ReactNode } from 'react';

import styles from './MediaFrame.module.css';

type FrameVariant = 'plain' | 'offset' | 'notch' | 'slice';
type FrameRatio = '1/1' | '4/5' | '3/4' | '3/2' | '16/9';

interface MediaFrameProps {
  variant?: FrameVariant;
  ratio?: FrameRatio;
  caption?: string;
  /** `overlay` coloca a legenda como etiqueta sobre a foto, alinhando molduras vizinhas. */
  captionPlacement?: 'below' | 'overlay';
  /** Um `<img>` ou `<picture>`; ele é recortado para preencher a moldura. */
  children: ReactNode;
  className?: string;
}

export function MediaFrame({
  variant = 'plain',
  ratio = '4/5',
  caption,
  captionPlacement = 'below',
  children,
  className,
}: MediaFrameProps) {
  const classes = [
    styles.frame,
    styles[variant],
    captionPlacement === 'overlay' && styles.overlay,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const style = { '--frame-ratio': ratio.replace('/', ' / ') } as CSSProperties;

  return (
    <figure className={classes} style={style}>
      <div className={styles.window}>{children}</div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
