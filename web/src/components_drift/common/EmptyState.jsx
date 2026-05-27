"use client";

import { useTheme } from "@/themes/useTheme";

const EmptyState = ({ 
  icon = "🌊", 
  title = "Nothing to see here", 
  message = "Be the first to share your thoughts!",
  actionText,
  onAction 
}) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <div className={`empty-state ${isDarkMode ? "dark" : "light"}`}>
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
      {actionText && onAction && (
        <button className="empty-action" onClick={onAction}>
          {actionText}
        </button>
      )}

      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 60px 24px;
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.7;
        }
        .empty-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .empty-message {
          font-size: 14px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          margin-bottom: 24px;
        }
        .empty-action {
          padding: 10px 24px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .empty-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default EmptyState;