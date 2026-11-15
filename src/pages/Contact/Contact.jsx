import { useState } from 'react';
import { Mail, MessageCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useTranslation } from '../../hooks/useTranslation.js';
import { validateContact } from '../../services/contact.js';

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

export default function Contact() {
  const { siteData, setSiteData } = useApp();
  const { language, t } = useTranslation();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const socials = siteData.profile?.socials || {};
  const whatsapp = String(socials.whatsapp || '').replace(/\D/g, '');
  const instagram = safeExternalUrl(socials.instagram);
  const facebook = safeExternalUrl(socials.facebook);
  const email = String(socials.email || '').trim();

  const submit = event => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSiteData(data => ({
      ...data,
      messages: [
        {
          id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
          ...values,
          createdAt: new Date().toISOString(),
        },
        ...(Array.isArray(data.messages) ? data.messages : []),
      ],
    }));
    setSent(true);
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <div className="inner-page container contact-page">
      <div className="page-intro">
        <span className="eyebrow">LET’S TALK / CONTACT</span>
        <h1>{t.common.contactTitle}<span className="title-period">.</span></h1>
        <p>{t.common.contactText}</p>
      </div>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={submit} noValidate>
          <p className="contact-storage-note" role="note">{t.common.localOnly}</p>
          <div className="form-row">
            <label>
              {t.common.name}
              <input autoComplete="name" value={values.name} onChange={event => setValues(current => ({ ...current, name: event.target.value }))} placeholder={t.common.name} />
              {errors.name && <small className="field-error">{language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}</small>}
            </label>
            <label>
              {t.common.email}
              <input type="email" autoComplete="email" value={values.email} onChange={event => setValues(current => ({ ...current, email: event.target.value }))} placeholder="name@example.com" />
              {errors.email && <small className="field-error">{language === 'ar' ? 'أدخل بريدًا صحيحًا' : 'Enter a valid email'}</small>}
            </label>
          </div>
          <label>
            {t.common.message}
            <textarea rows="6" value={values.message} onChange={event => setValues(current => ({ ...current, message: event.target.value }))} placeholder={t.common.message} />
            {errors.message && <small className="field-error">{language === 'ar' ? 'اكتب رسالة من 10 أحرف على الأقل' : 'Write at least 10 characters'}</small>}
          </label>
          <button className="button-primary" type="submit">{t.common.saveMessage}<ArrowUpRight size={18} /></button>
          {sent && <p className="success-message" role="status">{t.common.sent}</p>}
        </form>

        <aside className="contact-aside">
          <span className="eyebrow">{language === 'ar' ? 'قنوات التواصل المتاحة' : 'AVAILABLE CHANNELS'}</span>
          {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp<strong>+{whatsapp}</strong></span><ArrowUpRight /></a>}
          {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <a href={`mailto:${email}`}><Mail /><span>Email<strong>{email}</strong></span><ArrowUpRight /></a>}
          {instagram && <a href={instagram} target="_blank" rel="noreferrer"><Instagram /><span>Instagram<strong>{instagram.replace(/^https?:\/\/(www\.)?/, '')}</strong></span><ArrowUpRight /></a>}
          {facebook && <a href={facebook} target="_blank" rel="noreferrer"><Facebook /><span>Facebook<strong>{facebook.replace(/^https?:\/\/(www\.)?/, '')}</strong></span><ArrowUpRight /></a>}
          {!whatsapp && !email && !instagram && !facebook && <p className="empty-state">{t.common.contactSoon}</p>}
        </aside>
      </div>
    </div>
  );
}
