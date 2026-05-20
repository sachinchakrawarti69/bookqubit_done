"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import Button from "../actions/Button";

const BookRectangleCard = ({ book, onTagClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className={theme.iconColors?.starFilled || "text-amber-400"}
          >
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span
            key="half"
            className={theme.iconColors?.starFilled || "text-amber-400"}
          >
            ½
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className={theme.iconColors?.starEmpty || "text-gray-300"}
          >
            ★
          </span>
        ))}
        <span
          className={`text-sm ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} ml-1`}
        >
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Format published year
  const formatPublishedYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.getFullYear().toString();
  };

  // Helper to ensure category is always an array
  const getCategoryArray = () => {
    if (!book.category) return [];
    return Array.isArray(book.category) ? book.category : [book.category];
  };

  return (
    <div
      className={`
      hidden md:flex h-[550px] mx-auto w-[80%] max-w-6xl 
      ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
      ${theme.shadow?.book || "shadow-2xl"} 
      ${theme.background?.section || "bg-white dark:bg-gray-800"}
      overflow-hidden rounded-xl
      transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
      ${theme.ringEffect || ""}
      relative
    `}
    >
      {/* Image section - 40% width with proper containment */}
      <div
        className={`
        w-[40%] h-full 
        ${theme.background?.bookCoverSide || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"} 
        flex items-center justify-center p-4 flex-shrink-0 overflow-hidden
        relative group
      `}
      >
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/default-book-cover.jpg";
          }}
          loading="lazy"
        />

        {/* Image overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Details section - 60% width */}
      <div className="w-[60%] p-6 flex flex-col justify-between">
        <div>
          <h2
            className={`text-2xl font-bold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-2 line-clamp-2`}
          >
            {book.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <p
              className={`text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              {t("book.by")}{" "}
              {book.authorId ? (
                <Link
                  href={`/authors/${book.authorId}`}
                  className={`font-bold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} hover:underline`}
                >
                  {book.author}
                </Link>
              ) : (
                <span
                  className={`font-bold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}
                >
                  {book.author}
                </span>
              )}
            </p>
            {book.published && (
              <span
                className={`
                text-xs px-2 py-1 
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} 
                ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}
                rounded-full
              `}
              >
                {t("book.published")}: {formatPublishedYear(book.published)}
              </span>
            )}
          </div>

          {/* Rating */}
          {book.rating && (
            <div className="mb-4">{renderStars(book.rating)}</div>
          )}

          <p
            className={`text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} mb-4 line-clamp-3 leading-relaxed`}
          >
            {book.description}
          </p>

          {/* Tags section with clickable tags */}
          <div className="mb-4 space-y-3">
            {book.category && (
              <div className="mb-2">
                <h3
                  className={`text-xs font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} mb-2 uppercase tracking-wider`}
                >
                  {t("book.category") || "Category"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getCategoryArray().map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(cat)}
                      className={`
                        text-xs px-3 py-1.5 
                        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                        ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
                        ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"}
                        hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}
                        rounded-full 
                        transition-all duration-200
                        ${theme.shadow?.button || "shadow-sm"}
                        hover:shadow-md
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {book.keyPoints && book.keyPoints.length > 0 && (
              <div className="mb-2">
                <h3
                  className={`text-xs font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} mb-2 uppercase tracking-wider`}
                >
                  {t("book.key_points") || "Key Points"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.keyPoints.slice(0, 3).map((point, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(point)}
                      className={`
                        text-xs px-3 py-1.5 
                        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                        ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
                        ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"}
                        hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}
                        rounded-full 
                        transition-all duration-200
                        ${theme.shadow?.button || "shadow-sm"}
                        hover:shadow-md
                      `}
                    >
                      {point.length > 20
                        ? `${point.substring(0, 20)}...`
                        : point}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {book.subjects && book.subjects.length > 0 && (
              <div className="mb-2">
                <h3
                  className={`text-xs font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} mb-2 uppercase tracking-wider`}
                >
                  {t("book.subjects") || "Subjects"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 3).map((subject, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(subject)}
                      className={`
                        text-xs px-3 py-1.5 
                        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                        ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
                        ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"}
                        hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}
                        rounded-full 
                        transition-all duration-200
                        ${theme.shadow?.button || "shadow-sm"}
                        hover:shadow-md
                      `}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {book.tags && book.tags.length > 0 && (
              <div className="mb-2">
                <h3
                  className={`text-xs font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} mb-2 uppercase tracking-wider`}
                >
                  {t("book.tags") || "Tags"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(tag)}
                      className={`
                        text-xs px-3 py-1.5 
                        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
                        ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"} 
                        ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"}
                        hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}
                        rounded-full 
                        transition-all duration-200
                        ${theme.shadow?.button || "shadow-sm"}
                        hover:shadow-md
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons - Reorganized into two rows */}
        <div className="flex flex-col gap-3">
          {/* First row with 3 buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Know More Button - FIXED: Now points to book page */}
            <Link
              href={`/book/${book.slug || book.id}`}
              className="flex-1 min-w-[120px]"
            >
              <Button
                text={t("book.know_more") || "Know More"}
                preset="primaryButton"
                className="w-full"
              />
            </Link>
            {book.buttons?.getBook && (
              <Button
                text={t("book.get_book") || "Get Book"}
                href={book.buttons.getBook}
                preset="secondaryButton"
                className="flex-1 min-w-[120px]"
              />
            )}
            {book.buttons?.readSummary && (
              <Button
                text={t("book.summary") || "Summary"}
                href={book.buttons.readSummary}
                preset="secondaryButton"
                className="flex-1 min-w-[120px]"
              />
            )}
          </div>

          {/* Second row with Audiobook button */}
          {book.buttons?.listenAudiobook && (
            <div className="flex flex-wrap gap-3 text-center">
              <Button
                text={t("book.audiobook") || "Audiobook"}
                href={book.buttons.listenAudiobook}
                preset="secondaryButton"
                className="flex-1 min-w-[120px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent hover:ring-sky-500/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default BookRectangleCard;
