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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { theme, themeName, changeTheme } = useTheme();
  const { t, isRTL: isLanguageRTL } = useLanguage();
  const { direction, isRTL, textAlign, positionStart, positionEnd } = useRTL();

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const authListenerInitialized = useRef(false);

  const isDarkMode = ["dark", "midnight", "cyberpunk"].includes(themeName);

  const userMenuItems = [
    {
      name: t("nav.myProfile") || "My Profile",
      nameAr: "ملفي الشخصي",
      path: "/auth/profile",
      icon: <FaUser />,
    },
    {
      name: t("nav.dashboard") || "Dashboard",
      nameAr: "لوحة التحكم",
      path: "/auth/userdashboard",
      icon: <FaUser />,
    },
    {
      name: t("nav.bookwormRanking") || "Bookworm Ranking",
      nameAr: "ترتيب محبي الكتب",
      path: "/auth/bookwormranking",
      icon: <FaUser />,
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const esc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", esc);

    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  useEffect(() => {
    if (authListenerInitialized.current) return;

    authListenerInitialized.current = true;

    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    router.push("/");
  };

  const toggleDarkMode = useCallback(() => {
    changeTheme(themeName === "dark" ? "light" : "dark");
  }, [themeName, changeTheme]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const highlight =
    theme.textColors?.highlight ||
    (isDarkMode ? "text-blue-400" : "text-sky-600");

  const getMenuItemName = (item) => {
    if (isRTL && item.nameAr) {
      return item.nameAr;
    }
    return item.name;
  };

  if (loading) return null;

  return (
    <>
      <div
        className={`navbar-mobile-slider ${isDarkMode ? "dark" : "light"}`}
        dir={direction}
      >
        <div className="navbar-mobile-container">
          <Link href="/" className="navbar-mobile-logo">
            <img
              src={bookqubitLogo.src}
              alt="BookQubit"
              className="navbar-mobile-logo-img"
            />
            <span className={`navbar-mobile-logo-text ${highlight}`}>
              BookQubit
            </span>
          </Link>

          <div className="navbar-mobile-icons">
            <button
              className="navbar-mobile-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={t("nav.search") || "Search"}
            >
              <FaSearch />
            </button>

            <button
              className="navbar-mobile-icon-btn"
              onClick={toggleDarkMode}
              aria-label={
                isDarkMode
                  ? t("nav.lightMode") || "Light mode"
                  : t("nav.darkMode") || "Dark mode"
              }
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              className="navbar-mobile-icon-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={
                isMenuOpen
                  ? t("nav.closeMenu") || "Close menu"
                  : t("nav.openMenu") || "Open menu"
              }
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div
          ref={searchRef}
          className="navbar-mobile-search-overlay"
          dir={direction}
        >
          <form onSubmit={handleSearch} className="navbar-mobile-search-form">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-mobile-search-input"
              placeholder={t("nav.searchPlaceholder") || "Search books..."}
              style={{ textAlign: isRTL ? "right" : "left" }}
            />
            <button type="submit">{t("nav.search") || "Search"}</button>
          </form>
        </div>
      )}

      {isMenuOpen && (
        <>
          <div
            className="navbar-mobile-backdrop"
            onClick={() => setIsMenuOpen(false)}
          />

          <aside
            ref={menuRef}
            className={`
              navbar-mobile-slide-menu
              open
              ${isDarkMode ? "dark" : "light"}
              ${isRTL ? "rtl" : "ltr"}
            `}
            dir={direction}
          >
            <div
              className="navbar-mobile-menu-header"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("nav.menu") || "MENU"}
            </div>

            <div className="p-4">
              <button
                className="navbar-mobile-ai-btn"
                onClick={() => handleNavigation("/bookqubitai")}
                style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <FaRobot />
                <span>{t("nav.aiAssistant") || "AI Assistant"}</span>
              </button>
            </div>

            <div className="navbar-mobile-nav-container overflow-y-auto">
              <NavItemMobile onItemClick={() => setIsMenuOpen(false)} />
            </div>

            {user && (
              <div className="navbar-mobile-account-section">
                {userMenuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="navbar-mobile-menu-item"
                    style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    <span>{getMenuItemName(item)}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="navbar-mobile-auth-container">
              {!user ? (
                <div
                  className="navbar-mobile-auth-buttons"
                  style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                >
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className="auth-button"
                  >
                    {t("nav.login") || "Login"}
                  </button>

                  <button
                    onClick={() => handleNavigation("/auth/register")}
                    className="auth-button"
                  >
                    {t("nav.signUp") || "Sign Up"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="auth-button logout-button"
                >
                  {t("nav.logout") || "Logout"}
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
