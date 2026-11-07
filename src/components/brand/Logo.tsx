import { WORDMARK } from './brandPaths';

type LogoTone = 'on-dark' | 'on-light' | 'on-accent' | 'yellow';

const TONES: Record<LogoTone, { letters: string; wedge: string }> = {
  'on-dark': { letters: 'var(--color-white)', wedge: 'var(--color-yellow)' },
  'on-light': { letters: 'var(--color-black)', wedge: 'var(--color-black)' },
  'on-accent': { letters: 'var(--color-black)', wedge: 'var(--color-black)' },
  yellow: { letters: 'var(--color-yellow)', wedge: 'var(--color-yellow)' },
};

interface LogoProps {
  tone?: LogoTone;
  /** Altura do logo; a largura acompanha a proporção. */
  height?: string;
  /** Use quando há texto visível ao lado que já nomeia a marca. */
  decorative?: boolean;
  className?: string;
}

export function Logo({ tone = 'on-dark', height = '2rem', decorative, className }: LogoProps) {
  const colors = TONES[tone];
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'Skullizza' };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK.viewBox}
      className={className}
      style={{ blockSize: height, inlineSize: `calc(${height} * ${WORDMARK.ratio})`, flex: 'none' }}
      {...a11y}
    >
      <path fill={colors.letters} d={WORDMARK.letters} />
      <path fill={colors.wedge} d={WORDMARK.wedge} />
    </svg>
  );
}
