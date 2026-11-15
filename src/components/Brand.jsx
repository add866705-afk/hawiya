import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Brand() {
  const { siteData } = useApp();
  const settings = siteData.settings || {};
  const name = settings.siteName || 'HOWIYA';

  return (
    <Link className="brand" to="/" aria-label={name + ' home'}>
      <span className="brand-mark">
        {settings.logoUrl
          ? <img src={settings.logoUrl} alt="" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.textContent = 'ه'; }} />
          : 'ه'}
      </span>
      <span className="brand-word">
        {name}
        <span className="brand-divider">/</span>
        <span className="brand-ar">هُوية</span>
      </span>
    </Link>
  );
}
