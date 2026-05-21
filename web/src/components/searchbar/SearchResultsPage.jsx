"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaSearch,
  FaBook,
  FaUser,
  FaFilter,
  FaSort,
  FaStar,
  FaCalendar,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaFire,
  FaTag,
  FaGlobe,
  FaDollarSign,
  FaLayerGroup,
} from "react-icons/fa";
import { TbBooks } from "react-icons/tb";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { books } from "@/data/books/BooksData";
import BookCard from "../components/BookCard";
import AuthorCard from "../components/AuthorCard";
import SearchFilters from "../components/SearchFilters";
import SearchStats from "../components/SearchStats";
import SearchPagination from "../components/SearchPagination";
import RelatedSearches from "../components/RelatedSearches";
import SubjectsSection from "../components/SubjectsSection";
import "../styles/SearchResultsPage.css";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  const query = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Extract unique data
  const allGenres = [...new Set(books.flatMap((book) => book.genres || []))];
  const allCountries = [
    ...new Set(books.map((book) => book.country).filter(Boolean)),
  ];
  const allSubjects = [
    ...new Set(books.flatMap((book) => book.subjects || [])),
  ];

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  // Search effect
  useEffect(() => {
    const performSearch = () => {
      setIsLoading(true);

      setTimeout(() => {
        if (!query.trim()) {
          setResults([]);
          setFilteredResults([]);
          setIsLoading(false);
          return;
        }

        const lowerQuery = query.toLowerCase();

        const searchResults = books
          .filter((book) => {
            return (
              book.title?.toLowerCase().includes(lowerQuery) ||
              book.author?.toLowerCase().includes(lowerQuery) ||
              book.description?.toLowerCase().includes(lowerQuery) ||
              book.category?.toLowerCase().includes(lowerQuery) ||
              book.genres?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
              book.subjects?.some((s) => s.toLowerCase().includes(lowerQuery)) ||
              book.tags?.some((t) => t.toLowerCase().includes(lowerQuery)) ||
              book.country?.toLowerCase().includes(lowerQuery)
            );
          })
          .map((book) => ({ ...book, searchType: "book" }));

        const uniqueAuthors = [...new Set(books.map((book) => book.author))];
        const authorResults = uniqueAuthors
          .filter((author) => author.toLowerCase().includes(lowerQuery))
          .map((author, index) => ({
            id: `author-${index}`,
            name: author,
            type: "author",
            searchType: "author",
            booksCount: books.filter((b) => b.author === author).length,
            description: `Author with ${
              books.filter((b) => b.author === author).length
            } books`,
            country: books.find((b) => b.author === author)?.country || "",
            rating: 4.5,
          }));

        const combinedResults = [...searchResults, ...authorResults];
        setResults(combinedResults);
        setFilteredResults(combinedResults);
        setIsLoading(false);
      }, 600);
    };

    performSearch();
  }, [query]);

  // Filter and sort effect
  useEffect(() => {
    let filtered = [...results];

    if (activeFilter !== "all") {
      filtered = filtered.filter((result) => result.searchType === activeFilter);
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((result) => {
        if (result.searchType === "book" && result.genres) {
          return result.genres.some((g) => selectedGenres.includes(g));
        }
        return true;
      });
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((result) => {
        if (result.country) {
          return selectedCountries.includes(result.country);
        }
        return false;
      });
    }

    filtered = filtered.filter((result) => {
      if (result.searchType === "book" && result.price) {
        const price = parseFloat(result.price.replace("$", "")) || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      }
      return true;
    });

    if (ratingFilter > 0) {
      filtered = filtered.filter(
        (result) => result.rating && result.rating >= ratingFilter
      );
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "year":
        filtered.sort((a, b) => {
          const yearA = parseInt(a.published) || 0;
          const yearB = parseInt(b.published) || 0;
          return yearB - yearA;
        });
        break;
      case "title":
        filtered.sort((a, b) =>
          (a.title || a.name).localeCompare(b.title || b.name)
        );
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat((a.price || "").replace("$", "")) || 0;
          const priceB = parseFloat((b.price || "").replace("$", "")) || 0;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat((a.price || "").replace("$", "")) || 0;
          const priceB = parseFloat((b.price || "").replace("$", "")) || 0;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [
    activeFilter,
    selectedGenres,
    selectedCountries,
    priceRange,
    ratingFilter,
    sortBy,
    results,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleResultSelect = (result) => {
    if (result.searchType === "book") {
      router.push(`/books/${result.slug || result.id}`);
    } else if (result.searchType === "author") {
      router.push(`/authors/${result.name.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const clearFilters = () => {
    setActiveFilter("all");
    setSelectedGenres([]);
    setSelectedCountries([]);
    setPriceRange([0, 50]);
    setRatingFilter(0);
    setSortBy("relevance");
  };

  // Pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const bookCount = results.filter((r) => r.searchType === "book").length;
  const authorCount = results.filter((r) => r.searchType === "author").length;
  const averageRating =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + (r.rating || 0), 0) / results.length
        ).toFixed(1)
      : 0;

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`search-results-page ${isDarkMode ? "dark" : "light"} ${
        direction === "rtl" ? "rtl" : ""
      }`}
    >
      {/* Search Header */}
      <div
        className={`search-results-header ${
          isDarkMode ? "bg-gray-900" : "bg-gradient-to-r from-sky-600 to-blue-700"
        }`}
      >
        <div className="search-results-hero">
          <div className="hero-content">
            <h1 className="search-results-title">
              <span className="search-icon">🔍</span>
              {t("search.results_title") || "Search Results"}
            </h1>
            <p className="search-results-subtitle">
              {query
                ? `${t("search.results_for") || "Results for"} "${query}"`
                : t("search.start_searching") ||
                  "Start searching for books, authors, and more"}
            </p>

            <form onSubmit={handleSearch} className="results-search-bar">
              <div className="results-search-container">
                <input
                  type="text"
                  placeholder={
                    t("search.placeholder_advanced") ||
                    "Search books, authors, genres, countries..."
                  }
                  className={`results-search-input ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="results-search-button bg-gradient-to-r from-sky-600 to-sky-500"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <SearchStats
            totalResults={filteredResults.length}
            bookCount={bookCount}
            authorCount={authorCount}
            averageRating={averageRating}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="search-results-content">
        <button
          className="mobile-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <SearchFilters
          showFilters={showFilters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
          selectedCountries={selectedCountries}
          toggleCountry={toggleCountry}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
          allGenres={allGenres}
          allCountries={allCountries}
          totalResults={filteredResults.length}
          bookCount={bookCount}
          authorCount={authorCount}
        />

        <div className="search-results-main">
          <div className="results-main-header">
            <div className="results-info">
              <h2 className="results-count">
                {isLoading
                  ? "Searching..."
                  : `${filteredResults.length} results found`}
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="search-loading-state">
              <div className="loading-spinner-large"></div>
              <p>Searching for "{query}"...</p>
            </div>
          ) : (
            <>
              <div className="results-grid">
                {currentResults.length > 0 ? (
                  currentResults.map((result) =>
                    result.searchType === "book" ? (
                      <BookCard
                        key={`book-${result.id}`}
                        book={result}
                        onSelect={handleResultSelect}
                      />
                    ) : (
                      <AuthorCard
                        key={`author-${result.id}`}
                        author={result}
                        onSelect={handleResultSelect}
                      />
                    )
                  )
                ) : (
                  <div className="no-results-found">
                    <div className="no-results-icon">📚</div>
                    <h3>No results found for "{query}"</h3>
                    <p>Try different keywords or check your spelling</p>
                  </div>
                )}
              </div>

              {filteredResults.length > resultsPerPage && (
                <SearchPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onNext={nextPage}
                  onPrev={prevPage}
                />
              )}

              {!isLoading && currentResults.length > 0 && (
                <SubjectsSection subjects={allSubjects} />
              )}
            </>
          )}
        </div>
      </div>

      <RelatedSearches query={query} />
    </div>
  );
};

export default function SearchResultsPageWrapper() {
  return (
    <Suspense fallback={<div className="search-loading">Loading search...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}