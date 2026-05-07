import { aboutEnglish } from "./about_english";
import { aboutHindi } from "./about_hindi";
import { aboutUrdu } from "./about_urdu";

export const aboutTranslations = {
  en: aboutEnglish,
  hi: aboutHindi,
  ur: aboutUrdu
};

export const getAboutTranslation = (lang) => {
  return aboutTranslations[lang] || aboutTranslations.en;
};