"use client";

import { useState } from "react";
import {
  FaLanguage,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/themes/useTheme";

const LangSwitchDropdown = ({ mobile = false, onItemClick }) => {
  const {
    language,
    languages,
    isLanguageMenuOpen,
    toggleLanguageMenu,
    setLanguage,
    t,
  } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  const toggleDropdown = () => {
    if (mobile) {
      toggleLanguageMenu();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find((lang) => lang.code === language);
    return currentLang?.nativeName || "English";
  };

  // Split languages into two rows
  const midpoint = Math.ceil(languages.length / 2);
  const firstRowLanguages = languages.slice(0, midpoint);
  const secondRowLanguages = languages.slice(midpoint);

  // Mobile version
  if (mobile) {
    return (
      <div className="navbar-mobile-dropdown">
        <div
          onClick={toggleDropdown}
          className={`navbar-mobile-dropdown-button ${theme.textColors.primary}`}
        >
          <span
            className={`navbar-mobile-dropdown-icon ${theme.textColors.highlight}`}
          >
            <FaLanguage />
          </span>
          <span className="navbar-mobile-dropdown-text">
            {t("nav.language")}
          </span>
          <span
            className={`navbar-mobile-dropdown-chevron ${theme.textColors.secondary}`}
          >
            {isLanguageMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>

        {isLanguageMenuOpen && (
          <div
            className={`navbar-mobile-dropdown-content ${theme.background.section}`}
          >
            {/* Two column layout for mobile */}
            <div className="grid grid-cols-2 gap-1 p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                  }}
                  className={`navbar-mobile-dropdown-item ${theme.textColors.primary} ${
                    language === lang.code
                      ? `font-bold ${theme.textColors.highlight}`
                      : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                  }}
                >
                  <span>{lang.nativeName}</span>
                  {language === lang.code && (
                    <span className={theme.textColors.highlight}>
                      <FaCheck size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version - Two rows layout
  return (
    <div
      className="navbar-desktop-dropdown-container relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`navbar-desktop-dropdown-button ${theme.textColors.primary}`}
      >
        <span
          className={`navbar-desktop-dropdown-icon ${theme.textColors.highlight}`}
        >
          <FaLanguage />
        </span>
        <span>{getCurrentLanguageName()}</span>
        <span
          className={`navbar-desktop-dropdown-chevron ${theme.textColors.secondary}`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {isOpen && (
        <div
          className={`navbar-desktop-dropdown-menu ${theme.background.section} ${theme.border.default} ${theme.shadow.container}`}
          style={{ minWidth: "280px", padding: "8px" }}
        >
          {/* Two rows layout */}
          <div className="space-y-2">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-1">
              {firstRowLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                  }}
                  className={`navbar-desktop-dropdown-item ${theme.textColors.primary} ${
                    language === lang.code
                      ? `bg-opacity-10 ${theme.background.highlight}`
                      : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.nativeName}</span>
                    <span className="text-xs opacity-70">({lang.name})</span>
                  </div>
                  {language === lang.code && (
                    <span className={theme.textColors.highlight}>
                      <FaCheck size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 gap-1">
              {secondRowLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                  }}
                  className={`navbar-desktop-dropdown-item ${theme.textColors.primary} ${
                    language === lang.code
                      ? `bg-opacity-10 ${theme.background.highlight}`
                      : ""
                  }`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.nativeName}</span>
                    <span className="text-xs opacity-70">({lang.name})</span>
                  </div>
                  {language === lang.code && (
                    <span className={theme.textColors.highlight}>
                      <FaCheck size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSwitchDropdown;