"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getBooksByLanguage } from "@/data/books";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

const Collections = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [showCollectionFilter, setShowCollectionFilter] = useState(false);
  const [books, setBooks] = useState([]);

  // Load books based on language
  React.useEffect(() => {
    const booksData = getBooksByLanguage(language);
    setBooks(booksData);
  }, [language]);

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get all unique collections from all books
  const allCollections = useMemo(() => {
    const collections = new Set();
    books.forEach((book) => {
      if (book.collection) {
        // Handle both array collections and single string collections
        const bookCollections = Array.isArray(book.collection)
          ? book.collection
          : [book.collection];

        bookCollections.forEach((collection) => collections.add(collection));
      }
    });
    return Array.from(collections).sort();
  }, [books]);

  // Helper function to get collections as array
  const getCollectionsAsArray = (collection) => {
    if (!collection) return [];
    return Array.isArray(collection) ? collection : [collection];
  };

  // Group books by collection - now properly handling multiple collections per book
  const collections = useMemo(() => {
    const collectionsObj = books.reduce((acc, book) => {
      if (book.collection) {
        // Handle both array collections and single string collections
        const bookCollections = getCollectionsAsArray(book.collection);

        bookCollections.forEach((collectionName) => {
          if (!acc[collectionName]) {
            acc[collectionName] = [];
          }
          // Only add the book if it's not already in this collection
          if (!acc[collectionName].some((b) => b.id === book.id)) {
            acc[collectionName].push(book);
          }
        });
      }
      return acc;
    }, {});

    // Filter collections based on search term and selected collections
    const filteredCollections = {};

    Object.entries(collectionsObj).forEach(
      ([collectionName, collectionBooks]) => {
        // Check if collection name matches search term
        const collectionMatchesSearch =
          searchTerm === "" ||
          collectionName.toLowerCase().includes(searchTerm.toLowerCase());

        // Check if collection is selected in filter
        const collectionMatchesFilter =
          selectedCollections.length === 0 ||
          selectedCollections.includes(collectionName);

        const filteredBooks = collectionBooks.filter((book) => {
          // Search term filter (book level)
          const bookMatchesSearch =
            searchTerm === "" ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.description &&
              book.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            collectionName.toLowerCase().includes(searchTerm.toLowerCase());

          return bookMatchesSearch;
        });

        // Only include collections that match the filter AND (have books after filtering OR if collection name matches search)
        if (
          collectionMatchesFilter &&
          (filteredBooks.length > 0 || collectionMatchesSearch)
        ) {
          filteredCollections[collectionName] = filteredBooks;
        }
      },
    );

    return filteredCollections;
  }, [books, searchTerm, selectedCollections]);

  const handleCollectionToggle = (collection) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((c) => c !== collection)
        : [...prev, collection],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCollections([]);
  };

  const toggleCollectionFilter = () => {
    setShowCollectionFilter((prev) => !prev);
  };

  return (
    <div
      className={`${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50")} min-h-screen ${theme.layout?.sectionPadding || "py-12 px-4 sm:px-6 lg:px-8"}`}
    >
      <div className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto`}>
        <h1
          className={`text-4xl font-bold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-8 text-center`}
        >
          {t("collections.title") || "Book Collections"}
        </h1>

        {/* Search and Filter Section */}
        <div
          className={`mb-12 p-6 ${theme.background?.bookCoverSide || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} ${theme.shadow?.book || "shadow-2xl"} rounded-xl`}
        >
          {/* Search Bar */}
          <div className="mb-6">
            <label
              htmlFor="search"
              className={`block text-sm font-medium ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-2`}
            >
              {t("collections.search_collections") ||
                "Search Collections & Books"}
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder={
                  t("collections.search_placeholder") ||
                  "Search by collection name, title, author, or description..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.border?.button || "border border-gray-300 dark:border-gray-600"} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Collection Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleCollectionFilter}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                showCollectionFilter
                  ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`
                  : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
              }`}
            >
              <span>
                {t("collections.filter_by_collections") ||
                  "Filter by Collections"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${showCollectionFilter ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {(searchTerm || selectedCollections.length > 0) && (
              <button
                onClick={clearFilters}
                className={`px-4 py-2 text-sm font-medium ${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"} ${theme.border?.button || "border border-gray-300 dark:border-gray-600"} rounded-lg transition-all`}
              >
                {t("collections.clear_all_filters") || "Clear All Filters"}
              </button>
            )}
          </div>

          {/* Collection Filter (Collapsible) */}
          {showCollectionFilter && (
            <div
              className={`mb-4 p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}
            >
              <label
                className={`block text-sm font-medium ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-3`}
              >
                {t("collections.select_collections") ||
                  "Select Collections to Filter:"}
              </label>
              <div className="flex flex-wrap gap-2">
                {allCollections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => handleCollectionToggle(collection)}
                    className={`px-3 py-2 text-sm font-medium rounded-full transition-all ${
                      selectedCollections.includes(collection)
                        ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.shadow?.button || "shadow-md"}`
                        : `${theme.background?.navigationDots || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} ${theme.border?.button || "border border-gray-300 dark:border-gray-600"} hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}`
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchTerm || selectedCollections.length > 0) && (
            <div
              className={`flex flex-wrap items-center gap-2 pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <span
                className={`text-sm ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
              >
                {t("collections.active_filters") || "Active filters:"}
              </span>
              {searchTerm && (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
                >
                  {t("collections.search") || "Search"}: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedCollections.map((collection) => (
                <span
                  key={collection}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
                >
                  {collection}
                  <button
                    onClick={() => handleCollectionToggle(collection)}
                    className="ml-2 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Collections */}
        {Object.keys(collections).length === 0 ? (
          <div
            className={`text-center py-12 ${theme.background?.bookCoverSide || "bg-gray-100 dark:bg-gray-800"} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} rounded-xl`}
          >
            <p
              className={`text-lg ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-4`}
            >
              {t("collections.no_collections_found") ||
                "No collections found matching your filters."}
            </p>
            <button
              onClick={clearFilters}
              className={`px-6 py-2 ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"} text-white ${theme.border?.button || ""} rounded-lg transition-all hover:shadow-lg`}
            >
              {t("collections.clear_filters") || "Clear Filters"}
            </button>
          </div>
        ) : (
          Object.entries(collections).map(
            ([collectionName, collectionBooks]) => (
              <section key={collectionName} className="mb-16">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center flex-wrap gap-3">
                    <h2
                      className={`text-2xl font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}
                    >
                      {collectionName}
                    </h2>
                    <span
                      className={`text-sm ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} ${isDarkMode ? "bg-sky-900/30" : "bg-sky-100"} px-3 py-1 rounded-full`}
                    >
                      {collectionBooks.length}{" "}
                      {collectionBooks.length === 1
                        ? t("book.singular") || "book"
                        : t("book.plural") || "books"}
                    </span>
                  </div>
                  <Link
                    href={`/collections/${encodeURIComponent(collectionName)}`}
                    className={`${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"} ${theme.border?.button || ""} ${theme.shadow?.button || "shadow-md"} px-4 py-2 text-sm font-medium transition-all rounded-lg`}
                  >
                    {t("collections.explore_collection") ||
                      "Explore Collection"}
                  </Link>
                </div>

                {collectionBooks.length === 0 ? (
                  <div
                    className={`text-center py-8 ${theme.background?.bookCoverSide || "bg-gray-100 dark:bg-gray-800"} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} rounded-xl`}
                  >
                    <p
                      className={`text-lg ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
                    >
                      {t("collections.no_books_match") ||
                        "No books in this collection match your current search."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collectionBooks.slice(0, 6).map((book) => (
                      <div
                        key={`${collectionName}-${book.id}`}
                        className={`${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} ${theme.shadow?.book || "shadow-2xl"} overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                      >
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-24 h-36 object-cover rounded-lg shadow-md"
                                onError={(e) => {
                                  e.target.src = "/placeholder-book.jpg";
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3
                                className={`text-lg font-bold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-1 line-clamp-2`}
                              >
                                {book.title}
                              </h3>
                              <p
                                className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-2`}
                              >
                                {t("book.by") || "by"} {book.author}
                              </p>
                              <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(book.rating || 0) ? theme.iconColors?.starFilled || "text-amber-400" : theme.iconColors?.starEmpty || "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <p
                                className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} line-clamp-2 mb-3`}
                              >
                                {book.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {getCollectionsAsArray(book.collection)
                                  .slice(0, 2)
                                  .map((collection) => (
                                    <span
                                      key={collection}
                                      className={`text-xs ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} ${isDarkMode ? "bg-sky-900/30" : "bg-sky-50"} px-2 py-1 rounded-full`}
                                    >
                                      {collection}
                                    </span>
                                  ))}
                                {getCollectionsAsArray(book.collection).length >
                                  2 && (
                                  <span
                                    className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
                                  >
                                    +
                                    {getCollectionsAsArray(book.collection)
                                      .length - 2}{" "}
                                    {t("book.more") || "more"}
                                  </span>
                                )}
                              </div>
                              <Link
                                href={`/bookdeatils/${book.slug || book.id}`}
                                className={`inline-block w-full text-center px-4 py-2 text-sm font-medium ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.border?.button || ""} ${theme.shadow?.button || "shadow-md"} rounded-lg transition-all hover:shadow-lg`}
                              >
                                {t("book.view_details") || "View Details"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ),
          )
        )}
      </div>
    </div>
  );
};

export default Collections;
