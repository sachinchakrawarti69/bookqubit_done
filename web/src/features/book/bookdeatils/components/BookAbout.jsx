"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";

const BookAbout = ({ book }) => {
  const { theme, themeName } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode (for any conditional styling)
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const safeString = (str) => str || "Not specified";
  const safeArray = (array) => (Array.isArray(array) ? array : []);

  const aboutFields = [
    { label: "Publisher", value: book.publisher },
    { label: "Original Title", value: book.originaltitle || book.originalTitle },
    { label: "Language", value: book.language },
    { label: "Original Published", value: book.originalPublished },
    { label: "Genres", value: safeArray(book.genres).join(", ") || "Not specified" },
    { label: "Country", value: book.country },
    { label: "ISBN", value: book.isbn },
    { label: "Pages", value: book.pages },
    { label: "Edition", value: book.edition },
  ];

  // Filter out undefined/null values
  const visibleFields = aboutFields.filter(field => field.value);

  // If no fields have values, don't render
  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <div className={`
      ${theme.shadow?.container || 'shadow-lg'} 
      ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} 
      p-6 
      ${theme.background?.section || 'bg-white dark:bg-gray-800'} 
      mb-16 
      rounded-2xl
    `}>
      <h2 className={`text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-4`}>
        About
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleFields.map((field, index) => (
          <div key={index}>
            <h3 className={`font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
              {field.label}
            </h3>
            <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
              {safeString(field.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Make sure to export default
export default BookAbout;