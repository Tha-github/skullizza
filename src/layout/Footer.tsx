import { Logo } from '@/components/brand/Logo';
import { BUSINESS } from '@/data/business';
import { FOOTER_NAV_ITEMS } from '@/data/navigation';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';
import { buildMapsUrl } from '@/utils/maps';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

import styles from './Footer.module.css';

export function Footer() {
  const { name, address, contact, legal } = BUSINESS;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-hides-floating-cta>
      <div className={`container ${styles.layout}`}>
        <div className={styles.brand}>
          <Logo height="2.25rem" />
          <p className={styles.tagline}>
            Pizzaria em {address.city}. Pizzas, calzones, massas e focaccias.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className={`label ${styles.heading}`}>Navegação</h2>
          <ul className={styles.list}>
            {FOOTER_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={`label ${styles.heading}`}>Contato</h2>
          <ul className={styles.list}>
            <li>
              <a
                className={styles.link}
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Skullizza (abre em nova aba)"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a className={styles.link} href={`tel:${contact.phoneE164}`}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${contact.instagramHandle} (abre em nova aba)`}
              >
                {contact.instagramHandle}
              </a>
            </li>
            <li>
              <a className={styles.link} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={`label ${styles.heading}`}>Endereço</h2>
          <address className={styles.address}>
            <a
              className={styles.link}
              href={buildMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{address.street}</span>
              <span>
                {address.city} - {address.state}
              </span>
              <span className="visually-hidden"> (no Google Maps, abre em nova aba)</span>
            </a>
          </address>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p suppressHydrationWarning>
          © {year} {legal.companyName ?? name}. Todos os direitos reservados.
        </p>
        {legal.taxId && <p>CNPJ {legal.taxId}</p>}
      </div>
    </footer>
  );
}
