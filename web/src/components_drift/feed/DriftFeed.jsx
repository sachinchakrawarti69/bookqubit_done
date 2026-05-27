"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import DriftCard from "../common/DriftCard";
import LoadingSpinner from "../common/LoadingSpinner";

const DriftFeed = ({ drifts, loading, onLike, onSave, onComment, onShare, onDriftUpdate }) => {
  const { themeName } = useTheme();
  const { direction } = useRTL();
  const [activeTab, setActiveTab] = useState("for-you");

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  if (loading) return <LoadingSpinner text="Loading drifts..." />;

  return (
    <div className="drift-feed" dir={direction}>
      <div className="feed-tabs">
        <button className={`tab ${activeTab === "for-you" ? "active" : ""}`} onClick={() => setActiveTab("for-you")}>
          For You
        </button>
        <button className={`tab ${activeTab === "following" ? "active" : ""}`} onClick={() => setActiveTab("following")}>
          Following
        </button>
        <button className={`tab ${activeTab === "book-drifts" ? "active" : ""}`} onClick={() => setActiveTab("book-drifts")}>
          Book Drifts
        </button>
      </div>

      {drifts.length === 0 ? (
        <div className="empty-feed">
          <div className="empty-icon">🌊</div>
          <h3>No drifts yet</h3>
          <p>Be the first to share your thoughts about books!</p>
        </div>
      ) : (
        drifts.map((drift) => (
          <DriftCard
            key={drift.id}
            drift={drift}
            onLike={onLike}
            onSave={onSave}
            onComment={onComment}
            onShare={onShare}
            onDriftUpdate={onDriftUpdate}
          />
        ))
      )}

      <style jsx>{`
        .drift-feed { width: 100%; }
        .feed-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .tab {
          padding: 10px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          transition: all 0.2s ease;
        }
        .tab.active {
          color: #3b82f6;
          border-bottom: 2px solid #3b82f6;
          margin-bottom: -2px;
        }
        .empty-feed {
          text-align: center;
          padding: 60px 20px;
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .empty-icon { font-size: 64px; margin-bottom: 16px; }
        .empty-feed h3 { font-size: 20px; margin-bottom: 8px; }
        .empty-feed p { opacity: 0.7; }
        @media (max-width: 640px) {
          .tab { padding: 8px 12px; font-size: 13px; }
        }
      `}</style>
    </div>
  );
};

export default DriftFeed;