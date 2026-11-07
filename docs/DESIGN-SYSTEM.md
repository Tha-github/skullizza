# Design system Skullizza

Veja tudo funcionando em `npm run dev` → `/styleguide.html` (não entra no build de produção).

## Conceito

Urbana, editorial e direta. A forma que une tudo é a **cunha**: o corte da fatia.
Ela aparece no "I" do logo, nas setas dos botões, nos marcadores e nos cortes diagonais.
Se um elemento não usa a cunha nem organiza informação, ele não entra.

## Marca

| Peça             | Uso                                                                   | Arquivo / componente            |
| ---------------- | --------------------------------------------------------------------- | ------------------------------- |
| Wordmark escuro  | Branco com cunha amarela, em fundos escuros                           | `<Logo tone="on-dark" />`       |
| Wordmark claro   | Preto, em fundos brancos                                              | `<Logo tone="on-light" />`      |
| Wordmark acento  | Preto, em fundo amarelo                                               | `<Logo tone="on-accent" />`     |
| Wordmark amarelo | Monocromático, em fundos escuros e sobre fotos escuras                | `<Logo tone="yellow" />`        |
| Símbolo          | Apoio ao wordmark: selo, favicon, avatar. Nunca o substitui no header | `<BrandSymbol />`               |
| Favicon          | Versão simplificada do símbolo: silhueta única, sem nariz             | `public/favicon.svg`            |
| Redes sociais    | Avatar e imagem de compartilhamento                                   | `brand/`, `public/og-image.png` |

Regras:

- Altura mínima do wordmark: 1,25rem na tela. Área livre em volta: a largura do "I".
- Não distorcer, não aplicar sombra, não trocar as cores acima.
- Na versão clara, a cunha fica preta: amarelo sobre branco tem contraste de só 1,39:1.
- O wordmark parte da fonte Anton (licença OFL), com "I" em cunha e "ZZ" ligado. É uma identidade
  provisória, a ser aprovada pela cliente.

## Cor

Componentes usam tokens semânticos, que mudam conforme o tema da seção
(`.theme-dark`, `.theme-light`, `.theme-accent`).

| Combinação             | Contraste | Uso                       |
| ---------------------- | --------- | ------------------------- |
| Branco sobre preto     | 18,88:1   | Texto                     |
| Amarelo sobre preto    | 13,58:1   | Destaque, botão no acento |
| Preto sobre amarelo    | 13,58:1   | Texto, botão primário     |
| Cinza 400 sobre preto  | 7,49:1    | Texto de apoio (escuro)   |
| Cinza 600 sobre branco | 6,69:1    | Texto de apoio (claro)    |
| Amarelo sobre branco   | 1,39:1    | **Proibido para texto**   |

Proporção por página: preto domina, amarelo marca os momentos de decisão, branco dá respiro.
Vermelho não faz parte da paleta. A cor quente vem das fotografias.

## Tipografia

| Papel                 | Fonte                 | Uso                                            |
| --------------------- | --------------------- | ---------------------------------------------- |
| `.display-xl` a `-sm` | Anton, caixa alta     | Títulos curtos. Tamanho mínimo: `--text-xl`    |
| `.lead`               | Archivo 500           | Abertura de seção, até 34 caracteres por linha |
| `.body-text`          | Archivo 400           | Leitura, até 62 caracteres por linha           |
| `.label`, `<Eyebrow>` | Archivo 800, espaçada | Rótulos e categorias                           |
| `.caption`            | Archivo 400           | Legendas e apoio                               |

A classe define a aparência; a tag define a semântica. Um `<h2>` pode usar `.display-lg`, e cada
página tem um único `<h1>`.

## Espaçamento e hierarquia

- Escala de 4px: `--space-1` a `--space-32`. Não usar valores soltos.
- Entre seções: `--section-space`. Margem lateral: `--gutter`.
- Ordem de um bloco: rótulo → título → texto → ação, com `.stack` (`--stack-sm`, `-md`, `-lg`).
- Um único botão primário por bloco. Ações adicionais são secundárias ou fantasma.
- Alvos de toque com pelo menos 44px (`--tap-target`).

## Botões

`<Button variant size withArrow href? />`. Com `href` vira link. Com `target="_blank"`, recebe
`rel="noopener noreferrer"` automaticamente.

| Estado   | Primário                        | Secundário       | Fantasma       |
| -------- | ------------------------------- | ---------------- | -------------- |
| Hover    | Sobe 2px, com sombra dura       | Inverte as cores | Seta avança    |
| Active   | Volta ao lugar, cor mais escura | Fundo de apoio   | Texto de apoio |
| Focus    | Contorno de 2px na cor de foco  | Igual            | Igual          |
| Disabled | 50% de opacidade                | Igual            | Igual          |

## Cards

`<Card variant media eyebrow title badge footer />`

- `surface`: produtos, com foto. `outline`: informação, sem foto.
- `accent`: chamada, no máximo um por seção.
- Cantos de 2px e hover discreto: borda na cor de marcação e zoom de 3% na foto.
- O `footer` fica sempre na base, para alinhar os botões em uma mesma linha.

## Imagens e molduras

`<MediaFrame variant ratio caption />`, com proporções 1/1, 4/5, 3/4, 3/2 e 16/9.

- `plain`: padrão, para cards e galerias.
- `offset`: bloco deslocado, para a foto de maior destaque da seção.
- `notch`: canto cortado, para variar a composição da galeria.
- `slice`: base diagonal, para fotos que antecedem uma mudança de seção.

Fotos reais, com luz natural e comida em primeiro plano, sem filtros coloridos. Toda imagem de
conteúdo tem `alt` descritivo. Sem fotografia aprovada, não usar banco de imagem como se fosse produto.

## Elementos decorativos

Todos ficam ocultos para leitores de tela e param com `prefers-reduced-motion`.

- `<TapeBand>`: fita de categorias entre seções. No máximo duas por página.
- `<SliceCut>`: corte diagonal entre seções de temas diferentes.
- `<Stamp>`: selo giratório sobre a fotografia. No máximo um por página, com texto factual.
- `<Eyebrow>`: a cunha como marcador de rótulo.

## O que evitar

Vermelho e xadrez de pizzaria, fontes manuscritas, caveiras com dentes ou ossos, cantos muito
arredondados, sombras difusas em excesso e qualquer decoração sem função.
