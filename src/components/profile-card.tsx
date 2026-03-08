'use client';

import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; }

function AvatarSvg({ accentColor }: { accentColor: string }) {
  const accentEnd = accentColor + 'aa';
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="avatarGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor={accentEnd} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#avatarGrad)" />
      {/* Body */}
      <ellipse cx="60" cy="108" rx="32" ry="18" fill="#4a5568" />
      {/* Neck */}
      <rect x="52" y="78" width="16" height="10" rx="4" fill="#fcd5b4" />
      {/* Shirt */}
      <path d="M34 108 C34 90 46 82 60 82 C74 82 86 90 86 108" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      {/* Collar */}
      <path d="M50 82 L60 94 L70 82" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="60" cy="52" rx="26" ry="30" fill="#fcd5b4" />
      {/* Hair */}
      <path d="M34 46 C34 28 46 16 60 16 C74 16 86 28 86 46 C86 38 80 24 60 24 C40 24 34 38 34 46Z" fill="#2d3748" />
      <path d="M34 46 C32 52 32 42 34 36" fill="#2d3748" />
      <path d="M86 46 C88 52 88 42 86 36" fill="#2d3748" />
      {/* Eyes */}
      <ellipse cx="48" cy="52" rx="3.5" ry="4" fill="#2d3748" />
      <ellipse cx="72" cy="52" rx="3.5" ry="4" fill="#2d3748" />
      <circle cx="49.5" cy="50.5" r="1.2" fill="#fff" />
      <circle cx="73.5" cy="50.5" r="1.2" fill="#fff" />
      {/* Eyebrows */}
      <path d="M42 44 Q48 40 54 44" fill="none" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
      <path d="M66 44 Q72 40 78 44" fill="none" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <path d="M58 58 Q60 62 62 58" fill="none" stroke="#e8b796" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile */}
      <path d="M50 66 Q60 74 70 66" fill="none" stroke="#c5705d" strokeWidth="2" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="42" cy="62" r="5" fill="#fdb4b4" opacity="0.35" />
      <circle cx="78" cy="62" r="5" fill="#fdb4b4" opacity="0.35" />
      {/* Glasses */}
      <rect x="38" y="46" width="18" height="14" rx="5" fill="none" stroke={accentColor} strokeWidth="2" />
      <rect x="64" y="46" width="18" height="14" rx="5" fill="none" stroke={accentColor} strokeWidth="2" />
      <path d="M56 52 L64 52" stroke={accentColor} strokeWidth="2" />
    </svg>
  );
}

export function ProfileCard({ config }: Props) {
  const { locale } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const nameSecondary = locale === 'ko' && config.nameEn ? config.nameEn : (locale === 'en' && config.name !== name ? config.name : null);
  const title = locale === 'en' && config.titleEn ? config.titleEn : config.title;
  const company = locale === 'en' && config.companyEn ? config.companyEn : config.company;
  return (
    <div className="flex flex-col items-center text-center gap-1 py-8 px-6">
      {/* Avatar */}
      <div
        className="w-22 h-22 rounded-full overflow-hidden mb-3 shadow-md"
        style={{ width: 88, height: 88, flexShrink: 0 }}
        aria-label={name}
      >
        {config.avatarUrl
          ? (<img src={config.avatarUrl} alt={name} width={88} height={88} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)
          : (<AvatarSvg accentColor={config.accentColor} />)
        }
      </div>
      {/* Name */}
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--card-text)' }}>{name}</h1>
      {nameSecondary && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--card-sub)', marginBottom: 4 }}>{nameSecondary}</p>
      )}
      {/* Title */}
      <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: config.accentColor }}>{title}</p>
      {/* Company */}
      {company && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--card-sub)', marginTop: 2 }}>{company}</p>
      )}
    </div>
  );
}