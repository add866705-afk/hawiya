import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { useTranslation } from '../../hooks/useTranslation.js';
import ProjectCard from '../../components/ProjectCard.jsx';

const categories = ['all', 'property', 'coffee', 'ecommerce', 'tech', 'food'];

export default function Projects() {
  const { siteData } = useApp();
  const { language, t } = useTranslation();
  const [active, setActive] = useState('all');
  const filtered = useMemo(
    () => (siteData.projects || []).filter(project => project.published && (active === 'all' || project.category === active)),
    [siteData.projects, active]
  );
  const labels = {
    all: t.common.all,
    property: language === 'ar' ? 'عقارات' : 'Real Estate',
    coffee: language === 'ar' ? 'قهوة' : 'Coffee',
    ecommerce: language === 'ar' ? 'تجارة' : 'E-commerce',
    tech: language === 'ar' ? 'تقنية' : 'Technology',
    food: language === 'ar' ? 'أغذية ومطاعم' : 'Food',
  };

  return (
    <div className="inner-page container">
      <div className="page-intro">
        <span className="eyebrow">PORTFOLIO / SELECTED WORK</span>
        <h1>{t.nav.projects}<span className="title-period">.</span></h1>
        <p>{language === 'ar'
          ? 'مجموعة من المشاريع التجريبية التي توضح كيف تتحول الاستراتيجية إلى أنظمة بصرية ذات معنى. استبدلها بأعمالك الحقيقية قبل الإطلاق.'
          : 'A collection of concept projects showing how strategy becomes a meaningful visual system. Replace them with your real work before launch.'}</p>
      </div>
      <div className="filter-row" role="group" aria-label={language === 'ar' ? 'تصنيفات المشاريع' : 'Project categories'}>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={active === category ? 'filter-chip active' : 'filter-chip'}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {labels[category]}
          </button>
        ))}
      </div>
      <div className="projects-grid projects-page-grid">
        {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
      {filtered.length === 0 && <p className="empty-state">{t.admin.empty}</p>}
    </div>
  );
}
