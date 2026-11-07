import { BUSINESS } from '@/data/business';

/** Monta o link do wa.me com a mensagem já codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
