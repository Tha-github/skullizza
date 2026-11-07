import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BUSINESS } from '@/data/business';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';
import { buildMapsUrl } from '@/utils/maps';

import styles from './Location.module.css';

export function Location() {
  const { address, contact, hours } = BUSINESS;

  return (
    <section id="localizacao" className="section" aria-labelledby="localizacao-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <Eyebrow>Localização e contato</Eyebrow>
          <h2 id="localizacao-title" className="display-lg">
            Skullizza em {address.city}.
          </h2>
          <p className={styles.text}>
            Pizzas, calzones e massas em {address.city}, com pedido direto pelo WhatsApp.
          </p>
        </div>

        <address className={`theme-light ${styles.addressCard}`}>
          <p className={styles.addressLine}>{address.street}</p>
          <p className={styles.addressCity}>
            {address.city} - {address.state}
          </p>
          <Button
            href={buildMapsUrl()}
            target="_blank"
            size="lg"
            withArrow
            className={styles.mapsCta}
            aria-label={`Abrir no Google Maps: ${address.street}, ${address.city} (abre em nova aba)`}
          >
            Abrir no Google Maps
          </Button>
        </address>

        <dl className={styles.details}>
          <div className={styles.row}>
            <dt className={`label ${styles.term}`}>WhatsApp</dt>
            <dd>
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.general}
                label="Chamar no WhatsApp"
                variant="secondary"
              >
                Chamar no WhatsApp
              </WhatsAppButton>
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={`label ${styles.term}`}>Telefone</dt>
            <dd>
              <a className={styles.value} href={`tel:${contact.phoneE164}`}>
                {contact.phoneDisplay}
              </a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={`label ${styles.term}`}>E-mail</dt>
            <dd>
              <a className={styles.value} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={`label ${styles.term}`}>Instagram</dt>
            <dd>
              <a
                className={styles.value}
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${contact.instagramHandle} (abre em nova aba)`}
              >
                {contact.instagramHandle}
              </a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={`label ${styles.term}`}>Horário</dt>
            <dd>
              <span className={styles.hours}>{hours.label}</span>
              {!hours.confirmed && <span className={styles.pending}>Horário a confirmar</span>}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
