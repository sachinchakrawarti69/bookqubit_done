"use client";

import { useState, useRef, useEffect } from "react";
import { AiFillControl } from "react-icons/ai";
import {
  FaPalette,
  FaFont,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import ThemeSwitchDropdown_Mobile from "./ThemeSwitchDropdown_Mobile";
import FontChanger_Mobile from "./FontChanger_Mobile";

const Control_Mobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("theme");
  const { theme, themeName } = useTheme();

  if (!theme) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getButtonClasses = () => {
    return `${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} 
            ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} 
            border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}`;
  };

  return (
    <>
      {/* Control Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          transition-all duration-200 hover:scale-105
          ${getButtonClasses()}
        `}
        aria-label="Controls"
      >
        <AiFillControl size={18} />
        <span className="text-sm font-medium hidden sm:inline">Controls</span>
      </button>

      {/* Sliding Panel from Right */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[1000] animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Sliding Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-[1001] bg-white dark:bg-gray-900 shadow-2xl animate-slide-in-right overflow-y-auto">
            {/* Header */}
            <div className={`sticky top-0 flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} bg-inherit`}>
              <h2 className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                Customize
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaTimes size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setActiveTab("theme")}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeTab === "theme"
                    ? `${theme.textColors?.highlight || "text-sky-600"} border-b-2 border-sky-600`
                    : `${theme.textColors?.secondary || "text-gray-500"}`
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaPalette size={14} />
                  Theme
                </div>
              </button>
              <button
                onClick={() => setActiveTab("font")}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeTab === "font"
                    ? `${theme.textColors?.highlight || "text-sky-600"} border-b-2 border-sky-600`
                    : `${theme.textColors?.secondary || "text-gray-500"}`
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaFont size={14} />
                  Font
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {activeTab === "theme" ? (
                <ThemeSwitchDropdown_Mobile />
              ) : (
                <FontChanger_Mobile />
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
              <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'}`}>
                Settings are saved automatically
              </p>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Control_Mobile;