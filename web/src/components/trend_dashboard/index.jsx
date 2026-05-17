"use client";

import React, { useState } from "react";
import BookTrendDashboard from "./book_trend_dashboard/book_trend_dashboard";
import AuthorTrendDashboard from "./author_trend_dashboard/author_trend_dashboard";
import ComicTrendDashboard from "./comic_trend_dashboard/comic_trend_dashboard";
import BookwormTrendDashboard from "./bookworn_trend_dashboard/bookworn_trend_dashboard";

const TrendDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  const tabs = [
    { id: "books", label: "📚 Trending Books", component: BookTrendDashboard },
    { id: "authors", label: "✍️ Trending Authors", component: AuthorTrendDashboard },
    { id: "comics", label: "🎬 Trending Comics", component: ComicTrendDashboard },
    { id: "bookworms", label: "🐛 Top Bookworms", component: BookwormTrendDashboard },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="trend-dashboard-container">
      {/* Tabs Navigation */}
      <div className="trend-dashboard-tabs">
        <div className="trend-dashboard-tabs-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`trend-dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="trend-dashboard-content">
        {ActiveComponent && <ActiveComponent />}
      </div>

      <style jsx="true">{`
        .trend-dashboard-container {
          padding: 1.5rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .trend-dashboard-tabs {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .trend-dashboard-tabs-inner {
          display: flex;
          gap: 0.75rem;
          background: white;
          padding: 0.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          flex-wrap: wrap;
          justify-content: center;
        }

        .trend-dashboard-tab {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
          color: #4b5563;
        }

        .trend-dashboard-tab:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }

        .trend-dashboard-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .trend-dashboard-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .trend-dashboard-container {
            padding: 1rem;
          }

          .trend-dashboard-tab {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TrendDashboard;