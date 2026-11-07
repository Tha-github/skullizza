import { useId } from 'react';

import { BrandSymbol } from '@/components/brand/BrandSymbol';

import styles from './Stamp.module.css';

interface StampProps {
  /** Texto curto em volta do selo, com base em dados reais da marca. */
  text: string;
  size?: string;
  className?: string;
}

/** Selo circular para sobrepor à fotografia. Decorativo. */
export function Stamp({ text, size = '8rem', className }: StampProps) {
  const pathId = useId();

  return (
    <div
      className={[styles.stamp, className].filter(Boolean).join(' ')}
      style={{ inlineSize: size, blockSize: size }}
      aria-hidden="true"
    >
      <svg className={styles.ring} viewBox="0 0 100 100">
        <defs>
          <path id={pathId} d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
        </defs>
        <text className={styles.text}>
          <textPath href={`#${pathId}`} textLength="236">
            {text}
          </textPath>
        </text>
      </svg>
      <BrandSymbol size="42%" className={styles.symbol} />
    </div>
  );
}
