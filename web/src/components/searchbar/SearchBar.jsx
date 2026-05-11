"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { theme, themeName } = useTheme();

  if (!theme) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Use theme classes with fallbacks
  const inputBg = theme.background?.input || (isDarkMode ? "bg-gray-800" : "bg-white");
  const inputBorder = theme.border?.input || (isDarkMode ? "border-gray-700" : "border-gray-300");
  const inputText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const inputPlaceholder = isDarkMode ? "placeholder-gray-400" : "placeholder-gray-500";
  const ringColor = "focus:ring-sky-500 focus:border-sky-500";
  const iconColor = isDarkMode ? "text-gray-400 hover:text-sky-400" : "text-gray-400 hover:text-sky-600";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books, authors, genres..."
        className={`
          w-full px-4 py-2 pr-10 rounded-full border
          focus:outline-none focus:ring-2
          transition-all duration-200
          ${inputBg} ${inputBorder} ${inputText} ${inputPlaceholder} ${ringColor}
        `}
      />
      <button
        type="submit"
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${iconColor}`}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
}