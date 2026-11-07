import { BUSINESS } from '@/data/business';

/** Busca pelo endereço em texto, no formato oficial do Google Maps: não usa coordenadas. */
export function buildMapsUrl(): string {
  const { street, city, state } = BUSINESS.address;
  const query = encodeURIComponent(`${street}, ${city} - ${state}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
