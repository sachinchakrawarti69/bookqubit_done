"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaHome, 
  FaHashtag, 
  FaBell, 
  FaEnvelope, 
  FaBookmark, 
  FaUser, 
  FaTwitter,
  FaSearch,
  FaPenAlt,
  FaCog,
  FaSignOutAlt,
  FaUserPlus,
  FaUsers,
  FaChartLine,
  FaListUl,
  FaRegBookmark
} from "react-icons/fa";
import { 
  MdExplore, 
  MdChat, 
  MdTrendingUp, 
  MdPerson, 
  MdNotifications, 
  MdEmail,
  MdBookmarkBorder
} from "react-icons/md";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Feed from "./Feed";
import { initialPosts, trendingTopics, whoToFollow, currentUserData } from "./Feed_Data";
import "./Slider.css";

const Slider = () => {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const isForestTheme = themeName === 'forest';

  useEffect(() => {
    // Load posts from localStorage or use initial data
    const savedPosts = localStorage.getItem("drift_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
    }
    
    // Load current user from localStorage or use default
    const savedUser = localStorage.getItem("drift_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser(currentUserData);
    }
    
    setIsLoading(false);
  }, []);

  // Save posts to localStorage when updated
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      localStorage.setItem("drift_posts", JSON.stringify(posts));
    }
  }, [posts, isLoading]);

  const handlePostUpdate = useCallback((postId, updates) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  }, []);

  const handleCreatePost = useCallback(() => {
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser || currentUserData,
      content: postContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      retweets: 0,
      liked: false,
      bookmarked: false,
      likeCount: 0,
      commentCount: 0,
      retweetCount: 0
    };

    setPosts(prev => [newPost, ...prev]);
    setPostContent("");
    setShowPostModal(false);
  }, [postContent, currentUser]);

  const menuItems = [
    { id: "home", label: "Home", icon: FaHome, href: "/drift" },
    { id: "explore", label: "Explore", icon: MdExplore, href: "/drift/explore" },
    { id: "notifications", label: "Notifications", icon: MdNotifications, href: "/drift/notifications", badge: 3 },
    { id: "messages", label: "Messages", icon: MdEmail, href: "/drift/messages" },
    { id: "bookmarks", label: "Bookmarks", icon: MdBookmarkBorder, href: "/drift/bookmarks" },
    { id: "profile", label: "Profile", icon: MdPerson, href: "/drift/profile" },
    { id: "lists", label: "Lists", icon: FaListUl, href: "/drift/lists" },
  ];

  if (isLoading) {
    return (
      <div className={`slider-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`slider-container ${isDarkMode ? 'dark' : 'light'} ${isForestTheme ? 'forest' : ''}`}>
      {/* Left Sidebar */}
      <div className="slider-left-sidebar">
        <div className="slider-logo">
          <FaTwitter className="logo-icon" />
          <span className="logo-text">Drift</span>
        </div>

        <nav className="slider-nav">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <button className="post-button" onClick={() => setShowPostModal(true)}>
          <FaPenAlt className="post-icon" />
          <span>Post</span>
        </button>

        <div className="user-profile-card">
          <img src={currentUser?.avatar} alt="Profile" className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{currentUser?.name}</div>
            <div className="user-username">{currentUser?.username}</div>
          </div>
          <button className="user-menu-icon">
            <FaCog />
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="slider-main-content">
        <div className="feed-header">
          <h2>{menuItems.find(item => item.id === activeTab)?.label || "Home"}</h2>
          <div className="feed-header-actions">
            <button className="header-action-btn">
              <MdTrendingUp />
            </button>
          </div>
        </div>

        <div className="create-post-prompt">
          <img src={currentUser?.avatar} alt="Your avatar" className="prompt-avatar" />
          <button className="prompt-button" onClick={() => setShowPostModal(true)}>
            What's happening in your reading journey?
          </button>
        </div>

        <Feed posts={posts} onPostUpdate={handlePostUpdate} currentUser={currentUser} />
      </div>

      {/* Right Sidebar */}
      <div className="slider-right-sidebar">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Drift" />
        </div>

        <div className="trending-section">
          <h3>Trending for you</h3>
          {trendingTopics.map((trend, index) => (
            <div key={index} className="trending-item">
              <div className="trending-topic">{trend.topic}</div>
              <div className="trending-stats">
                <span>{trend.posts} posts</span>
                <span className="trending-trend">{trend.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="who-to-follow-section">
          <h3>Who to follow</h3>
          {whoToFollow.map((person, index) => (
            <div key={index} className="follow-item">
              <img src={person.avatar} alt={person.name} className="follow-avatar" />
              <div className="follow-info">
                <div className="follow-name">{person.name}</div>
                <div className="follow-username">{person.username}</div>
                <div className="follow-stats">{person.followers} followers</div>
              </div>
              <button className="follow-button">
                <FaUserPlus /> Follow
              </button>
            </div>
          ))}
        </div>

        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">About</a>
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create a post</h3>
              <button className="close-modal" onClick={() => setShowPostModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="post-input-container">
                <img src={currentUser?.avatar} alt="Your avatar" className="post-input-avatar" />
                <textarea
                  className="post-textarea"
                  placeholder="What's happening in your reading journey?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows="4"
                  autoFocus
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="post-submit-btn" 
                onClick={handleCreatePost} 
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;