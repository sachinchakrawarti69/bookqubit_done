"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaSearch,
  FaTimes,
  FaBook,
  FaFire,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiWaves } from "react-icons/gi";
import "./DriftMobileNav.css";

const DriftMobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { direction } = useRTL();
  const { t } = useLanguage();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: "/drift", label: "Home", icon: FaHome },
    { path: "/drift/explore", label: "Explore", icon: FaCompass },
    { path: "/drift/notifications", label: "Notifications", icon: FaBell, badge: notifications },
    { path: "/drift/messages", label: "Messages", icon: FaEnvelope, badge: messages },
    { path: "/drift/profile", label: "Profile", icon: FaUser },
  ];

  const menuItems = [
    { path: "/drift", label: "Home", icon: FaHome },
    { path: "/drift/explore", label: "Explore", icon: FaCompass },
    { path: "/drift/trending", label: "Trending", icon: FaFire },
    { path: "/drift/bookmarks", label: "Bookmarks", icon: FaBook },
    { path: "/drift/following", label: "Following", icon: FaUserFriends },
    { path: "/drift/settings", label: "Settings", icon: FaCog },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/drift/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleCreateDrift = () => {
    // Handle create drift action
    router.push("/drift/create");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className={`drift-mobile-nav ${isDarkMode ? "dark" : "light"}`} dir={direction}>
        <div className="mobile-nav-container">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
              >
                <div className="nav-icon-wrapper">
                  <Icon className="nav-icon" />
                  {item.badge > 0 && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </div>
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Floating Action Button */}
        <button className="fab-button" onClick={handleCreateDrift}>
          <FaPlus />
        </button>
      </nav>

      {/* Mobile Header with Menu Button */}
      <div className={`drift-mobile-header ${isDarkMode ? "dark" : "light"}`}>
        <div className="mobile-header-left">
          <button 
            className="menu-toggle-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <Link href="/drift" className="mobile-logo">
            <GiWaves className="logo-wave" />
            <span className="logo-text">Drift</span>
          </Link>
        </div>

        <div className="mobile-header-right">
          <button 
            className="search-toggle-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-form">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Drift..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="button" className="close-search" onClick={() => setIsSearchOpen(false)}>
                <FaTimes />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className={`side-menu ${isDarkMode ? "dark" : "light"}`} onClick={(e) => e.stopPropagation()}>
            {/* Menu Header */}
            <div className="menu-header">
              <div className="menu-logo">
                <GiWaves className="logo-wave" />
                <span className="logo-text">Drift</span>
              </div>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* User Profile */}
            <div className="menu-user">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-info">
                <h4 className="user-name">John Doe</h4>
                <p className="user-email">john@example.com</p>
                <button className="view-profile-btn">View Profile</button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="menu-items">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`menu-item ${isActive ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                    {isActive && <span className="active-indicator" />}
                  </Link>
                );
              })}
            </div>

            {/* Menu Footer */}
            <div className="menu-footer">
              <button className="menu-footer-item" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
              <p className="menu-version">Version 1.0.0</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DriftMobileNav;