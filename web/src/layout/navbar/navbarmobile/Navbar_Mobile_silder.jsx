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
import { NavItem_Mobile } from "./NavItem_Mobile";

import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";

const Navbar_Mobile_Slider = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, themeName, changeTheme } = useTheme();
  const authListenerInitialized = useRef(false);

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
      <div className={`fixed top-0 left-0 right-0 z-50 h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md animate-pulse`}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
        <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <img src={bookqubitLogo.src} alt="BookQubit" className="h-10 w-auto object-contain" />
            <span className={`font-bold text-lg hidden xs:inline ${getTextHighlightClass()}`}>
              BookQubit
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Search"
            >
              <FaSearch className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
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
        <div className={`fixed top-16 left-0 right-0 z-40 p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} animate-slide-down`}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, comics..."
              className={`flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-sky-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              autoFocus
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Sliding Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sliding Menu */}
          <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 shadow-2xl overflow-y-auto animate-slide-in-right ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Menu Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-inherit">
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
                className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaTimes size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            {/* AI Assistant Link */}
            <div className="p-4">
              <button
                onClick={() => handleNavigation("/bookqubitai")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}
              >
                <FaRobot size={20} />
                <span className="font-medium">AI Assistant</span>
              </button>
            </div>

            {/* Navigation Items - Using NavItem_Mobile component */}
            <div className="py-2">
              <NavItem_Mobile onItemClick={() => setIsMenuOpen(false)} />
            </div>

            {/* User Menu Section (if logged in) */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account</h3>
                </div>
                {userMenuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center gap-3 w-full px-4 py-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <span className={`text-lg ${getTextHighlightClass()}`}>{item.icon}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Auth Buttons or Logout */}
            <div className="p-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {!user ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all hover:scale-105 border-2 ${isDarkMode ? 'border-sky-500 text-sky-400' : 'border-sky-600 text-sky-600'}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/register")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white`}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className={`w-full py-3 rounded-xl font-medium transition-all hover:scale-105 bg-gradient-to-r from-rose-500 to-rose-600 text-white`}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar_Mobile_Slider;