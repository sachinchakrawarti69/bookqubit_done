"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBell, FaArrowLeft, FaHeart, FaComment, FaUserPlus, FaBookmark, FaFilter } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";

export default function NotificationsPage() {
  const router = useRouter();
  const { themeName } = useTheme();
  const { direction, isRTL } = useRTL();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Mock all notifications data
  const allNotifications = [
    {
      id: 1,
      type: "like",
      title: "Someone liked your review",
      message: "Priyal Shrivastava liked your review on 'The Great Gatsby'",
      time: "5 minutes ago",
      read: false,
      link: "/books/the-great-gatsby",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your post",
      message: "Sachin commented on your book review",
      time: "1 hour ago",
      read: false,
      link: "/books/atomic-habits",
    },
    {
      id: 3,
      type: "follow",
      title: "New follower",
      message: "Rahul Sharma started following you",
      time: "3 hours ago",
      read: true,
      link: "/profile/rahul",
    },
    {
      id: 4,
      type: "bookmark",
      title: "Book saved to your list",
      message: "Your book 'Atomic Habits' has been saved by 50 users",
      time: "Yesterday",
      read: true,
      link: "/books/atomic-habits",
    },
    {
      id: 5,
      type: "like",
      title: "Someone liked your comment",
      message: "Amit Kumar liked your comment on 'Deep Work'",
      time: "2 days ago",
      read: true,
      link: "/books/deep-work",
    },
    {
      id: 6,
      type: "follow",
      title: "New follower",
      message: "Neha Gupta started following you",
      time: "3 days ago",
      read: true,
      link: "/profile/neha",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setNotifications(allNotifications);
      setIsLoading(false);
    }, 500);
  }, []);

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications;
    return notifications.filter(n => n.type === filter);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like': return <FaHeart style={{ color: '#ef4444' }} />;
      case 'comment': return <FaComment style={{ color: '#0ea5e9' }} />;
      case 'follow': return <FaUserPlus style={{ color: '#10b981' }} />;
      case 'bookmark': return <FaBookmark style={{ color: '#8b5cf6' }} />;
      default: return <FaBell style={{ color: '#6b7280' }} />;
    }
  };

  const handleNotificationClick = (notification) => {
    router.push(notification.link);
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode ? '#1a1a1a' : '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: `3px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
            borderTopColor: '#0ea5e9',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 16, color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Loading notifications...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDarkMode ? '#1a1a1a' : '#f9fafb',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: isDarkMode ? '#1a1a1a' : 'white',
        borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
        padding: '12px 16px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            <FaArrowLeft size={20} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Notifications</h1>
            {unreadCount > 0 && (
              <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0' }}>
                {unreadCount} unread
              </p>
            )}
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            <FaFilter size={18} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
          {['all', 'like', 'comment', 'follow', 'bookmark'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: filter === f ? '#0ea5e9' : (isDarkMode ? '#374151' : '#f3f4f6'),
                color: filter === f ? 'white' : (isDarkMode ? '#9ca3af' : '#6b7280'),
                whiteSpace: 'nowrap'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ padding: '8px 0' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FaBell style={{ fontSize: 64, color: '#d1d5db', marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#f3f4f6' : '#111827' }}>
              No {filter !== 'all' ? filter : ''} notifications
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              {filter !== 'all' ? `You haven't received any ${filter} notifications yet` : 'When you get notifications, they\'ll appear here'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: 16,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: `1px solid ${isDarkMode ? '#2a2a2a' : '#f3f4f6'}`,
                background: !notification.read ? (isDarkMode ? '#1a3a4a' : '#f0f9ff') : 'transparent'
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDarkMode ? '#374151' : '#f3f4f6',
                fontSize: 20,
                flexShrink: 0
              }}>
                {getNotificationIcon(notification.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: isDarkMode ? '#f3f4f6' : '#111827' }}>
                  {notification.title}
                </div>
                <div style={{ fontSize: 13, color: isDarkMode ? '#9ca3af' : '#6b7280', marginBottom: 4 }}>
                  {notification.message}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{notification.time}</div>
              </div>
              {!notification.read && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9', marginTop: 8 }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}