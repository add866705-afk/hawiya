import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Instagram, Facebook, Menu, X } from 'lucide-react';
import Brand from '../components/Brand.jsx';
import ThemeLanguage from '../components/ThemeLanguage.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { useTranslation } from '../hooks/useTranslation.js';
import { useApp } from '../context/AppContext.jsx';

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

export default function SiteLayout() {
  const { t, language } = useTranslation();
  const { siteData } = useApp();
  const [open, setOpen] = useState(false);
  const links = [['/', t.nav.home], ['/about', t.nav.about], ['/projects', t.nav.projects], ['/contact', t.nav.contact]];
  const instagram = safeExternalUrl(siteData.profile?.socials?.instagram);
  const facebook = safeExternalUrl(siteData.profile?.socials?.facebook);

  return (
    <>
      <ScrollToTop />
      <button className="skip-link" type="button" onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}>{language === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}</button>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <nav id="primary-navigation" aria-label={t.nav.home} className={open ? 'main-nav nav-open' : 'main-nav'}>
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
          </nav>
          <div className="nav-tools">
            <ThemeLanguage />
            <Link to="/contact" className="nav-cta">{t.hero.secondary}<ArrowUpRight size={16} /></Link>
            <button
              type="button"
              className="mobile-menu icon-button"
              onClick={() => setOpen(value => !value)}
              aria-label={open ? (t.nav.closeMenu || 'Close menu') : (t.nav.openMenu || 'Open menu')}
              aria-expanded={open}
              aria-controls="primary-navigation"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand />
          <p>{t.common.philosophy}</p>
          <Link className="footer-contact" to="/contact">{t.hero.secondary}<ArrowUpRight size={17} /></Link>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} HOWIYA. {t.footer.rights}</span>
          {(instagram || facebook) && (
            <span className="footer-social">
              {instagram && <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>}
              {facebook && <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={17} /></a>}
            </span>
          )}
          <span>{t.footer.made}</span>
        </div>
      </footer>
    </>
  );
}
