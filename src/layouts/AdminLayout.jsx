import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, BriefcaseBusiness, SlidersHorizontal, LogOut, ExternalLink } from 'lucide-react';
import Brand from '../components/Brand.jsx';
import ThemeLanguage from '../components/ThemeLanguage.jsx';
import { useTranslation } from '../hooks/useTranslation.js';
import { useApp } from '../context/AppContext.jsx';

export default function AdminLayout() {
  const { t } = useTranslation();
  const { logout } = useApp();
  const navigate = useNavigate();

  const exit = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <span className="admin-label">WORKSPACE</span>
        <nav aria-label={t.admin.dashboard}>
          <NavLink end to="/admin"><LayoutDashboard size={18} />{t.admin.dashboard}</NavLink>
          <NavLink to="/admin/projects"><BriefcaseBusiness size={18} />{t.admin.manageProjects}</NavLink>
          <NavLink to="/admin/content"><SlidersHorizontal size={18} />{t.admin.manageContent}</NavLink>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/"><ExternalLink size={17} />{t.nav.home}</Link>
          <button type="button" onClick={exit}><LogOut size={17} />{t.admin.logout}</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="eyebrow">HOWIYA / ADMIN</span>
            <strong>{t.admin.dashboard}</strong>
          </div>
          <ThemeLanguage />
        </header>
        <div className="admin-content"><Outlet /></div>
      </div>
    </div>
  );
}
