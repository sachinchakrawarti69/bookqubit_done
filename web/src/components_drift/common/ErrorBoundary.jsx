"use client";

import { Component } from "react";
import { useTheme } from "@/themes/useTheme";

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Drift Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

const ErrorFallback = ({ error, onRetry }) => {
  const { themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <div className={`error-fallback ${isDarkMode ? "dark" : "light"}`}>
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{error?.message || "An unexpected error occurred"}</p>
      <button className="error-retry" onClick={onRetry}>
        Try Again
      </button>

      <style jsx>{`
        .error-fallback {
          text-align: center;
          padding: 60px 24px;
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          border: 1px solid ${isDarkMode ? "#ef4444" : "#fecaca"};
        }
        .error-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .error-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #ef4444;
        }
        .error-message {
          font-size: 14px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
          margin-bottom: 20px;
        }
        .error-retry {
          padding: 10px 24px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .error-retry:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

const ErrorBoundary = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;