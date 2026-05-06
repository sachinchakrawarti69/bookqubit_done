"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaCheck } from "react-icons/fa";

const FontChanger = ({ isInline = false }) => {
  const { theme, themeName } = useTheme();
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

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  if (isInline) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {fonts.map((font) => {
          const isActive = currentFont === font.value;

          return (
            <button
              key={font.value}
              onClick={() => changeFont(font.value, font.font)}
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg
                transition-all duration-200 hover:scale-105
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
              <span className="text-sm">{font.name}</span>
              {isActive && <FaCheck className="w-3 h-3" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Original dropdown version
  return (
    <div className="relative">{/* Your existing dropdown code here */}</div>
  );
};

export default FontChanger;
