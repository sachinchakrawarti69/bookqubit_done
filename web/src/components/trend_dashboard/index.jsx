"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import BookTrendDashboard from "./book_trend_dashboard/book_trend_dashboard";
import AuthorTrendDashboard from "./author_trend_dashboard/author_trend_dashboard";
import ComicTrendDashboard from "./comic_trend_dashboard/comic_trend_dashboard";
import BookwormTrendDashboard from "./bookworn_trend_dashboard/bookworn_trend_dashboard";

const TrendDashboard = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("books");

  // Check if current theme is dark mode variant
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const tabs = [
    { id: "books", label: t("trend.tab_books"), component: BookTrendDashboard },
    { id: "authors", label: t("trend.tab_authors"), component: AuthorTrendDashboard },
    { id: "comics", label: t("trend.tab_comics"), component: ComicTrendDashboard },
    { id: "bookworms", label: t("trend.tab_bookworms"), component: BookwormTrendDashboard },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  // Get theme-based gradient for active tab
  const getActiveTabGradient = () => {
    if (theme.buttonColors?.primaryButton?.background) {
      return theme.buttonColors.primaryButton.background;
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  // Get theme-based background for container
  const getContainerBackground = () => {
    if (theme.background?.section) {
      return theme.background.section;
    }
    return isDarkMode ? '#1a1a2e' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
  };

  // Get tab container background
  const getTabContainerBackground = () => {
    if (theme.background?.card) {
      return theme.background.card;
    }
    return isDarkMode ? '#2d2d44' : 'white';
  };

  // Get tab hover background
  const getTabHoverBackground = () => {
    if (theme.background?.hover) {
      return theme.background.hover;
    }
    return isDarkMode ? '#3d3d5c' : '#f3f4f6';
  };

  // Get tab text color
  const getTabTextColor = () => {
    if (theme.textColors?.primary) {
      return theme.textColors.primary;
    }
    return isDarkMode ? '#e5e7eb' : '#4b5563';
  };

  return (
    <div 
      className="trend-dashboard-container"
      style={{ 
        background: getContainerBackground(),
        minHeight: '100vh',
        padding: '1.5rem'
      }}
    >
      {/* Tabs Navigation */}
      <div className="trend-dashboard-tabs">
        <div 
          className="trend-dashboard-tabs-inner"
          style={{
            display: 'flex',
            gap: '0.75rem',
            background: getTabContainerBackground(),
            padding: '0.5rem',
            borderRadius: '1rem',
            boxShadow: theme.shadow?.container || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`trend-dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: activeTab === tab.id ? getActiveTabGradient() : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : getTabTextColor(),
                boxShadow: activeTab === tab.id ? (theme.shadow?.button || '0 4px 12px rgba(102, 126, 234, 0.4)') : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = getTabHoverBackground();
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="trend-dashboard-content"
        style={{
          animation: 'fadeIn 0.5s ease-in-out'
        }}
      >
        {ActiveComponent && <ActiveComponent />}
      </div>

      <style jsx="true">{`
        .trend-dashboard-container {
          transition: background 0.3s ease;
        }

        .trend-dashboard-tabs {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .trend-dashboard-tab {
          position: relative;
          overflow: hidden;
        }

        .trend-dashboard-tab::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .trend-dashboard-tab:active::before {
          width: 300px;
          height: 300px;
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
            padding: 1rem !important;
          }

          .trend-dashboard-tab {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }

          .trend-dashboard-tabs-inner {
            gap: 0.5rem !important;
          }
        }

        /* RTL Support */
        [dir="rtl"] .trend-dashboard-tabs-inner {
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  );
};

export default TrendDashboard;