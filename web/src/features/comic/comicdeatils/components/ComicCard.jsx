"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import StarRating from "./StarRating";

const ComicCard = ({ comic, variant = "default", isDarkMode, theme, t }) => {
  const getCardStyles = () => {
    switch (variant) {
      case "compact":
        return "flex gap-4 p-3";
      case "featured":
        return "relative overflow-hidden";
      default:
        return "p-4";
    }
  };

  const getImageStyles = () => {
    switch (variant) {
      case "compact":
        return "w-24 h-32 object-cover rounded-lg";
      case "featured":
        return "w-full h-80 object-cover";
      default:
        return "w-full h-64 object-cover";
    }
  };

  if (variant === "compact") {
    return (
      <Link href={`/comics/${comic.slug}`} className="group block">
        <div
          className={`${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} rounded-lg hover:shadow-lg transition-all duration-300 ${getCardStyles()}`}
        >
          <img
            src={comic.image}
            alt={comic.title}
            className={getImageStyles()}
          />
          <div className="flex-1">
            <h4
              className={`font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-1 line-clamp-2`}
            >
              {comic.title}
            </h4>
            <p
              className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-2`}
            >
              {comic.publisher}
            </p>
            <StarRating
              rating={comic.rating}
              theme={theme}
              isDarkMode={isDarkMode}
              size="sm"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/comics/${comic.slug}`} className="group block">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={comic.image}
            alt={comic.title}
            className={getImageStyles()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-bold text-xl mb-2">
                {comic.title}
              </h3>
              <p className="text-gray-200 text-sm">{comic.publisher}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/comics/${comic.slug}`} className="group">
      <div
        className={`${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={comic.image}
            alt={comic.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className={getCardStyles()}>
          <h3
            className={`font-bold text-lg mb-2 ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} line-clamp-2`}
          >
            {comic.title}
          </h3>
          <p
            className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-2`}
          >
            {comic.publisher}
          </p>
          <div className="flex items-center justify-between">
            <StarRating
              rating={comic.rating}
              theme={theme}
              isDarkMode={isDarkMode}
              size="sm"
            />
            <span
              className={`text-sm font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}
            >
              {comic.coverPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ComicCard;
