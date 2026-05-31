// src/app/[lang]/drift/search/page.jsx

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  HiSearch,
  HiX,
  HiUser,
  HiBookOpen,
  HiHashtag,
  HiSparkles,
  HiClock,
  HiTrendingUp,
  HiFilter,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";
import "./search.css";

export default function SearchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = params?.lang || "en";
  const inputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");
  const [activeTab, setActiveTab] = useState("top");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all", // all, users, drifts, hashtags
    sortBy: "relevance", // relevance, latest, most_liked
    dateRange: "anytime", // anytime, today, this_week, this_month
  });
  const [hashtags, setHashtags] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("drift_recent_searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Sample trending topics
  const sampleTrending = [
    { tag: "#AtomicHabits", posts: 1234, trending: true },
    { tag: "#MidnightLibrary", posts: 892, trending: true },
    { tag: "#BookRecommendations", posts: 2341, trending: false },
    { tag: "#ReadingChallenge", posts: 567, trending: true },
    { tag: "#SelfImprovement", posts: 1789, trending: false },
    { tag: "#FantasyBooks", posts: 2345, trending: false },
  ];

  // Sample hashtags
  const sampleHashtags = [
    { name: "#BookLovers", count: 15234 },
    { name: "#ReadingCommunity", count: 9876 },
    { name: "#BookReview", count: 7654 },
    { name: "#CurrentlyReading", count: 5432 },
    { name: "#Bookstagram", count: 12345 },
    { name: "#FictionBooks", count: 8765 },
    { name: "#NonFiction", count: 6543 },
    { name: "#ClassicLiterature", count: 4321 },
  ];

  // Sample search results
  const sampleResults = {
    users: [
      {
        id: 1,
        name: "Sarah Johnson",
        username: "@sarahreads",
        avatar: "https://ui-avatars.com/api/?background=0284c7&color=fff&name=SJ",
        verified: true,
        followers: 12345,
        bio: "Book lover | Reading enthusiast",
        isFollowing: false,
      },
      {
        id: 2,
        name: "Michael Chen",
        username: "@michaelreads",
        avatar: "https://ui-avatars.com/api/?background=10b981&color=fff&name=MC",
        verified: false,
        followers: 5678,
        bio: "Sharing my reading journey",
        isFollowing: true,
      },
      {
        id: 3,
        name: "Emma Watson",
        username: "@emmawatson",
        avatar: "https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=EW",
        verified: true,
        followers: 89234,
        bio: "Actor | Reader | Book club host",
        isFollowing: false,
      },
    ],
    drifts: [
      {
        id: 1,
        user: {
          name: "Sarah Johnson",
          username: "@sarahreads",
          avatar: "https://ui-avatars.com/api/?background=0284c7&color=fff&name=SJ",
          verified: true,
        },
        content:
          "Just finished reading 'Atomic Habits' by James Clear. Absolutely life-changing! The concept of small habits leading to remarkable results is so powerful. Highly recommend to everyone! 📚✨",
        image: null,
        timestamp: "2 hours ago",
        likes: 234,
        comments: 45,
        shares: 12,
        hashtags: ["#AtomicHabits", "#SelfImprovement"],
      },
      {
        id: 2,
        user: {
          name: "David Kim",
          username: "@davidk",
          avatar: "https://ui-avatars.com/api/?background=ef4444&color=fff&name=DK",
          verified: false,
        },
        content:
          "Looking for book recommendations! What's everyone reading this month? 📖",
        image: null,
        timestamp: "1 day ago",
        likes: 567,
        comments: 89,
        shares: 34,
        hashtags: ["#BookRecommendations", "#CurrentlyReading"],
      },
    ],
    hashtags: [
      { name: "#AtomicHabits", count: 15234, trending: true },
      { name: "#BookRecommendations", count: 9876, trending: false },
      { name: "#ReadingChallenge", count: 5432, trending: true },
    ],
  };

  useEffect(() => {
    if (sampleTrending) {
      setTrendingTopics(sampleTrending);
    }
    if (sampleHashtags) {
      setHashtags(sampleHashtags);
    }
  }, []);

  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("drift_recent_searches", JSON.stringify(updated));
  };

  const handleSearch = useCallback(
    async (query) => {
      if (!query.trim()) return;

      setLoading(true);
      saveToRecentSearches(query);

      // Update URL with search query
      const url = new URL(window.location.href);
      url.searchParams.set("q", query);
      router.push(url.pathname + url.search);

      // Simulate API call
      setTimeout(() => {
        // Filter results based on query and filters
        let results = { ...sampleResults };

        if (filters.type !== "all") {
          // Filter by type logic here
        }

        setSearchResults(results);
        setLoading(false);
      }, 500);
    },
    [filters, router]
  );

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
    inputRef.current?.focus();

    // Clear URL
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    router.push(url.pathname);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("drift_recent_searches");
  };

  const removeRecentSearch = (query) => {
    const updated = recentSearches.filter((s) => s !== query);
    setRecentSearches(updated);
    localStorage.setItem("drift_recent_searches", JSON.stringify(updated));
  };

  const handleFollow = (userId) => {
    // Handle follow logic
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="search-page" dir={lang === "ur" || lang === "ar" ? "rtl" : "ltr"}>
      {/* Search Header */}
      <div className="search-header">
        <div className="search-input-wrapper">
          <HiSearch className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for users, drifts, hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            className="search-input"
            autoFocus
          />
          {searchQuery && (
            <button onClick={clearSearch} className="search-clear">
              <HiX />
            </button>
          )}
        </div>
        <button
          className={`filter-btn ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiFilter />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Content Type</label>
            <div className="filter-options">
              <button
                className={`filter-option ${filters.type === "all" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, type: "all" })}
              >
                All
              </button>
              <button
                className={`filter-option ${filters.type === "users" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, type: "users" })}
              >
                Users
              </button>
              <button
                className={`filter-option ${filters.type === "drifts" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, type: "drifts" })}
              >
                Drifts
              </button>
              <button
                className={`filter-option ${filters.type === "hashtags" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, type: "hashtags" })}
              >
                Hashtags
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <div className="filter-options">
              <button
                className={`filter-option ${filters.sortBy === "relevance" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, sortBy: "relevance" })}
              >
                Relevance
              </button>
              <button
                className={`filter-option ${filters.sortBy === "latest" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, sortBy: "latest" })}
              >
                Latest
              </button>
              <button
                className={`filter-option ${filters.sortBy === "most_liked" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, sortBy: "most_liked" })}
              >
                Most Liked
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Date Range</label>
            <div className="filter-options">
              <button
                className={`filter-option ${filters.dateRange === "anytime" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, dateRange: "anytime" })}
              >
                Anytime
              </button>
              <button
                className={`filter-option ${filters.dateRange === "today" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, dateRange: "today" })}
              >
                Today
              </button>
              <button
                className={`filter-option ${filters.dateRange === "this_week" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, dateRange: "this_week" })}
              >
                This Week
              </button>
              <button
                className={`filter-option ${filters.dateRange === "this_month" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, dateRange: "this_month" })}
              >
                This Month
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && searchResults && (
        <>
          {/* Tabs */}
          <div className="search-tabs">
            <button
              className={`tab-btn ${activeTab === "top" ? "active" : ""}`}
              onClick={() => setActiveTab("top")}
            >
              <HiSparkles />
              <span>Top</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <HiUser />
              <span>Users</span>
              {searchResults.users?.length > 0 && (
                <span className="tab-count">{searchResults.users.length}</span>
              )}
            </button>
            <button
              className={`tab-btn ${activeTab === "drifts" ? "active" : ""}`}
              onClick={() => setActiveTab("drifts")}
            >
              <HiBookOpen />
              <span>Drifts</span>
              {searchResults.drifts?.length > 0 && (
                <span className="tab-count">{searchResults.drifts.length}</span>
              )}
            </button>
            <button
              className={`tab-btn ${activeTab === "hashtags" ? "active" : ""}`}
              onClick={() => setActiveTab("hashtags")}
            >
              <HiHashtag />
              <span>Hashtags</span>
              {searchResults.hashtags?.length > 0 && (
                <span className="tab-count">{searchResults.hashtags.length}</span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="search-loading">
              <div className="search-spinner"></div>
              <p>Searching...</p>
            </div>
          ) : (
            <div className="search-results">
              {activeTab === "top" && (
                <div className="top-results">
                  {/* Users Section */}
                  {searchResults.users?.slice(0, 2).map((user) => (
                    <div key={user.id} className="result-user">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <div className="user-name">
                          {user.name}
                          {user.verified && <span className="verified-badge">✓</span>}
                        </div>
                        <div className="user-username">{user.username}</div>
                        <div className="user-bio">{user.bio}</div>
                        <div className="user-meta">
                          {formatNumber(user.followers)} followers
                        </div>
                      </div>
                      <button
                        className={`follow-user-btn ${user.isFollowing ? "following" : ""}`}
                        onClick={() => handleFollow(user.id)}
                      >
                        {user.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}

                  {/* Drifts Section */}
                  {searchResults.drifts?.slice(0, 2).map((drift) => (
                    <div key={drift.id} className="result-drift">
                      <div className="drift-header">
                        <img
                          src={drift.user.avatar}
                          alt={drift.user.name}
                          className="drift-avatar"
                        />
                        <div className="drift-user">
                          <div className="drift-user-name">
                            {drift.user.name}
                            {drift.user.verified && (
                              <span className="verified-badge">✓</span>
                            )}
                          </div>
                          <div className="drift-username">{drift.user.username}</div>
                        </div>
                      </div>
                      <p className="drift-content">{drift.content}</p>
                      {drift.hashtags && (
                        <div className="drift-hashtags">
                          {drift.hashtags.map((tag, idx) => (
                            <span key={idx} className="hashtag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Hashtags Section */}
                  {searchResults.hashtags?.slice(0, 2).map((tag, idx) => (
                    <div key={idx} className="result-hashtag">
                      <div className="hashtag-icon">
                        <HiHashtag />
                      </div>
                      <div className="hashtag-info">
                        <div className="hashtag-name">{tag.name}</div>
                        <div className="hashtag-count">
                          {formatNumber(tag.count)} posts
                          {tag.trending && (
                            <span className="trending-badge">
                              <HiTrendingUp /> Trending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {searchResults.users?.length === 0 &&
                    searchResults.drifts?.length === 0 &&
                    searchResults.hashtags?.length === 0 && (
                      <div className="no-results">
                        <HiSearch className="no-results-icon" />
                        <h3>No results found</h3>
                        <p>Try searching for something else</p>
                      </div>
                    )}
                </div>
              )}

              {activeTab === "users" && (
                <div className="users-results">
                  {searchResults.users?.map((user) => (
                    <div key={user.id} className="result-user">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <div className="user-name">
                          {user.name}
                          {user.verified && <span className="verified-badge">✓</span>}
                        </div>
                        <div className="user-username">{user.username}</div>
                        <div className="user-bio">{user.bio}</div>
                        <div className="user-meta">
                          {formatNumber(user.followers)} followers
                        </div>
                      </div>
                      <button
                        className={`follow-user-btn ${user.isFollowing ? "following" : ""}`}
                        onClick={() => handleFollow(user.id)}
                      >
                        {user.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}
                  {searchResults.users?.length === 0 && (
                    <div className="no-results">
                      <HiUser className="no-results-icon" />
                      <h3>No users found</h3>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "drifts" && (
                <div className="drifts-results">
                  {searchResults.drifts?.map((drift) => (
                    <div key={drift.id} className="result-drift-full">
                      <div className="drift-header">
                        <img
                          src={drift.user.avatar}
                          alt={drift.user.name}
                          className="drift-avatar"
                        />
                        <div className="drift-user">
                          <div className="drift-user-name">
                            {drift.user.name}
                            {drift.user.verified && (
                              <span className="verified-badge">✓</span>
                            )}
                          </div>
                          <div className="drift-username">{drift.user.username}</div>
                          <div className="drift-time">{drift.timestamp}</div>
                        </div>
                      </div>
                      <p className="drift-content">{drift.content}</p>
                      {drift.hashtags && (
                        <div className="drift-hashtags">
                          {drift.hashtags.map((tag, idx) => (
                            <span key={idx} className="hashtag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="drift-stats">
                        <span>❤️ {formatNumber(drift.likes)}</span>
                        <span>💬 {formatNumber(drift.comments)}</span>
                        <span>🔄 {formatNumber(drift.shares)}</span>
                      </div>
                    </div>
                  ))}
                  {searchResults.drifts?.length === 0 && (
                    <div className="no-results">
                      <HiBookOpen className="no-results-icon" />
                      <h3>No drifts found</h3>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "hashtags" && (
                <div className="hashtags-results">
                  {searchResults.hashtags?.map((tag, idx) => (
                    <div key={idx} className="result-hashtag-full">
                      <div className="hashtag-icon">
                        <HiHashtag />
                      </div>
                      <div className="hashtag-info">
                        <div className="hashtag-name">{tag.name}</div>
                        <div className="hashtag-count">
                          {formatNumber(tag.count)} posts
                        </div>
                      </div>
                      {tag.trending && (
                        <div className="trending-indicator">
                          <HiTrendingUp /> Trending
                        </div>
                      )}
                    </div>
                  ))}
                  {searchResults.hashtags?.length === 0 && (
                    <div className="no-results">
                      <HiHashtag className="no-results-icon" />
                      <h3>No hashtags found</h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Initial State - No Search Yet */}
      {!searchQuery && !searchResults && (
        <div className="search-initial">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="section-header">
                <h3>
                  <HiClock /> Recent Searches
                </h3>
                <button onClick={clearRecentSearches} className="clear-all">
                  Clear All
                </button>
              </div>
              <div className="recent-list">
                {recentSearches.map((query, idx) => (
                  <div
                    key={idx}
                    className="recent-item"
                    onClick={() => {
                      setSearchQuery(query);
                      handleSearch(query);
                    }}
                  >
                    <HiSearch />
                    <span>{query}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(query);
                      }}
                      className="remove-recent"
                    >
                      <HiX />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Topics */}
          <div className="trending-topics">
            <div className="section-header">
              <h3>
                <HiTrendingUp /> Trending on Drift
              </h3>
            </div>
            <div className="trending-list">
              {trendingTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="trending-item"
                  onClick={() => {
                    setSearchQuery(topic.tag);
                    handleSearch(topic.tag);
                  }}
                >
                  <span className="trending-rank">#{idx + 1}</span>
                  <div className="trending-info">
                    <div className="trending-tag">{topic.tag}</div>
                    <div className="trending-posts">
                      {formatNumber(topic.posts)} posts
                    </div>
                  </div>
                  {topic.trending && (
                    <div className="trending-hot">
                      <HiTrendingUp /> Trending
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Popular Hashtags */}
          <div className="popular-hashtags">
            <div className="section-header">
              <h3>
                <HiHashtag /> Popular Hashtags
              </h3>
            </div>
            <div className="hashtags-grid">
              {hashtags.map((tag, idx) => (
                <div
                  key={idx}
                  className="hashtag-chip"
                  onClick={() => {
                    setSearchQuery(tag.name);
                    handleSearch(tag.name);
                  }}
                >
                  {tag.name}
                  <span className="hashtag-count">{formatNumber(tag.count)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}