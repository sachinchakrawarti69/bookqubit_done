"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { theme, themeName } = useTheme();

  if (!theme) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

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
          focus:outline-none focus:ring-2 focus:ring-sky-500
          transition-all duration-200
          ${isDarkMode 
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }
        `}
      />
      <button
        type="submit"
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
          isDarkMode ? "text-gray-400 hover:text-sky-400" : "text-gray-400 hover:text-sky-600"
        }`}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
}