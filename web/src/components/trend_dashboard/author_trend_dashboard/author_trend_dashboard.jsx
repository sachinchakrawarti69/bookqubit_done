"use client";

import React, { useState, useEffect } from "react";

const AuthorTrendDashboard = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const trendingAuthors = [
    {
      id: 1,
      name: "Matt Haig",
      avatar: "https://via.placeholder.com/80",
      followers: 125000,
      booksWritten: 12,
      trendScore: 96,
      growth: "+52%",
      topBook: "The Midnight Library",
    },
    {
      id: 2,
      name: "James Clear",
      avatar: "https://via.placeholder.com/80",
      followers: 892000,
      booksWritten: 1,
      trendScore: 94,
      growth: "+48%",
      topBook: "Atomic Habits",
    },
    {
      id: 3,
      name: "Andy Weir",
      avatar: "https://via.placeholder.com/80",
      followers: 234000,
      booksWritten: 4,
      trendScore: 91,
      growth: "+41%",
      topBook: "Project Hail Mary",
    },
    {
      id: 4,
      name: "Morgan Housel",
      avatar: "https://via.placeholder.com/80",
      followers: 156000,
      booksWritten: 2,
      trendScore: 88,
      growth: "+37%",
      topBook: "The Psychology of Money",
    },
    {
      id: 5,
      name: "Frank Herbert",
      avatar: "https://via.placeholder.com/80",
      followers: 445000,
      booksWritten: 23,
      trendScore: 85,
      growth: "+25%",
      topBook: "Dune",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAuthors(trendingAuthors);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading trending authors...</p>
      </div>
    );
  }

  return (
    <div className="author-trend-dashboard">
      <div className="dashboard-header">
        <h2>✍️ Trending Authors Dashboard</h2>
      </div>

      <div className="authors-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <div className="author-rank">#{author.id}</div>
            <div className="author-header">
              <img src={author.avatar} alt={author.name} className="author-avatar" />
              <div className="author-info">
                <h3 className="author-name">{author.name}</h3>
                <p className="author-stats">
                  📚 {author.booksWritten} books • 👥 {author.followers.toLocaleString()} followers
                </p>
              </div>
            </div>
            <div className="author-details">
              <div className="trend-info">
                <span className="trend-score">🔥 {author.trendScore}</span>
                <span className="growth-badge">{author.growth}</span>
              </div>
              <div className="top-book">
                <span className="top-book-label">Top Book:</span>
                <span className="top-book-title">"{author.topBook}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .author-trend-dashboard {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h2 {
          margin: 0;
          color: #1f2937;
          font-size: 1.5rem;
        }

        .authors-grid {
          display: grid;
          gap: 1rem;
        }

        .author-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          position: relative;
        }

        .author-card:hover {
          transform: translateX(8px);
          box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.1);
        }

        .author-rank {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .author-header {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .author-stats {
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .author-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .trend-info {
          display: flex;
          gap: 0.75rem;
          align-items: center;
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

        .top-book {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.875rem;
        }

        .top-book-label {
          color: #6b7280;
          font-weight: 500;
        }

        .top-book-title {
          color: #667eea;
          font-weight: 600;
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
          .author-header {
            flex-direction: column;
            text-align: center;
          }

          .author-details {
            flex-direction: column;
            text-align: center;
          }

          .author-rank {
            top: 0.5rem;
            right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthorTrendDashboard;