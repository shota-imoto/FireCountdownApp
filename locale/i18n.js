import ja from './ja.json';
import en from './en.json';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.fallbacks = true;

i18n.locale = Localization.locale;
i18n.locale = 'en';
i18n.translations = {
  'en': en,
  'ja': ja
}

export const Translations =  i18n
