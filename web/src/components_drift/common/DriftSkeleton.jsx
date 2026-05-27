"use client";

import { useTheme } from "@/themes/useTheme";

const DriftSkeleton = ({ count = 3 }) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <div className="skeleton-container">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className={`skeleton-card ${isDarkMode ? "dark" : "light"}`}>
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
              <div className="skeleton-line name"></div>
              <div className="skeleton-line username"></div>
            </div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-line content-line"></div>
            <div className="skeleton-line content-line short"></div>
          </div>
          <div className="skeleton-actions">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .skeleton-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skeleton-card {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .skeleton-header {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .skeleton-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(90deg, 
            ${isDarkMode ? "#334155" : "#e2e8f0"} 25%,
            ${isDarkMode ? "#475569" : "#f1f5f9"} 50%,
            ${isDarkMode ? "#334155" : "#e2e8f0"} 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-info {
          flex: 1;
        }
        .skeleton-line {
          height: 14px;
          background: linear-gradient(90deg, 
            ${isDarkMode ? "#334155" : "#e2e8f0"} 25%,
            ${isDarkMode ? "#475569" : "#f1f5f9"} 50%,
            ${isDarkMode ? "#334155" : "#e2e8f0"} 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .skeleton-line.name {
          width: 60%;
          height: 16px;
        }
        .skeleton-line.username {
          width: 40%;
          height: 12px;
        }
        .skeleton-line.content-line {
          width: 100%;
          height: 14px;
        }
        .skeleton-line.short {
          width: 70%;
        }
        .skeleton-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .skeleton-btn {
          flex: 1;
          height: 36px;
          background: linear-gradient(90deg, 
            ${isDarkMode ? "#334155" : "#e2e8f0"} 25%,
            ${isDarkMode ? "#475569" : "#f1f5f9"} 50%,
            ${isDarkMode ? "#334155" : "#e2e8f0"} 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default DriftSkeleton;