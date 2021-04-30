import ja from './ja.json';
import en from './en.json';
import * as Localization from 'expo-localization';

const translations = {
  en: en,
  ja: ja
};
const locale = Localization.locale;

export const Translations =  locale in translations ? translations[locale] : translations['en'] 
