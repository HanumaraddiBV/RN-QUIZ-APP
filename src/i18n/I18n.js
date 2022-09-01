import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nManager } from "react-native";
import {TRANSLATIONS_EN} from './en/translation';
import {TRANSLATIONS_SP} from './spanish/translation';
import {TRANSLATIONS_AR} from './Arabic/translation';



export const resources = {
  en: {translation: TRANSLATIONS_EN},
  sp: {translation: TRANSLATIONS_SP},
  ar: {translation: TRANSLATIONS_AR},
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
