"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaFire,
  FaUserPlus,
  FaHashtag,
  FaBook,
  FaUser,
  FaUsers,
  FaCompass,
  FaChartLine,
  FaCalendarAlt,
  FaQuoteLeft,
  FaArrowRight,
  FaStar,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import { GiWaves } from "react-icons/gi";
import "./DriftSidebar.css";

const DriftSidebar = () => {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { direction } = useRTL();
  const { t } = useLanguage();
  
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [following, setFollowing] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Mock data
  const mockTrendingTopics = [
    { id: 1, tag: "BookRecommendations", posts: 12500, trend: "+67%" },
    { id: 2, tag: "CurrentlyReading", posts: 8900, trend: "+45%" },
    { id: 3, tag: "BookReview", posts: 7600, trend: "+34%" },
    { id: 4, tag: "BookTok", posts: 5432, trend: "+89%" },
    { id: 5, tag: "AmReading", posts: 4321, trend: "+23%" },
  ];

  const mockSuggestedUsers = [
    { id: 1, name: "Stephen King", username: "@stephenking", avatar: "SK", followers: "1.2M", verified: true },
    { id: 2, name: "J.K. Rowling", username: "@jkrowling", avatar: "JR", followers: "987k", verified: true },
    { id: 3, name: "Colleen Hoover", username: "@colleenhoover", avatar: "CH", followers: "876k", verified: true },
    { id: 4, name: "Brandon Sanderson", username: "@brandsanderson", avatar: "BS", followers: "765k", verified: true },
  ];

  const mockTrendingBooks = [
    { id: 1, title: "Project Hail Mary", author: "Andy Weir", mentions: 12345, rating: 4.8 },
    { id: 2, title: "The Silent Patient", author: "Alex Michaelides", mentions: 9876, rating: 4.6 },
    { id: 3, title: "Atomic Habits", author: "James Clear", mentions: 7654, rating: 4.9 },
  ];

  useEffect(() => {
    setTimeout(() => {
      setTrendingTopics(mockTrendingTopics);
      setSuggestedUsers(mockSuggestedUsers);
      setTrendingBooks(mockTrendingBooks);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const getTrendColor = (trend) => {
    const value = parseInt(trend);
    if (value > 50) return "trend-hot";
    if (value > 30) return "trend-warm";
    return "trend-cool";
  };

  if (isLoading) {
    return (
      <aside className={`drift-sidebar ${isDarkMode ? "dark" : "light"}`}>
        <div className="sidebar-skeleton">
          <div className="skeleton-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
          <div className="skeleton-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-user"></div>
            <div className="skeleton-user"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`drift-sidebar ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      {/* Trending Topics Section */}
      <div className="sidebar-card trending-card">
        <div className="card-header">
          <FaFire className="card-icon trending-icon" />
          <h3 className="card-title">Trending Topics</h3>
        </div>
        <div className="trending-list">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="trending-item">
              <div className="trending-rank">
                <span className="rank-number">#{topic.id}</span>
              </div>
              <div className="trending-info">
                <Link href={`/drift/tag/${topic.tag.toLowerCase()}`} className="trending-tag">
                  <FaHashtag className="hashtag-icon" />
                  {topic.tag}
                </Link>
                <div className="trending-stats">
                  <span className="trending-posts">{topic.posts.toLocaleString()} drifts</span>
                  <span className={`trending-trend ${getTrendColor(topic.trend)}`}>
                    {topic.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/drift/trending" className="card-footer-link">
          See more trends <FaArrowRight className="link-icon" />
        </Link>
      </div>

      {/* Trending Books Section */}
      <div className="sidebar-card books-card">
        <div className="card-header">
          <FaBook className="card-icon books-icon" />
          <h3 className="card-title">Trending Books</h3>
        </div>
        <div className="books-list">
          {trendingBooks.map((book) => (
            <div key={book.id} className="book-item">
              <div className="book-rank">{book.id}</div>
              <div className="book-info">
                <Link href={`/books/${book.title.toLowerCase().replace(/\s+/g, "-")}`} className="book-title">
                  {book.title}
                </Link>
                <div className="book-meta">
                  <span className="book-author">by {book.author}</span>
                  <div className="book-rating">
                    <FaStar className="star-icon" />
                    <span>{book.rating}</span>
                  </div>
                </div>
                <div className="book-stats">
                  <FaEye className="stats-icon" />
                  <span>{book.mentions.toLocaleString()} mentions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/drift/books/trending" className="card-footer-link">
          Explore books <FaArrowRight className="link-icon" />
        </Link>
      </div>

      {/* Suggested Users Section */}
      <div className="sidebar-card users-card">
        <div className="card-header">
          <FaUserPlus className="card-icon users-icon" />
          <h3 className="card-title">Suggested for you</h3>
        </div>
        <div className="users-list">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-avatar-wrapper">
                <div className="user-avatar">{user.avatar}</div>
                {user.verified && <span className="verified-badge">✓</span>}
              </div>
              <div className="user-info">
                <Link href={`/drift/profile/${user.username.slice(1)}`} className="user-name">
                  {user.name}
                </Link>
                <div className="user-meta">
                  <span className="user-username">{user.username}</span>
                  <span className="user-followers">{user.followers} followers</span>
                </div>
              </div>
              <button 
                className={`follow-btn ${following[user.id] ? "following" : ""}`}
                onClick={() => handleFollow(user.id)}
              >
                {following[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
        <Link href="/drift/explore/people" className="card-footer-link">
          Discover more people <FaArrowRight className="link-icon" />
        </Link>
      </div>

      {/* What's Happening Section */}
      <div className="sidebar-card events-card">
        <div className="card-header">
          <FaCalendarAlt className="card-icon events-icon" />
          <h3 className="card-title">What's happening</h3>
        </div>
        <div className="events-list">
          <div className="event-item">
            <div className="event-icon">📚</div>
            <div className="event-info">
              <span className="event-title">Book Festival 2024</span>
              <span className="event-date">March 15-17, 2024</span>
            </div>
          </div>
          <div className="event-item">
            <div className="event-icon">🎙️</div>
            <div className="event-info">
              <span className="event-title">Author Live Chat</span>
              <span className="event-date">Tomorrow at 3 PM</span>
            </div>
          </div>
          <div className="event-item">
            <div className="event-icon">🏆</div>
            <div className="event-info">
              <span className="event-title">Reading Challenge</span>
              <span className="event-date">Ends in 5 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quote of the Day */}
      <div className="sidebar-card quote-card">
        <div className="quote-content">
          <FaQuoteLeft className="quote-icon" />
          <p className="quote-text">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </p>
          <p className="quote-author">- George R.R. Martin</p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="sidebar-footer">
        <div className="footer-links">
          <Link href="/drift/about">About</Link>
          <Link href="/drift/help">Help</Link>
          <Link href="/drift/privacy">Privacy</Link>
          <Link href="/drift/terms">Terms</Link>
        </div>
        <p className="copyright">© 2024 Drift by BookQubit</p>
      </div>
    </aside>
  );
};

export default DriftSidebar;