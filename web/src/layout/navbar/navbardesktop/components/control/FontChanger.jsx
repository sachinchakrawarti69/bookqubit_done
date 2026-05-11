"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaCheck, FaFont, FaChevronDown, FaChevronUp } from "react-icons/fa";

const FontChanger = ({ isInline = false, onFontChange }) => {
  const { theme, themeName } = useTheme();
  const [currentFont, setCurrentFont] = useState("system");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const fonts = [
    { name: "System", value: "system", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    { name: "Inter", value: "inter", font: "'Inter', sans-serif" },
    { name: "Roboto", value: "roboto", font: "'Roboto', sans-serif" },
    { name: "Open Sans", value: "open-sans", font: "'Open Sans', sans-serif" },
    { name: "Lato", value: "lato", font: "'Lato', sans-serif" },
    { name: "Montserrat", value: "montserrat", font: "'Montserrat', sans-serif" },
    { name: "Merriweather", value: "merriweather", font: "'Merriweather', serif" },
    { name: "Playfair", value: "playfair", font: "'Playfair Display', serif" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("bookqubit-font");
    if (saved) {
      setCurrentFont(saved);
      const f = fonts.find(f => f.value === saved)?.font || fonts[0].font;
      document.body.style.fontFamily = f;
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontChange = (value, family) => {
    setCurrentFont(value);
    localStorage.setItem("bookqubit-font", value);
    document.body.style.fontFamily = family;
    onFontChange?.();
  };

  const getButtonClasses = (isActive = false) => {
    if (isActive) {
      return `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white shadow-md`;
    }
    return `
      ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}
      ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}
      border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}
      hover:scale-105 transition-all duration-300
    `;
  };

  // Inline version (used inside Control)
  if (isInline) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {fonts.map(font => {
          const isActive = currentFont === font.value;
          return (
            <button
              key={font.value}
              onClick={() => handleFontChange(font.value, font.font)}
              style={{ fontFamily: font.font }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${getButtonClasses(isActive)}`}
            >
              <span className={`text-sm font-medium ${isActive ? "text-white" : (theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900"))}`}>
                {font.name}
              </span>
              {isActive && <FaCheck className="w-3 h-3 text-white" />}
            </button>
          );
        })}
        <div className={`col-span-2 mt-3 pt-3 border-t ${theme.border?.default || (isDarkMode ? "border-gray-700" : "border-gray-200")}`}>
          <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")} mb-2 text-center`}>Preview</p>
          <p className={`text-center text-sm ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`} 
             style={{ fontFamily: fonts.find(f => f.value === currentFont)?.font }}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    );
  }

  // Standalone dropdown – not used inside Control, but kept
  const dropdownBg = theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white");
  const borderColor = theme.border?.default || (isDarkMode ? "border-gray-700" : "border-gray-200");
  const headerBg = theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-50");

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${getButtonClasses(false)}`}>
        <FaFont size={16} />
        <span className="text-sm font-medium hidden sm:inline">{fonts.find(f => f.value === currentFont)?.name || "System"}</span>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border z-50 overflow-hidden ${dropdownBg} ${borderColor}`}>
          <div className={`px-4 py-3 border-b ${headerBg} ${borderColor}`}>
            <h3 className={`text-sm font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>Choose Font</h3>
            <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")} mt-1`}>Select your preferred reading font</p>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {fonts.map(font => {
                const isActive = currentFont === font.value;
                return (
                  <button
                    key={font.value}
                    onClick={() => handleFontChange(font.value, font.font)}
                    style={{ fontFamily: font.font }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${getButtonClasses(isActive)}`}
                  >
                    <span className={`text-sm font-medium ${isActive ? "text-white" : (theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900"))}`}>
                      {font.name}
                    </span>
                    {isActive && <FaCheck className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={`px-4 py-2 border-t text-center ${headerBg} ${borderColor}`}>
            <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>Font settings are saved automatically</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontChanger;