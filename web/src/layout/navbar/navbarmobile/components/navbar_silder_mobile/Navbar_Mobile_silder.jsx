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
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

import { NavItemMobile } from "./NavItem_Mobile";

import bookqubitLogo from "@/assets/logo/bookqubitlogo.png";

import "./Navbar_Mobile_Slider.css";

const Navbar_Mobile_Slider = () => {
  const router = useRouter();

  const { theme, themeName, changeTheme } = useTheme();
  const { t } = useLanguage();
  const { direction, isRTL } = useRTL();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const isDarkMode = [
    "dark",
    "midnight",
    "cyberpunk",
  ].includes(themeName);

  /* LOCK PAGE SCROLL - ONLY WHEN MENU IS OPEN */
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      body.dataset.scrollY = scrollY;
      
      // Lock scroll
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = Number(body.dataset.scrollY || 0);
      
      // Remove scroll lock styles
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      html.style.overflow = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
      
      // Clean up
      delete body.dataset.scrollY;
    }

    // Cleanup function
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

  /* CLOSE MENU/SEARCH ON CLICK OUTSIDE OR ESC KEY */
  useEffect(() => {
    const closeOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const esc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeOutside
    );

    document.addEventListener(
      "keydown",
      esc
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeOutside
      );

      document.removeEventListener(
        "keydown",
        esc
      );
    };
  }, []);

  /* AUTH STATE */
  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
      }
    );
  }, []);

  const toggleDarkMode =
    useCallback(() => {
      changeTheme(
        themeName === "dark"
          ? "light"
          : "dark"
      );
    }, [themeName, changeTheme]);

  const navigate = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const logout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim())
      return;

    router.push(
      `/search?q=${encodeURIComponent(
        searchQuery
      )}`
    );

    setSearchQuery("");
    setIsSearchOpen(false);
  };

  if (loading) return null;

  return (
    <>
      <div
        className={`navbar-mobile-slider ${
          isDarkMode
            ? "dark"
            : "light"
        }`}
        dir={direction}
      >
        <div className="navbar-mobile-container">
          <Link
            href="/"
            className="navbar-mobile-logo"
          >
            <img
              src={bookqubitLogo.src}
              alt="BookQubit"
              className="navbar-mobile-logo-img"
            />

            <span className="navbar-mobile-logo-text">
              BookQubit
            </span>
          </Link>

          <div className="navbar-mobile-icons">
            <button
              className="navbar-mobile-icon-btn"
              onClick={() =>
                setIsSearchOpen(
                  !isSearchOpen
                )
              }
            >
              <FaSearch />
            </button>

            <button
              className="navbar-mobile-icon-btn"
              onClick={
                toggleDarkMode
              }
            >
              {isDarkMode ? (
                <FaSun />
              ) : (
                <FaMoon />
              )}
            </button>

            <button
              className="navbar-mobile-icon-btn"
              onClick={() =>
                setIsMenuOpen(
                  !isMenuOpen
                )
              }
            >
              {isMenuOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div
          ref={searchRef}
          className="navbar-mobile-search-overlay"
        >
          <form
            onSubmit={
              handleSearch
            }
            className="navbar-mobile-search-form"
          >
            <input
              className="navbar-mobile-search-input"
              value={
                searchQuery
              }
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder={
                t(
                  "nav.search"
                ) ||
                "Search..."
              }
            />

            <button>
              Search
            </button>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <>
          <div
            className="navbar-mobile-backdrop"
            onClick={() =>
              setIsMenuOpen(
                false
              )
            }
          />

          <aside
            ref={menuRef}
            dir={direction}
            className={`navbar-mobile-slide-menu open ${
              isDarkMode
                ? "dark"
                : "light"
            }`}
          >
            <div className="navbar-mobile-menu-header">
              MENU
            </div>

            <div className="p-4">
              <button
                className="navbar-mobile-ai-btn"
                onClick={() =>
                  navigate(
                    "/bookqubitai"
                  )
                }
              >
                <FaRobot />
                AI Assistant
              </button>
            </div>

            <div className="navbar-mobile-nav-container">
              <NavItemMobile
                onItemClick={() =>
                  setIsMenuOpen(
                    false
                  )
                }
              />
            </div>

            {user && (
              <div className="navbar-mobile-account-section">
                <button
                  className="navbar-mobile-menu-item"
                  onClick={() =>
                    navigate(
                      "/auth/profile"
                    )
                  }
                >
                  <FaUser />
                  Profile
                </button>
              </div>
            )}

            <div className="navbar-mobile-auth-container">
              {!user ? (
                <div className="navbar-mobile-auth-buttons">
                  <button
                    className="auth-button"
                    onClick={() =>
                      navigate(
                        "/auth/login"
                      )
                    }
                  >
                    Login
                  </button>

                  <button
                    className="auth-button"
                    onClick={() =>
                      navigate(
                        "/auth/register"
                      )
                    }
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <button
                  className="auth-button"
                  onClick={
                    logout
                  }
                >
                  Logout
                </button>
              )}
            </div>
          </aside>
        </>
      )}

      <div className="navbar-mobile-spacer" />
    </>
  );
};

export default Navbar_Mobile_Slider;