import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Seta em cunha à direita do texto. */
  withArrow?: boolean;
  /** Ícone decorativo à esquerda do texto. */
  icon?: ReactNode;
  children: ReactNode;
}

type AsLink = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AsLink | AsButton;

/** Renderiza `<a>` quando recebe `href`; caso contrário, `<button>`. */
export function Button({
  variant = 'primary',
  size = 'md',
  withArrow,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {withArrow && <span className={styles.arrow} aria-hidden="true" />}
    </>
  );

  if (rest.href !== undefined) {
    const { target, rel, ...anchorProps } = rest as AsLink;
    const safeRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;
    return (
      <a className={classes} target={target} rel={safeRel} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as AsButton;
  return (
    <button className={classes} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
