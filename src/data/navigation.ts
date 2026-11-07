export interface NavItem {
  label: string;
  href: `#${string}`;
}

/** Ordem da página. Os `href` correspondem aos `id` das seções. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'A Skullizza', href: '#sobre' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Massa integral', href: '#massa-integral' },
  { label: 'Localização', href: '#localizacao' },
];

export const FOOTER_NAV_ITEMS: readonly NavItem[] = [
  { label: 'A Skullizza', href: '#sobre' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Massa integral', href: '#massa-integral' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Localização', href: '#localizacao' },
];
