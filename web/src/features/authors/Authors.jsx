"use client";

import React from "react";
import Link from "next/link";
import authors from "@/data/authors/AuthorsData";
import { useTheme } from "@/themes/useTheme";

const Authors = () => {
  const { theme, themeName } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} min-h-screen py-16`}>
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4`}>
        
        {/* Title */}
        <h1 className={`text-4xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-12 text-center`}>
          Featured Authors
        </h1>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <div
              key={author.id}
              className={`
                ${theme.background?.card || (isDarkMode ? 'bg-gray-800' : 'bg-white')}
                ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'}
                ${theme.shadow?.book || 'shadow-2xl'}
                overflow-hidden
                rounded-lg
                hover:scale-[1.02]
                transition-transform
                duration-300
              `}
            >
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-author.jpg';
                }}
              />

              <div className="p-6">
                <h2 className={`text-2xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-2`}>
                  {author.name}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                    {author.country || "Unknown"}
                  </span>
                  <span className={`w-1 h-1 rounded-full ${theme.background?.navigationDots || (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')}`}></span>
                  <span className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                    {author.bookCount || author.books?.length || 0} {author.bookCount === 1 ? 'book' : 'books'}
                  </span>
                </div>

                <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mb-4 line-clamp-3 leading-relaxed`}>
                  {author.bio}
                </p>

                <div className="flex gap-3">
                  <Link
                    href={`/authors/${author.slug}`}
                    className={`
                      ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-sky-500 bg-transparent'}
                      ${theme.buttonColors?.secondaryButton?.hoverBackground || 'hover:bg-sky-50 dark:hover:bg-sky-900/20'}
                      ${theme.buttonColors?.secondaryButton?.textColor || 'text-sky-600 dark:text-sky-400'}
                      px-4 py-2.5 text-sm flex-1 text-center rounded-lg
                      transition-all duration-200 hover:shadow-md
                    `}
                  >
                    Know More
                  </Link>

                  <Link
                    href={`/bookslist?author=${encodeURIComponent(author.name)}`}
                    className={`
                      ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}
                      ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:from-sky-700 hover:to-sky-600'}
                      ${theme.buttonColors?.primaryButton?.textColor || 'text-white'}
                      px-4 py-2.5 text-sm flex-1 text-center rounded-lg
                      transition-all duration-200 hover:shadow-md
                    `}
                  >
                    View Books
                  </Link>
                </div>

                {/* Optional: Add author genres/tags */}
                {author.genres && author.genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {author.genres.slice(0, 3).map((genre, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${theme.background?.navigationDots || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')} ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Authors Fallback */}
        {authors.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-lg ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              No authors found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;