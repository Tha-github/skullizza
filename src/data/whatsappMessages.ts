/** Mensagens por origem do clique. Toda saída para o WhatsApp usa uma destas. */
export const WHATSAPP_MESSAGES = {
  /** Header, hero, menu mobile, botão flutuante e chamada do cardápio. */
  general: 'Olá! Vim pelo site da Skullizza e gostaria de conhecer o cardápio.',
  /** CTA do fim da página: quem chegou até ali já está decidido. */
  order: 'Olá! Vim pelo site da Skullizza e gostaria de fazer um pedido.',
  specialDough: 'Olá! Gostaria de saber mais sobre a massa integral com batata-doce.',
  product: (productName: string) =>
    `Olá! Tenho interesse no produto ${productName}. Gostaria de mais informações.`,
  category: (categoryLabel: string) =>
    `Olá! Gostaria de saber mais sobre as opções de ${categoryLabel} da Skullizza. Poderia me passar mais informações?`,
};
