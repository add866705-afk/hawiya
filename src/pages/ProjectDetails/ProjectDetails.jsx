import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useTranslation } from '../../hooks/useTranslation.js';
import ProjectCard from '../../components/ProjectCard.jsx';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { siteData, language } = useApp();
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(-1);
  const project = (siteData.projects || []).find(item => item.slug === slug && item.published);
  const gallery = Array.isArray(project?.gallery) ? project.gallery : [];
  const galleryLength = gallery.length;
  const value = entry => entry?.[language] || entry?.ar || entry || '';
  const related = project
    ? siteData.projects.filter(item => item.published && item.id !== project.id && item.category === project.category).slice(0, 2)
    : [];

  useEffect(() => {
    if (lightbox < 0 || galleryLength === 0) return undefined;

    const closeOrMove = event => {
      if (event.key === 'Escape') setLightbox(-1);
      if (event.key === 'ArrowRight') setLightbox(index => (index + 1) % galleryLength);
      if (event.key === 'ArrowLeft') setLightbox(index => (index - 1 + galleryLength) % galleryLength);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOrMove);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOrMove);
    };
  }, [lightbox, galleryLength]);

  if (!project) return <Navigate to="/404" replace />;

  const move = step => setLightbox(index => (index + step + galleryLength) % galleryLength);
  const fallbackImage = event => {
    if (event.currentTarget.dataset.fallback) return;
    event.currentTarget.dataset.fallback = 'true';
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="project-detail container">
      <div className="detail-breadcrumb">
        <Link to="/projects">{t.nav.projects}</Link><span>/</span><span>{value(project.title)}</span>
      </div>

      <div className="detail-hero">
        <div>
          <span className="eyebrow">{(project.tags || []).join(' / ')}</span>
          <h1>{value(project.title)}<span className="title-period">.</span></h1>
          <p>{value(project.short)}</p>
        </div>
        <div className="detail-facts">
          <span>{t.common.client}<strong>{value(project.client)}</strong></span>
          <span>{t.common.year}<strong>{project.year}</strong></span>
        </div>
      </div>

      <div className="detail-cover">
        <img src={project.cover || FALLBACK_IMAGE} alt={value(project.title)} onError={fallbackImage} />
      </div>

      <div className="detail-story">
        <div className="story-intro"><span className="eyebrow">{t.common.overview}</span><h2>{value(project.description)}</h2></div>
        <div className="story-columns">
          {[
            ['challenge', t.common.challenge],
            ['strategy', t.common.strategy],
            ['solution', t.common.solution],
          ].map(([key, label]) => (
            <article key={key}><span className="eyebrow">{label}</span><p>{value(project[key])}</p></article>
          ))}
        </div>
      </div>

      {Array.isArray(project.palette) && project.palette.length > 0 && (
        <section className="detail-palette">
          <h3>{t.common.palette}</h3>
          <div className="palette-swatches">
            {project.palette.map(color => <div key={color} style={{ background: color }}><span>{color}</span></div>)}
          </div>
        </section>
      )}

      {galleryLength > 0 && (
        <section className="detail-gallery">
          <div className="detail-gallery-head"><span className="eyebrow">VISUAL EXPLORATION</span><h2>{t.common.gallery}</h2></div>
          <div className="gallery-grid">
            {gallery.map((src, index) => (
              <button
                type="button"
                className={index === 0 ? 'gallery-item gallery-wide' : 'gallery-item'}
                key={src + index}
                onClick={() => setLightbox(index)}
                aria-label={language === 'ar' ? `عرض الصورة ${index + 1}` : `View image ${index + 1}`}
              >
                <img src={src} alt={`${value(project.title)} — ${index + 1}`} loading="lazy" decoding="async" onError={fallbackImage} />
              </button>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="related-section">
          <h2>{t.common.related}</h2>
          <div className="projects-grid">{related.map((item, index) => <ProjectCard key={item.id} project={item} index={index} />)}</div>
        </section>
      )}

      {lightbox >= 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.common.gallery} onClick={() => setLightbox(-1)}>
          <button type="button" className="lightbox-close" onClick={() => setLightbox(-1)} aria-label={language === 'ar' ? 'إغلاق' : 'Close'}><X /></button>
          {galleryLength > 1 && <>
            <button type="button" className="lightbox-prev" onClick={event => { event.stopPropagation(); move(-1); }} aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}><ChevronRight /></button>
            <button type="button" className="lightbox-next" onClick={event => { event.stopPropagation(); move(1); }} aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}><ChevronLeft /></button>
          </>}
          <img src={gallery[lightbox]} alt={`${value(project.title)} — ${lightbox + 1}`} onClick={event => event.stopPropagation()} onError={fallbackImage} />
          <span>{lightbox + 1} / {galleryLength}</span>
        </div>
      )}

      <div className="detail-next"><Link to="/contact">{t.common.contactTitle}<ArrowUpRight /></Link></div>
    </div>
  );
}
