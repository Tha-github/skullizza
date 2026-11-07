import type { AnchorHTMLAttributes } from 'react';

import { Button, type ButtonBaseProps } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/icons';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

type AnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel' | 'aria-label' | 'children'
>;

interface WhatsAppButtonProps extends AnchorProps, Omit<ButtonBaseProps, 'icon'> {
  /** Mensagem já preenchida na conversa, conforme a origem do clique. */
  message: string;
  /** Nome acessível, sem o aviso de nova aba: ele é acrescentado aqui. */
  label: string;
}

/** Botão de pedido: sempre com o ícone, em nova aba e com a mensagem codificada. */
export function WhatsAppButton({ message, label, ...buttonProps }: WhatsAppButtonProps) {
  return (
    <Button
      {...buttonProps}
      href={buildWhatsAppUrl(message)}
      target="_blank"
      icon={<WhatsAppIcon />}
      aria-label={`${label} (abre em nova aba)`}
    />
  );
}
