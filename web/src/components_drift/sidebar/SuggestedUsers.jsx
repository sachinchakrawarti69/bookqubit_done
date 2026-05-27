"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { FaUserPlus, FaUserCheck, FaUser, FaStar, FaArrowRight } from "react-icons/fa";

const SuggestedUsers = () => {
  const { themeName } = useTheme();
  const { direction } = useRTL();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [following, setFollowing] = useState({});
  const [loading, setLoading] = useState(true);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  useEffect(() => {
    setTimeout(() => {
      setSuggestedUsers([
        { id: 1, name: "Stephen King", username: "@stephenking", avatar: "SK", followers: "1.2M", verified: true, bio: "Master of horror" },
        { id: 2, name: "J.K. Rowling", username: "@jkrowling", avatar: "JR", followers: "987k", verified: true, bio: "Creator of Harry Potter" },
        { id: 3, name: "Colleen Hoover", username: "@colleenhoover", avatar: "CH", followers: "876k", verified: true, bio: "Romance author" },
        { id: 4, name: "Brandon Sanderson", username: "@brandsanderson", avatar: "BS", followers: "765k", verified: true, bio: "Epic fantasy" },
        { id: 5, name: "Margaret Atwood", username: "@margaretatwood", avatar: "MA", followers: "654k", verified: true, bio: "The Handmaid's Tale" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  if (loading) {
    return (
      <div className="suggested-skeleton">
        <div className="skeleton-header"></div>
        <div className="skeleton-user"></div>
        <div className="skeleton-user"></div>
        <div className="skeleton-user"></div>
        <style jsx>{`
          .suggested-skeleton {
            background: ${isDarkMode ? "#1e293b" : "#ffffff"};
            border-radius: 20px;
            padding: 20px;
            border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          }
          .skeleton-header {
            height: 24px;
            width: 50%;
            background: linear-gradient(90deg, ${isDarkMode ? "#334155" : "#e2e8f0"} 25%, ${isDarkMode ? "#475569" : "#f1f5f9"} 50%, ${isDarkMode ? "#334155" : "#e2e8f0"} 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          .skeleton-user {
            height: 56px;
            background: linear-gradient(90deg, ${isDarkMode ? "#334155" : "#e2e8f0"} 25%, ${isDarkMode ? "#475569" : "#f1f5f9"} 50%, ${isDarkMode ? "#334155" : "#e2e8f0"} 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 8px;
            margin-bottom: 12px;
          }
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`suggested-users ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="section-header">
        <FaUserPlus className="section-icon" />
        <h3 className="section-title">Suggested for you</h3>
      </div>

      <div className="users-list">
        {suggestedUsers.slice(0, 4).map((user) => (
          <div key={user.id} className="user-item">
            <Link href={`/drift/profile/${user.username.slice(1)}`} className="user-avatar-wrapper">
              <div className="user-avatar">
                {user.avatar}
              </div>
              {user.verified && <span className="verified-badge">✓</span>}
            </Link>
            <div className="user-info">
              <Link href={`/drift/profile/${user.username.slice(1)}`} className="user-name">
                {user.name}
              </Link>
              <div className="user-meta">
                <span className="user-username">{user.username}</span>
                <span className="user-followers">{user.followers} followers</span>
              </div>
              <p className="user-bio">{user.bio}</p>
            </div>
            <button 
              className={`follow-btn ${following[user.id] ? "following" : ""}`}
              onClick={() => handleFollow(user.id)}
            >
              {following[user.id] ? (
                <><FaUserCheck /> Following</>
              ) : (
                <><FaUserPlus /> Follow</>
              )}
            </button>
          </div>
        ))}
      </div>

      <Link href="/drift/explore/people" className="view-all-link">
        Discover more people <FaArrowRight className="link-arrow" />
      </Link>

      <style jsx>{`
        .suggested-users {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .suggested-users:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .section-icon {
          font-size: 18px;
          color: #8b5cf6;
        }
        .section-title {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
        .users-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }
        .user-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .user-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
          text-decoration: none;
        }
        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          color: white;
        }
        .verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          border: 2px solid ${isDarkMode ? "#1e293b" : "#ffffff"};
        }
        .user-info {
          flex: 1;
          min-width: 0;
        }
        .user-name {
          display: block;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
          transition: color 0.2s ease;
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .user-name:hover {
          color: #3b82f6;
        }
        .user-meta {
          display: flex;
          gap: 8px;
          font-size: 11px;
          margin-bottom: 4px;
        }
        .user-username, .user-followers {
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .user-bio {
          font-size: 12px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          margin: 0;
          line-height: 1.4;
        }
        .follow-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #3b82f6;
          background: transparent;
          color: #3b82f6;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .follow-btn:hover {
          background: #3b82f6;
          color: white;
          transform: scale(1.05);
        }
        .follow-btn.following {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }
        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-top: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          color: #3b82f6;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          transition: all 0.2s ease;
        }
        .view-all-link:hover {
          gap: 12px;
        }
        .link-arrow {
          font-size: 10px;
          transition: transform 0.2s ease;
        }
        .view-all-link:hover .link-arrow {
          transform: translateX(4px);
        }
        [dir="rtl"] .view-all-link:hover .link-arrow {
          transform: translateX(-4px);
        }
        @media (max-width: 640px) {
          .user-item { flex-wrap: wrap; }
          .follow-btn { width: 100%; justify-content: center; margin-top: 4px; }
          .user-avatar { width: 40px; height: 40px; font-size: 14px; }
        }
      `}</style>
    </div>
  );
};

export default SuggestedUsers;