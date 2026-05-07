"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaCheck } from "react-icons/fa";

const FontChanger_Mobile = () => {
  const { theme, themeName } = useTheme();
  const [currentFont, setCurrentFont] = useState("system");

  const fonts = [
    { name: "System", value: "system", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
    { name: "Inter", value: "inter", font: "'Inter', -apple-system, sans-serif" },
    { name: "Roboto", value: "roboto", font: "'Roboto', sans-serif" },
    { name: "Open Sans", value: "open-sans", font: "'Open Sans', sans-serif" },
    { name: "Lato", value: "lato", font: "'Lato', sans-serif" },
    { name: "Montserrat", value: "montserrat", font: "'Montserrat', sans-serif" },
    { name: "Merriweather", value: "merriweather", font: "'Merriweather', serif" },
    { name: "Playfair", value: "playfair", font: "'Playfair Display', serif" },
  ];

  useEffect(() => {
    const savedFont = localStorage.getItem("bookqubit-font");
    if (savedFont) {
      setCurrentFont(savedFont);
      const fontFamily = fonts.find(f => f.value === savedFont)?.font || fonts[0].font;
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

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <div className="space-y-2">
      <h3 className={`text-sm font-medium mb-3 ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
        Select Font
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {fonts.map((font) => {
          const isActive = currentFont === font.value;

          return (
            <button
              key={font.value}
              onClick={() => changeFont(font.value, font.font)}
              className={`
                flex items-center justify-between px-4 py-3 rounded-xl
                transition-all duration-200 active:scale-[0.98]
                ${
                  isActive
                    ? (theme.buttonColors?.primaryButton?.background ||
                        "bg-gradient-to-r from-sky-600 to-sky-500") +
                      " text-white"
                    : `${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} 
                       ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} 
                       border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}`
                }
              `}
              style={{ fontFamily: font.font }}
            >
              <span className="text-base font-medium">{font.name}</span>
              {isActive && <FaCheck className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Font Preview */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'} mb-3 text-center`}>
          Preview
        </p>
        <p 
          className={`text-center text-base ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}
          style={{ fontFamily: fonts.find(f => f.value === currentFont)?.font }}
        >
          The quick brown fox jumps over the lazy dog
          <br />
          1234567890
        </p>
      </div>
    </div>
  );
};

export default FontChanger_Mobile;