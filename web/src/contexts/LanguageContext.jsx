"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { navbarTranslations } from "@/datalang/navbar";

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
  const [translations, setTranslations] = useState(navbarTranslations.en);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("bookqubit_language");
    if (savedLanguage && navbarTranslations[savedLanguage]) {
      setLanguage(savedLanguage);
      setTranslations(navbarTranslations[savedLanguage]);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (navbarTranslations[browserLang]) {
        setLanguage(browserLang);
        setTranslations(navbarTranslations[browserLang]);
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    if (navbarTranslations[lang]) {
      setLanguage(lang);
      setTranslations(navbarTranslations[lang]);
      localStorage.setItem("bookqubit_language", lang);
      setIsLanguageMenuOpen(false);

      // Apply RTL for Urdu
      if (lang === "ur") {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ur";
      } else {
        document.documentElement.dir = "ltr";
        document.documentElement.lang = lang;
      }
    }
  };

  const t = (key) => {
    return translations[key] || navbarTranslations.en[key] || key;
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const languages = [
    { code: "en", name: t("nav.english"), nativeName: "English" },
    { code: "hi", name: t("nav.hindi"), nativeName: "हिंदी" },
    { code: "ur", name: t("nav.urdu"), nativeName: "اردو" },
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
