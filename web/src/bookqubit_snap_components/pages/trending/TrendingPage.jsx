"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { 
  FaFire, 
  FaBook, 
  FaUser, 
  FaComment, 
  FaHeart, 
  FaShare,
  FaArrowUp,
  FaHashtag,
  FaClock,
  FaEye
} from "react-icons/fa";
import Link from "next/link";
import "./TrendingPage.css";

const TrendingPage = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { direction, textAlign } = useRTL();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("week");

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Mock trending data (same as before)
  const mockTrending = {
    week: {
      books: [
        { id: 1, title: "Project Hail Mary", author: "Andy Weir", mentions: 12345, trend: "+45%", cover: null },
        { id: 2, title: "The Silent Patient", author: "Alex Michaelides", mentions: 9876, trend: "+32%", cover: null },
        { id: 3, title: "Where the Crawdads Sing", author: "Delia Owens", mentions: 8765, trend: "+28%", cover: null },
        { id: 4, title: "Atomic Habits", author: "James Clear", mentions: 7654, trend: "+56%", cover: null },
        { id: 5, title: "The Four Winds", author: "Kristin Hannah", mentions: 6543, trend: "+21%", cover: null },
      ],
      hashtags: [
        { tag: "BookRecommendations", posts: 12500, trend: "+67%" },
        { tag: "CurrentlyReading", posts: 8900, trend: "+45%" },
        { tag: "BookReview", posts: 7600, trend: "+34%" },
        { tag: "BookTok", posts: 5432, trend: "+89%" },
        { tag: "AmReading", posts: 4321, trend: "+23%" },
      ],
      authors: [
        { id: 1, name: "Stephen King", mentions: 8765, trend: "+12%" },
        { id: 2, name: "Colleen Hoover", mentions: 7654, trend: "+34%" },
        { id: 3, name: "Brandon Sanderson", mentions: 6543, trend: "+23%" },
      ],
    },
    month: {
      books: [
        { id: 1, title: "Project Hail Mary", author: "Andy Weir", mentions: 45678, trend: "+67%", cover: null },
        { id: 2, title: "The Silent Patient", author: "Alex Michaelides", mentions: 34567, trend: "+54%", cover: null },
        { id: 3, title: "Atomic Habits", author: "James Clear", mentions: 29876, trend: "+78%", cover: null },
      ],
      hashtags: [
        { tag: "BookRecommendations", posts: 45600, trend: "+89%" },
        { tag: "BookTok", posts: 34500, trend: "+123%" },
        { tag: "CurrentlyReading", posts: 23400, trend: "+56%" },
      ],
      authors: [
        { id: 1, name: "Colleen Hoover", mentions: 34567, trend: "+67%" },
        { id: 2, name: "Stephen King", mentions: 23456, trend: "+34%" },
      ],
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setTrending(mockTrending[timeframe]);
      setLoading(false);
    }, 800);
  }, [timeframe]);

  const getTrendColor = (trend) => {
    const value = parseInt(trend);
    if (value > 50) return "trend-hot";
    if (value > 30) return "trend-warm";
    return "trend-cool";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading trending content...</p>
      </div>
    );
  }

  return (
    <div className={`trending-page ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="trending-header">
        <h1 className={`trending-title ${textAlign}`}>
          <FaFire className="fire-icon" />
          {t("trending.now") || "Trending Now"}
        </h1>
        <p className={`trending-subtitle ${textAlign}`}>
          {t("trending.description") || "Discover what's hot in the book community"}
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="timeframe-selector">
        <button 
          className={`timeframe-btn ${timeframe === "week" ? "active" : ""}`}
          onClick={() => setTimeframe("week")}
        >
          <FaClock /> This Week
        </button>
        <button 
          className={`timeframe-btn ${timeframe === "month" ? "active" : ""}`}
          onClick={() => setTimeframe("month")}
        >
          <FaClock /> This Month
        </button>
      </div>

      {/* Main Trending Grid */}
      <div className="trending-grid">
        {/* Trending Books */}
        <div className="trending-section trending-books">
          <div className="section-header">
            <FaBook className="section-icon" />
            <h2>Trending Books</h2>
          </div>
          <div className="trending-list">
            {trending.books.map((book, index) => (
              <div key={book.id} className={`trending-item rank-${index + 1}`}>
                <div className="trending-rank">
                  <span className="rank-number">#{index + 1}</span>
                  {index === 0 && <FaArrowUp className="rank-icon" />}
                </div>
                <div className="trending-content">
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                  </div>
                  <div className="trending-stats">
                    <span className="stat">
                      <FaComment /> {book.mentions.toLocaleString()} mentions
                    </span>
                    <span className={`trend ${getTrendColor(book.trend)}`}>
                      {book.trend}
                    </span>
                  </div>
                </div>
                <Link href={`/books/${book.id}`} className="view-link">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="trending-section trending-hashtags">
          <div className="section-header">
            <FaHashtag className="section-icon" />
            <h2>Trending Hashtags</h2>
          </div>
          <div className="hashtags-cloud">
            {trending.hashtags.map((hashtag, index) => (
              <div key={hashtag.tag} className={`hashtag-card size-${index + 1}`}>
                <span className="hashtag-name">#{hashtag.tag}</span>
                <div className="hashtag-stats">
                  <span className="stat">
                    <FaComment /> {hashtag.posts.toLocaleString()} posts
                  </span>
                  <span className={`trend ${getTrendColor(hashtag.trend)}`}>
                    {hashtag.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Authors Section */}
      <div className="trending-section trending-authors">
        <div className="section-header">
          <FaUser className="section-icon" />
          <h2>Trending Authors</h2>
        </div>
        <div className="authors-trending-grid">
          {trending.authors.map((author, index) => (
            <div key={author.id} className="author-trend-card">
              <div className="author-rank">{index + 1}</div>
              <div className="author-avatar">
                {author.avatar || <FaUser />}
              </div>
              <div className="author-info">
                <h4 className="author-name">{author.name}</h4>
                <div className="author-stats">
                  <span className="stat">
                    <FaEye /> {author.mentions.toLocaleString()} mentions
                  </span>
                  <span className={`trend ${getTrendColor(author.trend)}`}>
                    {author.trend}
                  </span>
                </div>
              </div>
              <button className="follow-author-btn">Follow</button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Discussions */}
      <div className="trending-section top-discussions">
        <div className="section-header">
          <FaFire className="section-icon" />
          <h2>Top Discussions</h2>
        </div>
        <div className="discussions-list">
          {[
            { id: 1, title: "Best books of 2024 so far", comments: 234, likes: 456 },
            { id: 2, title: "Underrated authors everyone should read", comments: 189, likes: 345 },
            { id: 3, title: "Books that changed your life", comments: 156, likes: 278 },
          ].map((discussion) => (
            <div key={discussion.id} className="discussion-card">
              <div className="discussion-content">
                <h4>{discussion.title}</h4>
                <div className="discussion-stats">
                  <span><FaComment /> {discussion.comments} comments</span>
                  <span><FaHeart /> {discussion.likes} likes</span>
                </div>
              </div>
              <button className="join-discussion">Join →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;