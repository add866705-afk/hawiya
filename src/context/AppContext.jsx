import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialProjects, initialServices, initialTestimonials, profileDefaults } from '../data/seed.js';
import {
  readStorageValue,
  readStore,
  removeStorageValue,
  writeStorageValue,
  writeStore,
} from '../services/storage.js';

const AppContext = createContext(null);
const STORAGE_KEY = 'howiya-site-data-v1';
const PASSWORD_KEY = 'howiya-demo-password';
const DEFAULT_SETTINGS = {
  siteName: 'HOWIYA',
  seoTitle: 'HOWIYA | هُوية',
  seoDescription: 'استوديو متخصص في بناء الهويات البصرية والعلامات التجارية.',
  defaultLanguage: 'ar',
  accentColor: '#214aa4',
  secondaryColor: '#142d65',
  logoUrl: '',
};

const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const localized = (value, fallback) => ({ ...fallback, ...(isObject(value) ? value : {}) });

function removeUnverifiedSampleContent(data) {
  const testimonials = (Array.isArray(data.testimonials) ? data.testimonials : initialTestimonials)
    .filter(item => !(
      (item.id === 't1' && item.name === 'أحمد محمد') ||
      (item.id === 't2' && item.name === 'سارة علي')
    ));

  const projects = (Array.isArray(data.projects) ? data.projects : initialProjects).map(project => {
    const knownSampleClients = {
      p1: 'رواسي للتطوير العقاري',
      p2: 'بُن للقهوة المختصة',
      p3: 'نواة',
      p4: 'مدار',
      p5: 'سُفرة',
    };
    if (knownSampleClients[project.id] && project.client?.ar === knownSampleClients[project.id]) {
      return { ...project, client: { ar: 'مشروع مفاهيمي', en: 'Concept project' } };
    }
    return project;
  });

  return { projects, testimonials };
}

function normalizeSiteData(saved) {
  const data = isObject(saved) ? saved : {};
  const profile = isObject(data.profile) ? data.profile : {};
  const socials = {
    ...profileDefaults.socials,
    ...(isObject(profile.socials) ? profile.socials : {}),
  };

  if (socials.whatsapp === '967700000000') socials.whatsapp = '';
  if (socials.email === 'hello@howiya.design') socials.email = '';
  if (socials.instagram === 'https://instagram.com/') socials.instagram = '';
  if (socials.facebook === 'https://facebook.com/') socials.facebook = '';

  const image = profile.image === 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85'
    ? ''
    : (typeof profile.image === 'string' ? profile.image : profileDefaults.image);

  const rawExperience = Array.isArray(profile.experience) ? profile.experience : profileDefaults.experience;
  const rawAchievements = Array.isArray(profile.achievements) ? profile.achievements : profileDefaults.achievements;
  const experience = rawExperience.filter(item => ![
    'تصميم هويات بصرية لعلامات ناشئة ومتوسطة',
    'تطوير أنظمة تصميم للاستخدام الرقمي والمطبوع',
  ].includes(item?.ar));
  const achievements = rawAchievements.filter(item => ![
    '5 مشاريع هوية ضمن معرض الأعمال',
    'منهجية عمل تبدأ بالبحث وتنتهي بدليل استخدام',
  ].includes(item?.ar));
  const cleaned = removeUnverifiedSampleContent(data);

  return {
    projects: cleaned.projects,
    services: Array.isArray(data.services) ? data.services : initialServices,
    testimonials: cleaned.testimonials,
    messages: Array.isArray(data.messages) ? data.messages : [],
    profile: {
      ...profileDefaults,
      ...profile,
      name: localized(profile.name, profileDefaults.name),
      role: localized(profile.role, profileDefaults.role),
      bio: localized(profile.bio, profileDefaults.bio),
      socials,
      skills: Array.isArray(profile.skills) ? profile.skills : profileDefaults.skills,
      tools: Array.isArray(profile.tools) ? profile.tools : profileDefaults.tools,
      experience,
      achievements,
      image,
    },
    settings: {
      ...DEFAULT_SETTINGS,
      ...(isObject(data.settings) ? data.settings : {}),
    },
  };
}

function getInitialLanguage() {
  return readStorageValue('howiya-language', 'ar') === 'en' ? 'en' : 'ar';
}

function getInitialTheme() {
  return readStorageValue('howiya-theme', 'light') === 'dark' ? 'dark' : 'light';
}

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [theme, setTheme] = useState(getInitialTheme);
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => readStorageValue('howiya-demo-session', '', 'session') === 'active'
  );
  const [demoPassword, setDemoPassword] = useState(
    () => readStorageValue(PASSWORD_KEY, 'HowiyaDemo2026!')
  );
  const [siteData, setSiteData] = useState(() => normalizeSiteData(readStore(STORAGE_KEY, null)));

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    writeStorageValue('howiya-language', language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorageValue('howiya-theme', theme);
  }, [theme]);

  useEffect(() => {
    writeStore(STORAGE_KEY, siteData);
    if (siteData.settings?.seoTitle) document.title = siteData.settings.seoTitle;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    if (siteData.settings?.seoDescription) {
      description.setAttribute('content', siteData.settings.seoDescription);
    }
    if (siteData.settings?.accentColor) {
      document.documentElement.style.setProperty('--blue', siteData.settings.accentColor);
    }
    if (siteData.settings?.secondaryColor) {
      document.documentElement.style.setProperty('--blue-dark', siteData.settings.secondaryColor);
    }
  }, [siteData]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    theme,
    setTheme,
    adminAuthenticated,
    siteData,
    setSiteData,
    loginDemo(email, password) {
      if (email === 'admin@howiya.local' && password === demoPassword) {
        writeStorageValue('howiya-demo-session', 'active', 'session');
        setAdminAuthenticated(true);
        return true;
      }
      return false;
    },
    changeDemoPassword(currentPassword, nextPassword) {
      if (currentPassword !== demoPassword || typeof nextPassword !== 'string' || nextPassword.length < 10) {
        return false;
      }
      writeStorageValue(PASSWORD_KEY, nextPassword);
      setDemoPassword(nextPassword);
      removeStorageValue('howiya-demo-session', 'session');
      setAdminAuthenticated(false);
      return true;
    },
    logout() {
      removeStorageValue('howiya-demo-session', 'session');
      setAdminAuthenticated(false);
    },
    updateCollection(key, collection) {
      setSiteData(current => ({ ...current, [key]: collection }));
    },
  }), [language, theme, adminAuthenticated, siteData, demoPassword]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
