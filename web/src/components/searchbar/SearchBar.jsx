"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaSearch,
  FaTimes,
  FaBook,
  FaUser,
  FaFire,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import "./SearchBar.css"; // Changed from "../styles/SearchBar.css" to "./SearchBar.css"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef(null);
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign } = useRTL();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Clear search when route changes
  useEffect(() => {
    setSearchQuery("");
    setIsFocused(false);
  }, [pathname]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const handleHintClick = (hint) => {
    setSearchQuery(hint);
    searchInputRef.current?.focus();
  };

  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  return (
    <div className="search-bar-wrapper" dir={direction} style={fontStyle}>
      <form onSubmit={handleSearch} className="search-bar">
        <div
          className={`search-bar-container ${
            theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")
          } ${isFocused ? "focused" : ""}`}
          style={{
            boxShadow: isFocused
              ? `0 8px 20px ${
                  isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"
                }`
              : theme.shadow?.container || "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="search-icon-wrapper">
            <FaSearch
              className={`search-icon ${
                isFocused
                  ? theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"
                  : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"
              }`}
            />
          </div>

          <input
            ref={searchInputRef}
            type="text"
            placeholder={t("search.placeholder") || "Search books, authors, and genres..."}
            className={`search-input ${
              theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")
            } ${textAlign}`}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />

          {searchQuery && (
            <button
              type="button"
              className={`clear-button ${
                theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")
              }`}
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

          <button
            type="submit"
            className={`search-button ${
              theme.buttonColors?.primaryButton?.background ||
              "bg-gradient-to-r from-sky-600 to-sky-500"
            }`}
            aria-label="Search"
            disabled={!searchQuery.trim()}
          >
            <FaSearch className={theme.buttonColors?.primaryButton?.textColor || "text-white"} />
          </button>

          <div className="search-glow"></div>
          <div className="search-border-gradient"></div>
        </div>

        {/* Quick search hints */}
        {isFocused && !searchQuery && (
          <div
            className={`search-hints ${
              theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")
            }`}
          >
            <span className="hint-label">{t("search.try") || "Try: "}</span>
            <button
              type="button"
              className={`hint-tag ${
                theme.background?.navigationDots ||
                (isDarkMode ? "bg-gray-700" : "bg-gray-100")
              }`}
              onClick={() => handleHintClick("Harry Potter")}
            >
              <FaBook className="hint-icon" /> Harry Potter
            </button>
            <button
              type="button"
              className={`hint-tag ${
                theme.background?.navigationDots ||
                (isDarkMode ? "bg-gray-700" : "bg-gray-100")
              }`}
              onClick={() => handleHintClick("Stephen King")}
            >
              <FaUser className="hint-icon" /> Stephen King
            </button>
            <button
              type="button"
              className={`hint-tag ${
                theme.background?.navigationDots ||
                (isDarkMode ? "bg-gray-700" : "bg-gray-100")
              }`}
              onClick={() => handleHintClick("Fantasy")}
            >
              <FaFire className="hint-icon" /> Fantasy
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
export { SearchBar };