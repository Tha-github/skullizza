import type { Plugin } from 'vite';

import { BUSINESS } from '../src/data/business.ts';

const OG_IMAGE_PATH = '/og-image.png';

/** Valida e normaliza o domínio: sempre https-ou-http absoluto e sem barra no final. */
function normalizeSiteUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const url = new URL(trimmed);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`SITE_URL inválido: ${trimmed}`);
  }
  return url.origin;
}

/**
 * Só dados informados pela cliente. Avaliação, nota, coordenadas e preço ficam de fora de
 * propósito, e o horário só entra depois de `hours.confirmed`.
 */
function buildJsonLd(siteUrl: string | null): string {
  const { name, address, contact, hours } = BUSINESS;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name,
    servesCuisine: 'Pizza',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country,
    },
    telephone: contact.phoneE164,
    email: contact.email,
    sameAs: [contact.instagramUrl],
    ...(siteUrl && { url: `${siteUrl}/`, image: `${siteUrl}${OG_IMAGE_PATH}` }),
    ...(hours.confirmed && { openingHours: hours.schema }),
  };

  // Escapa "<" para o conteúdo nunca poder fechar a tag <script>
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Resumo factual para assistentes de IA (llmstxt.org). Mesmas regras do JSON-LD. */
function buildLlmsTxt(siteUrl: string | null): string {
  const { name, address, contact, hours } = BUSINESS;
  const place = `${address.street}, ${address.city} - ${address.state}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  const hoursLine = hours.confirmed
    ? `- Horário: ${hours.label}.`
    : '- Horário: a confirmar com a Skullizza pelo WhatsApp.';

  return `# ${name}

> Pizzaria em ${address.city} (${address.state}) com pizzas, calzones, massas e focaccias. Pedidos direto pelo WhatsApp.

Destaque da casa: massa integral com batata-doce.

## Contato e pedidos

- [WhatsApp ${contact.phoneDisplay}](https://wa.me/${contact.whatsapp}): pedidos e informações
- [Instagram ${contact.instagramHandle}](${contact.instagramUrl})
- [E-mail ${contact.email}](mailto:${contact.email})
- [Endereço: ${place}](${maps})

## Informações

${hoursLine}
- Cardápio, preços e disponibilidade: consultar pelo WhatsApp.
${siteUrl ? `- [Site oficial](${siteUrl}/)\n` : ''}`;
}

function buildRobots(siteUrl: string | null): string {
  const sitemap = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : '';
  return `User-agent: *\nAllow: /${sitemap}\n`;
}

function buildSitemap(siteUrl: string): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
}

/**
 * Metadados que dependem do domínio. Canonical, og:url, og:image e sitemap exigem URL absoluta:
 * sem SITE_URL eles são omitidos, em vez de publicados com um domínio inventado.
 */
export function seoPlugin(rawSiteUrl: string | undefined): Plugin {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  let isSsrBuild = false;
  let isBuild = false;

  return {
    name: 'skullizza-seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
      isBuild = config.command === 'build';
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, context) {
        // A vitrine do design system não entra no build nem deve receber estes metadados.
        if (context.path !== '/index.html') return [];

        // As duas fontes da primeira dobra começam a baixar junto com o HTML, não depois do CSS.
        const fontPreloads = Object.keys(context.bundle ?? {})
          .filter((file) => /(anton|archivo)-latin.*\.woff2$/.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `/${file}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
            },
            injectTo: 'head-prepend' as const,
          }));

        const tags = [
          ...fontPreloads,
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: buildJsonLd(siteUrl),
            injectTo: 'head' as const,
          },
        ];
        if (!siteUrl) return tags;

        const image = `${siteUrl}${OG_IMAGE_PATH}`;
        const meta = (property: string, content: string) => ({
          tag: 'meta',
          attrs: { property, content },
          injectTo: 'head' as const,
        });
        return [
          ...tags,
          {
            tag: 'link',
            attrs: { rel: 'canonical', href: `${siteUrl}/` },
            injectTo: 'head' as const,
          },
          meta('og:url', `${siteUrl}/`),
          meta('og:image', image),
          meta('og:image:width', '1200'),
          meta('og:image:height', '630'),
          meta('og:image:alt', 'Skullizza: pizzas, calzones e massas em Curitiba.'),
          {
            tag: 'meta',
            attrs: { name: 'twitter:image', content: image },
            injectTo: 'head' as const,
          },
        ];
      },
    },
    generateBundle() {
      if (isSsrBuild || !isBuild) return;

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlmsTxt(siteUrl) });
      if (siteUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(siteUrl) });
      } else {
        this.warn('SITE_URL não definido: canonical, og:url, og:image e sitemap foram omitidos.');
      }
    },
  };
}
