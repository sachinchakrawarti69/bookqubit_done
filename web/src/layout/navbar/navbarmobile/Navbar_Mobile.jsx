"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaRobot,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import { NavItemMobile } from "./components/navItem_mobile/NavItem_Mobile";
import UserDropDown from "@/components/auth/Dasktop_Profile_Dropdown";
import Notification_Dropdown from "@/components/notification/Desktop_Notification_Dropdown";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import SearchPage_Mobile from "@/components/searchbar/searchbar_mobile/SearchPage_Mobile";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

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
  const { direction, isRTL } = useRTL();
  const menuRef = useRef(null);
  const authListenerInitialized = useRef(false);

  // Scroll lock for menu
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isMenuOpen) {
      const scrollY = window.scrollY;
      body.dataset.scrollY = scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      const scrollY = Number(body.dataset.scrollY || 0);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      html.style.overflow = "";
      window.scrollTo(0, scrollY);
      delete body.dataset.scrollY;
    }

    return () => {
      if (isMenuOpen) {
        const scrollY = Number(body.dataset.scrollY || 0);
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        body.style.overflow = "";
        html.style.overflow = "";
        window.scrollTo(0, scrollY);
        delete body.dataset.scrollY;
      }
    };
  }, [isMenuOpen]);

  // Escape key for search
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showSearchPage) closeSearchPage();
    };
    if (showSearchPage) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showSearchPage]);

  // Auth listener once
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

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const toggleDarkMode = useCallback(() => {
    changeTheme(themeName === "dark" ? "light" : "dark");
  }, [themeName, changeTheme]);

  const handleSearchClick = () => {
    setShowSearchPage(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSearch = (query, selectedBook = null) => {
    if (selectedBook) {
      router.push(`/books/${selectedBook.slug || selectedBook.id}`);
      closeSearchPage();
    } else if (query?.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      closeSearchPage();
    }
  };

  const closeSearchPage = () => setShowSearchPage(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isDarkMode = ["dark", "midnight", "cyberpunk"].includes(themeName);
  const getTextHighlightClass = () =>
    theme.textColors?.highlight ||
    (isDarkMode ? "text-blue-400" : "text-sky-600");
  const getTextSecondaryClass = () =>
    theme.textColors?.secondary ||
    (isDarkMode ? "text-gray-400" : "text-gray-500");

  if (loading) {
    return (
      <nav
        className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
        dir={direction}
      >
        <div className="navbar-mobile-top-row">
          <div className="navbar-mobile-left">
            <button className="navbar-mobile-icon-button" disabled>
              <FaBars size={22} />
            </button>
            <div className="navbar-mobile-logo">
              <img
                src={bookqubitLogo.src}
                alt="BookQubit"
                className="navbar-mobile-logo-img"
              />
              <span className="navbar-mobile-logo-text">BookQubit</span>
            </div>
          </div>
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
      <nav
        className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} ${theme.ringEffect || ""}`}
        dir={direction}
      >
        <div className="navbar-mobile-top-row">
          {/* 
            Clean Single Layout:
            Left Block stays Left Block in source code. 
            Right Block stays Right Block in source code.
            The CSS [dir="rtl"] handles reversing the layout perfectly.
          */}
          <div className="navbar-mobile-left">
            <button
              onClick={toggleMenu}
              className="navbar-mobile-icon-button"
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
            <Link
              href="/"
              className="navbar-mobile-logo"
              onClick={closeMenu}
            >
              <img
                src={bookqubitLogo.src}
                alt="BookQubit"
                className="navbar-mobile-logo-img"
              />
              <span
                className={`navbar-mobile-logo-text ${getTextHighlightClass()}`}
              >
                BookQubit
              </span>
            </Link>
          </div>

          <div className="navbar-mobile-actions">
            {/* 
              Inside the action block, icons are lined up: [Search, Theme, Config Slider, Auth Status].
              In LTR, they read left-to-right. In RTL, the group shifts to the left of the screen,
              and inside the group, they read right-to-left automatically.
            */}
            <button
              onClick={handleSearchClick}
              className="navbar-mobile-icon-button"
            >
              <FaSearch className={getTextSecondaryClass()} size={18} />
            </button>
            <button
              onClick={toggleDarkMode}
              className="navbar-mobile-icon-button"
            >
              {isDarkMode ? (
                <FaSun className={getTextHighlightClass()} size={18} />
              ) : (
                <FaMoon className={getTextSecondaryClass()} size={18} />
              )}
            </button>
            <Control_Mobile_Slider />
            {!user ? (
              <Link
                href="/auth/login"
                className="navbar-mobile-login-text-button"
                onClick={closeMenu}
              >
                <span>Login</span>
              </Link>
            ) : (
              <UserDropDown
                mobile={true}
                user={user}
                onItemClick={closeMenu}
              />
            )}
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          ref={menuRef}
          className={`navbar-mobile-menu ${isMenuOpen ? "open" : ""} ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
        >
          <div className="navbar-mobile-menu-header">
            <div className="navbar-mobile-user-info">
              <div className="navbar-mobile-avatar">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="navbar-mobile-avatar-img"
                  />
                ) : (
                  <FaUserCircle className="navbar-mobile-avatar-icon" />
                )}
              </div>
              <div className="navbar-mobile-user-details">
                <p className="navbar-mobile-user-name">
                  {user ? user.email?.split("@")[0] || "User" : "Guest"}
                </p>
                <p className="navbar-mobile-user-status">
                  {user ? "Welcome back!" : "Sign in to continue"}
                </p>
              </div>
              <button onClick={closeMenu} className="navbar-mobile-close-btn">
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="navbar-mobile-menu-content">
            <div className="navbar-mobile-nav-items">
              <NavItemMobile onItemClick={closeMenu} />
            </div>
            <div className="navbar-mobile-ai-section">
              <Link
                href="/bookqubitai"
                className="navbar-mobile-ai-button"
                onClick={closeMenu}
              >
                <FaRobot className="navbar-mobile-ai-icon" />
                <span className="navbar-mobile-ai-text">AI Assistant</span>
              </Link>
            </div>
            {user && (
              <div className="navbar-mobile-notification-section">
                <Notification_Dropdown user={user} mobile={true} />
              </div>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="navbar-mobile-overlay" onClick={closeMenu}></div>
        )}
      </nav>

      {showSearchPage && (
        <div className="mobile-search-fullscreen-overlay">
          <SearchPage_Mobile
            onSearch={handleSearch}
            onClose={closeSearchPage}
            initialQuery=""
          />
        </div>
      )}
    </>
  );
};

export default Navbar_Mobile;