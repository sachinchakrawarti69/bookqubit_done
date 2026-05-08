"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { navbarTranslations } from "@/datalang/navbar";
import { aboutTranslations } from "@/datalang/about";
import { bookTranslations } from "@/datalang/booktranslations";
import { heropartoneTranslations } from "@/datalang/heropartone";

// Merge all translations for all 16 languages
const allTranslations = {
  en: { 
    ...navbarTranslations.en, 
    ...aboutTranslations.en,
    ...bookTranslations.en,
    ...heropartoneTranslations.en
  },
  hi: { 
    ...navbarTranslations.hi, 
    ...aboutTranslations.hi,
    ...bookTranslations.hi,
    ...heropartoneTranslations.hi
  },
  ur: { 
    ...navbarTranslations.ur, 
    ...aboutTranslations.ur,
    ...bookTranslations.ur,
    ...heropartoneTranslations.ur
  },
  ar: { 
    ...navbarTranslations.ar, 
    ...aboutTranslations.ar,
    ...bookTranslations.ar,
    ...heropartoneTranslations.ar
  },
  bn: { 
    ...navbarTranslations.bn, 
    ...aboutTranslations.bn,
    ...bookTranslations.bn,
    ...heropartoneTranslations.bn
  },
  mr: { 
    ...navbarTranslations.mr, 
    ...aboutTranslations.mr,
    ...bookTranslations.mr,
    ...heropartoneTranslations.mr
  },
  ta: { 
    ...navbarTranslations.ta, 
    ...aboutTranslations.ta,
    ...bookTranslations.ta,
    ...heropartoneTranslations.ta
  },
  kn: { 
    ...navbarTranslations.kn, 
    ...aboutTranslations.kn,
    ...bookTranslations.kn,
    ...heropartoneTranslations.kn
  },
  zh: { 
    ...navbarTranslations.zh, 
    ...aboutTranslations.zh,
    ...bookTranslations.zh,
    ...heropartoneTranslations.zh
  },
  fr: { 
    ...navbarTranslations.fr, 
    ...aboutTranslations.fr,
    ...bookTranslations.fr,
    ...heropartoneTranslations.fr
  },
  de: { 
    ...navbarTranslations.de, 
    ...aboutTranslations.de,
    ...bookTranslations.de,
    ...heropartoneTranslations.de
  },
  it: { 
    ...navbarTranslations.it, 
    ...aboutTranslations.it,
    ...bookTranslations.it,
    ...heropartoneTranslations.it
  },
  ja: { 
    ...navbarTranslations.ja, 
    ...aboutTranslations.ja,
    ...bookTranslations.ja,
    ...heropartoneTranslations.ja
  },
  ko: { 
    ...navbarTranslations.ko, 
    ...aboutTranslations.ko,
    ...bookTranslations.ko,
    ...heropartoneTranslations.ko
  },
  fa: { 
    ...navbarTranslations.fa, 
    ...aboutTranslations.fa,
    ...bookTranslations.fa,
    ...heropartoneTranslations.fa
  },
  ru: { 
    ...navbarTranslations.ru, 
    ...aboutTranslations.ru,
    ...bookTranslations.ru,
    ...heropartoneTranslations.ru
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [translations, setTranslations] = useState(allTranslations.en);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("bookqubit_language");
    if (savedLanguage && allTranslations[savedLanguage]) {
      setLanguage(savedLanguage);
      setTranslations(allTranslations[savedLanguage]);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (allTranslations[browserLang]) {
        setLanguage(browserLang);
        setTranslations(allTranslations[browserLang]);
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    if (allTranslations[lang]) {
      setLanguage(lang);
      setTranslations(allTranslations[lang]);
      localStorage.setItem("bookqubit_language", lang);
      setIsLanguageMenuOpen(false);
      
      // Apply RTL for Urdu, Arabic, Persian (Farsi)
      const rtlLanguages = ["ur", "ar", "fa"];
      if (rtlLanguages.includes(lang)) {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = lang;
      } else {
        document.documentElement.dir = "ltr";
        document.documentElement.lang = lang;
      }
    }
  };

  const t = (key) => {
    return translations[key] || allTranslations.en[key] || key;
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "bn", name: "Bangla", nativeName: "বাংলা", flag: "🇧🇩" },
    { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" }
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        translations,
        isLanguageMenuOpen,
        setIsLanguageMenuOpen,
        toggleLanguageMenu,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};