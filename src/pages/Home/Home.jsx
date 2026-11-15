import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading.jsx';
import ProjectCard from '../../components/ProjectCard.jsx';
import ServiceIcon from '../../components/ServiceIcon.jsx';
import { useTranslation } from '../../hooks/useTranslation.js';
import { useApp } from '../../context/AppContext.jsx';

export default function Home() {
  const { t } = useTranslation();
  const { language, siteData } = useApp();
  const isAr = language === 'ar';
  const projects = (siteData.projects || []).filter(project => project.published && project.featured).slice(0, 3);
  const testimonials = (siteData.testimonials || []).filter(item => item.visible);

  return (
    <div className="page-home">
      <section className="hero-section">
        <div className="hero-grid container">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-dot" />{t.hero.eyebrow}</span>
            <h1>{t.hero.title.split('\n').map((line, index) => <span key={index}>{line}{index === 0 ? <em>.</em> : null}</span>)}</h1>
            <p>{t.hero.description}</p>
            <div className="hero-actions">
              <Link to="/projects" className="button-primary">{t.hero.cta}<span>{isAr ? <ArrowUpLeft size={19} /> : <ArrowUpRight size={19} />}</span></Link>
              <Link to="/contact" className="text-link">{t.hero.secondary}<ArrowUpRight size={17} /></Link>
            </div>
            <div className="hero-index">
              <span>01 / 05</span><span className="index-line" /><span>IDENTITY · STRATEGY · DESIGN</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-art-image">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1500&q=90" alt={isAr ? 'مساحة عمل إبداعية' : 'Creative studio workspace'} />
            </div>
            <div className="hero-blue-block"><span>H</span><small>IDEAS INTO IDENTITIES</small></div>
            <div className="hero-stamp">H<br /><span>هُـ</span></div>
            <div className="hero-vertical">HOWIYA VISUAL STUDIO — {new Date().getFullYear()}</div>
          </div>
        </div>
        <a href="#selected-work" className="scroll-cue"><ArrowDown size={15} />{isAr ? 'مرر للاستكشاف' : 'SCROLL TO EXPLORE'}</a>
      </section>

      <section className="intro-strip">
        <div className="container intro-inner">
          <span className="eyebrow">01 — OUR APPROACH</span><p>{t.common.philosophy}</p><span className="intro-symbol">✳</span>
        </div>
      </section>

      <section id="selected-work" className="section container">
        <SectionHeading
          eyebrow="02 — SELECTED WORK"
          title={t.common.featured}
          link={<Link className="underlined-link" to="/projects">{t.common.viewAll}<ArrowUpRight size={16} /></Link>}
        />
        <p className="sample-work-note">{t.common.sampleNote}</p>
        {projects.length > 0
          ? <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
          : <p className="empty-state">{t.admin.empty}</p>}
      </section>

      <section className="services-section">
        <div className="container">
          <SectionHeading eyebrow="03 — EXPERTISE" title={t.common.services} />
          <div className="services-grid">
            {(siteData.services || []).map((service, index) => (
              <article className="service-card" key={service.id}>
                <div className="service-top"><span>0{index + 1}</span><ServiceIcon name={service.icon} /></div>
                <h3>{service.title?.[language] || service.title?.ar}</h3>
                <p>{service.description?.[language] || service.description?.ar}</p>
                <span className="service-rule" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-band">
        <div className="container about-band-inner">
          <div>
            <span className="eyebrow">04 — THE THINKING</span><h2>{t.common.aboutTitle}</h2><p>{t.common.aboutText}</p>
            <Link to="/about" className="underlined-link">{t.nav.about}<ArrowUpRight size={16} /></Link>
          </div>
          <div className="about-band-mark">هُ<br /><span>وِيَة</span></div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="testimonials-section container">
          <SectionHeading eyebrow="05 — KIND WORDS" title={t.common.testimonials} />
          <div className="testimonials-grid">
            {testimonials.map(item => (
              <article className="testimonial-card" key={item.id}>
                <div className="quote-mark">“</div>
                <p>{item.quote?.[language] || item.quote?.ar}</p>
                <div><strong>{item.name}</strong><small>{item.role?.[language] || item.role?.ar}</small></div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="contact-cta">
        <div className="container contact-cta-inner">
          <span className="eyebrow">HAVE A GOOD IDEA?</span><h2>{t.common.contactTitle}</h2><p>{t.common.contactText}</p>
          <Link to="/contact" className="button-light">{t.hero.secondary}<ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
