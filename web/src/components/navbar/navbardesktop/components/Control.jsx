"use client";

import { useState, useRef, useEffect } from "react";
import { AiFillControl } from "react-icons/ai";
import {
  FaPalette,
  FaFont,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaSun,
  FaMoon,
  FaTree,
  FaGamepad,
  FaWater,
  FaHeart,
  FaBook,
  FaStar,
  FaFeather,
  FaMountain,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("theme");
  const dropdownRef = useRef(null);
  const { theme, themeName, changeTheme, availableThemes } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Theme configuration with valid icons
  const themeConfig = {
    light: { icon: <FaSun />, name: "Light", color: "text-yellow-500" },
    dark: { icon: <FaMoon />, name: "Dark", color: "text-indigo-400" },
    forest: { icon: <FaTree />, name: "Forest", color: "text-green-500" },
    cyberpunk: {
      icon: <FaGamepad />,
      name: "Cyberpunk",
      color: "text-cyan-400",
    },
    lavender: {
      icon: <FaFeather />,
      name: "Lavender",
      color: "text-purple-400",
    },
    midnight: { icon: <FaStar />, name: "Midnight", color: "text-blue-400" },
    ocean: { icon: <FaWater />, name: "Ocean", color: "text-cyan-500" },
    rose: { icon: <FaHeart />, name: "Rose", color: "text-pink-500" },
    sand: { icon: <FaMountain />, name: "Sand", color: "text-amber-500" },
    sepia: { icon: <FaBook />, name: "Sepia", color: "text-amber-700" },
  };

  // Font configuration
  const [currentFont, setCurrentFont] = useState("system");
  const fonts = [
    {
      name: "System",
      value: "system",
      font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    {
      name: "Inter",
      value: "inter",
      font: "'Inter', -apple-system, sans-serif",
    },
    { name: "Roboto", value: "roboto", font: "'Roboto', sans-serif" },
    { name: "Open Sans", value: "open-sans", font: "'Open Sans', sans-serif" },
    { name: "Lato", value: "lato", font: "'Lato', sans-serif" },
    {
      name: "Montserrat",
      value: "montserrat",
      font: "'Montserrat', sans-serif",
    },
    {
      name: "Merriweather",
      value: "merriweather",
      font: "'Merriweather', serif",
    },
    { name: "Playfair", value: "playfair", font: "'Playfair Display', serif" },
  ];

  // Load saved font
  useEffect(() => {
    const savedFont = localStorage.getItem("bookqubit-font");
    if (savedFont) {
      setCurrentFont(savedFont);
      const fontFamily =
        fonts.find((f) => f.value === savedFont)?.font || fonts[0].font;
      document.documentElement.style.setProperty("--font-family", fontFamily);
      document.body.style.fontFamily = fontFamily;
    }
  }, []);

  const changeFont = (fontValue, fontFamily) => {
    setCurrentFont(fontValue);
    localStorage.setItem("bookqubit-font", fontValue);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.body.style.fontFamily = fontFamily;
  };

  const getButtonClasses = (isActive = false) => {
    if (isActive) {
      return `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`;
    }
    return `${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} 
            ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} 
            border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Control Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          transition-all duration-200 hover:scale-105
          ${getButtonClasses()}
        `}
        aria-label="Controls"
      >
        <AiFillControl size={18} />

        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Header with Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("theme")}
              className={`
                flex-1 px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  activeTab === "theme"
                    ? `${theme.textColors?.highlight || "text-sky-600"} border-b-2 border-sky-500`
                    : `${theme.textColors?.secondary || "text-gray-500"} hover:text-gray-700 dark:hover:text-gray-300`
                }
              `}
            >
              <div className="flex items-center justify-center gap-2">
                <FaPalette size={14} />
                Theme
              </div>
            </button>
            <button
              onClick={() => setActiveTab("font")}
              className={`
                flex-1 px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  activeTab === "font"
                    ? `${theme.textColors?.highlight || "text-sky-600"} border-b-2 border-sky-500`
                    : `${theme.textColors?.secondary || "text-gray-500"} hover:text-gray-700 dark:hover:text-gray-300`
                }
              `}
            >
              <div className="flex items-center justify-center gap-2">
                <FaFont size={14} />
                Font
              </div>
            </button>
          </div>

          {/* Theme Tab Content */}
          {activeTab === "theme" && (
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {availableThemes.map((key) => {
                  const config = themeConfig[key];
                  if (!config) return null;
                  const isActive = themeName === key;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        changeTheme(key);
                      }}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200 hover:scale-105
                        ${isActive ? getButtonClasses(true) : getButtonClasses(false)}
                      `}
                    >
                      <span className={`text-lg ${config.color}`}>
                        {config.icon}
                      </span>
                      <span className="flex-1 text-left text-sm font-medium">
                        {config.name}
                      </span>
                      {isActive && <FaCheck className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Font Tab Content */}
          {activeTab === "font" && (
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((font) => {
                  const isActive = currentFont === font.value;

                  return (
                    <button
                      key={font.value}
                      onClick={() => changeFont(font.value, font.font)}
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-lg
                        transition-all duration-200 hover:scale-105
                        ${isActive ? getButtonClasses(true) : getButtonClasses(false)}
                      `}
                      style={{ fontFamily: font.font }}
                    >
                      <span className="text-sm font-medium">{font.name}</span>
                      {isActive && <FaCheck className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>

              {/* Font Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p
                  className={`text-xs ${theme.textColors?.secondary || "text-gray-500"} mb-2 text-center`}
                >
                  Preview
                </p>
                <p
                  className={`text-center text-sm ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{
                    fontFamily: fonts.find((f) => f.value === currentFont)
                      ?.font,
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Settings are saved automatically
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;
