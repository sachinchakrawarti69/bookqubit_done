"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import BookQubitSnapNavbar from "@/components_bookqubit_snap/layout/bookqubitsnap_navbar/bookqubitsnap_navbar";
import BookQubitSnapFooter from "@/components_bookqubit_snap/layout/bookqubitsnap_footer/bookqubitsnap_footer";
import FeedPage from "@/components_bookqubit_snap/pages/feed/feed";
import AuthorsPage from "@/components_bookqubit_snap/pages/authors/AuthorsPage";
import TrendingPage from "@/components_bookqubit_snap/pages/trending/TrendingPage";
import {
  FaNewspaper,
  FaUser,
  FaFire,
  FaBookmark,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import "./page.css";

const BookQubitSnap = () => {
  const searchParams = useSearchParams();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, isRTL } = useRTL();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "feed");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    if (tabParam && ["feed", "authors", "trending"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileSidebar]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMobileSidebar(false);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url);
  };

  const handleCreatePost = () => {
    const createPostElement = document.querySelector(".create-post-card");
    if (createPostElement) {
      createPostElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sidebarItems = [
    { id: "feed", label: "Feed", icon: FaNewspaper, color: "#3b82f6" },
    { id: "authors", label: "Authors", icon: FaUser, color: "#8b5cf6" },
    { id: "trending", label: "Trending", icon: FaFire, color: "#f59e0b" },
    { id: "saved", label: "Saved", icon: FaBookmark, color: "#10b981" },
    { id: "following", label: "Following", icon: FaUserFriends, color: "#ec4899" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <FeedPage />;
      case "authors":
        return <AuthorsPage />;
      case "trending":
        return <TrendingPage />;
      default:
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">📚</div>
            <h2>{activeTab === "saved" ? "Saved Posts" : "Following Feed"} Coming Soon</h2>
            <p>This feature will be available soon</p>
          </div>
        );
    }
  };

  return (
    <div className={`bookqubit-snap ${isDarkMode ? "dark" : "light"}`} dir={direction} style={{ fontFamily: currentFont?.family }}>
      <BookQubitSnapNavbar onCreatePost={handleCreatePost} />

      <div className="snap-layout">
        <button className="mobile-sidebar-toggle" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
          {showMobileSidebar ? <FaTimes /> : <FaBars />}
        </button>

        {showMobileSidebar && <div className="mobile-overlay" onClick={() => setShowMobileSidebar(false)} />}

        {/* Left Sidebar */}
        <aside className={`snap-sidebar-left ${showMobileSidebar ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">BookQubit</span>
            </div>
            <div className="user-info-compact">
              <div className="user-avatar-sm"><FaUser /></div>
              <div className="user-details-compact">
                <span className="user-name">John Doe</span>
                <span className="user-role">Reader</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleTabChange(item.id)}
              >
                <item.icon className="nav-icon" style={{ color: item.color }} />
                <span className="nav-label">{item.label}</span>
                {activeTab === item.id && <div className="active-indicator" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="sidebar-footer-item"><FaCog /> <span>Settings</span></button>
            <button className="sidebar-footer-item"><FaSignOutAlt /> <span>Logout</span></button>
          </div>
        </aside>

        <main className="snap-main-content">
          <div className="content-container">{renderContent()}</div>
        </main>

        {/* Right Sidebar */}
        <aside className="snap-sidebar-right">
          <div className="trending-card">
            <h3 className="card-title"><FaFire className="title-icon" /> Trending Topics</h3>
            <div className="trending-list">
              {["#BookRecommendations", "#CurrentlyReading", "#BookReview", "#BookTok", "#AmReading"].map((tag, i) => (
                <div key={tag} className="trending-item">
                  <span className="trend-rank">{i + 1}</span>
                  <div className="trend-info">
                    <span className="trend-tag">{tag}</span>
                    <span className="trend-count">{Math.floor(Math.random() * 10) + 1}k posts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="suggestions-card">
            <h3 className="card-title"><FaUserFriends className="title-icon" /> Suggested Authors</h3>
            <div className="suggestions-list">
              {[
                { initials: "SK", name: "Stephen King", followers: "1.2M" },
                { initials: "JR", name: "J.K. Rowling", followers: "987k" },
                { initials: "CH", name: "Colleen Hoover", followers: "876k" }
              ].map((author) => (
                <div key={author.name} className="suggestion-item">
                  <div className="suggestion-avatar">{author.initials}</div>
                  <div className="suggestion-info">
                    <span className="suggestion-name">{author.name}</span>
                    <span className="suggestion-followers">{author.followers} followers</span>
                  </div>
                  <button className="follow-btn-sm">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4>Reading Challenge</h4>
              <p>Join our 2024 reading challenge and track your progress!</p>
              <button className="tip-btn">Learn More →</button>
            </div>
          </div>
        </aside>
      </div>

      <BookQubitSnapFooter />
    </div>
  );
};

export default BookQubitSnap;