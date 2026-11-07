import type { ReactNode } from 'react';

import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Rótulo de seção, sempre acima do título, com a cunha da marca como marcador. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={['label', styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</p>
  );
}
