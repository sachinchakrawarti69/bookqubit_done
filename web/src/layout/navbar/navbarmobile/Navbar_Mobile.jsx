"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRobot, FaMoon, FaSun, FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";

import { NavItemMobile } from "./NavItem_Mobile";
import UserDropDown from "@/components/auth/Dasktop_Profile_Dropdown";
import Notification_Dropdown from "@/components/notification/Desktop_Notification_Dropdown";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import SearchPage_Mobile from "@/components/searchbar/searchbar_mobile/SearchPage_Mobile";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

// Import logo image
import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";
import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);
  const { theme, themeName, changeTheme } = useTheme();
  const { t } = useLanguage();
  const menuRef = useRef(null);

  // Add ref to prevent duplicate listeners
  const authListenerInitialized = useRef(false);

  // Listen for Firebase Auth state - ONLY ONCE
  useEffect(() => {
    if (authListenerInitialized.current) return;
    authListenerInitialized.current = true;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      authListenerInitialized.current = false;
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // REMOVED: Body scroll blocking for search page - navbar stays visible
  // The search page now renders below the navbar without blocking scroll

  // Dark mode toggle - switches between light and dark only
  const toggleDarkMode = useCallback(() => {
    if (themeName === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  }, [themeName, changeTheme]);

  // Handle search icon click - opens search page component
  const handleSearchClick = () => {
    setShowSearchPage(true);
    // Close menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle search from search page component
  const handleSearch = (query, selectedBook = null) => {
    if (selectedBook) {
      // Navigate to book page with correct route
      const slug = selectedBook.slug || selectedBook.id;
      router.push(`/books/${slug}`);
      setShowSearchPage(false);
    } else if (query && query.trim()) {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearchPage(false);
    }
  };

  // Close search page
  const closeSearchPage = () => {
    setShowSearchPage(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const getTextHighlightClass = useCallback(
    () => theme.textColors?.highlight || (isDarkMode ? "text-blue-400" : "text-sky-600"),
    [isDarkMode, theme.textColors?.highlight],
  );

  const getTextSecondaryClass = useCallback(
    () => theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500"),
    [isDarkMode, theme.textColors?.secondary],
  );

  if (loading) {
    return (
      <nav className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}>
        <div className="navbar-mobile-top-row">
          <button className="navbar-mobile-icon-button" aria-label="Loading menu" disabled>
            <FaBars className={getTextHighlightClass()} size={22} />
          </button>
          <Link href="/" className="navbar-mobile-logo">
            <img src={bookqubitLogo.src} alt="BookQubit" className="navbar-mobile-logo-img" />
            <span className={`navbar-mobile-logo-text ${getTextHighlightClass()}`}>BookQubit</span>
          </Link>
          <div className="navbar-mobile-actions">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} ${theme.ringEffect || ""}`}>
        <div className="navbar-mobile-top-row">
          {/* LEFT: HAMBURGER MENU */}
          <button
            onClick={toggleMenu}
            className="navbar-mobile-icon-button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes className={getTextHighlightClass()} size={22} /> : <FaBars className={getTextHighlightClass()} size={22} />}
          </button>

          {/* LEFT: LOGO (beside hamburger) */}
          <Link href="/" className="navbar-mobile-logo" onClick={closeMenu}>
            <img src={bookqubitLogo.src} alt="BookQubit" className="navbar-mobile-logo-img" />
            <span className={`navbar-mobile-logo-text ${getTextHighlightClass()}`}>BookQubit</span>
          </Link>

          {/* RIGHT: ICON ACTIONS */}
          <div className="navbar-mobile-actions">
            {/* SEARCH ICON - Opens search page component */}
            <button
              onClick={handleSearchClick}
              className="navbar-mobile-icon-button"
              aria-label="Search"
            >
              <FaSearch className={getTextSecondaryClass()} size={18} />
            </button>

            {/* DARK MODE TOGGLE */}
            <button
              onClick={toggleDarkMode}
              className="navbar-mobile-icon-button"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className={getTextHighlightClass()} size={18} /> : <FaMoon className={getTextSecondaryClass()} size={18} />}
            </button>

            {/* CONTROL SLIDER */}
            <Control_Mobile_Slider />

            {/* LOGIN BUTTON WITH TEXT */}
            {!user ? (
              <Link href="/auth/login" className="navbar-mobile-login-text-button" onClick={closeMenu}>
                <span className="navbar-mobile-login-text">Login</span>
              </Link>
            ) : (
              <UserDropDown mobile={true} user={user} onItemClick={closeMenu} />
            )}
          </div>
        </div>

        {/* MOBILE MENU (SLIDE FROM LEFT) - FIXED POSITION OVERLAY */}
        <div 
          ref={menuRef}
          className={`navbar-mobile-menu ${isMenuOpen ? "open" : ""} ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
        >
          {/* Menu Header */}
          <div className="navbar-mobile-menu-header">
            <div className="navbar-mobile-user-info">
              <div className="navbar-mobile-avatar">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="navbar-mobile-avatar-img" />
                ) : (
                  <FaUserCircle className="navbar-mobile-avatar-icon" />
                )}
              </div>
              <div className="navbar-mobile-user-details">
                <p className="navbar-mobile-user-name">
                  {user ? user.email?.split('@')[0] || "User" : "Guest"}
                </p>
                <p className="navbar-mobile-user-status">
                  {user ? "Welcome back!" : "Sign in to continue"}
                </p>
              </div>
              <button
                onClick={closeMenu}
                className="navbar-mobile-close-btn"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="navbar-mobile-menu-content">
            {/* Navigation Items */}
            <div className="navbar-mobile-nav-items">
              <NavItemMobile onItemClick={closeMenu} />
            </div>

            {/* AI Button Section */}
            <div className="navbar-mobile-ai-section">
              <Link href="/bookqubitai" className="navbar-mobile-ai-button" onClick={closeMenu}>
                <FaRobot className="navbar-mobile-ai-icon" />
                <span className="navbar-mobile-ai-text">AI Assistant</span>
              </Link>
            </div>

            {/* Notification Section (if logged in) */}
            {user && (
              <div className="navbar-mobile-notification-section">
                <Notification_Dropdown user={user} mobile={true} />
              </div>
            )}
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && <div className="navbar-mobile-overlay" onClick={closeMenu}></div>}
      </nav>

      {/* Mobile Search Page Component - Renders BELOW navbar, not as overlay */}
      {showSearchPage && (
        <SearchPage_Mobile
          onSearch={handleSearch}
          onClose={closeSearchPage}
          initialQuery=""
        />
      )}
    </>
  );
};

export default Navbar_Mobile;