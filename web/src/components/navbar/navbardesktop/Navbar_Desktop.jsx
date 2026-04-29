"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRobot, FaMoon, FaSun } from "react-icons/fa";

import { NavItem } from "./components/NavItem";
import SearchBar from "../../searchbar/SearchBar";
import UserDropDown from "../../auth/Dasktop_Profile_Dropdown";
import Notification_Dropdown from "../../notification/Desktop_Notification_Dropdown";
import Control from "./components/Control";

import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";

// Import logo image
import bookqubitLogo from "../../../assets/logo/bookqubitlogo.png";
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
    if (themeName === 'dark') {
      changeTheme('light');
    } else {
      changeTheme('dark');
    }
  };

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <nav
      className={`navbar-desktop ${theme.background?.section || ''} ${theme.ringEffect || ''}`}
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
            className={`navbar-desktop-logo-text ${theme.textColors?.highlight || ''}`}
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
            className={`navbar-desktop-darkmode-button ${
              isDarkMode ? "darkmode-active" : ""
            } ${theme.background?.navigationDots || ''} ${theme.border?.button || ''}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <FaSun className={theme.textColors?.highlight || ''} />
            ) : (
              <FaMoon className={theme.textColors?.secondary || ''} />
            )}
          </button>

          {/* CONTROL DROPDOWN (Theme Switcher) */}
          <Control />

          {/* AI TOOL BUTTON */}
          <Link
            href="/bookqubitai"
            className={`navbar-desktop-ai-button ${theme.border?.default || ''}`}
          >
            <FaRobot className={theme.textColors?.highlight || ''} />
            <span
              className={`navbar-desktop-ai-text ${theme.textColors?.highlight || ''}`}
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
                theme.buttonColors?.primaryButton?.background || ''
              } ${theme.buttonColors?.primaryButton?.hoverBackground || ''}`}
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
        className={`navbar-desktop-links ${theme.background?.navigationDots || ''}`}
      >
        <div className="navbar-desktop-links-container">
          <NavItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Desktop;