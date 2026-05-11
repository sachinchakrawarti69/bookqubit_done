"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  FaLanguage,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/themes/useTheme";

const LangSwitchDropdown = ({ mobile = false, onItemClick }) => {
  const {
    language,
    languages: originalLanguages,
    isLanguageMenuOpen,
    toggleLanguageMenu,
    setLanguage,
    t,
  } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Check if current language is RTL
  const isRTL = useMemo(() => {
    const rtlLanguages = ['ur', 'ar', 'he', 'fa', 'ps', 'sd'];
    return rtlLanguages.includes(language);
  }, [language]);

  // Sort languages: English first, then alphabetical by name
  const languages = useMemo(() => {
    return [...originalLanguages].sort((a, b) => {
      // English always first
      if (a.code === "en") return -1;
      if (b.code === "en") return 1;
      // Sort alphabetically by name
      return a.name.localeCompare(b.name);
    });
  }, [originalLanguages]);

  // Filter languages based on search term
  const filteredLanguages = useMemo(() => {
    if (!searchTerm.trim()) return languages;
    
    const term = searchTerm.toLowerCase();
    return languages.filter(lang => 
      lang.name.toLowerCase().includes(term) ||
      lang.nativeName.toLowerCase().includes(term) ||
      lang.code.toLowerCase().includes(term)
    );
  }, [languages, searchTerm]);

  // Calculate dropdown position to prevent going off-screen
  const calculatePosition = () => {
    if (!buttonRef.current || typeof window === "undefined") return {};
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownWidth = 520;
    const margin = 10; // Small margin from edges
    
    let position = {};
    
    if (isRTL) {
      // For RTL languages, align to the LEFT edge of the button and check left side
      const dropdownLeft = buttonRect.left;
      
      // Check if dropdown would go off the LEFT edge
      if (dropdownLeft - dropdownWidth < 0) {
        // If goes off left edge, align to left edge of viewport with margin
        position.left = `${margin}px`;
        position.right = 'auto';
      } else {
        // Normal RTL positioning - align to left of button
        position.left = '0';
        position.right = 'auto';
      }
      
      // Also check if it goes off the RIGHT edge (for very wide screens)
      if (buttonRect.left + dropdownWidth > viewportWidth) {
        position.right = `${margin}px`;
        position.left = 'auto';
      }
    } else {
      // For LTR languages, align to the LEFT edge of button
      // Check if dropdown would go off the RIGHT edge
      if (buttonRect.left + dropdownWidth > viewportWidth) {
        // If goes off right edge, align to right edge of viewport
        position.right = `${margin}px`;
        position.left = 'auto';
      } else if (buttonRect.left < 0) {
        // If goes off left edge, align to left edge
        position.left = `${margin}px`;
        position.right = 'auto';
      } else {
        // Normal LTR positioning
        position.left = '0';
        position.right = 'auto';
      }
    }
    
    return position;
  };

  // Update position when dropdown opens or window resizes
  useEffect(() => {
    if (isOpen) {
      const updatePosition = () => {
        setDropdownPosition(calculatePosition());
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, isRTL, language]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    setSearchTerm("");
    if (onItemClick) onItemClick();
  };

  const toggleDropdown = () => {
    if (mobile) {
      toggleLanguageMenu();
    } else {
      setIsOpen(!isOpen);
      if (!isOpen) setSearchTerm("");
    }
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find((lang) => lang.code === language);
    return currentLang?.nativeName || "English";
  };

  // Mobile version
  if (mobile) {
    return (
      <div className="navbar-mobile-dropdown">
        <div
          onClick={toggleDropdown}
          className={`navbar-mobile-dropdown-button ${theme.textColors.primary}`}
          dir={isRTL ? "rtl" : "ltr"}
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
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Search Bar for Mobile */}
            <div className="p-3 border-b" style={{ borderColor: theme.border?.default || "#e5e7eb" }}>
              <div className="relative">
                <FaSearch className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={14} />
                <input
                  type="text"
                  placeholder={t("nav.searchLanguages") || "Search languages..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-lg border ${theme.background.card} ${theme.textColors.primary} ${theme.border.default} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-2 p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      language === lang.code
                        ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white border-transparent`
                        : `${theme.background?.card || "bg-white"} ${theme.textColors?.primary || "text-gray-900"} ${theme.border?.default || "border-gray-200"} hover:${theme.background?.highlight || "bg-gray-50"}`
                    } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{
                      width: "100%",
                      textAlign: isRTL ? "right" : "left",
                    }}
                    dir={lang.code === 'ur' ? 'rtl' : 'ltr'}
                  >
                    <span className="text-xl order-1">{lang.flagEmoji || lang.flag}</span>
                    <div className="flex-1">
                      <div 
                        className={`text-sm font-medium ${lang.code === 'ur' ? 'font-urdu' : ''}`}
                        style={{ fontFamily: lang.code === "ur" ? "'Noto Nastaliq Urdu', serif" : "inherit" }}
                      >
                        {lang.nativeName}
                      </div>
                      <div className="text-xs opacity-70">{lang.name}</div>
                    </div>
                    {language === lang.code && (
                      <FaCheck size={14} className={`text-white flex-shrink-0 ${isRTL ? 'order-3' : ''}`} />
                    )}
                  </button>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  {t("nav.noLanguagesFound") || "No languages found"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version - Grid layout with boxes
  return (
    <div
      className="navbar-desktop-dropdown-container relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        ref={buttonRef}
        className={`navbar-desktop-dropdown-button ${theme.textColors.primary} flex items-center gap-2 cursor-pointer`}
        dir={isRTL ? "rtl" : "ltr"}
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
          ref={dropdownRef}
          className={`navbar-desktop-dropdown-menu ${theme.background.section} ${theme.border.default} ${theme.shadow.container}`}
          style={{ 
            minWidth: "520px", 
            padding: "0",
            position: "absolute",
            top: "100%",
            marginTop: "8px",
            zIndex: 1000,
            ...dropdownPosition
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Search Bar */}
          <div className="p-3 border-b" style={{ borderColor: theme.border?.default || "#e5e7eb" }}>
            <div className="relative">
              <FaSearch className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={14} />
              <input
                type="text"
                placeholder={t("nav.searchLanguages") || "Search languages..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-lg border ${theme.background.card} ${theme.textColors.primary} ${theme.border.default} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </div>
          
          <div style={{ padding: "12px", maxHeight: "400px", overflowY: "auto" }}>
            <div className={`grid grid-cols-4 gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      language === lang.code
                        ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white border-transparent shadow-md`
                        : `${theme.background?.card || "bg-white"} ${theme.textColors?.primary || "text-gray-900"} ${theme.border?.default || "border-gray-200"} hover:${theme.background?.highlight || "bg-gray-50"} hover:shadow-sm`
                    } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{
                      width: "100%",
                      textAlign: isRTL ? "right" : "left",
                      cursor: "pointer",
                    }}
                    dir={lang.code === 'ur' ? 'rtl' : 'ltr'}
                  >
                    <span className="text-xl order-1">{lang.flagEmoji || lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div 
                        className={`text-sm font-medium truncate ${lang.code === 'ur' ? 'font-urdu' : ''}`}
                        style={{ fontFamily: lang.code === "ur" ? "'Noto Nastaliq Urdu', serif" : "inherit" }}
                      >
                        {lang.nativeName}
                      </div>
                      <div className="text-xs opacity-70 truncate">{lang.name}</div>
                    </div>
                    {language === lang.code && (
                      <FaCheck size={12} className={`flex-shrink-0 ${isRTL ? 'order-3' : ''}`} />
                    )}
                  </button>
                ))
              ) : (
                <div className="col-span-4 text-center py-8 text-gray-500">
                  {t("nav.noLanguagesFound") || "No languages found"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSwitchDropdown;