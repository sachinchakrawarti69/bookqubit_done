"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { 
  FaUserPlus, 
  FaUserCheck, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaLink, 
  FaStar, 
  FaBook,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";

const AuthorsPage = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { direction, textAlign } = useRTL();
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mock authors data
  const mockAuthors = [
    {
      id: 1,
      name: "Stephen King",
      genre: "Horror/Thriller",
      bio: "Master of horror and suspense, author of over 60 novels including 'The Shining', 'It', and 'The Stand'.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      followers: 1234567,
      books: 65,
      rating: 4.8,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
    {
      id: 2,
      name: "J.K. Rowling",
      genre: "Fantasy",
      bio: "Creator of the Harry Potter universe, one of the best-selling authors in history.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      followers: 987654,
      books: 22,
      rating: 4.9,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
    {
      id: 3,
      name: "Colleen Hoover",
      genre: "Romance",
      bio: "New York Times bestselling author known for emotional and gripping romance novels.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      followers: 876543,
      books: 24,
      rating: 4.7,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
    {
      id: 4,
      name: "Brandon Sanderson",
      genre: "Fantasy",
      bio: "Epic fantasy author known for the Mistborn series and finishing The Wheel of Time.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      followers: 765432,
      books: 35,
      rating: 4.9,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
    {
      id: 5,
      name: "Chimamanda Ngozi Adichie",
      genre: "Literary Fiction",
      bio: "Award-winning author of 'Americanah' and 'Half of a Yellow Sun'.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      followers: 654321,
      books: 8,
      rating: 4.8,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
    {
      id: 6,
      name: "Yuval Noah Harari",
      genre: "Non-Fiction",
      bio: "Historian and author of the bestselling 'Sapiens: A Brief History of Humankind'.",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      followers: 543210,
      books: 5,
      rating: 4.7,
      verified: true,
      social: { twitter: "#", instagram: "#", facebook: "#", website: "#" },
    },
  ];

  const genres = ["all", ...new Set(mockAuthors.map(a => a.genre))];

  useEffect(() => {
    setTimeout(() => {
      setAuthors(mockAuthors);
      setFilteredAuthors(mockAuthors);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter authors based on search and genre
  useEffect(() => {
    let filtered = [...authors];
    
    if (searchTerm) {
      filtered = filtered.filter(author => 
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedGenre !== "all") {
      filtered = filtered.filter(author => author.genre === selectedGenre);
    }
    
    setFilteredAuthors(filtered);
  }, [searchTerm, selectedGenre, authors]);

  const handleFollow = (authorId) => {
    setFollowing(prev => ({
      ...prev,
      [authorId]: !prev[authorId]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= fullStars ? "filled" : "empty"}`}
          size={12}
        />
      );
    }
    return stars;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading authors...</p>
        <style jsx>{`
          .loading-container {
            text-align: center;
            padding: 60px 20px;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid ${isDarkMode ? "#333" : "#e0e0e0"};
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="authors-page" dir={direction}>
      {/* Header */}
      <div className="authors-header">
        <h1 className={`authors-title ${textAlign}`}>
          {t("authors.discover") || "Discover Amazing Authors"}
        </h1>
        <p className={`authors-subtitle ${textAlign}`}>
          {t("authors.follow") || "Follow your favorite authors and never miss an update"}
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search authors by name, genre, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <FaTimes />
            </button>
          )}
        </div>
        
        <button 
          className={`filter-toggle ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filter
        </button>
      </div>

      {/* Genre Filters */}
      <div className={`genre-filters ${showFilters || !isMobile ? "show" : ""}`}>
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-chip ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre === "all" ? "All Authors" : genre}
          </button>
        ))}
        {(searchTerm || selectedGenre !== "all") && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="authors-stats">
        <div className="stat-card">
          <span className="stat-value">{filteredAuthors.length}</span>
          <span className="stat-label">Authors Found</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {filteredAuthors.reduce((sum, author) => sum + author.books, 0).toLocaleString()}
          </span>
          <span className="stat-label">Total Books</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {(filteredAuthors.reduce((sum, author) => sum + author.followers, 0) / 1000000).toFixed(1)}M
          </span>
          <span className="stat-label">Combined Followers</span>
        </div>
      </div>

      {/* Authors Grid */}
      {filteredAuthors.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No authors found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button className="reset-btn" onClick={clearFilters}>Reset Filters</button>
        </div>
      ) : (
        <div className="authors-grid">
          {filteredAuthors.map((author) => (
            <div key={author.id} className={`author-card ${isDarkMode ? "dark" : "light"}`}>
              <div className="author-card-header">
                <div className="author-avatar-wrapper">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} className="author-avatar" />
                  ) : (
                    <div className="author-avatar-placeholder">
                      {author.name.charAt(0)}
                    </div>
                  )}
                  {author.verified && (
                    <span className="verified-badge" title="Verified Author">
                      ✓
                    </span>
                  )}
                </div>
                <button 
                  className={`follow-btn ${following[author.id] ? "following" : ""}`}
                  onClick={() => handleFollow(author.id)}
                >
                  {following[author.id] ? (
                    <><FaUserCheck /> Following</>
                  ) : (
                    <><FaUserPlus /> Follow</>
                  )}
                </button>
              </div>

              <div className="author-card-body">
                <h3 className="author-name">{author.name}</h3>
                <p className="author-genre">{author.genre}</p>
                <p className="author-bio">{author.bio}</p>
                
                <div className="author-stats">
                  <div className="author-stat">
                    <FaBook /> <span>{author.books} books</span>
                  </div>
                  <div className="author-stat">
                    <FaStar className="star-filled" /> <span>{author.rating.toFixed(1)}</span>
                  </div>
                  <div className="author-stat">
                    <FaUserPlus /> <span>{author.followers.toLocaleString()}</span>
                  </div>
                </div>

                <div className="author-rating">
                  {renderStars(author.rating)}
                </div>

                <div className="author-social">
                  {author.social.twitter && (
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  )}
                  {author.social.instagram && (
                    <a href={author.social.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  )}
                  {author.social.facebook && (
                    <a href={author.social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                  )}
                  {author.social.website && (
                    <a href={author.social.website} target="_blank" rel="noopener noreferrer"><FaLink /></a>
                  )}
                </div>
              </div>

              <div className="author-card-footer">
                <Link href={`/authors/${author.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .authors-page {
          width: 100%;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .authors-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .authors-title {
          font-size: clamp(24px, 5vw, 32px);
          font-weight: bold;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .authors-subtitle {
          font-size: clamp(13px, 4vw, 16px);
          opacity: 0.7;
        }

        /* Search and Filter Bar */
        .search-filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          position: relative;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 14px;
        }

        .search-input {
          width: 100%;
          padding: 12px 15px 12px 40px;
          border-radius: 40px;
          border: 1px solid;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .light .search-input {
          background: white;
          border-color: #e5e7eb;
          color: #111827;
        }

        .dark .search-input {
          background: #1f2937;
          border-color: #374151;
          color: #f9fafb;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }

        .clear-search {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
        }

        .filter-toggle {
          display: none;
          padding: 12px 20px;
          border-radius: 40px;
          border: 1px solid;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          gap: 8px;
          align-items: center;
        }

        .light .filter-toggle {
          border-color: #e5e7eb;
          color: #374151;
        }

        .dark .filter-toggle {
          border-color: #374151;
          color: #9ca3af;
        }

        .filter-toggle.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        /* Genre Filters */
        .genre-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .genre-chip {
          padding: 8px 16px;
          border-radius: 40px;
          border: 1px solid;
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .light .genre-chip {
          border-color: #e5e7eb;
          color: #6b7280;
        }

        .dark .genre-chip {
          border-color: #374151;
          color: #9ca3af;
        }

        .genre-chip:hover {
          transform: translateY(-2px);
        }

        .genre-chip.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: white;
        }

        .clear-filters-btn {
          padding: 8px 16px;
          border-radius: 40px;
          border: none;
          background: #ef4444;
          color: white;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .clear-filters-btn:hover {
          transform: translateY(-2px);
        }

        /* Stats */
        .authors-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          text-align: center;
          padding: 20px;
          border-radius: 15px;
          background: ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};
        }

        .stat-value {
          display: block;
          font-size: clamp(20px, 4vw, 28px);
          font-weight: bold;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.7;
        }

        /* Authors Grid */
        .authors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .author-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: ${isDarkMode ? "#1a1a2e" : "#ffffff"};
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .author-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .author-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .author-avatar-wrapper {
          position: relative;
        }

        .author-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid white;
          object-fit: cover;
        }

        .author-avatar-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid white;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          color: white;
        }

        .verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          background: #4facfe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          border: 2px solid white;
        }

        .follow-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          background: white;
          color: #667eea;
        }

        .follow-btn.following {
          background: #10b981;
          color: white;
        }

        .author-card-body {
          padding: 20px;
        }

        .author-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .author-genre {
          font-size: 12px;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .author-bio {
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .author-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .author-stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }

        .author-rating {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .star.filled {
          color: #fbbf24;
        }

        .star.empty {
          color: #d1d5db;
        }

        .author-social {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .author-social a {
          font-size: 16px;
          transition: color 0.2s ease;
        }

        .light .author-social a {
          color: #6b7280;
        }

        .dark .author-social a {
          color: #9ca3af;
        }

        .author-social a:hover {
          color: #667eea;
        }

        .author-card-footer {
          padding: 16px 20px;
          border-top: 1px solid ${isDarkMode ? "#333" : "#e0e0e0"};
        }

        .author-card-footer a {
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          color: #667eea;
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 60px 20px;
        }

        .no-results-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .no-results h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .no-results p {
          font-size: 14px;
          opacity: 0.7;
          margin-bottom: 20px;
        }

        .reset-btn {
          padding: 10px 24px;
          border-radius: 40px;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          cursor: pointer;
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .authors-page {
            padding: 16px;
          }
          
          .filter-toggle {
            display: flex;
          }
          
          .genre-filters {
            display: none;
          }
          
          .genre-filters.show {
            display: flex;
          }
          
          .authors-stats {
            gap: 12px;
          }
          
          .stat-card {
            padding: 15px;
          }
          
          .authors-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .author-name {
            font-size: 16px;
          }
          
          .author-bio {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .authors-stats {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .stat-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
          }
          
          .stat-value {
            font-size: 18px;
            margin-bottom: 0;
          }
          
          .search-filter-bar {
            flex-direction: column;
          }
          
          .filter-toggle {
            justify-content: center;
          }
          
          .author-card-header {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          
          .follow-btn {
            width: 100%;
            justify-content: center;
          }
          
          .author-stats {
            justify-content: center;
          }
          
          .author-rating {
            justify-content: center;
          }
          
          .author-social {
            justify-content: center;
          }
          
          .author-card-footer {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthorsPage;