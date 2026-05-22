"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchPage_Mobile from "./SearchPage_Mobile";
import "./searchbar_mobile.css";

const SearchBar_Mobile = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);

  const handleOpenSearch = () => {
    setShowSearchPage(true);
    // Prevent body scroll when search page is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseSearch = () => {
    setShowSearchPage(false);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showSearchPage) {
        handleCloseSearch();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [showSearchPage]);

  return (
    <>
      {/* Search Icon Button for Mobile Navbar */}
      <button
        onClick={handleOpenSearch}
        className="mobile-search-icon"
        aria-label="Search"
      >
        <FaSearch size={20} />
      </button>

      {/* Full Screen Search Page */}
      {showSearchPage && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-header">
            <button
              onClick={handleCloseSearch}
              className="mobile-search-close"
              aria-label="Close search"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <SearchPage_Mobile onClose={handleCloseSearch} />
        </div>
      )}
    </>
  );
};

export default SearchBar_Mobile;