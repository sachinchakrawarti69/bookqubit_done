"use client";

import React, { useState, useEffect } from "react";

const BookTrendDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("trending");

  // Mock data for trending books
  const trendingBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 98,
      views: 15234,
      likes: 3421,
      comments: 892,
      growth: "+45%",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 95,
      views: 14892,
      likes: 3210,
      comments: 765,
      growth: "+38%",
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 92,
      views: 13245,
      likes: 2987,
      comments: 654,
      growth: "+42%",
    },
    {
      id: 4,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 89,
      views: 12456,
      likes: 2765,
      comments: 543,
      growth: "+31%",
    },
    {
      id: 5,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 87,
      views: 11890,
      likes: 2543,
      comments: 487,
      growth: "+29%",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks(trendingBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const getSortedBooks = () => {
    switch (sortBy) {
      case "trending":
        return [...books].sort((a, b) => b.trendScore - a.trendScore);
      case "views":
        return [...books].sort((a, b) => b.views - a.views);
      case "likes":
        return [...books].sort((a, b) => b.likes - a.likes);
      default:
        return books;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading trending books...</p>
      </div>
    );
  }

  return (
    <div className="book-trend-dashboard">
      <div className="dashboard-header">
        <h2>📚 Trending Books Dashboard</h2>
        <div className="sort-controls">
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="trending">Trending Score</option>
            <option value="views">Most Views</option>
            <option value="likes">Most Likes</option>
          </select>
        </div>
      </div>

      <div className="books-grid">
        {getSortedBooks().map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-rank">#{book.id}</div>
            <img src={book.cover} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="trend-indicator">
                <span className="trend-score">🔥 {book.trendScore}</span>
                <span className="growth-badge">{book.growth}</span>
              </div>
              <div className="book-stats">
                <span>👁️ {book.views.toLocaleString()}</span>
                <span>❤️ {book.likes.toLocaleString()}</span>
                <span>💬 {book.comments.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .book-trend-dashboard {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
          color: #1f2937;
          font-size: 1.5rem;
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-controls label {
          color: #6b7280;
          font-weight: 500;
        }

        .sort-controls select {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .book-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .book-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }

        .book-rank {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: bold;
          z-index: 1;
        }

        .book-cover {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .book-info {
          padding: 1rem;
        }

        .book-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .book-author {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .trend-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .trend-score {
          font-size: 1.25rem;
          font-weight: bold;
          color: #f59e0b;
        }

        .growth-badge {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .book-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .loading-container {
          text-align: center;
          padding: 3rem;
        }

        .loader {
          border: 3px solid #f3f4f6;
          border-top: 3px solid #667eea;
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

        @media (max-width: 768px) {
          .books-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default BookTrendDashboard;