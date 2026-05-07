import { navbarEnglish } from "./navbar_english";
import { navbarHindi } from "./navbar_hindi";
import { navbarUrdu } from "./navbar_urdu";

export const navbarTranslations = {
  en: navbarEnglish,
  hi: navbarHindi,
  ur: navbarUrdu
};

export const getNavbarTranslation = (lang) => {
  return navbarTranslations[lang] || navbarTranslations.en;
};