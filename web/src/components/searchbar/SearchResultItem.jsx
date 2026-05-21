"use client";

import React from "react";
import { FaBook, FaUser, FaStar } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import "./SearchResultItem.css";

const SearchResultItem = ({ result, type, onSelect }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const getIcon = () => {
    const iconClass = `result-icon ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`;
    switch (type) {
      case "book":
        return <FaBook className={iconClass} />;
      case "author":
        return <FaUser className={iconClass} />;
      case "genre":
        return <FaStar className={iconClass} />;
      default:
        return <FaBook className={iconClass} />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "book":
        return t("search.type.book") || "Book";
      case "author":
        return t("search.type.author") || "Author";
      case "genre":
        return t("search.type.genre") || "Genre";
      default:
        return t("search.type.result") || "Result";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "book":
        return "result-type-book";
      case "author":
        return "result-type-author";
      case "genre":
        return "result-type-genre";
      default:
        return "result-type-default";
    }
  };

  // Handle item click
  const handleClick = () => {
    if (onSelect) {
      onSelect(result);
    }
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`search-result-item 
        ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
      `}
      onClick={handleClick}
    >
      <div className="result-icon-wrapper">
        {getIcon()}
      </div>
      
      <div className={`result-content ${textAlign}`}>
        <h4 className={`result-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          {result.title || result.name}
        </h4>

        {result.author && (
          <p className={`result-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            <span className="result-author-label">{t("book.by") || "by"}</span> 
            <span className={`result-author-name ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}>
              {" "}{result.author}
            </span>
          </p>
        )}

        {result.rating && (
          <div className={`result-rating ${flexDirection}`}>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`rating-star ${
                    i < Math.floor(result.rating) 
                      ? `filled ${theme.iconColors?.starFilled || "text-amber-400"}` 
                      : theme.iconColors?.starEmpty || "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={`rating-value ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
              {result.rating.toFixed(1)}
            </span>
          </div>
        )}

        {result.description && (
          <p className={`result-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
            {result.description.length > 80 
              ? `${result.description.substring(0, 80)}...` 
              : result.description}
          </p>
        )}

        {result.books && (
          <p className={`result-meta ${theme.textColors?.secondary || (isDarkMode ? "text-gray-500" : "text-gray-500")}`}>
            {result.books} {t("book.books") || "books"}
          </p>
        )}

        {result.year && (
          <p className={`result-meta ${theme.textColors?.secondary || (isDarkMode ? "text-gray-500" : "text-gray-500")}`}>
            {t("book.published")}: {result.year}
          </p>
        )}
      </div>
      
      <span className={`result-type ${getTypeColor()} ${
        type === "book" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
        type === "author" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      }`}>
        {getTypeLabel()}
      </span>
    </div>
  );
};

export default SearchResultItem;