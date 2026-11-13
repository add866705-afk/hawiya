import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useTranslation } from '../hooks/useTranslation.js';

const makeId = () => globalThis.crypto?.randomUUID?.() || String(Date.now());
const blank = () => ({ id: makeId(), slug: '', category: 'property', year: String(new Date().getFullYear()), featured: false, published: false,
  title: { ar: '', en: '' }, short: { ar: '', en: '' }, description: { ar: '', en: '' }, client: { ar: '', en: '' },
  challenge: { ar: '', en: '' }, strategy: { ar: '', en: '' }, solution: { ar: '', en: '' },
  cover: '', gallery: [], palette: ['#173B91', '#222936', '#F5F6F8'], tags: [] });

export default function ProjectManager() {
  const { siteData, setSiteData } = useApp();
  const { t, language } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState('');
  const ar = language === 'ar';
  const label = (a, e) => ar ? a : e;
  const value = v => v?.[language] || v?.ar || '';
  const start = project => { setEditing(project ? JSON.parse(JSON.stringify(project)) : blank()); setPreview(false); };
  const update = (key, value) => setEditing(current => ({ ...current, [key]: value }));
  const localized = (key, lang, value) => setEditing(current => ({ ...current, [key]: { ...current[key], [lang]: value } }));
  const save = e => {
    e.preventDefault();
    if (!editing.title.ar.trim() || !editing.slug.trim() || !editing.cover.trim()) return;
    const exists = siteData.projects.some(p => p.id === editing.id);
    setSiteData(current => ({ ...current, projects: exists ? current.projects.map(p => p.id === editing.id ? editing : p) : [editing, ...current.projects] }));
    setEditing(null); setPreview(false); setNotice(t.admin.saved);
  };
  const remove = id => {
    if (!window.confirm(t.admin.confirmDelete)) return;
    setSiteData(current => ({ ...current, projects: current.projects.filter(p => p.id !== id) }));
  };
  return <div className="manager-page">
    <div className="admin-page-heading"><div><span className="eyebrow">PORTFOLIO / CMS</span><h1>{t.admin.manageProjects}</h1><p>{siteData.projects.length} {t.admin.projects}</p></div><button className="button-primary" onClick={() => start()}><Plus size={18}/>{t.admin.add}</button></div>
    {notice && <p className="success-message" role="status">{notice}</p>}
    <div className="admin-panel"><div className="admin-project-list">{siteData.projects.map(project => <div className="admin-project-row" key={project.id}>
      <img src={project.cover} alt={project.title?.ar || ''}/><div><strong>{project.title?.ar}</strong><small>{project.slug} · {project.year}</small></div>
      <span className={project.published ? 'status-published' : 'status-draft'}>{project.published ? 'Published' : 'Draft'}</span>
      <div className="row-actions"><button onClick={() => start(project)} aria-label={t.admin.edit}><Pencil size={17}/></button><button onClick={() => remove(project.id)} aria-label={t.admin.delete}><Trash2 size={17}/></button></div>
    </div>)}</div></div>
    {editing && <div className="editor-overlay"><form className="editor-panel" onSubmit={save}>
      <div className="editor-head"><h2>{editing.title.ar || t.admin.add}</h2><button type="button" onClick={() => setEditing(null)} aria-label="Close"><X/></button></div>
      <div className="editor-grid">
        <label>Slug<input required value={editing.slug} onChange={e => update('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}/></label>
        <label>{label('التصنيف', 'Category')}<select value={editing.category} onChange={e => update('category', e.target.value)}>{['property','coffee','ecommerce','tech','food'].map(x => <option key={x} value={x}>{x}</option>)}</select></label>
        <label>{t.admin.title} — عربي<input required value={editing.title.ar} onChange={e => localized('title', 'ar', e.target.value)}/></label>
        <label>{t.admin.title} — English<input value={editing.title.en} onChange={e => localized('title', 'en', e.target.value)}/></label>
        <label>{label('ملخص المشروع بالعربية', 'Short description (Arabic)')}<textarea rows="3" value={editing.short.ar} onChange={e => localized('short', 'ar', e.target.value)}/></label>
        <label>{label('ملخص المشروع بالإنجليزية', 'Short description (English)')}<textarea rows="3" value={editing.short.en} onChange={e => localized('short', 'en', e.target.value)}/></label>
        <label className="full-field">{label('صورة الغلاف', 'Cover image URL')}<input required type="url" value={editing.cover} onChange={e => update('cover', e.target.value)}/></label>
        <label>{t.common.year}<input value={editing.year} onChange={e => update('year', e.target.value)}/></label>
        <label>{label('العميل بالعربية', 'Client (Arabic)')}<input value={editing.client.ar} onChange={e => localized('client', 'ar', e.target.value)}/></label>
        <label>{label('العميل بالإنجليزية', 'Client (English)')}<input value={editing.client.en} onChange={e => localized('client', 'en', e.target.value)}/></label>
        <label className="full-field">{label('نبذة المشروع بالعربية', 'Project overview (Arabic)')}<textarea rows="3" value={editing.description.ar} onChange={e => localized('description', 'ar', e.target.value)}/></label>
        <label className="full-field">{label('نبذة المشروع بالإنجليزية', 'Project overview (English)')}<textarea rows="3" value={editing.description.en} onChange={e => localized('description', 'en', e.target.value)}/></label>
        <label>{label('التحدي بالعربية', 'Challenge (Arabic)')}<textarea rows="3" value={editing.challenge.ar} onChange={e => localized('challenge', 'ar', e.target.value)}/></label>
        <label>{label('التحدي بالإنجليزية', 'Challenge (English)')}<textarea rows="3" value={editing.challenge.en} onChange={e => localized('challenge', 'en', e.target.value)}/></label>
        <label>{label('الاستراتيجية بالعربية', 'Strategy (Arabic)')}<textarea rows="3" value={editing.strategy.ar} onChange={e => localized('strategy', 'ar', e.target.value)}/></label>
        <label>{label('الاستراتيجية بالإنجليزية', 'Strategy (English)')}<textarea rows="3" value={editing.strategy.en} onChange={e => localized('strategy', 'en', e.target.value)}/></label>
        <label>{label('الحل بالعربية', 'Solution (Arabic)')}<textarea rows="3" value={editing.solution.ar} onChange={e => localized('solution', 'ar', e.target.value)}/></label>
        <label>{label('الحل بالإنجليزية', 'Solution (English)')}<textarea rows="3" value={editing.solution.en} onChange={e => localized('solution', 'en', e.target.value)}/></label>
        <label className="full-field">{label('روابط صور المعرض — رابط في كل سطر، ويمكن تغيير ترتيبها', 'Gallery image URLs — one per line; line order controls display')}<textarea rows="6" value={editing.gallery.join('\n')} onChange={e => update('gallery', e.target.value.split('\n').map(x => x.trim()).filter(Boolean))}/></label>
        <label>{label('الألوان — افصل بينها بفاصلة', 'Palette hex values — comma separated')}<input value={editing.palette.join(', ')} onChange={e => update('palette', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></label>
        <label>{label('الوسوم — افصل بينها بفاصلة', 'Tags — comma separated')}<input value={(editing.tags || []).join(', ')} onChange={e => update('tags', e.target.value.split(',').map(x => x.trim()).filter(Boolean))}/></label>
        <label className="checkbox-label"><input type="checkbox" checked={editing.published} onChange={e => update('published', e.target.checked)}/>{t.admin.published}</label>
        <label className="checkbox-label"><input type="checkbox" checked={editing.featured} onChange={e => update('featured', e.target.checked)}/>{label('مشروع مميز', 'Featured project')}</label>
      </div>
      {preview && <div className="project-preview"><span className="eyebrow">{label('معاينة قبل الحفظ', 'Preview before saving')}</span><img src={editing.cover} alt={value(editing.title)}/><h3>{value(editing.title)}</h3><p>{value(editing.short)}</p><small>{editing.category} · {editing.year} · {editing.gallery.length} {label('صور', 'images')}</small></div>}
      <div className="editor-footer"><button type="button" className="button-secondary" onClick={() => setEditing(null)}>{t.admin.cancel}</button><button type="button" className="button-secondary" onClick={() => setPreview(v => !v)}><Eye size={16}/>{preview ? label('إخفاء المعاينة', 'Hide preview') : label('معاينة', 'Preview')}</button><button className="button-primary" type="submit"><Save size={17}/>{t.admin.save}</button></div>
    </form></div>}
  </div>;
}