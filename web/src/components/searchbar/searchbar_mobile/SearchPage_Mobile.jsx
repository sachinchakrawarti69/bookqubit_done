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
  FaFilter,
  FaSpinner,
  FaStar,
  FaUser,
  FaBookOpen,
  FaTh,
  FaList
} from "react-icons/fa";
import "./SearchPage_Mobile.css";

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
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState("list");

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
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const books = getBooksByLanguage(language);
    let results = books.filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        book.title?.toLowerCase().includes(searchLower) ||
        book.author?.toLowerCase().includes(searchLower) ||
        book.description?.toLowerCase().includes(searchLower) ||
        book.category?.toLowerCase().includes(searchLower)
      );
    });

    // Apply filters
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

    // Sort results
    if (sortBy === "title") {
      results.sort((a, b) => a.title?.localeCompare(b.title));
    } else if (sortBy === "rating") {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "newest") {
      results.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    
    setSearchResults(results);
    
    // Extract filter options
    const categories = [...new Set(books.map(book => book.category).filter(Boolean))];
    const authors = [...new Set(books.map(book => book.author).filter(Boolean))];
    setFilterOptions({ categories, authors });
    
    setIsLoading(false);
  }, [language, sortBy, selectedFilters]);

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
      {/* Search Header - Below navbar position */}
      <div className={`search-header ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
        <div className="search-header-content">
          {/* Search Input Row */}
          <div className="search-input-row">
            {/* Close Button with X Icon */}
            <button
              onClick={onClose}
              className="search-close-btn"
              aria-label="Close search"
            >
              <FaTimes size={20} />
            </button>
            
            {/* Search Input */}
            <div className="search-input-wrapper">
              <FaSearch className="search-input-icon" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books by title, author, or description..."
                className={`search-input
                  ${theme.background?.input || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}
                  ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
                  ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}
                `}
              />
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="search-clear-btn"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`search-filter-btn ${showFilters ? 'active' : ''}`}
            >
              <FaFilter size={16} />
            </button>
          </div>

          {/* Stats and Sort Row */}
          {!isLoading && query && (
            <div className="search-stats-row">
              <div className="search-stats">
                {searchResults.length === 0 ? "No results" : `Showing ${searchResults.length} books`}
              </div>
              {searchResults.length > 0 && (
                <div className="search-controls">
                  <div className="search-sort">
                    <span className="search-sort-label">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`search-sort-select ${theme.background?.input || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}`}
                    >
                      <option value="title">Title (A-Z)</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  <div className="search-view">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`search-view-btn ${viewMode === "list" ? "active" : ""}`}
                    >
                      <FaList size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`search-view-btn ${viewMode === "grid" ? "active" : ""}`}
                    >
                      <FaTh size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`filters-panel ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")} border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
          <div className="filters-header">
            <span className="filters-title">Filter Results</span>
            <button onClick={clearFilters} className="filters-clear">
              Clear All
            </button>
          </div>
          
          <div className="filters-body">
            {filterOptions.categories.length > 0 && (
              <div className="filter-group">
                <div className="filter-group-title">Category</div>
                <div className="filter-options">
                  {filterOptions.categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange("categories", cat)}
                      className={`filter-option ${
                        selectedFilters.categories.includes(cat) ? 'active' : ''
                      } ${isDarkMode ? 'dark' : 'light'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {filterOptions.authors.length > 0 && (
              <div className="filter-group">
                <div className="filter-group-title">Author</div>
                <div className="filter-options">
                  {filterOptions.authors.map(author => (
                    <button
                      key={author}
                      onClick={() => handleFilterChange("authors", author)}
                      className={`filter-option ${
                        selectedFilters.authors.includes(author) ? 'active' : ''
                      } ${isDarkMode ? 'dark' : 'light'}`}
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

      {/* Content Area - Scrollable */}
      <div className="search-content">
        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <FaSpinner className="loading-spinner" />
            <p className="loading-text">Searching...</p>
          </div>
        )}

        {/* Search Results - List View */}
        {!isLoading && query && searchResults.length > 0 && viewMode === "list" && (
          <div className="search-results-list">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className="search-result-item"
              >
                <div className="result-cover">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="result-cover-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="result-cover-placeholder">
                      <FaBookOpen className="text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>
                
                <div className="result-info">
                  <h3 className="result-title">{book.title}</h3>
                  <div className="result-author">
                    <FaUser className="result-author-icon" />
                    <span>{book.author}</span>
                  </div>
                  {book.rating && (
                    <div className="result-rating">
                      {renderStars(book.rating)}
                      <span className="result-rating-value">({book.rating})</span>
                    </div>
                  )}
                  {book.category && (
                    <span className="result-category">
                      {book.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Results - Grid View */}
        {!isLoading && query && searchResults.length > 0 && viewMode === "grid" && (
          <div className="search-results-grid">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className="search-result-grid-item"
              >
                <div className="result-grid-cover">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="result-grid-cover-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="result-grid-cover-placeholder">
                      <FaBookOpen className="text-gray-400 text-3xl" />
                    </div>
                  )}
                </div>
                <div className="result-grid-info">
                  <h3 className="result-grid-title">{book.title}</h3>
                  <div className="result-grid-author">{book.author}</div>
                  {book.rating && (
                    <div className="result-grid-rating">
                      {renderStars(book.rating)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && searchResults.length === 0 && (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3 className="no-results-title">No results found</h3>
            <p className="no-results-text">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!isLoading && !query && recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-header">
              <h3 className="recent-title">Recent Searches</h3>
              <button onClick={clearAllRecents} className="recent-clear">
                Clear All
              </button>
            </div>
            <div className="recent-list">
              {recentSearches.map((recent, index) => (
                <div
                  key={index}
                  className="recent-item"
                  onClick={() => handleRecentClick(recent)}
                >
                  <div className="recent-item-content">
                    <FaSearch className="recent-item-icon" />
                    <span className="recent-item-text">{recent}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecent(recent);
                    }}
                    className="recent-remove"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!isLoading && !query && recentSearches.length === 0 && (
          <div className="initial-state">
            <FaSearch className="initial-state-icon" />
            <h3 className="initial-state-title">Search for books</h3>
            <p className="initial-state-text">
              Find your next great read
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage_Mobile;