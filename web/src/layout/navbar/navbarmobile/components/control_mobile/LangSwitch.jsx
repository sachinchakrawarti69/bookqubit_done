"use client";

import React, { useState } from "react";
import { FaLanguage, FaCheck } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const LangSwitch = ({ onClose }) => {
  const { language, languages, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    if (onClose) setTimeout(() => onClose(), 300);
  };

  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang;
  };

  return (
    <div className="mobile-lang-switch">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-control-button"
      >
        <span className="mobile-control-icon">
          <FaLanguage />
        </span>
        <span className="mobile-control-label">
          {getCurrentLanguage()?.nativeName || t("nav.language") || "Language"}
        </span>
        <span className="mobile-control-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mobile-lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`mobile-lang-option ${language === lang.code ? "active" : ""}`}
            >
              <div className="mobile-lang-flag">
                <span className="text-xl">{lang.flagEmoji || lang.flag}</span>
              </div>
              <div className="mobile-lang-info">
                <span className="mobile-lang-name">{lang.nativeName}</span>
                <span className="mobile-lang-code">{lang.name}</span>
              </div>
              {language === lang.code && (
                <FaCheck className="mobile-lang-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitch;