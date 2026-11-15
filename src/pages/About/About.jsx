import { useApp } from '../../context/AppContext.jsx';
import { useTranslation } from '../../hooks/useTranslation.js';

export default function About() {
  const { siteData, language } = useApp();
  const { t } = useTranslation();
  const profile = siteData.profile || {};
  const value = entry => entry?.[language] || entry?.ar || entry || '';
  const experience = Array.isArray(profile.experience) ? profile.experience : [];
  const achievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const tools = Array.isArray(profile.tools) ? profile.tools : [];

  return (
    <div className="inner-page container">
      <div className="page-intro">
        <span className="eyebrow">{t.about.label}</span>
        <h1>{t.about.title}</h1>
        <p>{value(profile.bio)}</p>
      </div>

      <div className="about-profile">
        <div className="about-photo">
          {profile.image ? (
            <img
              src={profile.image}
              alt={value(profile.name)}
              onError={event => { event.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <div className="about-photo-placeholder" aria-label={value(profile.name)}>
              <span>هُوية</span>
              <small>VISUAL IDENTITY DESIGN</small>
            </div>
          )}
          <span>HOWIYA / PROFILE</span>
        </div>
        <div className="about-details">
          <span className="eyebrow">{language === 'ar' ? 'المصمم' : 'THE DESIGNER'}</span>
          <h2>{value(profile.name)}</h2>
          <p className="role-line">{value(profile.role)}</p>
          <p>{value(profile.bio)}</p>
          {skills.length > 0 && (
            <div className="skills-block">
              <h3>{t.about.skills}</h3>
              <div className="skill-list">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            </div>
          )}
        </div>
      </div>

      {(experience.length > 0 || achievements.length > 0 || tools.length > 0) && (
        <div className="about-lists">
          {experience.length > 0 && (
            <div>
              <h3>{t.about.experience}</h3>
              {experience.map((item, index) => <p className="list-line" key={index}>{value(item)}</p>)}
            </div>
          )}
          <div>
            {tools.length > 0 && <>
              <h3>{t.about.tools}</h3>
              <div className="skill-list">{tools.map(tool => <span key={tool}>{tool}</span>)}</div>
            </>}
            {achievements.length > 0 && <>
              <h3 className="achievements-title">{language === 'ar' ? 'محطات وإنجازات' : 'Highlights'}</h3>
              {achievements.map((item, index) => <p className="list-line" key={index}>{value(item)}</p>)}
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
