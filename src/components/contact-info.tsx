'use client';

import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; accentColor?: string; }

export function ContactInfo({ config, accentColor }: Props) {
  const { t, locale } = useLocale();
  const address = locale === 'en' && config.addressEn ? config.addressEn : config.address;
  const accent = accentColor || config.accentColor;
  const items = [
    config.email ? { icon: Mail, label: config.email, href: `mailto:${config.email}`, isExternal: false, ariaLabel: t('contact.email') } : null,
    config.phone ? { icon: Phone, label: config.phone, href: `tel:${config.phone.replace(/[^+\d]/g, '')}`, isExternal: false, ariaLabel: t('contact.call') } : null,
    address ? { icon: MapPin, label: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}`, isExternal: true, ariaLabel: t('contact.map') } : null,
    config.website ? { icon: Globe, label: config.website.replace(/^https?:\/\//, ''), href: config.website, isExternal: true, ariaLabel: t('contact.website') } : null,
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; href: string; isExternal: boolean; ariaLabel: string }>;
  if (items.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          aria-label={item.ariaLabel}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5, color: 'var(--card-text)', textDecoration: 'none' }}
        >
          <item.icon
            size={18}
            style={{ flexShrink: 0, color: accent, marginTop: 2 }}
            aria-hidden="true"
          />
          <span style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>{item.label}</span>
        </a>
      ))}
    </div>
  );
}