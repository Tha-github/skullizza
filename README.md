# Skullizza — site

Landing page da Skullizza (Curitiba). React + TypeScript + Vite, CSS puro com CSS Modules.

## Comandos

| Comando                | O que faz                                  |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento                |
| `npm run build`        | Checagem de tipos e build de produção      |
| `npm run preview`      | Serve o build localmente                   |
| `npm run typecheck`    | Só a checagem de tipos                     |
| `npm run lint`         | ESLint (inclui regras de acessibilidade)   |
| `npm run format`       | Formata tudo com Prettier                  |
| `npm run format:check` | Verifica a formatação sem alterar arquivos |

## Estrutura

```
src/
  assets/      Imagens e arquivos de marca importados pelo código
  components/  brand/ (Logo, BrandSymbol), ui/ (Button, Card...), decor/ (TapeBand, Stamp...)
  data/        Conteúdo e dados comerciais: fonte única, sem dados soltos em componentes
  hooks/       Hooks React reutilizáveis
  layout/      Casca da página (SiteLayout, header, footer)
  sections/    Seções da landing page (Hero, Cardapio...)
  styles/      Tokens, fontes, reset e estilos globais
  types/       Tipos compartilhados
  utils/       Funções puras, sem React
```

## Convenções

- **Componentes:** `PascalCase.tsx`, com export nomeado e CSS ao lado (`Button.module.css`).
- **Seções:** uma pasta por seção quando houver mais de um arquivo (`sections/Hero/Hero.tsx`).
- **Hooks:** `useAlgo.ts`. **Utils e dados:** `camelCase.ts`. **Constantes:** `UPPER_SNAKE_CASE`.
- **Imports:** use o alias `@/` entre pastas; caminho relativo só para arquivos vizinhos.
- **Classes CSS:** `camelCase` nos módulos; classes globais só em `styles/global.css`.
- **Texto da interface e âncoras:** em português. **Identificadores de código:** em inglês.

## Estilos

Regras visuais completas em [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md). Em desenvolvimento, a
vitrine dos componentes fica em `/styleguide.html`. Arquivos de marca para uso externo estão em
`brand/`.

- Use sempre tokens de `src/styles/tokens.css`; não escreva cores ou espaçamentos soltos.
- Prefira os tokens semânticos (`--color-text`, `--color-accent`), que mudam conforme o tema.
- Temas por seção: `.theme-dark` (padrão), `.theme-light` e `.theme-accent`.
- Mobile-first, com `min-width`: 480, 768, 1024, 1366 e 1920px.
- Amarelo `#FDD900` nunca é cor de texto sobre fundo branco (contraste insuficiente).

## Cardápio

Os produtos são cadastrados só em `src/data/menu.ts`, onde há um modelo comentado. Os itens atuais
são demonstração (`isDemo: true`); ao removê-los, o aviso de conteúdo provisório some da página.

## Imagens

Cada foto existe em AVIF e WebP, em várias larguras, com o nome `nome-largura.formato` em
`src/assets/images/provisorio/` (ex.: `calzone-800.avif`). `src/data/images.ts` encontra as versões
sozinho; o componente `ResponsiveImage` entrega o formato e o tamanho certos. Ao trocar uma foto,
gere as mesmas larguras nos dois formatos e mantenha o nome-base.

## Segurança e hospedagem

Os headers de segurança (CSP, HSTS, Referrer-Policy, X-Content-Type-Options, Permissions-Policy)
ficam em `vercel.json`, e `npm run preview` aplica os mesmos headers para testar localmente. Em outra
hospedagem, replique esses headers na configuração dela. Antes de adicionar script, fonte ou imagem
de outro domínio (mapa incorporado, analytics, pixel), ajuste a CSP, ou ele será bloqueado.

## SEO e publicação

- O build gera o HTML completo da página (`scripts/prerender.mjs`), legível sem JavaScript.
- Defina `SITE_URL` no ambiente de build (veja `.env.example`) ao ter o domínio. Sem ela, canonical,
  `og:url`, `og:image` e `sitemap.xml` são omitidos, e o build avisa.
- O JSON-LD (`build/seoPlugin.ts`) usa `src/data/business.ts` e só inclui o horário com
  `hours.confirmed: true`. Não inclua avaliações, coordenadas ou preços sem confirmação.

## Dados comerciais

Tudo fica em `src/data/business.ts`. Campos com `confirmed: false` ainda dependem de validação da
cliente antes da publicação.
