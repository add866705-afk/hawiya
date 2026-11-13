import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialProjects, initialServices, initialTestimonials, profileDefaults } from '../data/seed.js';
import { readStore, writeStore } from '../services/storage.js';
const AppContext = createContext(null);
const STORAGE_KEY = 'howiya-site-data-v1';

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('howiya-language') || 'ar');
  const [theme, setTheme] = useState(() => localStorage.getItem('howiya-theme') || 'light');
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => sessionStorage.getItem('howiya-demo-session') === 'active');
  const [siteData, setSiteData] = useState(() => readStore(STORAGE_KEY, {
    projects: initialProjects, services: initialServices, testimonials: initialTestimonials,
    profile: profileDefaults, messages: [],
    settings: { siteName: 'HOWIYA', seoTitle: 'HOWIYA | هُوية', seoDescription: 'استوديو متخصص في بناء الهويات البصرية.' }
  }));

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('howiya-language', language);
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('howiya-theme', theme);
  }, [theme]);
  useEffect(() => { writeStore(STORAGE_KEY, siteData); }, [siteData]);

  const value = useMemo(() => ({
    language, setLanguage, theme, setTheme, adminAuthenticated, siteData, setSiteData,
    loginDemo(email, password) {
      if (email === 'admin@howiya.local' && password === 'HowiyaDemo2026!') {
        sessionStorage.setItem('howiya-demo-session', 'active'); setAdminAuthenticated(true); return true;
      }
      return false;
    },
    logout() { sessionStorage.removeItem('howiya-demo-session'); setAdminAuthenticated(false); },
    updateCollection(key, value) { setSiteData(current => ({ ...current, [key]: value })); }
  }), [language, theme, adminAuthenticated, siteData]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}