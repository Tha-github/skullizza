import { Logo } from '@/components/brand/Logo';
import { InstagramIcon } from '@/components/ui/icons';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BUSINESS } from '@/data/business';
import { NAV_ITEMS } from '@/data/navigation';
import { WHATSAPP_MESSAGES } from '@/data/whatsappMessages';

import styles from './Header.module.css';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.logoLink} href="#inicio" aria-label="Skullizza, ir para o início">
          <Logo decorative className={styles.logo} height="var(--logo-height)" />
        </a>

        <nav className={styles.nav} aria-label="Principal">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className={styles.navLink} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.instagram}
            href={BUSINESS.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Skullizza (abre em nova aba)"
          >
            <InstagramIcon />
            <span className={styles.instagramLabel}>Instagram</span>
          </a>

          <WhatsAppButton
            message={WHATSAPP_MESSAGES.general}
            label="Pedir pelo WhatsApp"
            className={styles.order}
          >
            <span className={styles.orderShort}>Pedir</span>
            <span className={styles.orderLong}>Pedir pelo WhatsApp</span>
          </WhatsAppButton>

          <MobileMenu className={styles.menu} />
        </div>
      </div>
    </header>
  );
}
