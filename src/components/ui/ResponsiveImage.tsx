import type { SiteImage } from '@/data/images';

interface ResponsiveImageProps {
  image: SiteImage;
  /** Largura exibida em cada faixa de tela: define qual arquivo o navegador baixa. */
  sizes: string;
  /** Só para a imagem principal da primeira dobra: carrega cedo e com prioridade. */
  priority?: boolean;
  className?: string;
}

/** AVIF com WebP de reserva. Fora da primeira dobra, carrega só perto de entrar na tela. */
export function ResponsiveImage({ image, sizes, priority, className }: ResponsiveImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      <img
        className={className}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}
