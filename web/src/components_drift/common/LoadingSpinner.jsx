"use client";

import { useTheme } from "@/themes/useTheme";

const LoadingSpinner = ({ text = "Loading...", size = "medium" }) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const sizes = {
    small: { spinner: 32, text: 12 },
    medium: { spinner: 48, text: 14 },
    large: { spinner: 64, text: 16 },
  };

  const { spinner: spinnerSize, text: textSize } = sizes[size] || sizes.medium;

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      {text && <p>{text}</p>}

      <style jsx>{`
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          gap: 16px;
        }
        .spinner {
          width: ${spinnerSize}px;
          height: ${spinnerSize}px;
          border: 3px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          border-top-color: #3b82f6;
          border-right-color: #8b5cf6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        p {
          font-size: ${textSize}px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;