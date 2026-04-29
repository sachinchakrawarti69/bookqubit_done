"use client";

import { useState, useRef, useEffect } from "react";
import { FaPalette } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { themeName, changeTheme, availableThemes, theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeConfig = {
    light: { icon: "☀️", name: "Light" },
    dark: { icon: "🌙", name: "Dark" },
    forest: { icon: "🌲", name: "Forest" },
    cyberpunk: { icon: "🎮", name: "Cyberpunk" },
    lavender: { icon: "🌸", name: "Lavender" },
    midnight: { icon: "🌃", name: "Midnight" },
    ocean: { icon: "🌊", name: "Ocean" },
    rose: { icon: "🌹", name: "Rose" },
    sand: { icon: "🏖️", name: "Sand" },
    sepia: { icon: "📜", name: "Sepia" },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`navbar-desktop-darkmode-button ${theme.background?.navigationDots || ''} ${theme.border?.button || ''}`}
        aria-label="Theme switcher"
      >
        <FaPalette className={theme.textColors?.secondary || ''} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Select Theme
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Current: {themeConfig[themeName]?.name || themeName}
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {availableThemes.map((key) => {
              const config = themeConfig[key];
              if (!config) return null;
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    changeTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                    themeName === key
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {config.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {themeName === key ? "Active" : "Click to apply"}
                    </div>
                  </div>
                  {themeName === key && (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;