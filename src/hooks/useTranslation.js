import {useApp} from '../context/AppContext.jsx';
import {translations} from '../localization/translations.js';
export function useTranslation(){const {language}=useApp();return {language,t:translations[language]||translations.ar};}