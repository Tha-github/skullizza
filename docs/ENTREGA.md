# Entrega: site da Skullizza

Landing page da Skullizza, pizzaria em Curitiba. Página única com hero, apresentação, proposta,
cardápio com filtros, campanha da massa integral com batata-doce, galeria, Instagram, localização,
chamada final e rodapé. O pedido é feito direto pelo WhatsApp, sem checkout nem carrinho.

> **Status:** tecnicamente pronto, **mas não pode ser publicado ainda**. O cardápio e as fotos são
> provisórios, e alguns dados aguardam confirmação da cliente. Veja "Antes de publicar".

## Antes de publicar (obrigatório)

| #   | O que falta                                                                                                      | Onde alterar                               |
| --- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 1   | Cardápio real: nome, descrição, preço e categoria de cada produto. Apagar os 6 itens com `isDemo: true`          | `src/data/menu.ts`                         |
| 2   | Fotos reais (hero, apresentação, massa integral, galeria e produtos), em AVIF e WebP, com `isProvisional: false` | `src/assets/images/`, `src/data/images.ts` |
| 3   | Foto real de focaccia: hoje a galeria mostra um bloco tipográfico                                                | `src/sections/Gallery/Gallery.tsx`         |
| 4   | Confirmar o horário "segunda a domingo, 24 horas" e mudar para `confirmed: true`                                 | `src/data/business.ts`                     |
| 5   | Confirmar o número 603, o bairro e o CEP do endereço                                                             | `src/data/business.ts`                     |
| 6   | Definir o domínio na variável `SITE_URL` do build                                                                | Configuração da hospedagem                 |
| 7   | Aprovar o logo e o símbolo, que são uma proposta provisória                                                      | `brand/`, `src/components/brand/`          |

Enquanto os itens 1 e 2 estiverem pendentes, a página mostra os avisos "Conteúdo provisório" e "Foto
ilustrativa provisória". Eles somem sozinhos quando os dados reais entram.

## Para a cliente confirmar

- **"Pizzas leves"** (texto da seção "A Skullizza"): pode ser lido como afirmação nutricional.
  Confirmar ou trocar.
- **Massa integral com batata-doce:** é a massa da pizza, do calzone ou uma opção escolhida no
  pedido? A resposta permite descrevê-la melhor sem afirmações de saúde.
- **"Massas" no cardápio:** são pratos de massa (macarrão)?
- **Tamanhos:** se houver tamanhos (broto, média, grande), o modelo de produto precisa mudar, porque
  hoje cada item tem um preço único.
- **Rodapé:** razão social e CNPJ, se quiserem exibir. Hoje ficam ocultos.
- **Textos escritos pela agência:** "O que faz parte da Skullizza", "Para abrir o apetite", "Deu
  vontade? Peça agora.", "Pizzaria em Curitiba" e as descrições dos 4 itens da proposta.

## Prévia no GitHub Pages

Cada push na `main` publica em https://tha-github.github.io/skullizza/ via
`.github/workflows/deploy-pages.yml`. A prévia sai com `noindex`, para o conteúdo provisório não ir
para o Google. No lançamento, remova `SITE_NOINDEX` do workflow e troque `SITE_URL` pelo domínio
final. O GitHub Pages não permite headers próprios: a CSP vale pela meta tag, mas HSTS,
Permissions-Policy e a proteção contra iframe só funcionam numa hospedagem como a Vercel.

## Publicação (Vercel)

1. Versionar o projeto: o repositório ainda não usa git.
2. Importar na Vercel. Comando de build: `npm run build`. Pasta de saída: `dist`.
3. Em Environment Variables, criar `SITE_URL` com o domínio final, sem barra no fim (ex.:
   `https://www.dominio.com.br`). Isso ativa canonical, `og:url`, `og:image` e `sitemap.xml`.
4. Os headers de segurança e de cache já estão em `vercel.json`.
5. Antes de usar HSTS com `includeSubDomains`, confirmar que todos os subdomínios têm HTTPS.
6. Depois de publicar:
   - testar o botão de WhatsApp em um celular real;
   - validar o JSON-LD no Rich Results Test do Google;
   - testar a prévia de compartilhamento (WhatsApp e Facebook);
   - enviar o sitemap no Google Search Console.

**Outra hospedagem:** replicar os headers de `vercel.json` na configuração dela. Antes de adicionar
mapa incorporado, analytics ou pixel, ajustar a Content-Security-Policy, ou eles serão bloqueados.

## Tecnologia

React 19 e TypeScript 6 com Vite 8, CSS Modules e tokens CSS, sem biblioteca de UI. Em produção, as
únicas dependências são `react`, `react-dom` e as fontes auto-hospedadas (Anton e Archivo). O build gera
o HTML completo da página (legível sem JavaScript), o JSON-LD, `robots.txt`, `llms.txt` e, com
domínio, `sitemap.xml`.

## Comandos

| Comando                                 | Uso                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `npm install`                           | Instala as dependências                                                |
| `npm run dev`                           | Desenvolvimento; a vitrine do design system fica em `/styleguide.html` |
| `npm run build`                         | Checagem de tipos, build e geração do HTML                             |
| `npm run preview`                       | Serve o build com os headers de segurança da hospedagem                |
| `npm run lint` / `npm run format:check` | Qualidade de código                                                    |

## Resultados medidos em 07/11/2026

Lighthouse 13.6 no Edge headless, sobre o build de produção servido localmente (sem compressão),
mediana de 5 rodadas:

| Perfil  | Performance | Acessibilidade | Boas práticas | SEO |
| ------- | ----------- | -------------- | ------------- | --- |
| Mobile  | 94          | 100            | 100           | 100 |
| Desktop | 100         | 100            | 100           | 100 |

Mobile: LCP de 2,95s, TBT de 76ms, CLS de 0 e 416 KB transferidos. As medições locais não substituem
um teste no domínio final (PageSpeed Insights).

Testes automatizados no navegador, em larguras de 320 a 2560px: navegação, âncoras, menu mobile,
filtros, todas as mensagens do WhatsApp (conferidas no redirecionamento real do wa.me), links de
telefone, e-mail, Instagram e Maps, conteúdo sem JavaScript, metadados, JSON-LD, CSP ativa, navegação
por teclado, zoom de 400%, espaçamento de texto ampliado, movimento reduzido e axe-core (0 violações).
Não foram testados: celulares e navegadores reais (Safari e Chrome no Android) e leitores de tela
reais.
