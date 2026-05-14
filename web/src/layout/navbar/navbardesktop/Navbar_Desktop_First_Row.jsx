"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { FaRobot, FaMoon, FaSun } from "react-icons/fa";

import SearchBar from "@/components/searchbar/SearchBar";
import UserDropDown from "@/components/auth/Dasktop_Profile_Dropdown";
import Notification_Dropdown from "@/components/notification/Desktop_Notification_Dropdown";
import Control from "./components/Control";
import LangSwitchDropdown from "./components/LangSwitchDropdown";

import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";

// Import logo image
import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";
import "./Navbar_Desktop_First_Row.css";

const Navbar_Desktop_First_Row = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, themeName, changeTheme } = useTheme();
  const { isRTL } = useRTL();
  const { currentFont } = useFont();

  // Add ref to prevent duplicate listeners
  const authListenerInitialized = useRef(false);

  // Apply font to navbar
  useEffect(() => {
    if (currentFont?.family) {
      const navbarElement = document.querySelector('.navbar-desktop-first-row');
      if (navbarElement) {
        navbarElement.style.fontFamily = currentFont.family;
      }
    }
  }, [currentFont]);

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

  // Dark mode toggle - switches between light and dark only
  const toggleDarkMode = useCallback(() => {
    if (themeName === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  }, [themeName, changeTheme]);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get theme-based classes with RTL support
  const getButtonClasses = useCallback(() => {
    return `navbar-desktop-darkmode-button ${isDarkMode ? "darkmode-active" : ""} ${theme.background?.navigationDots || ""} ${theme.border?.button || ""}`;
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
      <div
        className={`navbar-desktop-first-row ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")}`}
        dir={isRTL ? "rtl" : "ltr"}
        style={{ fontFamily: currentFont?.family || 'inherit' }}
      >
        <div className="navbar-desktop-top-row">
          <Link href="/" className="navbar-desktop-logo">
            <img
              src={bookqubitLogo.src}
              alt="BookQubit"
              className="navbar-desktop-logo-img"
            />
            <span
              className={`navbar-desktop-logo-text ${getTextHighlightClass()}`}
            >
              BookQubit
            </span>
          </Link>
          <div className="navbar-desktop-search">
            <SearchBar />
          </div>
          <div className="navbar-desktop-user-actions">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`navbar-desktop-first-row ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} ${theme.ringEffect || ""}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ fontFamily: currentFont?.family || 'inherit' }}
    >
      {/* TOP ROW */}
      <div className="navbar-desktop-top-row">
        {/* LOGO */}
        <Link href="/" className="navbar-desktop-logo">
          <img
            src={bookqubitLogo.src}
            alt="BookQubit"
            className="navbar-desktop-logo-img"
          />
          <span
            className={`navbar-desktop-logo-text ${getTextHighlightClass()}`}
          >
            BookQubit
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="navbar-desktop-search">
          <SearchBar />
        </div>

        {/* USER ACTIONS */}
        <div className="navbar-desktop-user-actions">
          {/* DARK MODE TOGGLE BUTTON */}
          <button
            onClick={toggleDarkMode}
            className={getButtonClasses()}
            aria-label="Toggle dark mode"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <FaSun className={getTextHighlightClass()} size={18} />
            ) : (
              <FaMoon className={getTextSecondaryClass()} size={18} />
            )}
          </button>

          {/* LANGUAGE SWITCHER DROPDOWN */}
          <LangSwitchDropdown />

          {/* CONTROL DROPDOWN (Theme & Font Switcher) */}
          <Control />

          {/* AI TOOL BUTTON */}
          <Link
            href="/bookqubitai"
            className={`navbar-desktop-ai-button ${theme.border?.default || ""}`}
          >
            <FaRobot className={getTextHighlightClass()} size={18} />
            <span
              className={`navbar-desktop-ai-text ${getTextHighlightClass()}`}
            >
              AI
            </span>
          </Link>

          {/* NOTIFICATION (ONLY SHOW IF LOGGED IN) */}
          {user && (
            <div className="navbar-desktop-notification">
              <Notification_Dropdown user={user} />
            </div>
          )}

          {/* LOGIN OR USER MENU - SINGLE INSTANCE */}
          {!user ? (
            <Link
              key="login-button"
              href="/auth/login"
              className={`navbar-desktop-signup-button ${
                theme.buttonColors?.primaryButton?.background ||
                "bg-gradient-to-r from-sky-600 to-sky-500"
              } ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"}`}
            >
              {isRTL ? "داخل ہوں" : "Login"}
            </Link>
          ) : (
            <UserDropDown key={`user-dropdown-${user.uid}`} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar_Desktop_First_Row;