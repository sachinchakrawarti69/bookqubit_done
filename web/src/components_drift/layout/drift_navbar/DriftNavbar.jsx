"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaHome,
  FaCompass,
  FaFire,
  FaBookmark,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { GiWaves } from "react-icons/gi";
import "./DriftNavbar.css";

const DriftNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { direction } = useRTL();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserMenu]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/drift/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Simulate search results
    if (query.trim()) {
      const mockResults = [
        { id: 1, type: "user", name: "Sarah Johnson", username: "@sarah_reads" },
        { id: 2, type: "drift", content: "Just finished reading...", author: "@booklover" },
        { id: 3, type: "book", title: "The Midnight Library", author: "Matt Haig" },
      ].filter(item => 
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.content?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleCreateDrift = () => {
    router.push("/drift/create");
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout");
  };

  const navLinks = [
    { path: "/drift", label: "Home", icon: FaHome },
    { path: "/drift/explore", label: "Explore", icon: FaCompass },
    { path: "/drift/trending", label: "Trending", icon: FaFire },
    { path: "/drift/bookmarks", label: "Bookmarks", icon: FaBookmark },
    { path: "/drift/following", label: "Following", icon: FaUserFriends },
  ];

  const userMenuItems = [
    { path: "/drift/profile", label: "Profile", icon: FaUser },
    { path: "/drift/settings", label: "Settings", icon: FaCog },
    { divider: true },
    { action: "logout", label: "Logout", icon: FaSignOutAlt, color: "#ef4444" },
  ];

  return (
    <nav className={`drift-navbar ${isDarkMode ? "dark" : "light"} ${isScrolled ? "scrolled" : ""}`} dir={direction}>
      <div className="drift-nav-container">
        {/* Logo */}
        <Link href="/drift" className="drift-logo">
          <GiWaves className="logo-wave" />
          <div className="logo-text-wrapper">
            <span className="logo-text">Drift</span>
            <span className="logo-badge">Beta</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="drift-nav-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`drift-nav-link ${isActive ? "active" : ""}`}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{link.label}</span>
                {isActive && <span className="active-dot" />}
              </Link>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className={`drift-search-wrapper ${isSearchOpen ? "open" : ""}`}>
          <form onSubmit={handleSearch} className="drift-search-form">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search drifts, books, authors, people..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearchResults(true)}
                className="drift-search-input"
                aria-label="Search"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => {
                      router.push(
                        result.type === "user" 
                          ? `/drift/profile/${result.username}`
                          : result.type === "book"
                          ? `/books/${result.title.toLowerCase().replace(/\s+/g, "-")}`
                          : `/drift/post/${result.id}`
                      );
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="result-icon">
                      {result.type === "user" && <FaUser />}
                      {result.type === "book" && <FaBookmark />}
                      {result.type === "drift" && <GiWaves />}
                    </div>
                    <div className="result-info">
                      <span className="result-title">
                        {result.name || result.title || result.content}
                      </span>
                      <span className="result-subtitle">
                        {result.username || result.author}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Actions */}
        <div className="drift-actions">
          <button 
            className="drift-action-btn create-btn" 
            onClick={handleCreateDrift}
            aria-label="Create drift"
          >
            <FaPlus />
            <span>Drift</span>
          </button>

          <div className="notification-wrapper">
            <button className="drift-action-btn" aria-label="Notifications">
              <FaBell />
              {notifications > 0 && (
                <span className="action-badge">{notifications}</span>
              )}
            </button>
          </div>

          <div className="messages-wrapper">
            <button className="drift-action-btn" aria-label="Messages">
              <FaEnvelope />
              {messages > 0 && (
                <span className="action-badge">{messages}</span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="user-menu-container">
            <button
              className={`user-menu-btn ${showUserMenu ? "active" : ""}`}
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <FaUser />
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">John Doe</h4>
                    <p className="user-email">john@example.com</p>
                  </div>
                </div>
                <div className="user-dropdown-menu">
                  {userMenuItems.map((item, index) => {
                    if (item.divider) {
                      return <div key={`divider-${index}`} className="menu-divider" />;
                    }
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className="user-menu-item"
                        onClick={() => {
                          if (item.action === "logout") {
                            handleLogout();
                          } else {
                            router.push(item.path);
                          }
                          setShowUserMenu(false);
                        }}
                        style={item.color ? { color: item.color } : {}}
                      >
                        <Icon className="menu-item-icon" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DriftNavbar;