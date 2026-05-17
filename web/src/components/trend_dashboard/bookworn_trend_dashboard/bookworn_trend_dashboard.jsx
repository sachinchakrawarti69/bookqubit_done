"use client";

import React, { useState, useEffect } from "react";

const BookwormTrendDashboard = () => {
  const [bookworms, setBookworms] = useState([]);
  const [loading, setLoading] = useState(true);

  const topBookworms = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/80",
      booksRead: 247,
      readingTime: "1,284 hours",
      favoriteGenre: "Fantasy",
      badges: ["Top Reader", "Speed Reader", "Review Master"],
      impact: 1523,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://via.placeholder.com/80",
      booksRead: 198,
      readingTime: "982 hours",
      favoriteGenre: "Science Fiction",
      badges: ["Review Master", "Genre Expert"],
      impact: 1234,
    },
    {
      id: 3,
      name: "Emma Watson",
      avatar: "https://via.placeholder.com/80",
      booksRead: 176,
      readingTime: "876 hours",
      favoriteGenre: "Classics",
      badges: ["Influencer", "Book Club Leader"],
      impact: 987,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://via.placeholder.com/80",
      booksRead: 154,
      readingTime: "743 hours",
      favoriteGenre: "Mystery",
      badges: ["Speed Reader", "Night Owl"],
      impact: 765,
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      avatar: "https://via.placeholder.com/80",
      booksRead: 132,
      readingTime: "654 hours",
      favoriteGenre: "Romance",
      badges: ["Genre Expert", "Community Star"],
      impact: 654,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBookworms(topBookworms);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading top bookworms...</p>
      </div>
    );
  }

  return (
    <div className="bookworm-trend-dashboard">
      <div className="dashboard-header">
        <h2>🐛 Top Bookworms Dashboard</h2>
        <p className="subtitle">Most active and influential readers in our community</p>
      </div>

      <div className="bookworms-list">
        {bookworms.map((bookworm) => (
          <div key={bookworm.id} className="bookworm-card">
            <div className="bookworm-rank">#{bookworm.id}</div>
            <div className="bookworm-header">
              <img src={bookworm.avatar} alt={bookworm.name} className="bookworm-avatar" />
              <div className="bookworm-info">
                <h3 className="bookworm-name">{bookworm.name}</h3>
                <div className="badges">
                  {bookworm.badges.map((badge) => (
                    <span key={badge} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bookworm-stats">
              <div className="stat">
                <span className="stat-icon">📚</span>
                <div>
                  <div className="stat-value">{bookworm.booksRead}</div>
                  <div className="stat-label">Books Read</div>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">⏱️</span>
                <div>
                  <div className="stat-value">{bookworm.readingTime}</div>
                  <div className="stat-label">Reading Time</div>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">❤️</span>
                <div>
                  <div className="stat-value">{bookworm.favoriteGenre}</div>
                  <div className="stat-label">Favorite Genre</div>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">💫</span>
                <div>
                  <div className="stat-value">{bookworm.impact.toLocaleString()}</div>
                  <div className="stat-label">Impact Score</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .bookworm-trend-dashboard {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h2 {
          margin: 0 0 0.5rem 0;
          color: #1f2937;
          font-size: 1.5rem;
        }

        .subtitle {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .bookworms-list {
          display: grid;
          gap: 1rem;
        }

        .bookworm-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          position: relative;
        }

        .bookworm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px -6px rgba(0, 0, 0, 0.1);
        }

        .bookworm-rank {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .bookworm-header {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .bookworm-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f59e0b;
        }

        .bookworm-info {
          flex: 1;
        }

        .bookworm-name {
          margin: 0 0 0.75rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .badge {
          background: #e5e7eb;
          color: #4b5563;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .bookworm-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-icon {
          font-size: 1.5rem;
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .loading-container {
          text-align: center;
          padding: 3rem;
        }

        .loader {
          border: 3px solid #f3f4f6;
          border-top: 3px solid #f59e0b;
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
          .bookworm-header {
            flex-direction: column;
            text-align: center;
          }

          .bookworm-stats {
            grid-template-columns: 1fr;
          }

          .stat {
            justify-content: center;
          }

          .bookworm-rank {
            top: 0.5rem;
            right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BookwormTrendDashboard;