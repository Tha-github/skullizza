import type { SiteImage } from '@/data/images';

export type MenuCategoryId = 'pizzas' | 'calzones' | 'massas' | 'focaccias';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface Product {
  /** Único no cardápio, sem espaços (ex.: `pizza-margherita`). */
  id: string;
  name: string;
  description: string;
  category: MenuCategoryId;
  /** Valor em reais (ex.: `49.9`). Use `null` quando o preço não for exibido. */
  price: number | null;
  /** Sem foto, o card mostra o símbolo da marca. */
  image: SiteImage | null;
  /** Mostra a etiqueta "Destaque" no card. */
  isFeatured?: boolean;
  /**
   * `true` em itens de demonstração: o card é marcado como exemplo e o botão pergunta
   * pela categoria, para a loja nunca receber pedido de um produto que não existe.
   */
  isDemo?: boolean;
}
