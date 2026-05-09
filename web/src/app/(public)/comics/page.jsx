"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { ComicsData } from "@/data/comics/ComicsData_English";

export default function ComicsPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [comics, setComics] = useState([]);
  const comicsPerPage = 12;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setComics(ComicsData);
  }, []);

  // Get unique publishers and categories
  const publishers = [
    "All",
    ...new Set(ComicsData.map((comic) => comic.publisher).filter(Boolean)),
  ];
  const categories = [
    "All",
    ...new Set(ComicsData.map((comic) => comic.category).filter(Boolean)),
  ];

  // Filter comics based on search, publisher, and category
  const filteredComics = comics.filter((comic) => {
    const matchesSearch =
      comic.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comic.publisher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comic.creators?.writersArtists?.some((artist) =>
        artist.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      comic.charactersIntroduced?.some((character) =>
        character.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesPublisher =
      selectedPublisher === "All" || comic.publisher === selectedPublisher;
    const matchesCategory =
      selectedCategory === "All" || comic.category === selectedCategory;

    return matchesSearch && matchesPublisher && matchesCategory;
  });

  // Pagination
  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = filteredComics.slice(
    indexOfFirstComic,
    indexOfLastComic,
  );
  const totalPages = Math.ceil(filteredComics.length / comicsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPublisher, selectedCategory]);

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150' fill='%23ccc'%3E%3Crect width='100' height='150' /%3E%3Ctext x='10' y='75' fill='%23333' font-size='14'%3ENo cover%3C/text%3E%3C/svg%3E";

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`star-${i}`}
          className={`w-4 h-4 ${theme.iconColors?.starFilled || "text-amber-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half-star"
          className={`w-4 h-4 ${theme.iconColors?.starFilled || "text-amber-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className={`w-4 h-4 ${theme.iconColors?.starEmpty || "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  return (
    <main className={`min-h-screen ${theme.background?.section || ""}`}>
      {/* Hero Section */}
      <section
        className={`${theme.layout?.sectionPadding || "py-12 px-4 sm:px-6 lg:px-8"} text-center ${theme.background?.navigationDots || ""}`}
      >
        <div
          className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto`}
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ""}`}
          >
            Explore Comics
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ""} max-w-2xl mx-auto`}
          >
            Discover legendary comics from Marvel, DC, Raj Comics, and more.
            From Golden Age classics to modern masterpieces!
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section
        className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ""}`}
      >
        <div
          className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto`}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title, publisher, artist, or character..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ""} ${theme.background?.navigationDots || ""} ${theme.textColors?.primary || ""}`}
              />
            </div>

            {/* Publisher Filter */}
            <div className="md:w-48">
              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ""} ${theme.background?.navigationDots || ""} ${theme.textColors?.primary || ""}`}
              >
                {publishers.map((publisher) => (
                  <option key={publisher} value={publisher}>
                    {publisher}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ""} ${theme.background?.navigationDots || ""} ${theme.textColors?.primary || ""}`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mb-4 ${theme.textColors?.secondary || ""}`}>
            Found {filteredComics.length} comics
          </div>
        </div>
      </section>

      {/* Comics Grid */}
      <section
        className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ""}`}
      >
        <div
          className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto`}
        >
          {currentComics.length === 0 ? (
            <div
              className={`text-center py-12 ${theme.textColors?.secondary || ""}`}
            >
              No comics found. Try adjusting your search or filters.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentComics.map((comic) => (
                  <div
                    key={comic.id}
                    className={`${theme.background?.bookCoverSide || ""} ${theme.border?.default || ""} ${theme.shadow?.container || ""} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                  >
                    <Link href={`/comics/${comic.id}`}>
                      <div className="p-4">
                        <div className="flex justify-center mb-4">
                          <img
                            src={comic.image || fallbackImage}
                            alt={comic.title}
                            className="h-48 w-auto object-contain rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackImage;
                            }}
                          />
                        </div>
                        <h3
                          className={`text-lg font-bold mb-2 ${theme.textColors?.primary || ""} line-clamp-2`}
                        >
                          {comic.title}
                        </h3>
                        <p
                          className={`text-sm mb-1 ${theme.textColors?.secondary || ""}`}
                        >
                          {comic.publisher}
                        </p>
                        <p
                          className={`text-xs mb-2 ${theme.textColors?.highlight || ""}`}
                        >
                          {comic.publicationDate}
                        </p>
                        <div className="flex items-center mb-3">
                          {renderStars(comic.rating)}
                          <span
                            className={`text-xs ml-2 ${theme.textColors?.secondary || ""}`}
                          >
                            ({comic.rating}/10)
                          </span>
                        </div>
                        {comic.charactersIntroduced &&
                          comic.charactersIntroduced.length > 0 && (
                            <div className="mb-3">
                              <p
                                className={`text-xs ${theme.textColors?.secondary || ""}`}
                              >
                                <span className="font-semibold">
                                  Introduced:
                                </span>{" "}
                                {comic.charactersIntroduced
                                  .slice(0, 2)
                                  .join(", ")}
                                {comic.charactersIntroduced.length > 2 && "..."}
                              </p>
                            </div>
                          )}
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-sm font-bold ${theme.textColors?.highlight || ""}`}
                          >
                            {comic.coverPrice}
                          </span>
                          <span
                            className={`text-sm ${theme.buttonColors?.primaryButton?.background || "bg-blue-600"} text-white px-3 py-1 rounded-lg`}
                          >
                            View Details
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2 flex-wrap">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.buttonColors?.secondaryButton?.background || "border-2 border-gray-300"} ${theme.buttonColors?.secondaryButton?.textColor || "text-gray-700"}`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    if (
                      index + 1 === 1 ||
                      index + 1 === totalPages ||
                      (index + 1 >= currentPage - 1 &&
                        index + 1 <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            currentPage === index + 1
                              ? theme.buttonColors?.primaryButton?.background ||
                                "bg-blue-600 text-white"
                              : theme.buttonColors?.secondaryButton
                                  ?.background || "border-2 border-gray-300"
                          } ${theme.buttonColors?.secondaryButton?.textColor || ""}`}
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      (index + 1 === currentPage - 2 && currentPage > 3) ||
                      (index + 1 === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={index} className="px-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.buttonColors?.secondaryButton?.background || "border-2 border-gray-300"} ${theme.buttonColors?.secondaryButton?.textColor || "text-gray-700"}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Publishers Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ""}`}
      >
        <div
          className={`${theme.layout?.containerWidth || "max-w-7xl"} mx-auto text-center`}
        >
          <h2
            className={`text-3xl font-bold mb-8 ${theme.textColors?.primary || ""}`}
          >
            Featured Publishers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Marvel Comics",
              "Raj Comics",
              "Timely Comics",
              "Apex Comics",
            ].map((publisher) => (
              <button
                key={publisher}
                onClick={() => {
                  setSelectedPublisher(publisher);
                  setCurrentPage(1);
                }}
                className={`p-4 rounded-lg transition-all hover:scale-105 ${theme.background?.bookCoverSide || ""} ${theme.border?.default || ""} ${theme.textColors?.primary || ""}`}
              >
                {publisher}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
