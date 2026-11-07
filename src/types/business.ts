export interface BusinessInfo {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    /** Código do país para os dados estruturados. */
    country: string;
  };
  contact: {
    /** Somente dígitos, com DDI, no formato exigido pelo wa.me. */
    whatsapp: string;
    /** Formato internacional, usado em links `tel:` e nos dados estruturados. */
    phoneE164: string;
    /** Formato de exibição. */
    phoneDisplay: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
  };
  hours: {
    label: string;
    /** Formato schema.org de `openingHours`. */
    schema: string;
    /** Enquanto `false`, a página avisa que falta confirmar e o JSON-LD omite o horário. */
    confirmed: boolean;
  };
  /** Dados legais para o rodapé. Sem informação confirmada, ficam `null` e não aparecem. */
  legal: {
    companyName: string | null;
    taxId: string | null;
  };
}
