/**
 * Fotos do site. Cada foto existe em AVIF e WebP, em várias larguras (arquivo `nome-largura.formato`
 * em `src/assets/images/provisorio`). O navegador escolhe o formato e o tamanho.
 */
const FILES = import.meta.glob<string>('/src/assets/images/provisorio/*.{avif,webp}', {
  eager: true,
  import: 'default',
});

export interface SiteImage {
  avifSrcSet: string;
  webpSrcSet: string;
  /** WebP intermediário, para navegadores sem suporte a `srcset`. */
  src: string;
  /** Proporção da foto, usada para reservar o espaço antes do carregamento. */
  width: number;
  height: number;
  alt: string;
  /**
   * Foto de banco de imagens (Unsplash), não é produto da Skullizza.
   * Enquanto `true`, a página exibe o aviso. Trocar pela foto real e mudar para `false`.
   */
  isProvisional: boolean;
}

function variants(name: string, format: 'avif' | 'webp') {
  const pattern = new RegExp(`/${name}-(\\d+)\\.${format}$`);
  const found = Object.entries(FILES)
    .map(([path, url]) => ({ url, width: Number(pattern.exec(path)?.[1]) }))
    .filter((file) => file.width > 0)
    .sort((a, b) => a.width - b.width);

  if (found.length === 0) throw new Error(`Imagem sem arquivos ${format}: ${name}`);
  return found;
}

function siteImage(
  name: string,
  details: Pick<SiteImage, 'width' | 'height' | 'alt' | 'isProvisional'>,
): SiteImage {
  const webp = variants(name, 'webp');
  const toSrcSet = (list: ReturnType<typeof variants>) =>
    list.map((file) => `${file.url} ${file.width}w`).join(', ');

  return {
    ...details,
    avifSrcSet: toSrcSet(variants(name, 'avif')),
    webpSrcSet: toSrcSet(webp),
    src: (webp.find((file) => file.width >= 800) ?? webp[webp.length - 1]!).url,
  };
}

export const HERO_IMAGE = siteImage('hero-pizza', {
  width: 1600,
  height: 1067,
  alt: 'Pizza de queijo gratinado fatiada sobre tábua de madeira, com tomates-cereja e alecrim.',
  isProvisional: true,
});

export const ABOUT_IMAGE = siteImage('pizza-margherita', {
  width: 1200,
  height: 801,
  alt: 'Pizza de muçarela e manjericão com borda tostada, servida em prato sobre mesa de mármore.',
  isProvisional: true,
});

/** Trocar por uma foto real da massa integral com batata-doce. */
export const SPECIAL_DOUGH_IMAGE = siteImage('pizza-borda', {
  width: 1600,
  height: 2400,
  alt: 'Detalhe da borda de uma pizza com folha de manjericão, sobre fundo escuro.',
  isProvisional: true,
});

export const PIZZA_WHOLE_IMAGE = siteImage('pizza-inteira', {
  width: 1200,
  height: 1600,
  alt: 'Pizza inteira com folhas verdes e queijo branco, vista de cima.',
  isProvisional: true,
});

export const PIZZA_SLICES_IMAGE = siteImage('pizza-fatias', {
  width: 1200,
  height: 540,
  alt: 'Fatias de pizza com rúcula sobre papel pardo.',
  isProvisional: true,
});

export const CALZONE_IMAGE = siteImage('calzone', {
  width: 1200,
  height: 1800,
  alt: 'Mãos abrindo um calzone recheado, com o queijo derretido escorrendo.',
  isProvisional: true,
});

export const PASTA_IMAGE = siteImage('massa-garfo', {
  width: 1200,
  height: 1500,
  alt: 'Espaguete com molho de tomate enrolado em um garfo, sobre fundo preto.',
  isProvisional: true,
});

export const TOMATOES_IMAGE = siteImage('tomates', {
  width: 1200,
  height: 1726,
  alt: 'Tomates maduros com gotas de água, sobre fundo escuro.',
  isProvisional: true,
});

export type GallerySlot = 'whole' | 'slices' | 'calzone' | 'pasta' | 'tomatoes';

export interface GalleryPhoto {
  slot: GallerySlot;
  label: string;
  image: SiteImage;
}

export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  { slot: 'whole', label: 'Pizzas', image: PIZZA_WHOLE_IMAGE },
  { slot: 'calzone', label: 'Calzones', image: CALZONE_IMAGE },
  { slot: 'slices', label: 'Fatias', image: PIZZA_SLICES_IMAGE },
  { slot: 'pasta', label: 'Massas', image: PASTA_IMAGE },
  { slot: 'tomatoes', label: 'Ingredientes', image: TOMATOES_IMAGE },
];
