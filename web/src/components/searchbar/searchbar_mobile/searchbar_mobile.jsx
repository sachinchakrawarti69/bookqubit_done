"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
        <SearchPage_Mobile onClose={handleCloseSearch} />
      )}
    </>
  );
};

export default SearchBar_Mobile;