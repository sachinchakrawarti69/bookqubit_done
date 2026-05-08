import { navbarEnglish } from "./navbar_english";
import { navbarHindi } from "./navbar_hindi";
import { navbarUrdu } from "./navbar_urdu";
import { navbarArabic } from "./navbar_arabic";
import { navbarBangla } from "./navbar_bangla";
import { navbarMarathi } from "./navbar_marathi";
import { navbarTamil } from "./navbar_tamil";
import { navbarKannada } from "./navbar_kannada";
import { navbarChinese } from "./navbar_chinese";
import { navbarFrench } from "./navbar_french";
import { navbarGerman } from "./navbar_german";
import { navbarItalian } from "./navbar_italian";
import { navbarJapanese } from "./navbar_japanese";
import { navbarKorean } from "./navbar_korean";
import { navbarPersian } from "./navbar_persian";
import { navbarRussian } from "./navbar_russian";

export const navbarTranslations = {
  en: navbarEnglish,
  hi: navbarHindi,
  ur: navbarUrdu,
  ar: navbarArabic,
  bn: navbarBangla,
  mr: navbarMarathi,
  ta: navbarTamil,
  kn: navbarKannada,
  zh: navbarChinese,
  fr: navbarFrench,
  de: navbarGerman,
  it: navbarItalian,
  ja: navbarJapanese,
  ko: navbarKorean,
  fa: navbarPersian,
  ru: navbarRussian
};

export const getNavbarTranslation = (lang) => {
  return navbarTranslations[lang] || navbarTranslations.en;
};

// List of supported languages with their codes and native names
export const supportedLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "fa", name: "Persian", nativeName: "فارسی" },
  { code: "ru", name: "Russian", nativeName: "Русский" }
];