"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import booksData from "@/data/books/BooksData";

export default function BooksPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const booksPerPage = 12;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  useEffect(() => {
    // Load books data
    setBooks(booksData);
  }, []);

  // Get unique genres
  const genres = ["All", ...new Set(booksData.map(book => book.genre || "General").filter(Boolean))];

  // Filter books based on search and genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre]);

  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150' fill='%23ccc'%3E%3Crect width='100' height='150' /%3E%3Ctext x='10' y='75' fill='%23333' font-size='14'%3ENo cover%3C/text%3E%3C/svg%3E";

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-12 px-4 sm:px-6 lg:px-8'} text-center ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Explore Our Books
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Discover thousands of books across all genres. Find your next great read today!
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.navigationDots || ''} ${theme.textColors?.primary || ''}`}
              />
            </div>

            {/* Genre Filter */}
            <div className="md:w-64">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.navigationDots || ''} ${theme.textColors?.primary || ''}`}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mb-4 ${theme.textColors?.secondary || ''}`}>
            Found {filteredBooks.length} books
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {currentBooks.length === 0 ? (
            <div className={`text-center py-12 ${theme.textColors?.secondary || ''}`}>
              No books found. Try adjusting your search or filter.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                  >
                    <Link href={`/books/${book.slug || book.id}`}>
                      <div className="p-4">
                        <div className="flex justify-center mb-4">
                          <img
                            src={book.imageUrl || fallbackImage}
                            alt={book.title}
                            className="h-48 w-auto object-contain rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackImage;
                            }}
                          />
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${theme.textColors?.primary || ''} line-clamp-2`}>
                          {book.title}
                        </h3>
                        <p className={`text-sm mb-2 ${theme.textColors?.secondary || ''}`}>
                          by {book.author}
                        </p>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating || 0)
                                  ? theme.iconColors?.starFilled || 'text-amber-400'
                                  : theme.iconColors?.starEmpty || 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className={`text-xs ml-2 ${theme.textColors?.secondary || ''}`}>
                            ({book.rating || 0}/5)
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          {book.price && (
                            <span className={`text-lg font-bold ${theme.textColors?.highlight || ''}`}>
                              ${book.price}
                            </span>
                          )}
                          <span className={`text-sm ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} text-white px-3 py-1 rounded-lg`}>
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
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-gray-300'} ${theme.buttonColors?.secondaryButton?.textColor || 'text-gray-700'}`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === index + 1
                          ? theme.buttonColors?.primaryButton?.background || 'bg-blue-600 text-white'
                          : theme.buttonColors?.secondaryButton?.background || 'border-2 border-gray-300'
                      } ${theme.buttonColors?.secondaryButton?.textColor || ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-gray-300'} ${theme.buttonColors?.secondaryButton?.textColor || 'text-gray-700'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}