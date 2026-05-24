"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaMoon, FaSun, FaBars, FaUser, FaBell } from "react-icons/fa";
import { useRTL } from "@/contexts/RTLContext";
import { useTheme } from "@/themes/useTheme";
import Silder_Mobile from "./components/silder_mobile/silder_mobile";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const { direction, isRTL } = useRTL();
  const { theme, themeName, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change to true to see profile icon state

  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" ||
        themeName === "midnight" ||
        themeName === "cyberpunk",
    );
  }, [themeName]);

  const handleThemeToggle = () => {
    if (toggleTheme) {
      toggleTheme();
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // window.location.href = "/auth/login";
  };

  return (
    <nav className="navbar-mobile" dir={direction}>
      {/* Left Section - Menu Icon */}
      <div className="navbar-mobile-left">
        <button className="nav-control-btn menu-btn" aria-label="Menu">
          <Silder_Mobile />
        </button>
      </div>

      {/* Center Section - Logo */}
      <div className="navbar-mobile-center">
        <Link href="/homepages" className="navbar-mobile-logo">
          <div className="logo-icon">📚</div>
          <span className="logo-text">BookQubit</span>
        </Link>
      </div>

      {/* Right Section - All Control Icons */}
      <div className="navbar-mobile-right">
        {/* Search Icon */}
        <button className="nav-control-btn search-btn" aria-label="Search">
          <FaSearch />
        </button>

        {/* Dark Mode Toggle */}
        <button
          className="nav-control-btn theme-btn"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Control Slider - ALWAYS SHOWS (no changes to this component) */}
        <Control_Mobile_Slider />

        {/* Notification Icon - Only shows when logged in */}
        {isLoggedIn && (
          <button className="nav-control-btn notification-btn" aria-label="Notifications">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
        )}

        {/* Login Button - Shows when not logged in */}
        {!isLoggedIn && (
          <button className="login-btn-nav" onClick={handleLogin}>
            <FaUser />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Mobile;