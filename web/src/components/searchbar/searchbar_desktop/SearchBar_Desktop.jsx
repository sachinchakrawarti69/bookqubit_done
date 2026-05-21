// d:/Projects/done/bookqubit_done/web/src/components/searchbar/searchbar_desktop/SearchBar_Desktop.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchDropdown from "./components/SearchDropdown";
import SearchResultPage_Desktop from "./components/SearchResultPage_Desktop";
import "./SearchBar_Desktop.css";

const SearchBar_Desktop = ({
  onSearch,
  placeholder,
  suggestions = [],
  recentSearches: externalRecentSearches,
  onClearRecent,
  maxSuggestions = 8,
  autoFocus = false,
}) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
      }
    }
  }, []);

  // Use external recent searches if provided, otherwise use internal state
  const displayRecentSearches = externalRecentSearches || recentSearches;

  // Auto focus on mount if specified
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = suggestions
        .filter(
          (suggestion) =>
            suggestion.title?.toLowerCase().includes(query.toLowerCase()) ||
            suggestion.author?.toLowerCase().includes(query.toLowerCase()) ||
            suggestion.category?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, maxSuggestions);
      setFilteredSuggestions(filtered);
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(displayRecentSearches.length > 0);
    }
    setSelectedIndex(-1);
  }, [query, suggestions, displayRecentSearches, maxSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      const totalItems = filteredSuggestions.length + displayRecentSearches.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < filteredSuggestions.length) {
              handleSuggestionClick(filteredSuggestions[selectedIndex]);
            } else {
              const recentIndex = selectedIndex - filteredSuggestions.length;
              if (recentIndex >= 0 && recentIndex < displayRecentSearches.length) {
                handleRecentClick(displayRecentSearches[recentIndex]);
              }
            }
          } else if (query.trim()) {
            // Open search results page on Enter
            handleOpenSearchPage();
          }
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredSuggestions, displayRecentSearches, query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setIsLoading(true);
    setIsOpen(false);

    if (onSearch) {
      onSearch(suggestion.title, suggestion);
    } else {
      // Fixed: Changed from /book/ to /books/
      const slug = suggestion.slug || suggestion.id;
      router.push(`/books/${slug}`);
    }

    saveToRecentSearches(suggestion.title);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRecentClick = (recent) => {
    setQuery(recent);
    setIsLoading(true);
    setIsOpen(false);
    
    // Open search results page for recent search
    setShowSearchPage(true);
    
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleOpenSearchPage = () => {
    if (query.trim()) {
      setIsOpen(false);
      setShowSearchPage(true);
      saveToRecentSearches(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    setIsOpen(false);
  };

  const saveToRecentSearches = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;

    setRecentSearches(prev => {
      const updated = [
        searchTerm,
        ...prev.filter((s) => s !== searchTerm),
      ].slice(0, 10);
      
      // Save to localStorage
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      
      // Notify parent if callback provided
      if (onClearRecent) {
        onClearRecent(updated);
      }
      
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
    if (onClearRecent) onClearRecent([]);
    setIsOpen(false);
  };

  const handleCloseSearchPage = () => {
    setShowSearchPage(false);
    // Optionally clear query when closing
    // setQuery("");
  };

  const defaultPlaceholder =
    t("search.placeholder") || "Search for books, authors, or genres...";

  return (
    <>
      <div ref={searchRef} className="searchbar-desktop-container" style={{ position: 'relative' }}>
        <div
          className={`searchbar-desktop ${isDarkMode ? "dark" : "light"} ${isOpen ? "expanded" : ""}`}
        >
          {/* Search Icon */}
          <div className="search-icon">
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <FaSearch
                className={`icon ${theme.textColors?.secondary || "text-gray-400"}`}
                size={18}
              />
            )}
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder || defaultPlaceholder}
            className={`search-input ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
            aria-label="Search"
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
              type="button"
            >
              <FaTimes
                className={`icon ${theme.textColors?.secondary || "text-gray-400"}`}
                size={16}
              />
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {isOpen && (
          <SearchDropdown
            query={query}
            filteredSuggestions={filteredSuggestions}
            recentSearches={displayRecentSearches}
            selectedIndex={selectedIndex}
            onSuggestionClick={handleSuggestionClick}
            onRecentClick={handleRecentClick}
            onClearRecent={clearRecentSearches}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Search Results Page Modal/Page */}
      {showSearchPage && (
        <SearchResultPage_Desktop
          initialQuery={query}
          onClose={handleCloseSearchPage}
        />
      )}
    </>
  );
};

export default SearchBar_Desktop;