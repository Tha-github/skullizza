import { BrandSymbol } from '@/components/brand/BrandSymbol';
import { Card } from '@/components/ui/Card';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { MenuCategory, Product } from '@/types/menu';
import { formatPrice } from '@/utils/formatPrice';
import { getProductOrderMessage } from '@/utils/productOrder';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  category: MenuCategory;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const { name, description, price, image, isFeatured, isDemo } = product;
  const orderLabel = isDemo
    ? `Consultar ${category.label.toLowerCase()} pelo WhatsApp`
    : `Pedir ${name} pelo WhatsApp`;

  return (
    <Card
      compactOnMobile
      eyebrow={isDemo ? `${category.label} · Exemplo` : category.label}
      title={name}
      badge={isFeatured ? 'Destaque' : undefined}
      media={
        <MediaFrame ratio="3/2">
          {image ? (
            <ResponsiveImage
              image={image}
              sizes="(min-width: 1024px) min(31vw, 440px), (min-width: 640px) 48vw, 38vw"
            />
          ) : (
            <div className={styles.noPhoto}>
              <BrandSymbol size="30%" />
            </div>
          )}
        </MediaFrame>
      }
      footer={
        <div className={styles.footer}>
          {price === null ? (
            <p className={styles.priceMissing}>Preço a confirmar</p>
          ) : (
            <p className={styles.price}>{formatPrice(price)}</p>
          )}
          <WhatsAppButton message={getProductOrderMessage(product, category)} label={orderLabel}>
            {isDemo ? 'Consultar' : 'Pedir'}
          </WhatsAppButton>
        </div>
      }
    >
      {description}
    </Card>
  );
}
