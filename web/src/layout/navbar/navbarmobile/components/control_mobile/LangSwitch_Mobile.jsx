"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaLanguage, FaCheck, FaSearch, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const LangSwitch_Mobile = ({ onClose }) => {
  const { language, languages: originalLanguages, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Sort languages: English, Hindi, Urdu on top, then alphabetical by name
  const sortedLanguages = useMemo(() => {
    const priorityCodes = ["en", "hi", "ur"];
    const priorityLangs = [];
    const otherLangs = [];

    originalLanguages.forEach((lang) => {
      if (priorityCodes.includes(lang.code)) {
        priorityLangs.push(lang);
      } else {
        otherLangs.push(lang);
      }
    });

    // Sort priority languages in the order: en, hi, ur
    priorityLangs.sort((a, b) => {
      const aIndex = priorityCodes.indexOf(a.code);
      const bIndex = priorityCodes.indexOf(b.code);
      return aIndex - bIndex;
    });

    // Sort other languages alphabetically by name
    otherLangs.sort((a, b) => a.name.localeCompare(b.name));

    return [...priorityLangs, ...otherLangs];
  }, [originalLanguages]);

  // Filter languages based on search term
  const filteredLanguages = useMemo(() => {
    if (!searchTerm.trim()) return sortedLanguages;
    
    const term = searchTerm.toLowerCase();
    return sortedLanguages.filter((lang) => 
      lang.name.toLowerCase().includes(term) ||
      lang.nativeName.toLowerCase().includes(term) ||
      lang.code.toLowerCase().includes(term)
    );
  }, [sortedLanguages, searchTerm]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    setSearchTerm("");
    if (onClose) setTimeout(() => onClose(), 300);
  };

  const getCurrentLanguage = () => {
    const currentLang = sortedLanguages.find(lang => lang.code === language);
    return currentLang;
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  // Get active language display
  const activeLanguage = getCurrentLanguage();

  return (
    <>
      {/* Main Button showing current language */}
      <button
        onClick={() => setIsOpen(true)}
        className="mobile-control-button"
      >
        <span className="mobile-control-icon">
          <FaLanguage />
        </span>
        <span className="mobile-control-label">
          {activeLanguage?.nativeName || t("nav.language") || "Language"}
        </span>
        <span className="mobile-control-arrow">▼</span>
      </button>

      {/* Full Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaArrowLeft className="text-gray-600 dark:text-gray-400" size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Language
              </h2>
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-3 text-base rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FaTimes size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Languages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredLanguages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No languages found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                {filteredLanguages.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md"
                          : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{lang.flagEmoji || lang.flag}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-base font-semibold">{lang.nativeName}</div>
                        <div className={`text-sm opacity-70 ${isActive ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                          {lang.name}
                        </div>
                      </div>
                      {isActive && (
                        <FaCheck className="flex-shrink-0 text-white" size={16} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with Results Count */}
          {filteredLanguages.length > 0 && filteredLanguages.length !== sortedLanguages.length && (
            <div className="sticky bottom-0 p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              Showing {filteredLanguages.length} of {sortedLanguages.length} languages
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default LangSwitch_Mobile;