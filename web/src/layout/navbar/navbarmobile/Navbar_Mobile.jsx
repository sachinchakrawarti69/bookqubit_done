"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { FaRobot, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

import { NavItem } from "../navbardesktop/components/NavItem";
import SearchBar from "@/components/searchbar/SearchBar";
import UserDropDown from "@/components/auth/Dasktop_Profile_Dropdown";
import Notification_Dropdown from "@/components/notification/Desktop_Notification_Dropdown";
import Control from "../navbardesktop/components/Control";
import LangSwitchDropdown from "../navbardesktop/components/LangSwitchDropdown";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

// Import logo image
import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";
import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, themeName, changeTheme } = useTheme();
  const { t } = useLanguage();

  // ✅ Add ref to prevent duplicate listeners
  const authListenerInitialized = useRef(false);

  // Listen for Firebase Auth state - ONLY ONCE
  useEffect(() => {
    // ✅ Prevent duplicate listener setup
    if (authListenerInitialized.current) return;
    authListenerInitialized.current = true;

    console.log("Setting up auth listener - should run only once");

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.email || "No user");
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
      authListenerInitialized.current = false;
    };
  }, []);

  // Dark mode toggle - switches between light and dark only
  const toggleDarkMode = useCallback(() => {
    if (themeName === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  }, [themeName, changeTheme]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Close menu when clicking outside or on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get theme-based classes
  const getButtonClasses = useCallback(() => {
    return `navbar-mobile-darkmode-button ${isDarkMode ? "darkmode-active" : ""} ${theme.background?.navigationDots || ""} ${theme.border?.button || ""}`;
  }, [isDarkMode, theme.background?.navigationDots, theme.border?.button]);

  const getTextHighlightClass = useCallback(
    () =>
      theme.textColors?.highlight ||
      (isDarkMode ? "text-blue-400" : "text-sky-600"),
    [isDarkMode, theme.textColors?.highlight],
  );

  const getTextSecondaryClass = useCallback(
    () =>
      theme.textColors?.secondary ||
      (isDarkMode ? "text-gray-400" : "text-gray-500"),
    [isDarkMode, theme.textColors?.secondary],
  );

  // Show loading state while checking auth
  if (loading) {
    return (
      <nav
        className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
      >
        <div className="navbar-mobile-top-row">
          <Link href="/" className="navbar-mobile-logo">
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
          <div className="navbar-mobile-actions">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`navbar-mobile ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} ${theme.ringEffect || ""}`}
    >
      {/* ====================== TOP ROW ====================== */}
      <div className="navbar-mobile-top-row">
        {/* LOGO */}
        <Link href="/" className="navbar-mobile-logo" onClick={closeMenu}>
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

        {/* RIGHT ACTIONS */}
        <div className="navbar-mobile-actions">
          {/* DARK MODE TOGGLE BUTTON */}
          <button
            onClick={toggleDarkMode}
            className={getButtonClasses()}
            aria-label={t("navbar.toggle_dark_mode") || "Toggle dark mode"}
            title={isDarkMode ? (t("navbar.switch_to_light") || "Switch to Light Mode") : (t("navbar.switch_to_dark") || "Switch to Dark Mode")}
          >
            {isDarkMode ? (
              <FaSun className={getTextHighlightClass()} size={18} />
            ) : (
              <FaMoon className={getTextSecondaryClass()} size={18} />
            )}
          </button>

          {/* MENU TOGGLE BUTTON */}
          <button
            onClick={toggleMenu}
            className="navbar-mobile-menu-button"
            aria-label={isMenuOpen ? (t("navbar.close_menu") || "Close menu") : (t("navbar.open_menu") || "Open menu")}
          >
            {isMenuOpen ? (
              <FaTimes className={getTextHighlightClass()} size={22} />
            ) : (
              <FaBars className={getTextHighlightClass()} size={22} />
            )}
          </button>
        </div>
      </div>

      {/* ====================== MOBILE MENU (SLIDE FROM RIGHT) ====================== */}
      <div
        className={`navbar-mobile-menu ${isMenuOpen ? "open" : ""} ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
      >
        <div className="navbar-mobile-menu-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <p className={`text-sm font-medium ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                {user ? user.email?.split('@')[0] || t("navbar.user") || "User" : t("navbar.guest") || "Guest"}
              </p>
              <p className={`text-xs ${theme.textColors?.secondary || "text-gray-500"}`}>
                {user ? t("navbar.welcome_back") || "Welcome back!" : t("navbar.sign_in_to_continue") || "Sign in to continue"}
              </p>
            </div>
          </div>
        </div>

        <div className="navbar-mobile-menu-content">
          {/* Search Bar */}
          <div className="mb-6 px-4">
            <SearchBar mobile={true} />
          </div>

          {/* Navigation Items */}
          <div className="navbar-mobile-nav-items">
            <NavItem mobile={true} onItemClick={closeMenu} />
          </div>

          {/* Control Dropdown */}
          <div className="navbar-mobile-control-section">
            <Control mobile={true} />
          </div>

          {/* Language Switcher */}
          <div className="navbar-mobile-language-section">
            <LangSwitchDropdown mobile={true} onItemClick={closeMenu} />
          </div>

          {/* AI Tool Button */}
          <Link
            href="/bookqubitai"
            className="navbar-mobile-ai-button"
            onClick={closeMenu}
          >
            <FaRobot className={getTextHighlightClass()} size={18} />
            <span className={`navbar-mobile-ai-text ${getTextHighlightClass()}`}>
              {t("nav.bookqubit_ai") || "BookQubit AI"}
            </span>
          </Link>

          {/* User Actions */}
          <div className="navbar-mobile-user-section">
            {!user ? (
              <Link
                href="/auth/login"
                className="navbar-mobile-login-button"
                onClick={closeMenu}
              >
                {t("nav.login") || "Login"}
              </Link>
            ) : (
              <UserDropDown mobile={true} user={user} onItemClick={closeMenu} />
            )}
          </div>

          {/* Notification (if logged in) */}
          {user && (
            <div className="navbar-mobile-notification">
              <Notification_Dropdown user={user} mobile={true} />
            </div>
          )}
        </div>

        {/* Close button overlay */}
        {isMenuOpen && (
          <div className="navbar-mobile-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Mobile;