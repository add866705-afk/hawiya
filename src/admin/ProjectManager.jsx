import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useTranslation } from '../hooks/useTranslation.js';

const makeId = () => globalThis.crypto?.randomUUID?.() || String(Date.now());
const isHttpUrl = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};
const slugify = value => String(value || '')
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const blank = () => ({
  id: makeId(),
  slug: '',
  category: 'property',
  year: String(new Date().getFullYear()),
  featured: false,
  published: false,
  title: { ar: '', en: '' },
  short: { ar: '', en: '' },
  description: { ar: '', en: '' },
  client: { ar: 'مشروع مفاهيمي', en: 'Concept project' },
  challenge: { ar: '', en: '' },
  strategy: { ar: '', en: '' },
  solution: { ar: '', en: '' },
  cover: '',
  gallery: [],
  palette: ['#173B91', '#222936', '#F5F6F8'],
  tags: [],
});

export default function ProjectManager() {
  const { siteData, setSiteData } = useApp();
  const { t, language } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState('');
  const ar = language === 'ar';
  const label = (arabic, english) => ar ? arabic : english;
  const value = entry => entry?.[language] || entry?.ar || '';

  const start = project => {
    setEditing(project ? JSON.parse(JSON.stringify(project)) : blank());
    setPreview(false);
    setNotice('');
  };
  const update = (key, nextValue) => setEditing(current => ({ ...current, [key]: nextValue }));
  const localized = (key, lang, nextValue) => setEditing(current => ({
    ...current,
    [key]: { ...(current[key] || { ar: '', en: '' }), [lang]: nextValue },
  }));

  const save = event => {
    event.preventDefault();
    const slug = editing.slug.trim() || slugify(editing.title.en || editing.title.ar);
    if (!editing.title.ar.trim() || !slug) {
      setNotice(label('أدخل العنوان العربي والاسم المختصر للرابط.', 'Add an Arabic title and a valid URL slug.'));
      return;
    }
    if (!isHttpUrl(editing.cover.trim())) {
      setNotice(label('أدخل رابط صورة غلاف صحيحًا يبدأ بـ http أو https.', 'Enter a valid cover image URL beginning with http or https.'));
      return;
    }
    if ((siteData.projects || []).some(project => project.id !== editing.id && project.slug === slug)) {
      setNotice(label('هذا الرابط مستخدم في مشروع آخر. اختر رابطًا مختلفًا.', 'That slug is already used by another project.'));
      return;
    }
    const gallery = (editing.gallery || []).map(item => item.trim()).filter(Boolean);
    if (gallery.some(item => !isHttpUrl(item))) {
      setNotice(label('تأكد أن جميع روابط صور المعرض تبدأ بـ http أو https.', 'Every gallery image must use a valid http or https URL.'));
      return;
    }
    const palette = (editing.palette || []).filter(color => /^#[0-9a-f]{6}$/i.test(color));
    if (palette.length === 0) {
      setNotice(label('أضف لونًا واحدًا صحيحًا على الأقل بصيغة #RRGGBB.', 'Add at least one valid #RRGGBB color.'));
      return;
    }

    const nextProject = { ...editing, slug, gallery, palette };
    const exists = (siteData.projects || []).some(project => project.id === editing.id);
    setSiteData(current => ({
      ...current,
      projects: exists
        ? current.projects.map(project => project.id === editing.id ? nextProject : project)
        : [nextProject, ...(current.projects || [])],
    }));
    setEditing(null);
    setPreview(false);
    setNotice(t.admin.saved);
  };

  const remove = id => {
    if (!window.confirm(t.admin.confirmDelete)) return;
    setSiteData(current => ({ ...current, projects: current.projects.filter(project => project.id !== id) }));
  };

  return (
    <div className="manager-page">
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">PORTFOLIO / CMS</span>
          <h1>{t.admin.manageProjects}</h1>
          <p>{siteData.projects.length} {t.admin.projects}</p>
        </div>
        <button type="button" className="button-primary" onClick={() => start()}><Plus size={18} />{t.admin.add}</button>
      </div>
      {notice && !editing && <p className="success-message" role="status">{notice}</p>}
      <div className="admin-panel">
        <div className="admin-project-list">
          {siteData.projects.map(project => (
            <div className="admin-project-row" key={project.id}>
              <img src={project.cover} alt={project.title?.ar || ''} loading="lazy" />
              <div><strong>{project.title?.[language] || project.title?.ar}</strong><small>{project.slug} · {project.year}</small></div>
              <span className={project.published ? 'status-published' : 'status-draft'}>
                {project.published ? (ar ? 'منشور' : 'Published') : (ar ? 'مسودة' : 'Draft')}
              </span>
              <div className="row-actions">
                <button type="button" onClick={() => start(project)} aria-label={t.admin.edit}><Pencil size={17} /></button>
                <button type="button" onClick={() => remove(project.id)} aria-label={t.admin.delete}><Trash2 size={17} /></button>
              </div>
            </div>
          ))}
          {siteData.projects.length === 0 && <p className="empty-state">{t.admin.empty}</p>}
        </div>
      </div>

      {editing && (
        <div className="editor-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setEditing(null); }}>
          <form className="editor-panel" onSubmit={save}>
            <div className="editor-head">
              <h2>{editing.title.ar || t.admin.add}</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close"><X /></button>
            </div>
            {notice && <p className="field-error" role="alert">{notice}</p>}
            <div className="editor-grid">
              <label>Slug<input value={editing.slug} onChange={event => update('slug', event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="my-project" /></label>
              <label>{label('التصنيف', 'Category')}<select value={editing.category} onChange={event => update('category', event.target.value)}>{['property', 'coffee', 'ecommerce', 'tech', 'food'].map(category => <option key={category} value={category}>{category}</option>)}</select></label>
              <label>{t.admin.title} — عربي<input required value={editing.title.ar} onChange={event => localized('title', 'ar', event.target.value)} /></label>
              <label>{t.admin.title} — English<input value={editing.title.en} onChange={event => localized('title', 'en', event.target.value)} /></label>
              <label>{label('ملخص المشروع بالعربية', 'Short description (Arabic)')}<textarea rows="3" value={editing.short.ar} onChange={event => localized('short', 'ar', event.target.value)} /></label>
              <label>{label('ملخص المشروع بالإنجليزية', 'Short description (English)')}<textarea rows="3" value={editing.short.en} onChange={event => localized('short', 'en', event.target.value)} /></label>
              <label className="full-field">{label('صورة الغلاف (رابط مباشر)', 'Cover image URL')}<input required type="url" value={editing.cover} onChange={event => update('cover', event.target.value)} /></label>
              <label>{t.common.year}<input value={editing.year} onChange={event => update('year', event.target.value)} /></label>
              <label>{label('العميل بالعربية', 'Client (Arabic)')}<input value={editing.client.ar} onChange={event => localized('client', 'ar', event.target.value)} /></label>
              <label>{label('العميل بالإنجليزية', 'Client (English)')}<input value={editing.client.en} onChange={event => localized('client', 'en', event.target.value)} /></label>
              <label className="full-field">{label('نبذة المشروع بالعربية', 'Project overview (Arabic)')}<textarea rows="3" value={editing.description.ar} onChange={event => localized('description', 'ar', event.target.value)} /></label>
              <label className="full-field">{label('نبذة المشروع بالإنجليزية', 'Project overview (English)')}<textarea rows="3" value={editing.description.en} onChange={event => localized('description', 'en', event.target.value)} /></label>
              <label>{label('التحدي بالعربية', 'Challenge (Arabic)')}<textarea rows="3" value={editing.challenge.ar} onChange={event => localized('challenge', 'ar', event.target.value)} /></label>
              <label>{label('التحدي بالإنجليزية', 'Challenge (English)')}<textarea rows="3" value={editing.challenge.en} onChange={event => localized('challenge', 'en', event.target.value)} /></label>
              <label>{label('الاستراتيجية بالعربية', 'Strategy (Arabic)')}<textarea rows="3" value={editing.strategy.ar} onChange={event => localized('strategy', 'ar', event.target.value)} /></label>
              <label>{label('الاستراتيجية بالإنجليزية', 'Strategy (English)')}<textarea rows="3" value={editing.strategy.en} onChange={event => localized('strategy', 'en', event.target.value)} /></label>
              <label>{label('الحل بالعربية', 'Solution (Arabic)')}<textarea rows="3" value={editing.solution.ar} onChange={event => localized('solution', 'ar', event.target.value)} /></label>
              <label>{label('الحل بالإنجليزية', 'Solution (English)')}<textarea rows="3" value={editing.solution.en} onChange={event => localized('solution', 'en', event.target.value)} /></label>
              <label className="full-field">{label('روابط صور المعرض — رابط في كل سطر', 'Gallery image URLs — one per line')}<textarea rows="6" value={(editing.gallery || []).join('\n')} onChange={event => update('gallery', event.target.value.split('\n').map(item => item.trim()).filter(Boolean))} /></label>
              <label>{label('الألوان — افصل بينها بفاصلة', 'Palette hex values — comma separated')}<input value={(editing.palette || []).join(', ')} onChange={event => update('palette', event.target.value.split(',').map(item => item.trim()).filter(Boolean))} /></label>
              <label>{label('الوسوم — افصل بينها بفاصلة', 'Tags — comma separated')}<input value={(editing.tags || []).join(', ')} onChange={event => update('tags', event.target.value.split(',').map(item => item.trim()).filter(Boolean))} /></label>
              <label className="checkbox-label"><input type="checkbox" checked={editing.published} onChange={event => update('published', event.target.checked)} />{t.admin.published}</label>
              <label className="checkbox-label"><input type="checkbox" checked={editing.featured} onChange={event => update('featured', event.target.checked)} />{label('مشروع مميز', 'Featured project')}</label>
            </div>
            {preview && (
              <div className="project-preview">
                <span className="eyebrow">{label('معاينة قبل الحفظ', 'Preview before saving')}</span>
                <img src={editing.cover} alt={value(editing.title)} />
                <h3>{value(editing.title)}</h3><p>{value(editing.short)}</p>
                <small>{editing.category} · {editing.year} · {(editing.gallery || []).length} {label('صور', 'images')}</small>
              </div>
            )}
            <div className="editor-footer">
              <button type="button" className="button-secondary" onClick={() => setEditing(null)}>{t.admin.cancel}</button>
              <button type="button" className="button-secondary" onClick={() => setPreview(value => !value)}><Eye size={16} />{preview ? label('إخفاء المعاينة', 'Hide preview') : label('معاينة', 'Preview')}</button>
              <button className="button-primary" type="submit"><Save size={17} />{t.admin.save}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
