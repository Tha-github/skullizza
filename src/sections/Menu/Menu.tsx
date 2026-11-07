import { useRef, useState } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { MENU_CATEGORIES, PRODUCTS } from '@/data/menu';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';
import type { MenuCategoryId } from '@/types/menu';

import styles from './Menu.module.css';
import { ProductCard } from './ProductCard';

type Filter = MenuCategoryId | 'todos';

const FILTERS: readonly { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  ...MENU_CATEGORIES,
];

const HAS_DEMO_PRODUCTS = PRODUCTS.some((product) => product.isDemo);

function describeResult(count: number, filter: Filter, filterLabel: string): string {
  const items = count === 1 ? '1 item' : `${count} itens`;
  return filter === 'todos' ? `${items} no cardápio` : `${items} em ${filterLabel}`;
}

/** Traz por inteiro para a tela um filtro meio escondido na rolagem horizontal. */
function revealInBar(button: HTMLElement) {
  button.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}

export function Menu() {
  const [filter, setFilter] = useState<Filter>('todos');
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const products =
    filter === 'todos' ? PRODUCTS : PRODUCTS.filter((product) => product.category === filter);
  const filterLabel = FILTERS.find((item) => item.id === filter)?.label ?? '';

  const selectFilter = (next: Filter) => {
    setFilter(next);

    // Se a lista já passou por baixo da barra fixa, volta ao início dela: o filtro pode encolhê-la.
    const bar = barRef.current;
    const list = listRef.current;
    if (bar && list && list.getBoundingClientRect().top < bar.getBoundingClientRect().bottom) {
      requestAnimationFrame(() => list.scrollIntoView({ block: 'start' }));
    }
  };

  return (
    <section id="cardapio" className="theme-light section" aria-labelledby="cardapio-title">
      <div className="container">
        <header className={styles.header}>
          <Eyebrow>Pizzas, calzones, massas e focaccias</Eyebrow>
          <h2 id="cardapio-title" className="display-lg">
            Cardápio
          </h2>
        </header>

        {HAS_DEMO_PRODUCTS && (
          <p className={styles.demoNotice}>
            <strong>Conteúdo provisório.</strong> Os itens abaixo são exemplos de layout. Produtos,
            preços e descrições ainda serão informados pela Skullizza.
          </p>
        )}

        <div ref={barRef} className={styles.bar}>
          <div className={styles.filters} role="group" aria-label="Filtrar cardápio por categoria">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.filter}
                aria-pressed={filter === item.id}
                onFocus={(event) => revealInBar(event.currentTarget)}
                onClick={(event) => {
                  revealInBar(event.currentTarget);
                  selectFilter(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.result} role="status">
          {describeResult(products.length, filter, filterLabel)}
        </p>

        {products.length > 0 ? (
          // Cada card já tem o próprio botão de pedido: o flutuante sai de cena sobre a lista
          <ul ref={listRef} className={styles.grid} data-hides-floating-cta>
            {MENU_CATEGORIES.flatMap((category) =>
              products
                .filter((product) => product.category === category.id)
                .map((product) => (
                  <li key={product.id} data-category={product.category}>
                    <ProductCard product={product} category={category} />
                  </li>
                )),
            )}
          </ul>
        ) : (
          <p className={styles.empty}>Ainda não há itens cadastrados nesta categoria.</p>
        )}

        <div className={styles.help}>
          <p className={styles.helpText}>Prefere falar direto com a Skullizza?</p>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.general}
            label="Pedir o cardápio pelo WhatsApp"
            variant="secondary"
          >
            Pedir o cardápio
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
