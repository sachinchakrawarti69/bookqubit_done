"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { navbarTranslations } from "@/datalang/navbar";
import { aboutTranslations } from "@/datalang/about";
import { bookTranslations } from "@/datalang/booktranslations";
import { heropartoneTranslations } from "@/datalang/heropartone";
import { academicBooksTranslations } from "@/datalang/academic_books_translations";
import { comicTranslations } from "@/datalang/comictranslations";
import { categoryTranslations } from "@/datalang/categorytranslations";
import { explorepageTranslations } from "@/datalang/explorepagetranslations";
import { footerTranslations } from "@/datalang/footer";

// Merge all translations for all 16 languages
const allTranslations = {
  en: { 
    ...navbarTranslations.en, 
    ...aboutTranslations.en,
    ...bookTranslations.en,
    ...heropartoneTranslations.en,
    ...academicBooksTranslations.en,
    ...comicTranslations.en,
    ...categoryTranslations.en,
    ...explorepageTranslations.en,
    ...footerTranslations.en
  },
  hi: { 
    ...navbarTranslations.hi, 
    ...aboutTranslations.hi,
    ...bookTranslations.hi,
    ...heropartoneTranslations.hi,
    ...academicBooksTranslations.hi,
    ...comicTranslations.hi,
    ...categoryTranslations.hi,
    ...explorepageTranslations.hi,
    ...footerTranslations.hi
  },
  ur: { 
    ...navbarTranslations.ur, 
    ...aboutTranslations.ur,
    ...bookTranslations.ur,
    ...heropartoneTranslations.ur,
    ...academicBooksTranslations.ur,
    ...comicTranslations.ur,
    ...categoryTranslations.ur,
    ...explorepageTranslations.ur,
    ...footerTranslations.ur
  },
  ar: { 
    ...navbarTranslations.ar, 
    ...aboutTranslations.ar,
    ...bookTranslations.ar,
    ...heropartoneTranslations.ar,
    ...academicBooksTranslations.ar,
    ...comicTranslations.ar,
    ...categoryTranslations.ar,
    ...explorepageTranslations.ar,
    ...footerTranslations.ar
  },
  bn: { 
    ...navbarTranslations.bn, 
    ...aboutTranslations.bn,
    ...bookTranslations.bn,
    ...heropartoneTranslations.bn,
    ...academicBooksTranslations.bn,
    ...comicTranslations.bn,
    ...categoryTranslations.bn,
    ...explorepageTranslations.bn,
    ...footerTranslations.bn
  },
  mr: { 
    ...navbarTranslations.mr, 
    ...aboutTranslations.mr,
    ...bookTranslations.mr,
    ...heropartoneTranslations.mr,
    ...academicBooksTranslations.mr,
    ...comicTranslations.mr,
    ...categoryTranslations.mr,
    ...explorepageTranslations.mr,
    ...footerTranslations.mr
  },
  ta: { 
    ...navbarTranslations.ta, 
    ...aboutTranslations.ta,
    ...bookTranslations.ta,
    ...heropartoneTranslations.ta,
    ...academicBooksTranslations.ta,
    ...comicTranslations.ta,
    ...categoryTranslations.ta,
    ...explorepageTranslations.ta,
    ...footerTranslations.ta
  },
  kn: { 
    ...navbarTranslations.kn, 
    ...aboutTranslations.kn,
    ...bookTranslations.kn,
    ...heropartoneTranslations.kn,
    ...academicBooksTranslations.kn,
    ...comicTranslations.kn,
    ...categoryTranslations.kn,
    ...explorepageTranslations.kn,
    ...footerTranslations.kn
  },
  zh: { 
    ...navbarTranslations.zh, 
    ...aboutTranslations.zh,
    ...bookTranslations.zh,
    ...heropartoneTranslations.zh,
    ...academicBooksTranslations.zh,
    ...comicTranslations.zh,
    ...categoryTranslations.zh,
    ...explorepageTranslations.zh,
    ...footerTranslations.zh
  },
  fr: { 
    ...navbarTranslations.fr, 
    ...aboutTranslations.fr,
    ...bookTranslations.fr,
    ...heropartoneTranslations.fr,
    ...academicBooksTranslations.fr,
    ...comicTranslations.fr,
    ...categoryTranslations.fr,
    ...explorepageTranslations.fr,
    ...footerTranslations.fr
  },
  de: { 
    ...navbarTranslations.de, 
    ...aboutTranslations.de,
    ...bookTranslations.de,
    ...heropartoneTranslations.de,
    ...academicBooksTranslations.de,
    ...comicTranslations.de,
    ...categoryTranslations.de,
    ...explorepageTranslations.de,
    ...footerTranslations.de
  },
  it: { 
    ...navbarTranslations.it, 
    ...aboutTranslations.it,
    ...bookTranslations.it,
    ...heropartoneTranslations.it,
    ...academicBooksTranslations.it,
    ...comicTranslations.it,
    ...categoryTranslations.it,
    ...explorepageTranslations.it,
    ...footerTranslations.it
  },
  ja: { 
    ...navbarTranslations.ja, 
    ...aboutTranslations.ja,
    ...bookTranslations.ja,
    ...heropartoneTranslations.ja,
    ...academicBooksTranslations.ja,
    ...comicTranslations.ja,
    ...categoryTranslations.ja,
    ...explorepageTranslations.ja,
    ...footerTranslations.ja
  },
  ko: { 
    ...navbarTranslations.ko, 
    ...aboutTranslations.ko,
    ...bookTranslations.ko,
    ...heropartoneTranslations.ko,
    ...academicBooksTranslations.ko,
    ...comicTranslations.ko,
    ...categoryTranslations.ko,
    ...explorepageTranslations.ko,
    ...footerTranslations.ko
  },
  fa: { 
    ...navbarTranslations.fa, 
    ...aboutTranslations.fa,
    ...bookTranslations.fa,
    ...heropartoneTranslations.fa,
    ...academicBooksTranslations.fa,
    ...comicTranslations.fa,
    ...categoryTranslations.fa,
    ...explorepageTranslations.fa,
    ...footerTranslations.fa
  },
  ru: { 
    ...navbarTranslations.ru, 
    ...aboutTranslations.ru,
    ...bookTranslations.ru,
    ...heropartoneTranslations.ru,
    ...academicBooksTranslations.ru,
    ...comicTranslations.ru,
    ...categoryTranslations.ru,
    ...explorepageTranslations.ru,
    ...footerTranslations.ru
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
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", flagEmoji: "🇺🇸" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳", flagEmoji: "🇮🇳" },
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", flagEmoji: "🇵🇰" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", flagEmoji: "🇸🇦" },
    { code: "bn", name: "Bangla", nativeName: "বাংলা", flag: "🇧🇩", flagEmoji: "🇧🇩" },
    { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", flagEmoji: "🇮🇳" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", flagEmoji: "🇮🇳" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", flagEmoji: "🇮🇳" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", flagEmoji: "🇨🇳" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", flagEmoji: "🇫🇷" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", flagEmoji: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", flagEmoji: "🇮🇹" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", flagEmoji: "🇯🇵" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", flagEmoji: "🇰🇷" },
    { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", flagEmoji: "🇮🇷" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", flagEmoji: "🇷🇺" }
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