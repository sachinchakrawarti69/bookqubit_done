"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { getComicsByLanguage } from "@/data/comics/index";
import ComicRectangleCard from "@/features/comic/comiclist/ui/ComicRectangleCard";
import ComicSquareCard from "@/features/comic/comiclist/ui/ComicSquareCard";
import ComicsMenu from "@/features/comic/comiclist/components/ComicsMenu";

const ComicsListPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPublisher, setSelectedPublisher] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const ComicsData = useMemo(() => {
    return getComicsByLanguage(language);
  }, [language]);

  if (!theme || !ComicsData) {
    return null;
  }

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const { categories, publishers } = useMemo(() => {
    if (!ComicsData || ComicsData.length === 0) {
      return { categories: ["All"], publishers: ["All"] };
    }
    const uniqueCategories = [
      "All",
      ...new Set(ComicsData.map((comic) => comic.category)),
    ];
    const uniquePublishers = [
      "All",
      ...new Set(ComicsData.map((comic) => comic.publisher)),
    ];
    return { categories: uniqueCategories, publishers: uniquePublishers };
  }, [ComicsData]);

  const filteredComics = useMemo(() => {
    if (!ComicsData || ComicsData.length === 0) return [];
    return ComicsData.filter((comic) => {
      const categoryMatch =
        selectedCategory === "All" || comic.category === selectedCategory;
      const publisherMatch =
        selectedPublisher === "All" || comic.publisher === selectedPublisher;
      return categoryMatch && publisherMatch;
    });
  }, [ComicsData, selectedCategory, selectedPublisher]);

  const handleTagClick = (tag) => {
    if (categories.includes(tag)) {
      setSelectedCategory(tag);
    } else if (publishers.includes(tag)) {
      setSelectedPublisher(tag);
    }
    console.log("Tag clicked:", tag);
  };

  const handleWishlistToggle = (comicId, isWishlisted) => {
    setWishlist((prev) =>
      isWishlisted ? [...prev, comicId] : prev.filter((id) => id !== comicId),
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedPublisher("All");
  };

  return (
    <div
      className={`${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50")} min-h-screen`}
    >
      <div
        className={`${theme.layout?.sectionPadding || "py-12 px-4 sm:px-6 lg:px-8"}`}
      >
        <div
          className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto`}
        >
          <div className="text-center mb-8">
            <h1
              className={`text-4xl md:text-5xl font-bold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-4`}
            >
              {t("comics.collection_title") || "Comics Collection"}
            </h1>
            <p
              className={`text-xl ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} max-w-3xl mx-auto mb-8`}
            >
              {t("comics.collection_subtitle") ||
                "Explore the legendary comics that started it all"}
            </p>

            <ComicsMenu />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="hidden sm:block flex items-center gap-2">
                <span
                  className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
                >
                  {t("view.view") || "View"}:
                </span>
                <div
                  className={`flex ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.border?.button || "border border-gray-200 dark:border-gray-700"} ${theme.shadow?.navigationDotContainer || "shadow-sm"} p-1 rounded-lg`}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
                      viewMode === "grid"
                        ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.shadow?.button || "shadow-md"}`
                        : `${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`
                    }`}
                  >
                    {t("view.grid_view") || "Grid"}
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
                      viewMode === "list"
                        ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.shadow?.button || "shadow-md"}`
                        : `${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} hover:${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`
                    }`}
                  >
                    {t("view.list_view") || "List"}
                  </button>
                </div>
              </div>

              {(selectedCategory !== "All" || selectedPublisher !== "All") && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span
                    className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
                  >
                    {t("filter.active_filters") || "Active filters:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "All" && (
                      <span
                        className={`px-3 py-1 text-sm ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} ${theme.border?.button || "border border-gray-200 dark:border-gray-700"} rounded-full`}
                      >
                        {t("filter.category") || "Category"}: {selectedCategory}
                      </span>
                    )}
                    {selectedPublisher !== "All" && (
                      <span
                        className={`px-3 py-1 text-sm ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} ${theme.border?.button || "border border-gray-200 dark:border-gray-700"} rounded-full`}
                      >
                        {t("filter.publisher") || "Publisher"}:{" "}
                        {selectedPublisher}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className={`px-3 py-1 text-sm ${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"} ${theme.border?.button || "border border-gray-200 dark:border-gray-700"} rounded-full transition-all duration-300 hover:shadow-md`}
                  >
                    {t("filter.clear_all") || "Clear All"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <h3
                  className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-3`}
                >
                  {t("filter.filter_by_category") || "Filter by Category"}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.shadow?.button || "shadow-md"}`
                          : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"}`
                      } ${theme.border?.button || "border border-gray-200 dark:border-gray-700"}`}
                    >
                      {category === "All" ? t("filter.all") || "All" : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h3
                  className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-3`}
                >
                  {t("filter.filter_by_publisher") || "Filter by Publisher"}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {publishers.map((publisher) => (
                    <button
                      key={publisher}
                      onClick={() => setSelectedPublisher(publisher)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                        selectedPublisher === publisher
                          ? `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.shadow?.button || "shadow-md"}`
                          : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"} ${theme.buttonColors?.secondaryButton?.hoverBackground || "hover:bg-sky-50 dark:hover:bg-sky-900/20"}`
                      } ${theme.border?.button || "border border-gray-200 dark:border-gray-700"}`}
                    >
                      {publisher === "All"
                        ? t("filter.all") || "All"
                        : publisher}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`text-center ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} text-sm mb-4`}
            >
              {t("pagination.showing") || "Showing"} {filteredComics.length}{" "}
              {t("pagination.of") || "of"} {ComicsData.length}{" "}
              {t("comics.comics") || "comics"}
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredComics.map((comic) => (
                <ComicSquareCard
                  key={comic.id}
                  comic={comic}
                  onTagClick={handleTagClick}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlist.includes(comic.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredComics.map((comic) => (
                <ComicRectangleCard
                  key={comic.id}
                  comic={comic}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlist.includes(comic.id)}
                />
              ))}
            </div>
          )}

          {filteredComics.length === 0 && (
            <div className="text-center py-12">
              <div
                className={`text-6xl ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-4`}
              >
                📚
              </div>
              <h3
                className={`text-2xl font-bold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} mb-2`}
              >
                {t("comics.no_comics_found") || "No comics found"}
              </h3>
              <p
                className={`${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")} mb-4`}
              >
                {t("comics.try_different_filters") ||
                  "Try selecting different categories or publishers to see more comics."}
              </p>
              <button
                onClick={handleResetFilters}
                className={`px-6 py-2 ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white ${theme.border?.button || "border border-gray-200 dark:border-gray-700"} ${theme.shadow?.button || "shadow-md"} rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {t("filter.reset_all") || "Reset All Filters"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicsListPage;