import { BrandSymbol } from '@/components/brand/BrandSymbol';
import { Logo } from '@/components/brand/Logo';
import { SliceCut } from '@/components/decor/SliceCut';
import { Stamp } from '@/components/decor/Stamp';
import { TapeBand } from '@/components/decor/TapeBand';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MediaFrame } from '@/components/ui/MediaFrame';

import styles from './Styleguide.module.css';

const CATEGORIES = ['Pizzas', 'Calzones', 'Massas', 'Focaccias'] as const;
const THEMES = ['dark', 'light', 'accent'] as const;

const SWATCHES = [
  { name: 'Amarelo', value: '#FDD900', dark: false },
  { name: 'Amarelo claro (hover)', value: '#FFE84D', dark: false },
  { name: 'Amarelo escuro (active)', value: '#E0C000', dark: false },
  { name: 'Preto', value: '#111111', dark: true },
  { name: 'Cinza 900', value: '#1C1C1C', dark: true },
  { name: 'Cinza 800', value: '#2A2A2A', dark: true },
  { name: 'Cinza 600', value: '#5C5C5C', dark: true },
  { name: 'Cinza 400', value: '#A3A3A3', dark: false },
  { name: 'Cinza 200', value: '#E5E5E5', dark: false },
  { name: 'Cinza 100', value: '#F5F5F5', dark: false },
  { name: 'Branco', value: '#FFFFFF', dark: false },
];

/** Indica onde entra a fotografia real. Não há fotos de produto no projeto ainda. */
function PhotoSlot() {
  return (
    <div className={styles.photoSlot} role="img" aria-label="Espaço reservado para fotografia">
      <BrandSymbol size="30%" />
    </div>
  );
}

function ButtonRow() {
  return (
    <div className={styles.row}>
      <Button href="#botoes" withArrow>
        Primário
      </Button>
      <Button href="#botoes" variant="secondary">
        Secundário
      </Button>
      <Button href="#botoes" variant="ghost" withArrow>
        Fantasma
      </Button>
      <Button disabled>Desativado</Button>
    </div>
  );
}

export function Styleguide() {
  return (
    <main>
      <header className={`section container stack stack-lg ${styles.intro}`}>
        <Eyebrow>Design system</Eyebrow>
        <h1 className="display-xl">Não é só pizza. É Skullizza.</h1>
        <p className="lead muted">Vitrine de desenvolvimento. Não faz parte do site publicado.</p>
      </header>

      <TapeBand items={CATEGORIES} />

      <section className="section container stack stack-lg">
        <h2 className="display-md">Logotipo</h2>
        <div className={styles.logoGrid}>
          <div className={`theme-dark ${styles.logoCell}`}>
            <Logo tone="on-dark" height="clamp(2.5rem, 8vw, 4.5rem)" />
            <p className="caption">Fundo escuro</p>
          </div>
          <div className={`theme-light ${styles.logoCell}`}>
            <Logo tone="on-light" height="clamp(2.5rem, 8vw, 4.5rem)" />
            <p className="caption">Fundo claro</p>
          </div>
          <div className={`theme-accent ${styles.logoCell}`}>
            <Logo tone="on-accent" height="clamp(2.5rem, 8vw, 4.5rem)" />
            <p className="caption">Fundo amarelo</p>
          </div>
          <div className={`theme-dark ${styles.logoCell}`}>
            <div className={styles.row}>
              <Logo tone="yellow" height="2rem" />
              <Logo tone="on-dark" height="1.25rem" />
            </div>
            <p className="caption">Monocromático e tamanho mínimo (1,25rem de altura)</p>
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.symbolDark}>
            <BrandSymbol size="6rem" />
          </span>
          <span className={styles.symbolAccent}>
            <BrandSymbol size="6rem" />
          </span>
          <img src="/favicon.svg" alt="Favicon em 48 pixels" width="48" height="48" />
          <img src="/favicon.svg" alt="Favicon em 32 pixels" width="32" height="32" />
          <img src="/favicon.svg" alt="Favicon em 16 pixels" width="16" height="16" />
          <Stamp text="Skullizza · Curitiba · Skullizza · Curitiba · " />
        </div>
      </section>

      <SliceCut from="dark" to="light" />
      <section className="theme-light section">
        <div className="container stack stack-lg">
          <h2 className="display-md">Cores</h2>
          <ul className={styles.swatches}>
            {SWATCHES.map((swatch) => (
              <li
                key={swatch.value}
                className={styles.swatch}
                style={{
                  background: swatch.value,
                  color: swatch.dark ? '#ffffff' : '#111111',
                }}
              >
                <strong>{swatch.name}</strong>
                <span>{swatch.value}</span>
              </li>
            ))}
          </ul>

          <h2 className="display-md">Tipografia</h2>
          <div className="stack">
            <p className="display-xl">Display XL</p>
            <p className="display-lg">Não é só pizza</p>
            <p className="display-md">Calzones, massas e focaccias</p>
            <p className="display-sm">Título de bloco com acentuação: ÇÃÉÕ</p>
            <p className="lead">Texto de abertura em Archivo, para apresentar uma seção.</p>
            <p className="body-text">
              Texto corrido em Archivo, com largura limitada para uma leitura confortável. Um{' '}
              <a className="link" href="#botoes">
                link em texto corrido
              </a>{' '}
              usa o sublinhado da cor de marcação do tema.
            </p>
            <p className="label">Rótulo em caixa alta</p>
            <p className="caption">Legenda e informação de apoio</p>
          </div>
        </div>
      </section>
      <SliceCut from="light" to="dark" direction="fall" />

      <section id="botoes" className="section container stack stack-lg">
        <h2 className="display-md">Botões</h2>
      </section>
      {THEMES.map((theme) => (
        <div key={theme} className={`theme-${theme} ${styles.themeBlock}`}>
          <div className="container stack">
            <Eyebrow>Tema {theme}</Eyebrow>
            <ButtonRow />
            <Button href="#botoes" size="lg" withArrow>
              Pedir pelo WhatsApp
            </Button>
          </div>
        </div>
      ))}

      <section className="section container stack stack-lg">
        <h2 className="display-md">Cards</h2>
        <p className="body-text muted">
          O conteúdo abaixo é apenas demonstração de layout, não é um produto da Skullizza.
        </p>
        <div className={styles.cardGrid}>
          <Card
            eyebrow="Categoria"
            title="Nome do produto"
            badge="Destaque"
            media={
              <MediaFrame ratio="3/2">
                <PhotoSlot />
              </MediaFrame>
            }
            footer={
              <Button href="#botoes" withArrow>
                Pedir
              </Button>
            }
          >
            Descrição curta do produto em uma ou duas linhas.
          </Card>
          <Card variant="outline" eyebrow="Contorno" title="Card de informação">
            Sem mídia, para atributos e diferenciais da marca.
          </Card>
          <Card
            variant="accent"
            eyebrow="Acento"
            title="Card de chamada"
            footer={
              <Button href="#botoes" withArrow>
                Quero conhecer
              </Button>
            }
          >
            Reservado a um único destaque por seção.
          </Card>
        </div>

        <h2 className="display-md">Molduras</h2>
        <div className={styles.frameGrid}>
          <MediaFrame caption="Simples">
            <PhotoSlot />
          </MediaFrame>
          <MediaFrame variant="offset" caption="Bloco deslocado">
            <PhotoSlot />
          </MediaFrame>
          <MediaFrame variant="notch" caption="Canto cortado">
            <PhotoSlot />
          </MediaFrame>
          <MediaFrame variant="slice" caption="Base em diagonal">
            <PhotoSlot />
          </MediaFrame>
        </div>
      </section>

      <TapeBand items={CATEGORIES} tone="dark" animated={false} />
      <SliceCut from="dark" to="accent" />
      <section className="theme-accent section">
        <div className="container stack stack-lg">
          <Eyebrow>Hierarquia</Eyebrow>
          <h2 className="display-lg">Uma massa com personalidade.</h2>
          <p className="lead">Rótulo, título, texto e ação: um único CTA primário por bloco.</p>
          <Button href="#botoes" size="lg" withArrow>
            Quero conhecer
          </Button>
        </div>
      </section>
    </main>
  );
}
