"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import "./navbar.css";

const BookQubitSnapNavbar = ({ onCreatePost, onSearch }) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 480) {
        setIsSearchOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav className={`bookqubitsnap-navbar ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="navbar-container">
        {/* Left Section */}
        <div className={`navbar-left ${isSearchOpen ? "hidden-mobile" : ""}`}>
          <button onClick={handleGoBack} className="nav-icon-btn" aria-label="Go back">
            <FaArrowLeft />
          </button>
          <button onClick={handleGoHome} className="nav-icon-btn" aria-label="Go home">
            <FaHome />
          </button>
          <div className="snap-logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">BookQubitSnap</span>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className={`navbar-center ${isSearchOpen ? "active" : ""}`}>
          <form onSubmit={handleSearch} className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search posts, authors, books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus={isSearchOpen}
            />
            {searchQuery && (
              <button type="button" className="search-clear" onClick={clearSearch}>
                <FaTimes />
              </button>
            )}
            {isMobile && (
              <button type="button" className="search-close" onClick={toggleSearch}>
                <FaTimes />
              </button>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className={`navbar-right ${isSearchOpen ? "hidden-mobile" : ""}`}>
          {/* Mobile Search Toggle */}
          {isMobile && (
            <button onClick={toggleSearch} className="nav-icon-btn search-toggle" aria-label="Search">
              <FaSearch />
            </button>
          )}
          
          {onCreatePost && (
            <button onClick={onCreatePost} className="create-post-btn" aria-label="Create post">
              <FaPlus />
              <span className="btn-text">Create</span>
            </button>
          )}
          
          <button className="nav-icon-btn notification-btn" aria-label="Notifications">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          
          <button className="nav-icon-btn" aria-label="Messages">
            <FaEnvelope />
          </button>
          
          <button className="user-menu-btn" aria-label="Profile">
            <FaUser />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BookQubitSnapNavbar;