import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import us from './locales/us.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: import.meta.env.DEV,

    resources: {
      fr: { translation: fr },
      us: { translation: us },
    },

    interpolation: {
      escapeValue: false, // React s’en charge
    },
  })

export default i18n
