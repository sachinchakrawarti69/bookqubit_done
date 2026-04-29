"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ darkMode = false, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    // You can also navigate to a search results page
    // router.push(`/search?q=${encodeURIComponent(query)}`);
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
          focus:outline-none focus:ring-2 focus:ring-blue-400
          ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }
        `}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
}