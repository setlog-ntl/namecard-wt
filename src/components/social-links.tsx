'use client';

import { Linkedin, Instagram, Github, Facebook, Youtube, Globe, type LucideIcon } from 'lucide-react';
import type { SocialItem } from '@/lib/config';

/* X (formerly Twitter) inline SVG icon */
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L1.548 2.25h6.89l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.82 1.55V6.79a4.85 4.85 0 0 1-1.05-.1z" />
    </svg>
  );
}

const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
};

const socialLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'X',
  x: 'X',
  instagram: 'Instagram',
  github: 'GitHub',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

interface Props { socials: SocialItem[]; accentColor: string; }

export function SocialLinks({ socials, accentColor }: Props) {
  if (!socials.length) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
      {socials.map((social, i) => {
        const platform = social.platform.toLowerCase();
        const label = socialLabels[platform] ?? social.platform;
        const isX = platform === 'twitter' || platform === 'x';
        const isTikTok = platform === 'tiktok';
        const Icon = (isX || isTikTok) ? null : (socialIcons[platform] ?? Globe);
        return (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="social-chip"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {isX && <XIcon size={14} />}
            {isTikTok && <TikTokIcon size={14} />}
            {Icon && <Icon size={14} />}
            {label}
          </a>
        );
      })}
    </div>
  );
}