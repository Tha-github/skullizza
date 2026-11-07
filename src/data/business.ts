import type { BusinessInfo } from '../types/business.ts';

/** Fonte única dos dados comerciais informados pela cliente. */
export const BUSINESS: BusinessInfo = {
  name: 'Skullizza',
  address: {
    street: 'Rua Frederico Cantarelli, 603',
    city: 'Curitiba',
    state: 'PR',
    country: 'BR',
  },
  contact: {
    whatsapp: '5541984646956',
    phoneE164: '+5541984646956',
    phoneDisplay: '(41) 98464-6956',
    email: 'skullizza@gmail.com',
    instagramHandle: '@skullizza',
    instagramUrl: 'https://www.instagram.com/skullizza/',
  },
  hours: {
    label: 'Segunda a domingo, 24 horas',
    schema: 'Mo-Su 00:00-23:59',
    // CONFIRMAR COM A CLIENTE antes de publicar. Com `true`, some o aviso e o JSON-LD inclui o horário.
    confirmed: false,
  },
  legal: {
    companyName: null,
    taxId: null,
  },
};
