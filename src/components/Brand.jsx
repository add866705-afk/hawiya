import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Brand() {
  const { siteData } = useApp();
  const name = siteData.settings?.siteName || 'HOWIYA';

  return (
    <Link className="brand" to="/" aria-label={name + ' home'}>
      <span className="brand-mark">ه</span>
      <span className="brand-word">
        {name}
        <span className="brand-divider">/</span>
        <span className="brand-ar">هُوية</span>
      </span>
    </Link>
  );
}
