// src/app/[lang]/drift/notifications/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  HiHeart,
  HiUserAdd,
  HiChatAlt2,
  HiBookmark,
  HiSparkles,
  HiDotsVertical,
  HiCheck,
  HiX,
  HiTrash,
  HiBell,
  HiBellOff,
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import "./notifications.css";

export default function NotificationsPage() {
  const params = useParams();
  const lang = params?.lang || "en";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      type: "like",
      user: {
        name: "Sarah Johnson",
        username: "@sarahreads",
        avatar: "https://ui-avatars.com/api/?background=0284c7&color=fff&name=SJ",
        verified: true,
      },
      content: "liked your drift",
      driftContent: "Just finished reading 'The Midnight Library'...",
      timestamp: "2 minutes ago",
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: 2,
      type: "follow",
      user: {
        name: "Michael Chen",
        username: "@michaelreads",
        avatar: "https://ui-avatars.com/api/?background=10b981&color=fff&name=MC",
        verified: false,
      },
      content: "started following you",
      timestamp: "1 hour ago",
      read: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 3,
      type: "comment",
      user: {
        name: "Emma Watson",
        username: "@emmawatson",
        avatar: "https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=EW",
        verified: true,
      },
      content: "commented on your drift",
      commentText: "Great recommendation! Adding to my list 📚",
      timestamp: "3 hours ago",
      read: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: 4,
      type: "mention",
      user: {
        name: "David Kim",
        username: "@davidk",
        avatar: "https://ui-avatars.com/api/?background=ef4444&color=fff&name=DK",
        verified: false,
      },
      content: "mentioned you in a drift",
      driftContent: "Thanks @bookqubit for the amazing book suggestion!",
      timestamp: "5 hours ago",
      read: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 5,
      type: "bookmark",
      user: {
        name: "Lisa Wang",
        username: "@lisaw",
        avatar: "https://ui-avatars.com/api/?background=f59e0b&color=fff&name=LW",
        verified: false,
      },
      content: "bookmarked your drift",
      timestamp: "1 day ago",
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      type: "trending",
      user: null,
      content: "Your drift is trending!",
      driftContent: "Atomic Habits discussion is blowing up! 🔥",
      timestamp: "2 days ago",
      read: true,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    },
    {
      id: 7,
      type: "premium",
      user: null,
      content: "Premium feature unlocked!",
      driftContent: "You can now access exclusive book summaries",
      timestamp: "3 days ago",
      read: true,
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 500);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <HiHeart className="notification-icon like" />;
      case "follow":
        return <HiUserAdd className="notification-icon follow" />;
      case "comment":
        return <HiChatAlt2 className="notification-icon comment" />;
      case "mention":
        return <HiChatAlt2 className="notification-icon mention" />;
      case "bookmark":
        return <HiBookmark className="notification-icon bookmark" />;
      case "trending":
        return <HiSparkles className="notification-icon trending" />;
      case "premium":
        return <FaCrown className="notification-icon premium" />;
      default:
        return <HiBell className="notification-icon default" />;
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
    return "just now";
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((sid) => sid !== id));
    }
  };

  const deleteSelected = () => {
    setNotifications(
      notifications.filter((notif) => !selectedNotifications.includes(notif.id))
    );
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  const toggleSelect = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((sid) => sid !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const getFilteredNotifications = () => {
    if (filter === "unread") {
      return notifications.filter((n) => !n.read);
    }
    if (filter === "verified") {
      return notifications.filter((n) => n.user?.verified);
    }
    return notifications;
  };

  const filteredNotifications = getFilteredNotifications();

  if (loading) {
    return (
      <div className="notifications-loading">
        <div className="notifications-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div
      className="notifications-page"
      dir={lang === "ur" || lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="notifications-header">
        <div className="header-left">
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          {!selectMode ? (
            <>
              <button
                className="settings-btn"
                onClick={() => setShowSettings(!showSettings)}
              >
                <HiDotsVertical />
              </button>
              {notifications.length > 0 && (
                <button
                  className="select-btn"
                  onClick={() => setSelectMode(true)}
                >
                  Select
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="cancel-select-btn"
                onClick={() => {
                  setSelectMode(false);
                  setSelectedNotifications([]);
                }}
              >
                Cancel
              </button>
              {selectedNotifications.length > 0 && (
                <button className="delete-selected-btn" onClick={deleteSelected}>
                  <HiTrash />
                  Delete ({selectedNotifications.length})
                </button>
              )}
            </>
          )}
        </div>

        {/* Settings Dropdown */}
        {showSettings && (
          <>
            <div className="settings-overlay" onClick={() => setShowSettings(false)} />
            <div className="settings-dropdown">
              <button onClick={markAllAsRead} disabled={unreadCount === 0}>
                <HiCheck />
                Mark all as read
              </button>
              <button onClick={() => setFilter("all")}>
                <HiBell />
                All notifications
              </button>
              <button onClick={() => setFilter("unread")}>
                <HiBellOff />
                Unread only
              </button>
              <button onClick={() => setFilter("verified")}>
                <FaCrown />
                Verified only
              </button>
              <hr />
              <button className="danger" onClick={() => setNotifications([])}>
                <HiTrash />
                Clear all
              </button>
            </div>
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="notifications-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          Unread
          {unreadCount > 0 && <span className="filter-count">{unreadCount}</span>}
        </button>
        <button
          className={`filter-btn ${filter === "verified" ? "active" : ""}`}
          onClick={() => setFilter("verified")}
        >
          Verified
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <HiBell className="empty-icon" />
          <h3>No notifications yet</h3>
          <p>
            {filter === "unread"
              ? "You've read all your notifications!"
              : "When someone interacts with your drifts, you'll see it here."}
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.read ? "unread" : ""} ${
                selectMode ? "select-mode" : ""
              }`}
              onClick={() => {
                if (selectMode) {
                  toggleSelect(notification.id);
                } else if (!notification.read) {
                  markAsRead(notification.id);
                }
              }}
            >
              {selectMode && (
                <div className="notification-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelect(notification.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <div className="notification-icon-wrapper">
                {notification.user ? (
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="notification-avatar"
                  />
                ) : (
                  getNotificationIcon(notification.type)
                )}
                {!notification.read && <div className="unread-dot"></div>}
              </div>

              <div className="notification-content">
                <div className="notification-text">
                  {notification.user && (
                    <>
                      <span className="notification-username">
                        {notification.user.name}
                        {notification.user.verified && (
                          <span className="verified-badge">✓</span>
                        )}
                      </span>
                      <span className="notification-action">
                        {" "}
                        {notification.content}{" "}
                      </span>
                    </>
                  )}
                  {!notification.user && (
                    <span className="notification-action">
                      {notification.content}
                    </span>
                  )}
                  {notification.driftContent && (
                    <p className="notification-drift-preview">
                      "{notification.driftContent.substring(0, 80)}
                      {notification.driftContent.length > 80 ? "..." : ""}"
                    </p>
                  )}
                  {notification.commentText && (
                    <p className="notification-comment-preview">
                      {notification.commentText}
                    </p>
                  )}
                </div>
                <div className="notification-meta">
                  <span className="notification-time">
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                  {!selectMode && (
                    <button
                      className="notification-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <HiX />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}