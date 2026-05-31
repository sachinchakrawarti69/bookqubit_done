// src/components_drift/layout/desktop_navbar/desktop_navbar.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HiSearch, 
  HiBell, 
  HiMail, 
  HiCog,
  HiX,
  HiChevronDown,
  HiLogout,
  HiUserCircle,
  HiBookmarkAlt,
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import "./desktop_navbar.css";

export default function DesktopNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Someone liked your drift", time: "5m ago", read: false },
    { id: 2, text: "New follower: @booklover", time: "1h ago", read: false },
    { id: 3, text: "Your drift is trending!", time: "3h ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="drift-navbar">
      <div className="drift-navbar-container">
        {/* Left Section - Welcome Message */}
        <div className="drift-navbar-left">
          <div className="drift-welcome">
            <h2>Welcome back,</h2>
            <h1>BookQubit User!</h1>
          </div>
          <div className="drift-stats">
            <div className="drift-stat">
              <span className="drift-stat-value">1,234</span>
              <span className="drift-stat-label">Followers</span>
            </div>
            <div className="drift-stat">
              <span className="drift-stat-value">567</span>
              <span className="drift-stat-label">Following</span>
            </div>
            <div className="drift-stat">
              <span className="drift-stat-value">8,901</span>
              <span className="drift-stat-label">Drifts</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="drift-navbar-center">
          <div className="drift-search-container">
            <HiSearch className="drift-search-icon" />
            <input
              type="text"
              placeholder="Search Drift..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="drift-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="drift-search-clear"
                aria-label="Clear search"
              >
                <HiX />
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="drift-navbar-right">
          {/* Premium Button */}
          <button className="drift-premium-btn-nav">
            <FaCrown />
            <span>Premium</span>
          </button>

          {/* Notifications */}
          <div className="drift-notification-wrapper">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="drift-icon-btn"
              aria-label="Notifications"
            >
              <HiBell />
              {unreadCount > 0 && (
                <span className="drift-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  className="drift-dropdown-overlay" 
                  onClick={() => setShowNotifications(false)}
                />
                <div className="drift-notification-dropdown">
                  <div className="drift-notification-header">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="drift-mark-read">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="drift-notification-list">
                    {notifications.length === 0 ? (
                      <div className="drift-no-notifications">
                        <HiBell />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`drift-notification-item ${!notif.read ? 'unread' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="drift-notification-content">
                            <p>{notif.text}</p>
                            <span className="drift-notification-time">{notif.time}</span>
                          </div>
                          {!notif.read && <div className="drift-notification-dot"></div>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Messages */}
          <Link href="/drift/messages" className="drift-icon-btn" aria-label="Messages">
            <HiMail />
          </Link>

          {/* User Menu */}
          <div className="drift-user-menu-wrapper">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="drift-user-menu-btn"
              aria-label="User menu"
            >
              <img 
                src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User&length=2" 
                alt="User avatar"
                className="drift-avatar"
              />
              <HiChevronDown className={`drift-chevron ${isUserMenuOpen ? 'open' : ''}`} />
            </button>

            {isUserMenuOpen && (
              <>
                <div 
                  className="drift-dropdown-overlay" 
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="drift-user-dropdown">
                  <div className="drift-user-info">
                    <img 
                      src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User&length=2" 
                      alt="User avatar"
                      className="drift-dropdown-avatar"
                    />
                    <div>
                      <h4>BookQubit User</h4>
                      <p>@bookqubit</p>
                    </div>
                  </div>
                  <div className="drift-dropdown-divider"></div>
                  <Link href="/drift/profile/bookqubit" className="drift-dropdown-item">
                    <HiUserCircle />
                    <span>Profile</span>
                  </Link>
                  <Link href="/drift/bookmarks" className="drift-dropdown-item">
                    <HiBookmarkAlt />
                    <span>Bookmarks</span>
                  </Link>
                  <Link href="/drift/premium" className="drift-dropdown-item premium">
                    <FaCrown />
                    <span>Premium</span>
                  </Link>
                  <Link href="/drift/settings" className="drift-dropdown-item">
                    <HiCog />
                    <span>Settings</span>
                  </Link>
                  <div className="drift-dropdown-divider"></div>
                  <button className="drift-dropdown-item logout">
                    <HiLogout />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}