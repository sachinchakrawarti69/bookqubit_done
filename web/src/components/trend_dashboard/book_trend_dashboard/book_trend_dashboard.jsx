"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getBooksByLanguage } from "@/data/books";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const BookTrendDashboard = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("trending");

  // Get books based on current language
  const booksData = useMemo(() => {
    return getBooksByLanguage(language);
  }, [language]);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Calculate trend scores based on views, likes, and comments
  const calculateTrendScore = (book) => {
    // Use real data if available, otherwise generate mock data
    const views = book.views || book.popularity || Math.floor(Math.random() * 20000) + 5000;
    const likes = book.likes || book.rating ? Math.floor(book.rating * 1000) : Math.floor(Math.random() * 5000) + 500;
    const comments = book.comments || Math.floor(Math.random() * 1000) + 100;
    
    return {
      trendScore: Math.floor((views / 200) + (likes / 10) + (comments / 2)),
      views,
      likes,
      comments,
      growth: `+${Math.floor(Math.random() * 60) + 20}%`
    };
  };

  // Process books with trend data
  const trendingBooks = useMemo(() => {
    if (!booksData || booksData.length === 0) return [];
    
    return booksData.slice(0, 12).map((book, index) => {
      const trendData = calculateTrendScore(book);
      return {
        id: book.id || index + 1,
        title: book.title,
        author: book.author,
        cover: book.imageUrl || book.coverImage || "https://via.placeholder.com/100x150?text=Book+Cover",
        slug: book.slug || book.id,
        rating: book.rating || 4.5,
        category: book.category,
        ...trendData
      };
    });
  }, [booksData]);

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setBooks(trendingBooks);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [trendingBooks]);

  const getSortedBooks = () => {
    switch (sortBy) {
      case "trending":
        return [...books].sort((a, b) => b.trendScore - a.trendScore);
      case "views":
        return [...books].sort((a, b) => b.views - a.views);
      case "likes":
        return [...books].sort((a, b) => b.likes - a.likes);
      case "rating":
        return [...books].sort((a, b) => b.rating - a.rating);
      default:
        return books;
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
          {t("trend.loading_books")}
        </p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="no-data-container">
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📚</span>
          <h3 className={`text-xl font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-2`}>
            {t("trend.no_books")}
          </h3>
          <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>
            {t("trend.check_back")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`book-trend-dashboard ${theme.background?.bookCoverSide || 'bg-white dark:bg-gray-800'}`}>
      <div className="dashboard-header">
        <h2 className={theme.textColors?.primary || 'text-gray-900 dark:text-white'}>
          📚 {t("trend.trending_books")}
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
            <option value="views">{t("trend.sort_views")}</option>
            <option value="likes">{t("trend.sort_likes")}</option>
            <option value="rating">{t("trend.sort_rating")}</option>
          </select>
        </div>
      </div>

      <div className="books-grid">
        {getSortedBooks().map((book, idx) => (
          <Link href={`/books/${book.slug}`} key={book.id}>
            <div className={`book-card ${theme.background?.section || 'bg-white dark:bg-gray-900'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
              <div className="book-rank" style={{ background: getRankGradient() }}>
                #{idx + 1}
              </div>
              
              {/* Rating Badge */}
              <div className="rating-badge">
                <span className="rating-stars">⭐</span>
                <span>{book.rating.toFixed(1)}</span>
              </div>
              
              {/* Category Tag */}
              {book.category && (
                <div className="category-tag">
                  {book.category}
                </div>
              )}
              
              <img 
                src={book.cover} 
                alt={book.title} 
                className="book-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/100x150?text=No+Cover";
                }}
              />
              
              <div className="book-info">
                <h3 className={`book-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                  {book.title}
                </h3>
                <p className={`book-author ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
                  {t("book.by")} {book.author}
                </p>
                
                <div className="trend-indicator">
                  <span className="trend-score">🔥 {book.trendScore}</span>
                  <span className="growth-badge">{book.growth}</span>
                </div>
                
                <div className={`book-stats ${theme.border?.default ? 'border-t ' + theme.border.default : 'border-t border-gray-200 dark:border-gray-700'}`}>
                  <span title="Views">👁️ {book.views.toLocaleString()}</span>
                  <span title="Likes">❤️ {book.likes.toLocaleString()}</span>
                  <span title="Comments">💬 {book.comments.toLocaleString()}</span>
                </div>
                
                <button className={`view-details-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:from-sky-700 hover:to-sky-600'} text-white transition-all duration-300 hover:scale-105`}>
                  {t("trend.view_details")}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx="true">{`
        .book-trend-dashboard {
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

        .sort-controls select:focus {
          outline: none;
          ring: 2px solid #0ea5e9;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .book-card {
          border-radius: 1rem;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .book-card:hover {
          transform: translateY(-4px);
        }

        .book-rank {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: bold;
          z-index: 2;
        }

        .rating-badge {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          color: #fbbf24;
          padding: 0.25rem 0.5rem;
          border-radius: 2rem;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          z-index: 2;
        }

        .category-tag {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.65rem;
          font-weight: 500;
          z-index: 2;
        }

        .rating-stars {
          font-size: 0.65rem;
        }

        .book-cover {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .book-card:hover .book-cover {
          transform: scale(1.05);
        }

        .book-info {
          padding: 1rem;
        }

        .book-title {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .book-title {
            font-size: 1.1rem;
          }
        }

        .book-author {
          margin: 0 0 0.75rem 0;
          font-size: 0.8rem;
        }

        .trend-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .trend-score {
          font-size: 1.1rem;
          font-weight: bold;
          color: #f59e0b;
        }

        .growth-badge {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .book-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.75rem;
        }

        .view-details-btn {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
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
          .book-trend-dashboard {
            padding: 1rem;
          }

          .books-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .book-cover {
            height: 180px;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .books-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default BookTrendDashboard;