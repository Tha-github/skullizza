import {
  CALZONE_IMAGE,
  HERO_IMAGE,
  PASTA_IMAGE,
  PIZZA_SLICES_IMAGE,
  PIZZA_WHOLE_IMAGE,
} from '@/data/images';
import type { MenuCategory, Product } from '@/types/menu';

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'calzones', label: 'Calzones' },
  { id: 'massas', label: 'Massas' },
  { id: 'focaccias', label: 'Focaccias' },
];

const DEMO_DESCRIPTION = 'Descrição a ser informada pela Skullizza.';

/**
 * CARDÁPIO: arquivo único de cadastro dos produtos.
 *
 * Os itens abaixo são DEMONSTRAÇÃO: não existem no cardápio real. Para publicar:
 * 1. Apague os itens com `isDemo: true`.
 * 2. Cadastre os produtos reais, no formato do exemplo:
 *
 *    {
 *      id: 'nome-do-produto',
 *      name: 'Nome do produto',
 *      description: 'Descrição informada pela Skullizza.',
 *      category: 'pizzas',
 *      price: 49.9,
 *      image: FOTO_DO_PRODUTO, // cadastrada em data/images.ts
 *      isFeatured: true, // opcional
 *    },
 *
 * Sem itens de demonstração, o aviso de conteúdo provisório some da página sozinho.
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: 'exemplo-pizza-destaque',
    name: 'Exemplo de pizza em destaque',
    description: DEMO_DESCRIPTION,
    category: 'pizzas',
    price: null,
    image: PIZZA_WHOLE_IMAGE,
    isFeatured: true,
    isDemo: true,
  },
  {
    id: 'exemplo-pizza-2',
    name: 'Exemplo de pizza 2',
    description: DEMO_DESCRIPTION,
    category: 'pizzas',
    price: null,
    image: HERO_IMAGE,
    isDemo: true,
  },
  {
    id: 'exemplo-pizza-3',
    name: 'Exemplo de pizza 3',
    description: DEMO_DESCRIPTION,
    category: 'pizzas',
    price: null,
    image: PIZZA_SLICES_IMAGE,
    isDemo: true,
  },
  {
    id: 'exemplo-calzone',
    name: 'Exemplo de calzone',
    description: DEMO_DESCRIPTION,
    category: 'calzones',
    price: null,
    image: CALZONE_IMAGE,
    isDemo: true,
  },
  {
    id: 'exemplo-massa',
    name: 'Exemplo de massa',
    description: DEMO_DESCRIPTION,
    category: 'massas',
    price: null,
    image: PASTA_IMAGE,
    isDemo: true,
  },
  {
    id: 'exemplo-focaccia',
    name: 'Exemplo de focaccia',
    description: DEMO_DESCRIPTION,
    category: 'focaccias',
    price: null,
    image: null,
    isDemo: true,
  },
];
