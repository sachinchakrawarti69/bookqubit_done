"use client";

import { useTheme } from "@/themes/useTheme";
import { FaHeart, FaComment, FaBookmark, FaShare } from "react-icons/fa";

const DriftActions = ({ drift, onLike, onSave, onComment, onShare }) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <div className="drift-actions">
      <button className={`action-like ${drift.liked ? "liked" : ""}`} onClick={() => onLike(drift.id)}>
        <FaHeart /> {drift.liked ? "Liked" : "Like"}
      </button>
      <button className="action-comment" onClick={() => onComment(drift.id)}>
        <FaComment /> Comment
      </button>
      <button className={`action-save ${drift.saved ? "saved" : ""}`} onClick={() => onSave(drift.id)}>
        <FaBookmark /> {drift.saved ? "Saved" : "Save"}
      </button>
      <button className="action-share" onClick={() => onShare(drift.id)}>
        <FaShare /> Share
      </button>

      <style jsx>{`
        .drift-actions {
          display: flex;
          gap: 12px;
        }
        .drift-actions button {
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
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          transition: all 0.2s ease;
        }
        .drift-actions button:hover {
          background: ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
        }
        .action-like.liked { color: #ef4444; }
        .action-save.saved { color: #3b82f6; }
        @media (max-width: 640px) {
          .drift-actions { flex-wrap: wrap; }
          .drift-actions button { flex: 0 0 calc(50% - 6px); font-size: 11px; }
        }
      `}</style>
    </div>
  );
};

export default DriftActions;