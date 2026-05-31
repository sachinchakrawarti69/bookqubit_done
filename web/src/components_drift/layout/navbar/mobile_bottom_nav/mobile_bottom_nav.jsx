// src/components_drift/layout/mobile_bottom_nav/mobile_bottom_nav.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  HiHome, 
  HiSearch, 
  HiBell, 
  HiMail, 
  HiUser,
  HiBookmarkAlt,
  HiSparkles,
  HiPlusCircle,
  HiHeart,
  HiChatAlt2
} from "react-icons/hi";
import { FaCrown, FaCompass } from "react-icons/fa";
import "./mobile_bottom_nav.css";

export default function MobileBottomNav({ 
  unreadCount = 0,
  onSearchClick,
  onNotificationsClick,
  onPostClick,
  initialActiveTab = "home"
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  // Update active tab based on current path
  useEffect(() => {
    if (pathname?.includes("/drift/search")) {
      setActiveTab("search");
    } else if (pathname?.includes("/drift/notifications")) {
      setActiveTab("notifications");
    } else if (pathname?.includes("/drift/messages")) {
      setActiveTab("messages");
    } else if (pathname?.includes("/drift/profile")) {
      setActiveTab("profile");
    } else if (pathname?.includes("/drift/home") || pathname === "/drift" || pathname === "/drift/") {
      setActiveTab("home");
    } else if (pathname?.includes("/drift/explore")) {
      setActiveTab("explore");
    } else if (pathname?.includes("/drift/bookmarks")) {
      setActiveTab("bookmarks");
    }
  }, [pathname]);

  const navItems = [
    {
      id: "home",
      path: "/drift",
      icon: HiHome,
      label: "Home",
      activeIcon: HiHome
    },
    {
      id: "explore",
      path: "/drift/explore",
      icon: FaCompass,
      label: "Explore",
      activeIcon: FaCompass
    },
    {
      id: "search",
      path: "/drift/search",
      icon: HiSearch,
      label: "Search",
      activeIcon: HiSearch,
      action: onSearchClick
    },
    {
      id: "notifications",
      path: "/drift/notifications",
      icon: HiBell,
      label: "Alerts",
      badge: unreadCount,
      activeIcon: HiBell,
      action: onNotificationsClick
    },
    {
      id: "profile",
      path: "/drift/profile",
      icon: HiUser,
      label: "Profile",
      activeIcon: HiUser
    }
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    
    if (item.action) {
      item.action();
    } else if (item.path) {
      router.push(item.path);
    }
  };

  const handleCreatePost = () => {
    if (onPostClick) {
      onPostClick();
    } else {
      router.push("/drift/create");
    }
    setShowCreateMenu(false);
  };

  const handleCreateDrift = () => {
    router.push("/drift/create/drift");
    setShowCreateMenu(false);
  };

  const handleCreateStory = () => {
    router.push("/drift/create/story");
    setShowCreateMenu(false);
  };

  const handleCreatePoll = () => {
    router.push("/drift/create/poll");
    setShowCreateMenu(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-container">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="mobile-nav-icon-wrapper">
                  <Icon 
                    className={`mobile-nav-icon ${isActive ? 'active' : ''}`}
                  />
                  {item.badge > 0 && (
                    <span className="mobile-nav-badge">{item.badge}</span>
                  )}
                </div>
                <span className={`mobile-nav-label ${isActive ? 'active' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Action Button (FAB) */}
        <button 
          className="mobile-fab"
          onClick={() => setShowCreateMenu(!showCreateMenu)}
          aria-label="Create new post"
        >
          <HiPlusCircle className="fab-icon" />
        </button>
      </nav>

      {/* Create Menu Modal */}
      {showCreateMenu && (
        <>
          <div 
            className="mobile-create-overlay" 
            onClick={() => setShowCreateMenu(false)}
          />
          <div className="mobile-create-menu">
            <div className="mobile-create-header">
              <h3>Create New</h3>
              <button onClick={() => setShowCreateMenu(false)} className="close-btn">
                ✕
              </button>
            </div>
            <div className="mobile-create-options">
              <button onClick={handleCreateDrift} className="create-option">
                <div className="create-option-icon drift">
                  <HiSparkles />
                </div>
                <div className="create-option-content">
                  <h4>New Drift</h4>
                  <p>Share your thoughts with the community</p>
                </div>
              </button>
              
              <button onClick={handleCreateStory} className="create-option">
                <div className="create-option-icon story">
                  <HiHeart />
                </div>
                <div className="create-option-content">
                  <h4>New Story</h4>
                  <p>Share your reading journey</p>
                </div>
              </button>
              
              <button onClick={handleCreatePoll} className="create-option">
                <div className="create-option-icon poll">
                  <HiChatAlt2 />
                </div>
                <div className="create-option-content">
                  <h4>New Poll</h4>
                  <p>Get opinions from readers</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mini Player for Audio (Optional) */}
      <div className="mobile-mini-player" style={{ display: 'none' }}>
        <div className="mini-player-content">
          <div className="player-info">
            <div className="player-thumbnail"></div>
            <div className="player-details">
              <h4>Now Playing</h4>
              <p>Book Summary</p>
            </div>
          </div>
          <div className="player-controls">
            <button className="play-pause">▶</button>
            <button className="close">✕</button>
          </div>
        </div>
      </div>
    </>
  );
}