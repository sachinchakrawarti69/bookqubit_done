import { bookTranslationsEnglish } from "./bookTranslationsEnglish";
import { bookTranslationsHindi } from "./bookTranslationsHindi";
import { bookTranslationsUrdu } from "./bookTranslationsUrdu";

export const bookTranslations = {
  en: bookTranslationsEnglish,
  hi: bookTranslationsHindi,
  ur: bookTranslationsUrdu
};

export const getBookTranslation = (lang) => {
  return bookTranslations[lang] || bookTranslations.en;
};