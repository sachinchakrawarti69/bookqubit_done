"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { getBooksByLanguage } from "@/data/books";
import { 
  FaSearch, 
  FaTimes, 
  FaArrowLeft, 
  FaFilter,
  FaSpinner,
  FaStar,
  FaUser,
  FaBookOpen
} from "react-icons/fa";
import Link from "next/link";

const SearchPage_Mobile = ({ onClose, initialQuery = "" }) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { language, t } = useLanguage();
  const { currentFont } = useFont();
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    authors: [],
  });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    authors: [],
  });

  const inputRef = useRef(null);
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Load recent searches
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

  // Auto focus input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // Search function
  const performSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const books = getBooksByLanguage(language);
    const results = books.filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        book.title?.toLowerCase().includes(searchLower) ||
        book.author?.toLowerCase().includes(searchLower) ||
        book.description?.toLowerCase().includes(searchLower) ||
        book.category?.toLowerCase().includes(searchLower)
      );
    });

    setSearchResults(results);
    
    // Extract filter options
    const categories = [...new Set(results.map(book => book.category).filter(Boolean))];
    const authors = [...new Set(results.map(book => book.author).filter(Boolean))];
    setFilterOptions({ categories, authors });
    
    setIsLoading(false);
  }, [language]);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        performSearch(query);
        saveToRecentSearches(query);
      } else {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  // Apply filters
  useEffect(() => {
    if (!query) return;
    
    let results = [...searchResults];
    
    if (selectedFilters.categories.length > 0) {
      results = results.filter(book => 
        selectedFilters.categories.includes(book.category)
      );
    }
    
    if (selectedFilters.authors.length > 0) {
      results = results.filter(book => 
        selectedFilters.authors.includes(book.author)
      );
    }
    
    setSearchResults(results);
  }, [selectedFilters]);

  const saveToRecentSearches = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    setRecentSearches(prev => {
      const updated = [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const handleRecentClick = (recent) => {
    setQuery(recent);
    performSearch(recent);
  };

  const handleRemoveRecent = (searchToRemove) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== searchToRemove);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ categories: [], authors: [] });
    setShowFilters(false);
  };

  const handleBookClick = (book) => {
    const slug = book.slug || book.id;
    router.push(`/books/${slug}`);
    if (onClose) onClose();
  };

  const fontStyle = currentFont ? { fontFamily: currentFont.family } : {};

  // Render star rating
  const renderStars = (rating = 0) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xs ${i < Math.floor(rating) 
              ? "text-amber-400" 
              : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`search-page-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50")}`}
      style={fontStyle}
    >
      {/* Search Header - No back button since navbar is visible */}
      <div className={`sticky top-0 z-10 ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
        <div className="px-4 py-3">
          {/* Search Input Row */}
          <div className="flex items-center gap-3">
            {/* Close/Cancel Button */}
            <button
              onClick={onClose}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Cancel
            </button>
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textColors?.secondary || "text-gray-400"} text-sm`} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder") || "Search books, authors..."}
                className={`w-full pl-9 pr-8 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-sky-500 text-base
                  ${theme.background?.input || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}
                  ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
                  ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}
                `}
              />
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <FaTimes className={theme.textColors?.secondary || "text-gray-400"} size={14} />
                </button>
              )}
            </div>

            {/* Filter Button */}
            {searchResults.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-full transition-all relative ${showFilters ? 'bg-sky-500 text-white' : (isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100")}`}
              >
                <FaFilter size={16} className={showFilters ? "text-white" : (theme.textColors?.secondary || "text-gray-500")} />
              </button>
            )}
          </div>

          {/* Stats */}
          {!isLoading && query && (
            <div className={`text-xs px-2 mt-2 ${theme.textColors?.secondary || "text-gray-500"}`}>
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && searchResults.length > 0 && (
        <div className={`px-4 py-3 border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"} ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")}`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-medium ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              Filter Results
            </span>
            <button onClick={clearFilters} className="text-xs text-sky-500">
              Clear All
            </button>
          </div>
          
          <div className="space-y-3">
            {filterOptions.categories.length > 0 && (
              <div>
                <div className="text-xs font-medium mb-2">Category</div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange("categories", cat)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedFilters.categories.includes(cat)
                          ? "bg-sky-500 text-white"
                          : `${isDarkMode ? "bg-gray-700" : "bg-gray-100"} ${theme.textColors?.secondary || "text-gray-600"}`
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {filterOptions.authors.length > 0 && (
              <div>
                <div className="text-xs font-medium mb-2">Author</div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.authors.map(author => (
                    <button
                      key={author}
                      onClick={() => handleFilterChange("authors", author)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedFilters.authors.includes(author)
                          ? "bg-sky-500 text-white"
                          : `${isDarkMode ? "bg-gray-700" : "bg-gray-100"} ${theme.textColors?.secondary || "text-gray-600"}`
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-3xl text-sky-500 mb-3" />
            <p className={`text-sm ${theme.textColors?.secondary || "text-gray-500"}`}>
              Searching...
            </p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && query && searchResults.length > 0 && (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className={`flex gap-3 p-4 cursor-pointer transition-all active:bg-gray-100 dark:active:bg-gray-800 ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
              >
                {/* Book Cover */}
                <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBookOpen className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-base mb-1 line-clamp-2 ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                    {book.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <FaUser className="text-xs text-gray-400" />
                    <span className={`text-xs ${theme.textColors?.secondary || "text-gray-500"}`}>
                      {book.author}
                    </span>
                  </div>
                  
                  {book.rating && (
                    <div className="mb-1">
                      {renderStars(book.rating)}
                    </div>
                  )}
                  
                  {book.category && (
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                      {book.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && searchResults.length === 0 && (
          <div className="text-center py-20">
            <FaSearch className="text-5xl mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold mb-2 ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              No results found
            </h3>
            <p className={`text-sm ${theme.textColors?.secondary || "text-gray-500"}`}>
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!isLoading && !query && recentSearches.length > 0 && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className={`text-sm font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                Recent Searches
              </h3>
              <button
                onClick={clearAllRecents}
                className="text-xs text-sky-500"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((recent, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleRecentClick(recent)}
                >
                  <div className="flex items-center gap-2">
                    <FaSearch className="text-gray-400 text-xs" />
                    <span className={`text-sm ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                      {recent}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecent(recent);
                    }}
                    className="p-1"
                  >
                    <FaTimes className="text-gray-400 text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initial State - No query */}
        {!isLoading && !query && recentSearches.length === 0 && (
          <div className="text-center py-20">
            <FaSearch className="text-5xl mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold mb-2 ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              Search for books
            </h3>
            <p className={`text-sm ${theme.textColors?.secondary || "text-gray-500"}`}>
              Find your next great read
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage_Mobile;