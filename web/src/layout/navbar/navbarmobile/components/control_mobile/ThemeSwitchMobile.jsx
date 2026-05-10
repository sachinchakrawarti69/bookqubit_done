"use client";

import React, { useState } from "react";
import { FaSun, FaMoon, FaPalette } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeSwitchMobile = ({ onClose }) => {
  const { theme, themeName, changeTheme, availableThemes } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: "light", label: t("themes.light") || "Light", icon: <FaSun />, gradient: "from-yellow-400 to-orange-500" },
    { name: "dark", label: t("themes.dark") || "Dark", icon: <FaMoon />, gradient: "from-gray-600 to-gray-800" },
    { name: "midnight", label: t("themes.midnight") || "Midnight", icon: <FaMoon />, gradient: "from-indigo-800 to-purple-900" },
    { name: "cyberpunk", label: t("themes.cyberpunk") || "Cyberpunk", icon: <FaPalette />, gradient: "from-pink-500 to-purple-600" },
    { name: "ocean", label: t("themes.ocean") || "Ocean", icon: <FaPalette />, gradient: "from-cyan-500 to-blue-600" },
    { name: "forest", label: t("themes.forest") || "Forest", icon: <FaPalette />, gradient: "from-emerald-500 to-green-600" },
    { name: "rose", label: t("themes.rose") || "Rose", icon: <FaPalette />, gradient: "from-rose-400 to-pink-500" },
    { name: "lavender", label: t("themes.lavender") || "Lavender", icon: <FaPalette />, gradient: "from-purple-400 to-indigo-500" },
  ];

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
    if (onClose) setTimeout(() => onClose(), 300);
  };

  return (
    <div className="mobile-theme-switch">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-control-button"
      >
        <span className="mobile-control-icon">
          <FaPalette />
        </span>
        <span className="mobile-control-label">
          {t("themes.theme") || "Theme"}
        </span>
        <span className="mobile-control-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mobile-theme-dropdown">
          <div className="mobile-theme-grid">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className={`mobile-theme-option ${themeName === theme.name ? "active" : ""}`}
              >
                <div className={`mobile-theme-icon bg-gradient-to-r ${theme.gradient}`}>
                  {theme.icon}
                </div>
                <span className="mobile-theme-name">{theme.label}</span>
                {themeName === theme.name && (
                  <span className="mobile-theme-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitchMobile;