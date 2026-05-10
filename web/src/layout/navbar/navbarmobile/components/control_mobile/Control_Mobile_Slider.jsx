"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaSun, FaMoon, FaPalette, FaLanguage, FaTextHeight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./Control_Mobile_Slider.css";

const Control_Mobile_Slider = () => {
  const { theme, themeName, changeTheme } = useTheme();
  const { t, language, languages, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("theme");
  const [currentFontSize, setCurrentFontSize] = useState("medium");
  const sliderRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Font sizes
  const fontSizes = [
    { id: "small", label: "Small", size: "14px", scale: 0.9 },
    { id: "medium", label: "Medium", size: "16px", scale: 1.0 },
    { id: "large", label: "Large", size: "18px", scale: 1.1 },
    { id: "xlarge", label: "Extra Large", size: "20px", scale: 1.2 },
  ];

  // All available themes
  const themes = [
    { name: "light", label: "Light", icon: <FaSun />, gradient: "from-yellow-400 to-orange-500" },
    { name: "dark", label: "Dark", icon: <FaMoon />, gradient: "from-gray-600 to-gray-800" },
    { name: "midnight", label: "Midnight", icon: <FaMoon />, gradient: "from-indigo-800 to-purple-900" },
    { name: "cyberpunk", label: "Cyberpunk", icon: <FaPalette />, gradient: "from-pink-500 to-purple-600" },
    { name: "ocean", label: "Ocean", icon: <FaPalette />, gradient: "from-cyan-500 to-blue-600" },
    { name: "forest", label: "Forest", icon: <FaPalette />, gradient: "from-emerald-500 to-green-600" },
    { name: "rose", label: "Rose", icon: <FaPalette />, gradient: "from-rose-400 to-pink-500" },
    { name: "lavender", label: "Lavender", icon: <FaPalette />, gradient: "from-purple-400 to-indigo-500" },
  ];

  // Languages list
  const languageList = [
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
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  ];

  const toggleSlider = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeSlider = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleThemeChange = (themeNameValue) => {
    changeTheme(themeNameValue);
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
  };

  const handleFontChange = (fontId) => {
    setCurrentFontSize(fontId);
    const font = fontSizes.find(f => f.id === fontId);
    if (font) {
      document.documentElement.style.fontSize = font.size;
      localStorage.setItem("bookqubit_font_size", fontId);
    }
  };

  // Load saved font size
  useEffect(() => {
    const savedFontSize = localStorage.getItem("bookqubit_font_size");
    if (savedFontSize) {
      setCurrentFontSize(savedFontSize);
      const font = fontSizes.find(f => f.id === savedFontSize);
      if (font) {
        document.documentElement.style.fontSize = font.size;
      }
    }
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeSlider();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target) && isOpen) {
        closeSlider();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getIconColor = () => {
    if (isDarkMode) return "#60a5fa";
    return "#0ea5e9";
  };

  return (
    <>
      {/* Control Button - ICON ONLY */}
      <button
        onClick={toggleSlider}
        className="navbar-mobile-icon-button"
        aria-label="Settings"
        title="Settings"
        style={{ color: getIconColor() }}
      >
        <IoSettingsOutline size={20} />
      </button>

      {/* Slider Panel - Always Slides from RIGHT for all languages */}
      <div
        ref={sliderRef}
        className={`mobile-control-slider ${isOpen ? "open" : ""} ${isDarkMode ? "dark" : "light"}`}
      >
        {/* Header */}
        <div className="mobile-slider-header">
          <h3 className={`mobile-slider-title ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Customize Your Experience
          </h3>
          <button 
            onClick={closeSlider} 
            className="mobile-slider-close" 
            aria-label="Close"
          >
            <FaTimes className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
          </button>
        </div>

        {/* Top Three Icons */}
        <div className="mobile-slider-tabs">
          <button
            onClick={() => setActiveTab("theme")}
            className={`mobile-slider-tab ${activeTab === "theme" ? "active" : ""} ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            <div className="mobile-slider-tab-icon">🎨</div>
            <span className="mobile-slider-tab-label">Theme</span>
          </button>
          <button
            onClick={() => setActiveTab("language")}
            className={`mobile-slider-tab ${activeTab === "language" ? "active" : ""} ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            <div className="mobile-slider-tab-icon">🌐</div>
            <span className="mobile-slider-tab-label">Language</span>
          </button>
          <button
            onClick={() => setActiveTab("font")}
            className={`mobile-slider-tab ${activeTab === "font" ? "active" : ""} ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            <div className="mobile-slider-tab-icon">🔤</div>
            <span className="mobile-slider-tab-label">Font</span>
          </button>
        </div>

        {/* Content - List View (No Boxes) */}
        <div className="mobile-slider-content">
          {/* Theme List */}
          {activeTab === "theme" && (
            <div className="mobile-list-container">
              {themes.map((themeItem) => (
                <button
                  key={themeItem.name}
                  onClick={() => handleThemeChange(themeItem.name)}
                  className={`mobile-list-item ${themeName === themeItem.name ? "active" : ""}`}
                >
                  <div className={`mobile-list-icon bg-gradient-to-r ${themeItem.gradient}`}>
                    {themeItem.icon}
                  </div>
                  <span className={`mobile-list-label ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {themeItem.label}
                  </span>
                  {themeName === themeItem.name && (
                    <span className="mobile-list-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Language List */}
          {activeTab === "language" && (
            <div className="mobile-list-container">
              {languageList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`mobile-list-item ${language === lang.code ? "active" : ""}`}
                >
                  <div className="mobile-list-icon">
                    <span className="text-xl">{lang.flag}</span>
                  </div>
                  <div className="mobile-list-info">
                    <span className={`mobile-list-label ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {lang.nativeName}
                    </span>
                    <span className={`mobile-list-sub ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {lang.name}
                    </span>
                  </div>
                  {language === lang.code && (
                    <span className="mobile-list-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Font Size List */}
          {activeTab === "font" && (
            <div className="mobile-list-container">
              {fontSizes.map((font) => (
                <button
                  key={font.id}
                  onClick={() => handleFontChange(font.id)}
                  className={`mobile-list-item ${currentFontSize === font.id ? "active" : ""}`}
                >
                  <div className="mobile-list-icon">
                    <span className="text-lg">Aa</span>
                  </div>
                  <div className="mobile-list-info">
                    <span className={`mobile-list-label ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {font.label}
                    </span>
                    <span className={`mobile-list-sub ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} style={{ fontSize: font.size }}>
                      Preview text
                    </span>
                  </div>
                  {currentFontSize === font.id && (
                    <span className="mobile-list-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mobile-slider-footer">
          <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Customize your reading experience
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="mobile-control-overlay" onClick={closeSlider}></div>}
    </>
  );
};

export default Control_Mobile_Slider;