import { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useTranslation } from '../hooks/useTranslation.js';

const makeId = () => globalThis.crypto?.randomUUID?.() || String(Date.now() + Math.random());
export default function ContentManager() {
  const { siteData, setSiteData, setLanguage, changeDemoPassword } = useApp();
  const { language, t } = useTranslation();
  const [profile, setProfile] = useState(JSON.parse(JSON.stringify(siteData.profile)));
  const [services, setServices] = useState(JSON.parse(JSON.stringify(siteData.services)));
  const [testimonials, setTestimonials] = useState(JSON.parse(JSON.stringify(siteData.testimonials)));
  const [settings, setSettings] = useState({ ...siteData.settings });
  const [notice, setNotice] = useState('');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const ar = language === 'ar';
  const label = (a, e) => ar ? a : e;
  const loc = (key, lang, value) => setProfile(p => ({ ...p, [key]: { ...p[key], [lang]: value } }));
  const save = () => {
    setSiteData(d => ({ ...d, profile, services, testimonials, settings }));
    setLanguage(settings.defaultLanguage || language);
    setNotice(t.admin.saved);
  };
  const updateService = (id, field, lang, value) => setServices(list => list.map(item => item.id === id ? ({ ...item, [field]: lang ? { ...item[field], [lang]: value } : value }) : item));
  const updateTestimonial = (id, field, lang, value) => setTestimonials(list => list.map(item => item.id === id ? ({ ...item, [field]: lang ? { ...item[field], [lang]: value } : value }) : item));
  const addService = () => setServices(list => [...list, { id: makeId(), icon: 'Layers', title: { ar: 'خدمة جديدة', en: 'New service' }, description: { ar: '', en: '' } }]);
  const addTestimonial = () => setTestimonials(list => [...list, { id: makeId(), name: '', role: { ar: '', en: '' }, quote: { ar: '', en: '' }, visible: false }]);
  const changePassword = e => {
    e.preventDefault();
    if (passwords.next.length < 10 || passwords.next !== passwords.confirm) {
      setPasswordMessage(label('تأكد أن كلمة المرور الجديدة 10 أحرف على الأقل ومتطابقة.', 'Use at least 10 characters and make sure both new password fields match.'));
      return;
    }
    const changed = changeDemoPassword(passwords.current, passwords.next);
    setPasswordMessage(changed ? label('تم تغيير كلمة مرور النسخة التجريبية. سجل الدخول مجددًا.', 'Demo password changed. Please sign in again.') : label('كلمة المرور الحالية غير صحيحة.', 'Current password is incorrect.'));
    if (changed) setPasswords({ current: '', next: '', confirm: '' });
  };
  return <div className="content-manager">
    <div className="admin-page-heading"><div><span className="eyebrow">SITE CONTENT / SETTINGS</span><h1>{t.admin.manageContent}</h1><p>Profile · Services · Testimonials · Messages · Settings</p></div><button className="button-primary" onClick={save}><Save size={17}/>{t.admin.save}</button></div>
    {notice && <p className="success-message" role="status">{notice}</p>}
    <section className="admin-panel content-panel"><h2>{t.admin.profile}</h2><div className="editor-grid">
      <label>الاسم<input value={profile.name.ar} onChange={e => loc('name', 'ar', e.target.value)}/></label><label>Name<input value={profile.name.en} onChange={e => loc('name', 'en', e.target.value)}/></label>
      <label>المسمى المهني<input value={profile.role.ar} onChange={e => loc('role', 'ar', e.target.value)}/></label><label>Professional title<input value={profile.role.en} onChange={e => loc('role', 'en', e.target.value)}/></label>
      <label className="full-field">السيرة الذاتية<textarea rows="4" value={profile.bio.ar} onChange={e => loc('bio', 'ar', e.target.value)}/></label><label className="full-field">Biography<textarea rows="4" value={profile.bio.en} onChange={e => loc('bio', 'en', e.target.value)}/></label>
      <label className="full-field">Profile image URL<input value={profile.image} onChange={e => setProfile(p => ({ ...p, image: e.target.value }))}/></label>
      <label>Skills (comma separated)<input value={profile.skills.join(', ')} onChange={e => setProfile(p => ({ ...p, skills: e.target.value.split(',').map(x => x.trim()).filter(Boolean) }))}/></label>
      <label>Tools (comma separated)<input value={profile.tools.join(', ')} onChange={e => setProfile(p => ({ ...p, tools: e.target.value.split(',').map(x => x.trim()).filter(Boolean) }))}/></label>
      <label className="full-field">Experience (one item per line)<textarea rows="3" value={profile.experience.map(x => x.ar).join('\n')} onChange={e => setProfile(p => ({ ...p, experience: e.target.value.split('\n').filter(Boolean).map((ar, i) => ({ ar, en: p.experience[i]?.en || ar })) }))}/></label>
      <label className="full-field">Achievements (one item per line)<textarea rows="3" value={profile.achievements.map(x => x.ar).join('\n')} onChange={e => setProfile(p => ({ ...p, achievements: e.target.value.split('\n').filter(Boolean).map((ar, i) => ({ ar, en: p.achievements[i]?.en || ar })) }))}/></label>
    </div></section>
    <section className="admin-panel content-panel"><h2>{label('بيانات التواصل والمنصات', 'Contact & Social')}</h2><div className="editor-grid">
      <label>WhatsApp<input value={profile.socials.whatsapp} onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, whatsapp: e.target.value.replace(/\D/g, '') } }))}/></label>
      <label>Email<input type="email" value={profile.socials.email} onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, email: e.target.value } }))}/></label>
      <label>Instagram URL<input value={profile.socials.instagram} onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, instagram: e.target.value } }))}/></label>
      <label>Facebook URL<input value={profile.socials.facebook} onChange={e => setProfile(p => ({ ...p, socials: { ...p.socials, facebook: e.target.value } }))}/></label>
    </div></section>
    <section className="admin-panel content-panel"><div className="panel-heading"><h2>{t.admin.services}</h2><button className="button-secondary" onClick={addService}><Plus size={15}/>{t.admin.add}</button></div>
      {services.map((s) => <div className="content-row" key={s.id}>
        <label>{label('عنوان الخدمة بالعربية', 'Service title (Arabic)')}<input value={s.title.ar} onChange={e => updateService(s.id, 'title', 'ar', e.target.value)}/></label>
        <label>{label('عنوان الخدمة بالإنجليزية', 'Service title (English)')}<input value={s.title.en} onChange={e => updateService(s.id, 'title', 'en', e.target.value)}/></label>
        <label>{label('الوصف بالعربية', 'Description (Arabic)')}<input value={s.description.ar} onChange={e => updateService(s.id, 'description', 'ar', e.target.value)}/></label>
        <label>{label('الوصف بالإنجليزية', 'Description (English)')}<input value={s.description.en} onChange={e => updateService(s.id, 'description', 'en', e.target.value)}/></label>
        <label>Icon key<input value={s.icon} onChange={e => updateService(s.id, 'icon', null, e.target.value)}/></label>
        <button className="danger-button" onClick={() => setServices(list => list.filter(x => x.id !== s.id))}><Trash2 size={16}/>{t.admin.delete}</button>
      </div>)}
    </section>
    <section className="admin-panel content-panel"><div className="panel-heading"><h2>{t.admin.testimonials}</h2><button className="button-secondary" onClick={addTestimonial}><Plus size={15}/>{t.admin.add}</button></div>
      {testimonials.map(item => <div className="content-row" key={item.id}>
        <label>{label('اسم العميل', 'Client name')}<input value={item.name} onChange={e => updateTestimonial(item.id, 'name', null, e.target.value)}/></label>
        <label>{label('الصفة بالعربية', 'Role (Arabic)')}<input value={item.role.ar} onChange={e => updateTestimonial(item.id, 'role', 'ar', e.target.value)}/></label>
        <label>{label('الرأي بالعربية', 'Quote (Arabic)')}<textarea rows="2" value={item.quote.ar} onChange={e => updateTestimonial(item.id, 'quote', 'ar', e.target.value)}/></label>
        <label>{label('الرأي بالإنجليزية', 'Quote (English)')}<textarea rows="2" value={item.quote.en} onChange={e => updateTestimonial(item.id, 'quote', 'en', e.target.value)}/></label>
        <label className="checkbox-label"><input type="checkbox" checked={item.visible} onChange={e => updateTestimonial(item.id, 'visible', null, e.target.checked)}/>{item.visible ? <Eye size={15}/> : <EyeOff size={15}/>}{t.admin.published}</label>
        <button className="danger-button" onClick={() => setTestimonials(list => list.filter(x => x.id !== item.id))}><Trash2 size={16}/>{t.admin.delete}</button>
      </div>)}
    </section>
    <section className="admin-panel content-panel"><h2>{label('الرسائل الواردة', 'Incoming messages')} ({siteData.messages.length})</h2>
      {siteData.messages.length === 0 ? <p className="empty-state">{t.admin.empty}</p> : siteData.messages.map(message => <div className="message-row" key={message.id}><div><strong>{message.name}</strong><small>{message.email} · {new Date(message.createdAt).toLocaleString()}</small><p>{message.message}</p></div><button className="danger-button" onClick={() => setSiteData(d => ({ ...d, messages: d.messages.filter(m => m.id !== message.id) }))}><Trash2 size={16}/>{t.admin.delete}</button></div>)}
    </section>
    <section className="admin-panel content-panel"><h2>{label('إعدادات الموقع وSEO', 'Site & SEO settings')}</h2><div className="editor-grid">
      <label>{label('اسم الموقع', 'Site name')}<input value={settings.siteName || ''} onChange={e => setSettings(s => ({ ...s, siteName: e.target.value }))}/></label>
      <label>{label('اللغة الافتراضية', 'Default language')}<select value={settings.defaultLanguage || 'ar'} onChange={e => setSettings(s => ({ ...s, defaultLanguage: e.target.value }))}><option value="ar">العربية</option><option value="en">English</option></select></label>
      <label className="full-field">SEO title<input value={settings.seoTitle || ''} onChange={e => setSettings(s => ({ ...s, seoTitle: e.target.value }))}/></label>
      <label className="full-field">SEO description<textarea rows="3" value={settings.seoDescription || ''} onChange={e => setSettings(s => ({ ...s, seoDescription: e.target.value }))}/></label>
      <label>Brand accent color<input type="color" value={settings.accentColor || '#214aa4'} onChange={e => setSettings(s => ({ ...s, accentColor: e.target.value }))}/></label>
    </div><p className="admin-security-note">{label('تُطبّق إعدادات SEO واللون بعد الضغط على حفظ التغييرات.', 'SEO and color settings apply after saving.')}</p></section>
    <section className="admin-panel content-panel"><h2><KeyRound size={17}/> {label('تغيير كلمة مرور الإدارة التجريبية', 'Change demo admin password')}</h2><form className="editor-grid" onSubmit={changePassword}>
      <label>{label('كلمة المرور الحالية', 'Current password')}<input type="password" autoComplete="current-password" required value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}/></label>
      <label>{label('كلمة المرور الجديدة (10 أحرف على الأقل)', 'New password (10+ characters)')}<input type="password" autoComplete="new-password" minLength={10} required value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))}/></label>
      <label>{label('تأكيد كلمة المرور', 'Confirm password')}<input type="password" autoComplete="new-password" minLength={10} required value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}/></label>
      <div><button className="button-secondary" type="submit"><KeyRound size={15}/>{label('تغيير كلمة المرور', 'Update password')}</button>{passwordMessage&&<p className="field-error" role="status">{passwordMessage}</p>}</div>
    </form><p className="admin-security-note">{label('تنبيه: هذا التغيير محلي وغير آمن للإنتاج؛ كلمة المرور محفوظة على المتصفح ويمكن تجاوز نظام الدخول. استبدله بمصادقة Supabase قبل النشر.', 'Demo only: the password is stored in this browser and can be bypassed. Replace with Supabase Auth before production.')}</p></section>
  </div>;
}