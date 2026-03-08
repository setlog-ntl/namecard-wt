'use client';

import { QRCodeSVG } from 'qrcode.react';
import { generateVCard } from '@/lib/vcard';
import type { SiteConfig } from '@/lib/config';

interface Props { config: SiteConfig; }

export function QrCode({ config }: Props) {
  const vcard = generateVCard({
    name: config.name,
    title: config.title,
    company: config.company,
    email: config.email,
    phone: config.phone,
    address: config.address,
    website: config.website,
  });
  return (
    <QRCodeSVG
      value={vcard}
      size={88}
      level="M"
      bgColor="#ffffff"
      fgColor="#111827"
    />
  );
}