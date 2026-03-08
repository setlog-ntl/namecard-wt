import { siteConfig } from '@/lib/config';
import { FlippableCard } from '@/components/flippable-card';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main
      id="main"
      data-preset={siteConfig.designPreset}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', background: 'var(--page-bg)', color: 'var(--page-text)', transition: 'background 0.4s, color 0.4s' }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <FlippableCard config={siteConfig} />
        <Footer />
      </div>
    </main>
  );
}