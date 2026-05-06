"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRobot, FaMoon, FaSun } from "react-icons/fa";

import { NavItem } from "./components/NavItem";
import SearchBar from "@/components/searchbar/SearchBar";  // Fixed path
import UserDropDown from "@/components/auth/Dasktop_Profile_Dropdown";  // Fixed path
import Notification_Dropdown from "@/components/notification/Desktop_Notification_Dropdown";  // Fixed path
import Control from "./components/Control";

import { auth } from "@/config/firebase";  // Fixed path
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";

// Import logo image
import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";  // Fixed path
import "./Navbar_Desktop.css";

const Navbar_Desktop = () => {
  const [user, setUser] = useState(null);
  const { theme, themeName, changeTheme } = useTheme();

  // Listen for Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Dark mode toggle - switches between light and dark only
  const toggleDarkMode = () => {
    if (themeName === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  };

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get theme-based classes
  const getButtonClasses = () => {
    return `navbar-desktop-darkmode-button ${isDarkMode ? "darkmode-active" : ""} ${theme.background?.navigationDots || ""} ${theme.border?.button || ""}`;
  };

  const getTextHighlightClass = () =>
    theme.textColors?.highlight ||
    (isDarkMode ? "text-blue-400" : "text-sky-600");
  const getTextSecondaryClass = () =>
    theme.textColors?.secondary ||
    (isDarkMode ? "text-gray-400" : "text-gray-500");

  return (
    <nav
      className={`navbar-desktop ${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white")} ${theme.ringEffect || ""}`}
    >
      {/* ====================== TOP ROW ====================== */}
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

          {/* LOGIN OR USER MENU */}
          {!user ? (
            <Link
              href="/auth/login"
              className={`navbar-desktop-signup-button ${
                theme.buttonColors?.primaryButton?.background ||
                "bg-gradient-to-r from-sky-600 to-sky-500"
              } ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"}`}
            >
              Login
            </Link>
          ) : (
            <UserDropDown user={user} />
          )}
        </div>
      </div>

      {/* ====================== NAV LINKS ====================== */}
      <div
        className={`navbar-desktop-links ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}`}
      >
        <div className="navbar-desktop-links-container">
          <NavItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Desktop;