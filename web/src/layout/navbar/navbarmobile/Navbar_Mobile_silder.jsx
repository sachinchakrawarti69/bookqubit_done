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
  FaUser, 
} from "react-icons/fa";

import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "@/themes/useTheme";
import { NavItemMobile } from "./NavItem_Mobile";

import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";
import "./Navbar_Mobile_Slider.css";

const Navbar_Mobile_Slider = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, themeName, changeTheme } = useTheme();
  const authListenerInitialized = useRef(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

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
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, isSearchOpen]);

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
      <div className={`navbar-mobile-slider ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="navbar-mobile-container">
          <div className="navbar-mobile-logo-loading">
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="navbar-mobile-icons">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar Header */}
      <div className={`navbar-mobile-slider ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="navbar-mobile-container">
          {/* Logo */}
          <Link href="/" className="navbar-mobile-logo" onClick={() => setIsMenuOpen(false)}>
            <img src={bookqubitLogo.src} alt="BookQubit" className="navbar-mobile-logo-img" />
            <span className={`navbar-mobile-logo-text ${getTextHighlightClass()}`}>
              BookQubit
            </span>
          </Link>

          {/* Right Icons */}
          <div className="navbar-mobile-icons">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="navbar-mobile-icon-btn"
              aria-label="Search"
            >
              <FaSearch className={isDarkMode ? "text-gray-400" : "text-gray-600"} size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="navbar-mobile-icon-btn"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-500" size={18} />
              ) : (
                <FaMoon className="text-gray-600" size={18} />
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-mobile-icon-btn"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <FaTimes className={isDarkMode ? "text-white" : "text-gray-900"} size={20} />
              ) : (
                <FaBars className={isDarkMode ? "text-white" : "text-gray-900"} size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div ref={searchRef} className={`navbar-mobile-search-overlay ${isDarkMode ? 'dark' : 'light'}`}>
          <form onSubmit={handleSearch} className="navbar-mobile-search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, comics..."
              className={`navbar-mobile-search-input ${isDarkMode ? 'dark' : 'light'}`}
              autoFocus
            />
            <button
              type="submit"
              className="navbar-mobile-search-btn"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Sliding Menu - Slides from LEFT for ALL languages */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="navbar-mobile-backdrop" onClick={() => setIsMenuOpen(false)} />

          {/* Sliding Menu - Always from LEFT */}
          <div ref={menuRef} className={`navbar-mobile-slide-menu ${isMenuOpen ? "open" : ""} ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Menu Header */}
            <div className={`navbar-mobile-menu-header ${isDarkMode ? 'dark' : 'light'}`}>
              <div className="navbar-mobile-user-info">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="navbar-mobile-user-avatar-img" />
                ) : (
                  <div className={`navbar-mobile-user-avatar ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}>
                    <FaUser size={18} />
                  </div>
                )}
                <div>
                  <p className={`navbar-mobile-user-name ${isDarkMode ? 'dark' : 'light'}`}>
                    {user ? (user.displayName || user.email?.split("@")[0] || "User") : "Guest"}
                  </p>
                  {user && <p className={`navbar-mobile-user-email ${isDarkMode ? 'dark' : 'light'}`}>{user.email}</p>}
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="navbar-mobile-close-btn"
                aria-label="Close menu"
              >
                <FaTimes size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            {/* AI Assistant Link */}
            <div className="p-4">
              <button
                onClick={() => handleNavigation("/bookqubitai")}
                className="navbar-mobile-ai-btn"
              >
                <FaRobot size={20} />
                <span className="font-medium">AI Assistant</span>
              </button>
            </div>

            {/* Navigation Items */}
            <div className="navbar-mobile-nav-container">
              <NavItemMobile onItemClick={() => setIsMenuOpen(false)} />
            </div>

            {/* User Menu Section (if logged in) */}
            {user && (
              <div className={`navbar-mobile-account-section ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="px-4 py-2">
                  <h3 className={`navbar-mobile-account-title ${isDarkMode ? 'dark' : 'light'}`}>Account</h3>
                </div>
                {userMenuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="navbar-mobile-menu-item"
                  >
                    <span className={`text-lg ${getTextHighlightClass()}`}>{item.icon}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Auth Buttons or Logout */}
            <div className={`navbar-mobile-auth-container ${isDarkMode ? 'dark' : 'light'}`}>
              {!user ? (
                <div className="navbar-mobile-auth-buttons">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className={`navbar-mobile-login-btn ${isDarkMode ? 'dark' : 'light'}`}
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
                <button
                  onClick={handleLogout}
                  className="navbar-mobile-logout-btn"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed navbar */}
      <div className="navbar-mobile-spacer" />
    </>
  );
};

export default Navbar_Mobile_Slider;