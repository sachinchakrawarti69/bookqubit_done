"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { ComicsData } from "@/data/comics/ComicsData_English";

const ComicTrendDashboard = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("trending");

  // Get comics data based on current language
  const comicsData = useMemo(() => {
    // In the future, you can implement getComicsByLanguage function
    // For now, using the English comics data
    return ComicsData || [];
  }, [language]);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Calculate trend scores based on sales, rating, and popularity
  const calculateTrendScore = (comic) => {
    // Use real data if available, otherwise generate mock data
    const sales = comic.sales || Math.floor(Math.random() * 150000) + 20000;
    const rating = comic.rating || 4.5;
    const popularity = comic.popularity || Math.floor(Math.random() * 100) + 1;
    
    return {
      trendScore: Math.floor((sales / 1000) + (rating * 10) + (popularity / 10)),
      sales,
      rating,
      growth: `+${Math.floor(Math.random() * 60) + 20}%`
    };
  };

  // Process comics with trend data
  const trendingComics = useMemo(() => {
    if (!comicsData || comicsData.length === 0) return [];
    
    return comicsData.slice(0, 10).map((comic, index) => {
      const trendData = calculateTrendScore(comic);
      return {
        id: comic.id || index + 1,
        title: comic.title,
        publisher: comic.publisher,
        issue: comic.issue || `#${comic.id}`,
        cover: comic.image || comic.cover || "https://via.placeholder.com/100x150?text=Comic+Cover",
        slug: comic.slug || comic.id,
        category: comic.category,
        publicationDate: comic.publicationDate,
        ...trendData
      };
    });
  }, [comicsData]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setComics(trendingComics);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [trendingComics]);

  const getSortedComics = () => {
    switch (sortBy) {
      case "trending":
        return [...comics].sort((a, b) => b.trendScore - a.trendScore);
      case "sales":
        return [...comics].sort((a, b) => b.sales - a.sales);
      case "rating":
        return [...comics].sort((a, b) => b.rating - a.rating);
      default:
        return comics;
    }
  };

  const getPublisherColor = (publisher) => {
    switch (publisher?.toLowerCase()) {
      case "marvel comics":
      case "marvel":
        return "#e23636";
      case "dc comics":
      case "dc":
        return "#0476d0";
      case "manga":
        return "#ff6b35";
      case "raj comics":
        return "#f59e0b";
      case "timely comics":
        return "#10b981";
      case "apex comics":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  // Get theme-specific gradient for rank badge
  const getRankGradient = () => {
    if (theme.buttonColors?.primaryButton?.background) {
      return theme.buttonColors.primaryButton.background;
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader" style={{ borderTopColor: '#667eea' }}></div>
        <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
          {t("trend.loading_comics")}
        </p>
      </div>
    );
  }

  if (comics.length === 0) {
    return (
      <div className="no-data-container">
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🎬</span>
          <h3 className={`text-xl font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-2`}>
            {t("trend.no_comics")}
          </h3>
          <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
            {t("trend.check_back_comics")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`comic-trend-dashboard ${theme.background?.bookCoverSide || 'bg-white dark:bg-gray-800'}`}>
      <div className="dashboard-header">
        <h2 className={theme.textColors?.primary || 'text-gray-900 dark:text-white'}>
          🎬 {t("trend.trending_comics")}
        </h2>
        <div className="sort-controls">
          <label className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
            {t("trend.sort_by")}:
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={`${theme.background?.section || 'bg-white dark:bg-gray-900'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer`}
          >
            <option value="trending">{t("trend.sort_trending")}</option>
            <option value="sales">{t("trend.sort_sales")}</option>
            <option value="rating">{t("trend.sort_rating")}</option>
          </select>
        </div>
      </div>

      <div className="comics-grid">
        {getSortedComics().map((comic, idx) => (
          <Link href={`/comics/${comic.slug}`} key={comic.id}>
            <div className={`comic-card ${theme.background?.section || 'bg-white dark:bg-gray-900'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} transition-all duration-300 hover:shadow-xl`}>
              <div className="comic-rank" style={{ background: getRankGradient() }}>
                #{idx + 1}
              </div>
              
              <div className="comic-header">
                <img 
                  src={comic.cover} 
                  alt={comic.title} 
                  className="comic-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100x150?text=No+Cover";
                  }}
                />
                <div className="comic-info">
                  <h3 className={`comic-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                    {comic.title}
                  </h3>
                  <p className="comic-publisher" style={{ color: getPublisherColor(comic.publisher) }}>
                    {comic.publisher}
                  </p>
                  <p className={`comic-issue ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
                    {t("trend.issue")} {comic.issue}
                  </p>
                  {comic.publicationDate && (
                    <p className={`comic-date ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'} text-xs mt-1`}>
                      📅 {comic.publicationDate}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="comic-details">
                <div className="stats-grid">
                  <div className="stat">
                    <span className="stat-label">{t("trend.trending_score")}</span>
                    <span className="stat-value">🔥 {comic.trendScore}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">{t("trend.sales")}</span>
                    <span className="stat-value">{comic.sales.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">{t("trend.rating")}</span>
                    <span className="stat-value">⭐ {comic.rating.toFixed(1)}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">{t("trend.growth")}</span>
                    <span className="stat-value growth">{comic.growth}</span>
                  </div>
                </div>
              </div>
              
              <button className={`view-details-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:from-sky-700 hover:to-sky-600'} text-white transition-all duration-300 hover:scale-105`}>
                {t("trend.view_details")}
              </button>
            </div>
          </Link>
        ))}
      </div>

      <style jsx="true">{`
        .comic-trend-dashboard {
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-controls label {
          font-weight: 500;
        }

        .sort-controls select {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .comics-grid {
          display: grid;
          gap: 1rem;
        }

        .comic-card {
          border-radius: 1rem;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .comic-card:hover {
          transform: translateX(8px);
        }

        .comic-rank {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: bold;
          z-index: 2;
        }

        .comic-header {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 1.5rem 0 1.5rem;
        }

        .comic-cover {
          width: 90px;
          height: 130px;
          object-fit: cover;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .comic-info {
          flex: 1;
        }

        .comic-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .comic-publisher {
          margin: 0 0 0.25rem 0;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .comic-issue {
          margin: 0;
          font-size: 0.8rem;
        }

        .comic-date {
          margin: 0;
        }

        .comic-details {
          padding: 1rem 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .dark .stats-grid {
          border-color: #374151;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.7rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1f2937;
        }

        .dark .stat-value {
          color: #f3f4f6;
        }

        .stat-value.growth {
          color: #10b981;
        }

        .view-details-btn {
          width: calc(100% - 3rem);
          margin: 0 1.5rem 1.5rem 1.5rem;
          padding: 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
        }

        .loading-container {
          text-align: center;
          padding: 3rem;
        }

        .loader {
          border: 3px solid #f3f4f6;
          border-top: 3px solid;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .no-data-container {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .comic-trend-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .comic-header {
            flex-direction: column;
            text-align: center;
          }

          .comic-cover {
            margin: 0 auto;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .comic-rank {
            top: 0.5rem;
            right: 0.5rem;
          }

          .view-details-btn {
            width: calc(100% - 2rem);
            margin: 0 1rem 1rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ComicTrendDashboard;