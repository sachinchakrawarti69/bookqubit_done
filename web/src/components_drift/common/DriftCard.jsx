"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { FaUser, FaBook, FaRegClock, FaEllipsisH, FaHeart, FaComment, FaBookmark, FaShare } from "react-icons/fa";
import DriftComments from "../feed/DriftComments";

const DriftCard = ({ drift, onLike, onSave, onComment, onShare, onDriftUpdate }) => {
  const { themeName } = useTheme();
  const { textAlign, direction } = useRTL();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(drift.liked || false);
  const [isSaved, setIsSaved] = useState(drift.saved || false);
  const [likesCount, setLikesCount] = useState(drift.likes || 0);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(drift.id, newLikedState);
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    onSave?.(drift.id, newSavedState);
  };

  const handleAddComment = (driftId, commentText) => {
    const newComment = {
      id: Date.now(),
      user: "You",
      text: commentText,
      timestamp: "Just now",
    };
    onComment?.(driftId, newComment);
  };

  return (
    <div className={`drift-card ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      {/* Header */}
      <div className="drift-header">
        <div className="drift-user-info">
          <div className="user-avatar">
            {drift.user.avatar ? (
              <img src={drift.user.avatar} alt={drift.user.name} />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="user-details">
            <div className="user-name-row">
              <span className="user-name">{drift.user.name}</span>
              {drift.user.verified && <span className="verified-badge">✓</span>}
              {drift.user.role && <span className="user-role">{drift.user.role}</span>}
            </div>
            <span className="user-username">{drift.user.username}</span>
            <span className="drift-time">
              <FaRegClock /> {drift.timestamp}
            </span>
          </div>
        </div>
        <button className="drift-menu" aria-label="More options">
          <FaEllipsisH />
        </button>
      </div>

      {/* Content */}
      <div className="drift-content">
        <p className={textAlign}>{drift.content}</p>
        
        {drift.book && (
          <div className="book-tag">
            <div className="book-cover">
              {drift.book.cover ? (
                <img src={drift.book.cover} alt={drift.book.title} />
              ) : (
                <FaBook />
              )}
            </div>
            <div className="book-info">
              <span className="book-title">{drift.book.title}</span>
              <span className="book-author">by {drift.book.author}</span>
              {drift.book.rating && (
                <div className="book-rating">
                  {"★".repeat(Math.floor(drift.book.rating))}
                  {"☆".repeat(5 - Math.floor(drift.book.rating))}
                  <span>{drift.book.rating}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {drift.image && (
          <div className="drift-image">
            <img src={drift.image} alt="Drift attachment" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="drift-stats">
        <span className="stat-item">
          <FaHeart className={`stat-icon ${isLiked ? "liked" : ""}`} /> 
          {likesCount.toLocaleString()}
        </span>
        <span className="stat-item">
          <FaComment className="stat-icon" /> 
          {drift.comments?.length || 0}
        </span>
        <span className="stat-item">
          <FaShare className="stat-icon" /> 
          {drift.shares?.toLocaleString() || 0}
        </span>
      </div>

      {/* Actions */}
      <div className="drift-actions">
        <button className={`action-btn ${isLiked ? "active" : ""}`} onClick={handleLike}>
          <FaHeart /> {isLiked ? "Liked" : "Like"}
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <FaComment /> Comment
        </button>
        <button className={`action-btn ${isSaved ? "active" : ""}`} onClick={handleSave}>
          <FaBookmark /> {isSaved ? "Saved" : "Save"}
        </button>
        <button className="action-btn" onClick={() => onShare?.(drift.id)}>
          <FaShare /> Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <DriftComments drift={drift} onAddComment={handleAddComment} />
      )}

      <style jsx>{`
        .drift-card {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          transition: all 0.3s ease;
        }
        .drift-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .drift-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .drift-user-info {
          display: flex;
          gap: 12px;
        }
        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
          flex-shrink: 0;
        }
        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .user-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
        .user-name {
          font-weight: 600;
          font-size: 15px;
        }
        .verified-badge {
          color: #3b82f6;
          font-size: 12px;
          font-weight: bold;
        }
        .user-role {
          font-size: 10px;
          padding: 2px 8px;
          background: ${isDarkMode ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)"};
          border-radius: 20px;
          color: #3b82f6;
        }
        .user-username {
          font-size: 12px;
          opacity: 0.7;
          display: block;
        }
        .drift-time {
          font-size: 11px;
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
        .drift-menu {
          background: transparent;
          border: none;
          cursor: pointer;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .drift-menu:hover {
          background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
        }
        .drift-content p {
          line-height: 1.6;
          margin-bottom: 12px;
          font-size: 15px;
        }
        .book-tag {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: ${isDarkMode ? "#0f172a" : "#f8fafc"};
          border-radius: 12px;
          margin-top: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .book-tag:hover {
          background: ${isDarkMode ? "#1a2744" : "#f1f5f9"};
        }
        .book-cover {
          width: 50px;
          height: 70px;
          background: ${isDarkMode ? "#334155" : "#e2e8f0"};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .book-info {
          flex: 1;
        }
        .book-title {
          font-weight: 600;
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }
        .book-author {
          font-size: 12px;
          opacity: 0.7;
          display: block;
          margin-bottom: 4px;
        }
        .book-rating {
          font-size: 11px;
          color: #fbbf24;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .book-rating span {
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .drift-image {
          margin-top: 12px;
          border-radius: 12px;
          overflow: hidden;
        }
        .drift-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .drift-stats {
          display: flex;
          gap: 24px;
          padding: 12px 0;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          border-bottom: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          margin: 12px 0;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .stat-icon.liked {
          color: #ef4444;
        }
        .drift-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 8px;
        }
        .action-btn {
          flex: 1;
          padding: 8px;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          transition: all 0.2s ease;
        }
        .action-btn:hover {
          background: ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
        }
        .action-btn.active {
          color: #3b82f6;
        }
        .action-btn.active:first-child {
          color: #ef4444;
        }
        @media (max-width: 640px) {
          .drift-card { padding: 16px; }
          .drift-actions { gap: 8px; }
          .action-btn { font-size: 11px; padding: 6px; }
          .drift-stats { gap: 16px; font-size: 11px; }
          .user-avatar { width: 40px; height: 40px; }
          .user-name { font-size: 14px; }
        }
      `}</style>
    </div>
  );
};

export default DriftCard;