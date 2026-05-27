"use client";

import { useTheme } from "@/themes/useTheme";
import { FaHeart, FaComment, FaShare, FaEye } from "react-icons/fa";

const DriftStats = ({ drift }) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <div className="drift-stats">
      <span className="stat-item"><FaHeart className="stat-icon" /> {drift.likes.toLocaleString()}</span>
      <span className="stat-item"><FaComment className="stat-icon" /> {drift.comments?.length || 0}</span>
      <span className="stat-item"><FaShare className="stat-icon" /> {drift.shares.toLocaleString()}</span>
      {drift.views && (
        <span className="stat-item"><FaEye className="stat-icon" /> {drift.views.toLocaleString()}</span>
      )}

      <style jsx>{`
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
        .stat-icon { font-size: 14px; }
        @media (max-width: 640px) {
          .drift-stats { gap: 16px; font-size: 11px; }
          .stat-icon { font-size: 12px; }
        }
      `}</style>
    </div>
  );
};

export default DriftStats;