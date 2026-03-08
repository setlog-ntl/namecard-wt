import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';

export function Footer() {
  return (
    <footer className="print-hide flex items-center justify-center gap-2 text-gray-400 text-xs mt-8 pb-4">
      <a href="https://www.linkmap.biz/sites?utm_source=badge&utm_medium=referral&utm_campaign=digital-namecard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all text-[11px] font-medium" aria-label="Made with Linkmap"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Made with Linkmap</a>
      <LanguageToggle />
      <ThemeToggle />
    </footer>
  );
}