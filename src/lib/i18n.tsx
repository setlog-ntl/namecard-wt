'use client';

import { useSyncExternalStore } from 'react';

export type Locale = 'ko' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  ko: { 'contact.call': '전화하기', 'contact.email': '이메일 보내기', 'contact.map': '지도에서 보기', 'contact.website': '웹사이트 방문', 'qr.hint': '명함 공유 QR', 'save.contact': '연락처에 저장', 'theme.light': '라이트 모드로 전환', 'theme.dark': '다크 모드로 전환', 'footer.powered': 'Powered by', 'lang.switchLabel': 'Switch to English', 'lang.toggle': 'EN', 'card.showProfile': '탭하여 앞면 보기', 'card.tapToFlip': '카드를 클릭하여 뒤집기' },
  en: { 'contact.call': 'Call', 'contact.email': 'Send email', 'contact.map': 'View on map', 'contact.website': 'Visit website', 'qr.hint': 'Share QR', 'save.contact': 'Save Contact', 'theme.light': 'Switch to light mode', 'theme.dark': 'Switch to dark mode', 'footer.powered': 'Powered by', 'lang.switchLabel': '한국어로 전환', 'lang.toggle': '한국어', 'card.showProfile': 'Tap to see front', 'card.tapToFlip': 'Click to flip card' },
};

let _locale: Locale = 'ko';
const _listeners = new Set<() => void>();
function subscribe(cb: () => void) { _listeners.add(cb); return () => { _listeners.delete(cb); }; }
function getSnapshot() { return _locale; }
function getServerSnapshot() { return 'ko' as Locale; }

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('locale');
  if (saved === 'ko' || saved === 'en') { _locale = saved; document.documentElement.lang = saved; }
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = (l: Locale) => {
    _locale = l;
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
    _listeners.forEach((cb) => cb());
  };
  const t = (key: string) => translations[locale]?.[key] ?? key;
  return { locale, setLocale, t };
}