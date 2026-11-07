export interface Highlight {
  title: string;
  text: string;
}

/** Atributos da proposta, sem prazos, garantias ou promessas não confirmadas pela cliente. */
export const HIGHLIGHTS: readonly Highlight[] = [
  {
    title: 'Variedade no cardápio',
    text: 'Pizzas, calzones, massas e focaccias para escolher.',
  },
  {
    title: 'Pizza para o dia a dia',
    text: 'Uma proposta pensada para fazer parte da sua rotina.',
  },
  {
    title: 'Massas e combinações',
    text: 'Opções de massas e combinações para variar o pedido.',
  },
  {
    title: 'Pedido direto',
    text: 'Você fala direto com a Skullizza pelo WhatsApp.',
  },
];
