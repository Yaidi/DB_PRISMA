import i18next from 'i18next';

const DEFAULT_LOCALE = 'es';
const SUPPORTED_LOCALES = ['es'];

const initI18n = (locale) => {
  const i18n = i18next.createInstance();
  i18n.init({ fallbackLng: DEFAULT_LOCALE, defaultNS: 'translations' });

  SUPPORTED_LOCALES.forEach((lng) => {
    try {
      const translations = require(`config/locales/${lng}.json`);
      i18n.addResourceBundle(lng, 'translations', translations);
    } catch (error) {
      const traceException = require('app/shared/traceException');
      traceException(
        error,
        `Locale ${lng} not found in config/locales: ${error}`
      );
    }
  });

  i18n.changeLanguage(locale);

  return i18n;
};

export default initI18n;
