"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { FaFire, FaHashtag, FaArrowRight, FaTrendUp } from "react-icons/fa";

const TrendingTopics = () => {
  const { themeName } = useTheme();
  const { direction } = useRTL();
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setTrendingTopics([
        { id: 1, tag: "BookRecommendations", posts: 12500, trend: "+67%", category: "books" },
        { id: 2, tag: "CurrentlyReading", posts: 8900, trend: "+45%", category: "reading" },
        { id: 3, tag: "BookReview", posts: 7600, trend: "+34%", category: "reviews" },
        { id: 4, tag: "BookTok", posts: 5432, trend: "+89%", category: "trending" },
        { id: 5, tag: "AmReading", posts: 4321, trend: "+23%", category: "reading" },
        { id: 6, tag: "FantasyBooks", posts: 3210, trend: "+56%", category: "genres" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getTrendColor = (trend) => {
    const value = parseInt(trend);
    if (value > 60) return "trend-hot";
    if (value > 40) return "trend-warm";
    if (value > 20) return "trend-cool";
    return "trend-mild";
  };

  if (loading) {
    return (
      <div className="trending-skeleton">
        <div className="skeleton-header"></div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
        <style jsx>{`
          .trending-skeleton {
            background: ${isDarkMode ? "#1e293b" : "#ffffff"};
            border-radius: 20px;
            padding: 20px;
            border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          }
          .skeleton-header {
            height: 24px;
            width: 60%;
            background: linear-gradient(90deg, ${isDarkMode ? "#334155" : "#e2e8f0"} 25%, ${isDarkMode ? "#475569" : "#f1f5f9"} 50%, ${isDarkMode ? "#334155" : "#e2e8f0"} 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
            margin-bottom: 16px;
          }
          .skeleton-item {
            height: 50px;
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
    <div className={`trending-topics ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="section-header">
        <FaFire className="section-icon trending-icon" />
        <h3 className="section-title">Trending Topics</h3>
        <FaTrendUp className="trend-indicator" />
      </div>

      <div className="topics-list">
        {trendingTopics.slice(0, 5).map((topic, index) => (
          <Link 
            key={topic.id} 
            href={`/drift/tag/${topic.tag.toLowerCase()}`}
            className="topic-item"
          >
            <div className="topic-rank">{index + 1}</div>
            <div className="topic-info">
              <div className="topic-tag">
                <FaHashtag className="hashtag-icon" />
                <span className="tag-name">{topic.tag}</span>
              </div>
              <div className="topic-stats">
                <span className="post-count">{topic.posts.toLocaleString()} drifts</span>
                <span className={`trend-badge ${getTrendColor(topic.trend)}`}>
                  {topic.trend}
                </span>
              </div>
            </div>
            <FaArrowRight className="topic-arrow" />
          </Link>
        ))}
      </div>

      <Link href="/drift/trending" className="view-all-link">
        See all trending topics <FaArrowRight className="link-arrow" />
      </Link>

      <style jsx>{`
        .trending-topics {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .trending-topics:hover {
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
          font-size: 20px;
        }
        .trending-icon {
          color: #f59e0b;
        }
        .section-title {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
        .trend-indicator {
          font-size: 14px;
          color: #10b981;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .topic-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .topic-item:hover {
          background: ${isDarkMode ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.05)"};
          transform: translateX(4px);
        }
        [dir="rtl"] .topic-item:hover {
          transform: translateX(-4px);
        }
        .topic-rank {
          width: 28px;
          height: 28px;
          background: ${isDarkMode ? "#334155" : "#f1f5f9"};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: #3b82f6;
          flex-shrink: 0;
        }
        .topic-info {
          flex: 1;
        }
        .topic-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }
        .hashtag-icon {
          font-size: 12px;
          color: #3b82f6;
        }
        .tag-name {
          font-size: 14px;
          font-weight: 500;
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .topic-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
        }
        .post-count {
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .trend-badge {
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 10px;
        }
        .trend-hot {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }
        .trend-warm {
          background: rgba(249, 115, 22, 0.15);
          color: #f97316;
        }
        .trend-cool {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }
        .trend-mild {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }
        .topic-arrow {
          font-size: 12px;
          color: ${isDarkMode ? "#64748b" : "#94a3b8"};
          opacity: 0;
          transition: all 0.2s ease;
        }
        .topic-item:hover .topic-arrow {
          opacity: 1;
          transform: translateX(4px);
        }
        [dir="rtl"] .topic-item:hover .topic-arrow {
          transform: translateX(-4px);
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
      `}</style>
    </div>
  );
};

export default TrendingTopics;