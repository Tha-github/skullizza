import styles from './SliceCut.module.css';

type SectionTheme = 'dark' | 'light' | 'accent';

interface SliceCutProps {
  from: SectionTheme;
  to: SectionTheme;
  direction?: 'rise' | 'fall';
}

/** Corte diagonal entre duas seções de temas diferentes. */
export function SliceCut({ from, to, direction = 'rise' }: SliceCutProps) {
  return (
    <div className={`${styles.cut} theme-${from}`} aria-hidden="true">
      <div className={`${styles.fill} ${styles[direction]} theme-${to}`} />
    </div>
  );
}
