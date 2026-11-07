import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';
import type { MenuCategory, Product } from '@/types/menu';

/** Item de demonstração pergunta pela categoria: nunca envia o nome de um produto inexistente. */
export function getProductOrderMessage(product: Product, category: MenuCategory): string {
  return product.isDemo
    ? WHATSAPP_MESSAGES.category(category.label.toLowerCase())
    : WHATSAPP_MESSAGES.product(product.name);
}
