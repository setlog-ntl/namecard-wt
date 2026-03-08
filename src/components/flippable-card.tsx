'use client';

import { useState, useEffect, useRef } from 'react';
import type { SiteConfig } from '@/lib/config';
import { ProfileCard } from '@/components/profile-card';
import { ContactInfo } from '@/components/contact-info';
import { SocialLinks } from '@/components/social-links';
import { QrCode } from '@/components/qr-code';
import { SaveContactButton } from '@/components/save-contact-button';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; }

export function FlippableCard({ config }: Props) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLocale();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  /* Sync back face min-height to front face height */
  useEffect(() => {
    function sync() {
      if (frontRef.current && backRef.current) {
        backRef.current.style.minHeight = frontRef.current.offsetHeight + 'px';
      }
    }
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const accentGradient = `linear-gradient(90deg, ${config.accentColor}, ${config.accentColor}aa, ${config.accentColor})`;

  return (
    <div style={{ width: '100%' }}>
      {/* Flip hint */}
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--card-sub)', marginBottom: 12, userSelect: 'none', animation: 'pulse-hint 2s ease-in-out infinite' }}>
        {flipped ? t('card.showProfile') : t('card.tapToFlip')}
      </p>

      <div
        className={`card-flip-container${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? t('card.showProfile') : t('card.tapToFlip')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((v) => !v); } }}
        data-preset={config.designPreset}
      >
        <div className="card-flip-inner">

          {/* ── FRONT: Profile ── */}
          <div className="card-flip-front print-card" ref={frontRef}>
            {/* Shimmer accent bar */}
            <div
              className="accent-shimmer"
              style={{ background: accentGradient }}
            />
            {/* Profile section */}
            <ProfileCard config={config} />
          </div>

          {/* ── BACK: Contact + Social + QR ── */}
          <div className="card-flip-back" ref={backRef}>
            {/* Shimmer accent bar */}
            <div
              className="accent-shimmer"
              style={{ background: accentGradient }}
            />
            <div className="card-back-body" style={{ padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem', color: 'var(--card-text)' }}>
              {/* Contact section */}
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: config.accentColor, marginBottom: 2 }}>Contact</p>
              <ContactInfo config={config} accentColor={config.accentColor} />

              {/* Social section */}
              {config.socials.length > 0 && (
                <>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: config.accentColor, marginTop: 4, marginBottom: 2 }}>Social</p>
                  <SocialLinks socials={config.socials} accentColor={config.accentColor} />
                </>
              )}

              {/* QR Code */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <div className="qr-box">
                  <QrCode config={config} />
                </div>
                <span style={{ fontSize: '0.625rem', color: 'var(--card-sub)', letterSpacing: '0.04em' }}>{t('qr.hint')}</span>
              </div>

              {/* Save Contact */}
              <div onClick={(e) => e.stopPropagation()}>
                <SaveContactButton config={config} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}