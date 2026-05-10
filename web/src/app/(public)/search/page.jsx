"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaFilter, FaTimes, FaBook, FaUser, FaTag, FaStar, FaArrowLeft } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { getBooksByLanguage } from "@/data/books";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { theme, themeName } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Load books based on language (English only)
  useEffect(() => {
    const booksData = getBooksByLanguage("en");
    performSearch(booksData, query);
  }, [query]);

  const performSearch = (booksData, searchTerm) => {
    setIsLoading(true);
    
    if (!searchTerm) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const term = searchTerm.toLowerCase();
      
      const filteredBooks = booksData.filter(book => {
        const matchesTitle = book.title?.toLowerCase().includes(term);
        const matchesAuthor = book.author?.toLowerCase().includes(term);
        const matchesDescription = book.description?.toLowerCase().includes(term);
        const matchesTags = book.tags?.some(tag => tag.toLowerCase().includes(term));
        
        if (filterType === "books") return matchesTitle || matchesDescription;
        if (filterType === "authors") return matchesAuthor;
        if (filterType === "tags") return matchesTags;
        return matchesTitle || matchesAuthor || matchesDescription || matchesTags;
      });
      
      setSearchResults(filteredBooks);
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(getBooksByLanguage("en"), searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    router.push("/search");
  };

  const closeSearch = () => {
    router.back();
  };

  const getTextHighlightClass = () => {
    return theme.textColors?.highlight || (isDarkMode ? "text-blue-400" : "text-sky-600");
  };

  const getTextPrimaryClass = () => {
    return theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  };

  const getTextSecondaryClass = () => {
    return theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  };

  const getBackgroundClass = () => {
    return theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50");
  };

  const getCardBackgroundClass = () => {
    return theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating || 0) ? "text-amber-400" : "text-gray-300"}`}
          />
        ))}
        <span className={`text-xs ml-1 ${getTextSecondaryClass()}`}>
          ({rating || 0})
        </span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Close Button */}
        <div className="mb-6">
          <button
            onClick={closeSearch}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}
          >
            <FaArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Search Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${getTextPrimaryClass()} mb-4`}>
            Search
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${getTextSecondaryClass()}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for books, authors, or topics..."
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}
                  >
                    <FaTimes size={16} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {query && (
          <div>
            {/* Results Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${getTextPrimaryClass()}`}>
                  Results for "{query}"
                </h2>
                <p className={`text-sm ${getTextSecondaryClass()} mt-1`}>
                  Found {searchResults.length} {searchResults.length === 1 ? "book" : "books"}
                </p>
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${showFilters ? `${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} text-white` : `${theme.buttonColors?.secondaryButton?.background || 'border-2 border-sky-600'} ${getTextHighlightClass()}`}`}
              >
                <FaFilter />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterType === "all" ? `${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} text-white` : `${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType("books")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterType === "books" ? `${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} text-white` : `${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}`}
                  >
                    <FaBook className="inline mr-1" size={12} />
                    Books
                  </button>
                  <button
                    onClick={() => setFilterType("authors")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterType === "authors" ? `${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} text-white` : `${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}`}
                  >
                    <FaUser className="inline mr-1" size={12} />
                    Authors
                  </button>
                  <button
                    onClick={() => setFilterType("tags")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterType === "tags" ? `${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} text-white` : `${getTextSecondaryClass()} hover:${getTextHighlightClass()}`}`}
                  >
                    <FaTag className="inline mr-1" size={12} />
                    Tags
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && searchResults.length === 0 && (
              <div className="text-center py-12">
                <div className={`text-6xl mb-4 ${getTextSecondaryClass()}`}>🔍</div>
                <h3 className={`text-xl font-semibold mb-2 ${getTextPrimaryClass()}`}>
                  No results found
                </h3>
                <p className={getTextSecondaryClass()}>
                  Try searching for something else
                </p>
              </div>
            )}

            {/* Results Display */}
            {!isLoading && searchResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/bookdeatils/${book.slug || book.id}`}
                    className={`group ${getCardBackgroundClass()} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <div className={`p-4 ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')} flex justify-center items-center h-48`}>
                      {book.imageUrl ? (
                        <img src={book.imageUrl} alt={book.title} className="h-full object-contain" />
                      ) : (
                        <FaBook className={`text-5xl ${getTextHighlightClass()}`} />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className={`font-bold text-lg line-clamp-2 ${getTextPrimaryClass()}`}>
                        {book.title}
                      </h3>
                      <p className={`text-sm mb-2 ${getTextSecondaryClass()}`}>
                        by {book.author}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        {renderStars(book.rating)}
                        <span className={`text-sm font-bold ${getTextHighlightClass()}`}>{book.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State - No Search Query */}
        {!query && (
          <div className="text-center py-16">
            <div className={`text-6xl mb-4 ${getTextSecondaryClass()}`}>📚</div>
            <h2 className={`text-2xl font-bold mb-2 ${getTextPrimaryClass()}`}>
              Welcome to Search
            </h2>
            <p className={getTextSecondaryClass()}>
              Start typing to search for books, authors, and more
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;