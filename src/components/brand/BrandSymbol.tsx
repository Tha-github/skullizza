import { SYMBOL } from './brandPaths';

interface BrandSymbolProps {
  size?: string;
  className?: string;
}

/** Fatia-caveira. Sempre decorativo e na cor do texto (`currentColor`). */
export function BrandSymbol({ size = '3rem', className }: BrandSymbolProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={SYMBOL.viewBox}
      className={className}
      style={{ inlineSize: size, blockSize: size }}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={SYMBOL.crust} />
      <path fillRule="evenodd" d={SYMBOL.body} />
    </svg>
  );
}
