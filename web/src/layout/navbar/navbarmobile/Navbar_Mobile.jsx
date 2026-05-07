"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRobot, FaMoon, FaSun, FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";

import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import Control_Mobile from "./components/control_mobile/Control_Mobile";
import { NavItem_Mobile } from "./NavItem_Mobile";

import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";
import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, themeName, changeTheme } = useTheme();
  const authListenerInitialized = useRef(false);
  const menuRef = useRef(null);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // User menu items
  const userMenuItems = [
    { name: "My Profile", path: "/auth/profile", icon: <FaUser /> },
    { name: "Dashboard", path: "/auth/userdashboard", icon: <FaUser /> },
    { name: "Bookworm Ranking", path: "/auth/bookwormranking", icon: <FaUser /> },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Auth listener
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

  const toggleDarkMode = useCallback(() => {
    if (themeName === "dark") {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  }, [themeName, changeTheme]);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const getTextHighlightClass = () =>
    theme.textColors?.highlight || (isDarkMode ? "text-blue-400" : "text-sky-600");

  if (loading) {
    return (
      <div className={`navbar-mobile ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="navbar-mobile-container">
          <div className="navbar-mobile-logo">
            <img src={bookqubitLogo.src} alt="BookQubit" className="navbar-mobile-logo-img" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className={`navbar-mobile ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="navbar-mobile-container">
          {/* Logo */}
          <Link href="/" className="navbar-mobile-logo" onClick={() => setIsMenuOpen(false)}>
            <img src={bookqubitLogo.src} alt="BookQubit" className="navbar-mobile-logo-img" />
            <span className={`navbar-mobile-logo-text ${getTextHighlightClass()}`}>BookQubit</span>
          </Link>

          {/* Right Side Icons */}
          <div className="navbar-mobile-icons">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="navbar-mobile-icon-btn"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="navbar-mobile-icon-btn"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Control Button (Theme & Font Switcher) */}
            <Control_Mobile />

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-mobile-menu-btn"
              aria-label="Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {isSearchOpen && (
        <div className={`navbar-mobile-search-overlay ${isDarkMode ? 'dark-mode' : 'light-mode'} animate-slide-down`}>
          <form onSubmit={handleSearch} className="navbar-mobile-search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, comics..."
              className="navbar-mobile-search-input"
              autoFocus
            />
            <button type="submit" className="navbar-mobile-search-btn">
              <FaSearch />
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="navbar-mobile-search-close"
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Overlay with Slider Effect */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="navbar-mobile-backdrop animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sliding Menu */}
          <div ref={menuRef} className={`navbar-mobile-menu-slider ${isDarkMode ? 'dark-mode' : 'light-mode'} animate-slide-right`}>
            <div className="navbar-mobile-menu-slider-header">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}>
                    <FaUser size={18} />
                  </div>
                )}
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user ? (user.displayName || user.email?.split("@")[0] || "User") : "Guest"}
                  </p>
                  {user && <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>}
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="navbar-mobile-menu-close"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* AI Assistant Button */}
            <div className="navbar-mobile-ai-section">
              <button
                onClick={() => handleNavigation("/bookqubitai")}
                className={`navbar-mobile-ai-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}
              >
                <FaRobot size={18} />
                AI Assistant
              </button>
            </div>

            {/* Navigation Items - Using NavItem_Mobile component */}
            <div className="py-2">
              <NavItem_Mobile onItemClick={() => setIsMenuOpen(false)} />
            </div>

            {/* User Menu (if logged in) */}
            {user && (
              <div className="navbar-mobile-user-menu">
                <div className="navbar-mobile-user-menu-title">Account</div>
                {userMenuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="navbar-mobile-user-menu-link"
                  >
                    <span className="navbar-mobile-user-menu-icon">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="navbar-mobile-auth-section">
              {!user ? (
                <div className="navbar-mobile-auth-buttons">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className="navbar-mobile-login-btn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/register")}
                    className="navbar-mobile-signup-btn"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button onClick={handleLogout} className="navbar-mobile-logout-btn">
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar_Mobile;