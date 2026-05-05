"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";

const BookViewChanger = ({
  viewType,
  setViewType,
  isMobile,
  showFilters,
  setShowFilters,
  sortOption,
  setSortOption,
  itemsPerPage,
  setItemsPerPage,
  showAdvancedControls = false,
}) => {
  const { theme, themeName } = useTheme();
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Only grid and list views
  const viewOptions = [
    {
      id: "grid",
      label: "Grid View",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      description: "Compact card display",
    },
    {
      id: "list",
      label: "List View",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
      description: "Detailed list display",
    },
  ];

  const sortOptions = [
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "author-asc", label: "Author (A-Z)" },
    { value: "author-desc", label: "Author (Z-A)" },
    { value: "date-newest", label: "Date (Newest)" },
    { value: "date-oldest", label: "Date (Oldest)" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
  ];

  const itemsPerPageOptions = [
    { value: 12, label: "12 per page" },
    { value: 24, label: "24 per page" },
    { value: 36, label: "36 per page" },
    { value: 48, label: "48 per page" },
    { value: 96, label: "96 per page" },
  ];

  const gridDensityOptions = [
    { id: "compact", label: "Compact", icon: "≡" },
    { id: "normal", label: "Normal", icon: "☰" },
    { id: "spacious", label: "Spacious", icon: "⧉" },
  ];

  // Get button styles based on theme
  const getButtonClasses = (isActive = false) => {
    const baseClasses = `
      px-4 py-2 
      flex items-center justify-center gap-2 
      rounded-md 
      transition-all duration-200 
      hover:opacity-80
    `;
    
    if (isActive) {
      return `${baseClasses} ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`;
    }
    
    return `${baseClasses} 
      ${theme.background?.secondary || 'bg-gray-100 dark:bg-gray-800'} 
      ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} 
      border ${theme.border?.button || 'border-gray-300 dark:border-gray-600'} 
      ${theme.shadow?.button || 'shadow-sm'}
    `;
  };

  const getDropdownClasses = () => {
    return `
      absolute right-0 mt-2 w-56 
      rounded-md shadow-lg z-50 
      border 
      ${theme.background?.card === '#ffffff' ? 'bg-white dark:bg-gray-800' : theme.background?.card || 'bg-white dark:bg-gray-800'} 
      ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}
      overflow-hidden
    `;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {/* Filters Toggle Button - Always visible */}
      <div className="relative">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={getButtonClasses()}
          title={showFilters ? "Hide Filters" : "Show Filters"}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="hidden sm:inline">
            {showFilters ? "Hide Filters" : "Filters"}
          </span>
        </button>
      </div>

      {/* Desktop-only controls */}
      {!isMobile && (
        <>
          {/* View Type Selector */}
          <div className="relative">
            <button
              onClick={() => setShowViewOptions(!showViewOptions)}
              className={getButtonClasses()}
              title="Change View"
            >
              {viewOptions.find((v) => v.id === viewType)?.icon}
              <span className="hidden sm:inline">
                {viewOptions.find((v) => v.id === viewType)?.label}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${showViewOptions ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* View Options Dropdown */}
            {showViewOptions && (
              <div className={getDropdownClasses()}>
                <div className="py-1">
                  <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                    View Options
                  </div>
                  {viewOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setViewType(option.id);
                        setShowViewOptions(false);
                      }}
                      className={`
                        flex items-center w-full px-4 py-3 text-left 
                        transition-all duration-200 hover:opacity-80
                        ${viewType === option.id 
                          ? `${theme.background?.selected || 'bg-sky-50 dark:bg-sky-900/20'} ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'}`
                          : theme.textColors?.primary || 'text-gray-900 dark:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center w-8">
                        {option.icon}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">
                          {option.label}
                        </div>
                        <div className={`text-xs ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                          {option.description}
                        </div>
                      </div>
                      {viewType === option.id && (
                        <svg
                          className={`ml-auto h-5 w-5 ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Options */}
          {showAdvancedControls && (
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className={getButtonClasses()}
                title="Sort Options"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <span className="hidden sm:inline">Sort</span>
              </button>

              {/* Sort Options Dropdown */}
              {showSortOptions && (
                <div className={`${getDropdownClasses()} w-48`}>
                  <div className="py-1">
                    <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}>
                      Sort By
                    </div>
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOption(option.value);
                          setShowSortOptions(false);
                        }}
                        className={`
                          block w-full text-left px-4 py-2 text-sm 
                          transition-all duration-200 hover:opacity-80
                          ${sortOption === option.value 
                            ? `${theme.background?.selected || 'bg-sky-50 dark:bg-sky-900/20'} ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'}`
                            : theme.textColors?.primary || 'text-gray-900 dark:text-white'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Items Per Page */}
          {showAdvancedControls && (
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className={`
                  pl-3 pr-8 py-2 
                  appearance-none 
                  rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-sky-500
                  transition-colors duration-200
                  ${theme.background?.secondary || 'bg-gray-100 dark:bg-gray-800'}
                  ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}
                  border ${theme.border?.button || 'border-gray-300 dark:border-gray-600'}
                  ${theme.shadow?.button || 'shadow-sm'}
                  cursor-pointer
                `}
                title="Items per page"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none ${theme.textColors?.tertiary || 'text-gray-400 dark:text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}

          {/* Grid Density Toggle (Only for grid view) */}
          {viewType === "grid" && (
            <div
              className={`
                flex items-center gap-1 rounded-md p-1
                ${theme.background?.tertiary || 'bg-gray-100 dark:bg-gray-800'}
              `}
            >
              {gridDensityOptions.map((density) => (
                <button
                  key={density.id}
                  onClick={() => {
                    /* Handle density change */
                  }}
                  className={`
                    px-3 py-1 text-sm rounded 
                    transition-all duration-200
                    ${density.id === "normal"
                      ? `${theme.background?.card || 'bg-white dark:bg-gray-700'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} shadow-sm`
                      : `${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'} hover:${theme.background?.card || 'bg-gray-50 dark:bg-gray-700'}`
                    }
                  `}
                  title={density.label}
                >
                  {density.icon}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookViewChanger;