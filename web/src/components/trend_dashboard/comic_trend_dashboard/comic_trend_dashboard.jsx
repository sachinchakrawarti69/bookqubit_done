"use client";

import React, { useState, useEffect } from "react";

const ComicTrendDashboard = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const trendingComics = [
    {
      id: 1,
      title: "Spider-Man: Across the Spider-Verse",
      publisher: "Marvel",
      issue: "#1",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 97,
      sales: 125000,
      rating: 4.8,
      growth: "+67%",
    },
    {
      id: 2,
      title: "Batman: The Dark Knight Returns",
      publisher: "DC",
      issue: "#1",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 94,
      sales: 98200,
      rating: 4.7,
      growth: "+54%",
    },
    {
      id: 3,
      title: "One Piece",
      publisher: "Manga",
      issue: "#1050",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 92,
      sales: 87600,
      rating: 4.9,
      growth: "+48%",
    },
    {
      id: 4,
      title: "X-Men: Days of Future Past",
      publisher: "Marvel",
      issue: "#141",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 88,
      sales: 65400,
      rating: 4.6,
      growth: "+39%",
    },
    {
      id: 5,
      title: "Attack on Titan",
      publisher: "Manga",
      issue: "#34",
      cover: "https://via.placeholder.com/100x150",
      trendScore: 86,
      sales: 54300,
      rating: 4.8,
      growth: "+32%",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setComics(trendingComics);
      setLoading(false);
    }, 1000);
  }, []);

  const getPublisherColor = (publisher) => {
    switch (publisher.toLowerCase()) {
      case "marvel":
        return "#e23636";
      case "dc":
        return "#0476d0";
      case "manga":
        return "#ff6b35";
      default:
        return "#6b7280";
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading trending comics...</p>
      </div>
    );
  }

  return (
    <div className="comic-trend-dashboard">
      <div className="dashboard-header">
        <h2>🎬 Trending Comics Dashboard</h2>
      </div>

      <div className="comics-grid">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-card">
            <div className="comic-rank">#{comic.id}</div>
            <div className="comic-header">
              <img src={comic.cover} alt={comic.title} className="comic-cover" />
              <div className="comic-info">
                <h3 className="comic-title">{comic.title}</h3>
                <p className="comic-publisher" style={{ color: getPublisherColor(comic.publisher) }}>
                  {comic.publisher}
                </p>
                <p className="comic-issue">Issue {comic.issue}</p>
              </div>
            </div>
            <div className="comic-details">
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-label">Trend Score</span>
                  <span className="stat-value">🔥 {comic.trendScore}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Sales</span>
                  <span className="stat-value">{comic.sales.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">⭐ {comic.rating}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Growth</span>
                  <span className="stat-value growth">{comic.growth}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .comic-trend-dashboard {
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

        .comics-grid {
          display: grid;
          gap: 1rem;
        }

        .comic-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          position: relative;
        }

        .comic-card:hover {
          transform: translateX(8px);
        }

        .comic-rank {
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

        .comic-header {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .comic-cover {
          width: 80px;
          height: 120px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .comic-info {
          flex: 1;
        }

        .comic-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .comic-publisher {
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .comic-issue {
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .stat-value.growth {
          color: #10b981;
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
        }
      `}</style>
    </div>
  );
};

export default ComicTrendDashboard;