"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  FaHome, 
  FaHashtag, 
  FaBell, 
  FaEnvelope, 
  FaBookmark, 
  FaUser, 
  FaTwitter,
  FaHeart,
  FaRetweet,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaSearch,
  FaCamera,
  FaImage,
  FaSmile,
  FaCalendarAlt,
  FaChartBar,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
  FaRegUser,
  FaUsers,
  FaPenAlt,
  FaTimes,
  FaGlobe,
  FaLock,
  FaUserFriends
} from "react-icons/fa";
import { MdExplore, MdChat, MdTrendingUp, MdBookmarks, MdPerson, MdNotifications, MdEmail } from "react-icons/md";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import "./Slider.css";

const Slider = () => {
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const isForestTheme = themeName === 'forest';

  // Sample initial posts
  const initialPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Sarah+Johnson",
        role: "Bestselling Author",
        followers: "12.5K"
      },
      content: "Just finished writing Chapter 12 of my new novel! 📚 The journey has been incredible. Can't wait to share it with all of you! #AmWriting #NewBook",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      media: null,
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      author: {
        name: "BookLover Mike",
        username: "@mikereads",
        avatar: "https://ui-avatars.com/api/?background=10B981&color=fff&name=Mike+Reader",
        role: "Book Reviewer",
        followers: "8.2K"
      },
      content: "Just finished 'The Midnight Library' - what an emotional rollercoaster! 🎢 Highly recommend to anyone feeling lost in life. 5/5 stars! ⭐⭐⭐⭐⭐",
      timestamp: "5 hours ago",
      likes: 567,
      comments: 89,
      shares: 34,
      media: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
      liked: false,
      bookmarked: false
    },
    {
      id: 3,
      author: {
        name: "Emma Watson (Book Club)",
        username: "@emmabooks",
        avatar: "https://ui-avatars.com/api/?background=EF4444&color=fff&name=Emma+Watson",
        role: "Literary Influencer",
        followers: "45.3K"
      },
      content: "Our book club pick for this month is 'Project Hail Mary' by Andy Weir! 🚀 Join us for discussions every Thursday at 7PM EST. #BookClub #ScienceFiction",
      timestamp: "1 day ago",
      likes: 1234,
      comments: 234,
      shares: 567,
      media: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
      liked: false,
      bookmarked: false
    }
  ];

  useEffect(() => {
    // Load posts from localStorage or use initial
    const savedPosts = localStorage.getItem("drift_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
    }
    setIsLoading(false);
  }, []);

  // Save posts to localStorage when updated
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      localStorage.setItem("drift_posts", JSON.stringify(posts));
    }
  }, [posts, isLoading]);

  const handleLike = useCallback((postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          } 
        : post
    ));
  }, []);

  const handleBookmark = useCallback((postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked } 
        : post
    ));
  }, []);

  const handleCreatePost = useCallback(() => {
    if (!postContent.trim() && !selectedImage) return;

    const newPost = {
      id: Date.now(),
      author: {
        name: "Current User",
        username: "@currentuser",
        avatar: "https://ui-avatars.com/api/?background=6366F1&color=fff&name=Current+User",
        role: "Reader",
        followers: "1.2K"
      },
      content: postContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      media: selectedImage,
      liked: false,
      bookmarked: false
    };

    setPosts(prev => [newPost, ...prev]);
    setPostContent("");
    setSelectedImage(null);
    setShowPostModal(false);
  }, [postContent, selectedImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getActiveTabStyle = (isActive) => {
    if (isActive) {
      return {
        background: isForestTheme 
          ? 'linear-gradient(135deg, #059669, #10b981)'
          : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: 'white',
      };
    }
    return {
      color: isDarkMode ? '#9ca3af' : '#6b7280',
    };
  };

  const menuItems = [
    { id: "home", label: "Home", icon: FaHome, href: "/drift" },
    { id: "explore", label: "Explore", icon: MdExplore, href: "/drift/explore" },
    { id: "notifications", label: "Notifications", icon: MdNotifications, href: "/drift/notifications", badge: 3 },
    { id: "messages", label: "Messages", icon: MdEmail, href: "/drift/messages", badge: 2 },
    { id: "bookmarks", label: "Bookmarks", icon: MdBookmarks, href: "/drift/bookmarks" },
    { id: "profile", label: "Profile", icon: MdPerson, href: "/drift/profile" },
  ];

  const trendingTopics = [
    { topic: "#BookRecommendations", posts: "12.5K" },
    { topic: "#AmWriting", posts: "8.2K" },
    { topic: "#FantasyBooks", posts: "6.7K" },
    { topic: "#BookTwitter", posts: "5.4K" },
    { topic: "#ReadingChallenge", posts: "4.1K" },
  ];

  const whoToFollow = [
    { name: "Neil Gaiman", username: "@neilhimself", role: "Author", avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Neil+Gaiman" },
    { name: "Margaret Atwood", username: "@MargaretAtwood", role: "Author", avatar: "https://ui-avatars.com/api/?background=EC4899&color=fff&name=Margaret+Atwood" },
    { name: "BookTok", username: "@booktok", role: "Community", avatar: "https://ui-avatars.com/api/?background=F59E0B&color=fff&name=Book+Tok" },
  ];

  if (isLoading) {
    return (
      <div className={`slider-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="slider-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`slider-container ${isDarkMode ? 'dark' : 'light'} ${isForestTheme ? 'forest' : ''}`}>
      {/* Left Sidebar - Navigation */}
      <div className="slider-left-sidebar">
        <div className="slider-logo">
          <FaTwitter className="logo-icon" />
          <span className="logo-text">Drift</span>
        </div>

        <nav className="slider-nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              style={getActiveTabStyle(activeTab === item.id)}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </a>
          ))}
        </nav>

        <button 
          className="post-button"
          onClick={() => setShowPostModal(true)}
          style={{
            background: isForestTheme 
              ? 'linear-gradient(135deg, #059669, #10b981)'
              : 'linear-gradient(135deg, #2563eb, #1d4ed8)'
          }}
        >
          <FaPenAlt className="post-icon" />
          <span>Post</span>
        </button>

        <div className="user-profile-card">
          <img 
            src="https://ui-avatars.com/api/?background=6366F1&color=fff&name=Current+User" 
            alt="Profile" 
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">Current User</div>
            <div className="user-username">@currentuser</div>
          </div>
          <FaEllipsisH className="user-menu-icon" />
        </div>
      </div>

      {/* Main Content - Feed */}
      <div className="slider-main-content">
        <div className="feed-header">
          <h2>Home</h2>
          <div className="feed-header-actions">
            <MdTrendingUp className="trending-icon" />
          </div>
        </div>

        <div className="create-post-prompt">
          <img 
            src="https://ui-avatars.com/api/?background=6366F1&color=fff&name=Current+User" 
            alt="Your avatar" 
            className="prompt-avatar"
          />
          <button 
            className="prompt-button"
            onClick={() => setShowPostModal(true)}
          >
            What's happening in your reading journey?
          </button>
        </div>

        <div className="feed-posts">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                <div className="post-author-info">
                  <div className="post-author-name">{post.author.name}</div>
                  <div className="post-author-username">{post.author.username}</div>
                  <div className="post-role-badge">{post.author.role}</div>
                </div>
                <div className="post-timestamp">{post.timestamp}</div>
                <button className="post-more-btn">
                  <FaEllipsisH />
                </button>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
                {post.media && (
                  <div className="post-media">
                    <img src={post.media} alt="Post media" />
                  </div>
                )}
              </div>

              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>

              <div className="post-actions">
                <button 
                  className={`action-btn ${post.liked ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? <FaHeart /> : <FaRegHeart />}
                  <span>Like</span>
                </button>
                <button className="action-btn">
                  <FaRegComment />
                  <span>Comment</span>
                </button>
                <button className="action-btn">
                  <FaRetweet />
                  <span>Repost</span>
                </button>
                <button 
                  className={`action-btn ${post.bookmarked ? 'bookmarked' : ''}`}
                  onClick={() => handleBookmark(post.id)}
                >
                  {post.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  <span>Save</span>
                </button>
                <button className="action-btn">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Trends & Suggestions */}
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
              <div className="trending-posts">{trend.posts} posts</div>
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
                <div className="follow-role">{person.role}</div>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          ))}
        </div>

        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">About</a>
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create a post</h3>
              <button className="close-modal" onClick={() => setShowPostModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="post-input-container">
                <img 
                  src="https://ui-avatars.com/api/?background=6366F1&color=fff&name=Current+User" 
                  alt="Your avatar" 
                  className="post-input-avatar"
                />
                <textarea
                  className="post-textarea"
                  placeholder="What's happening in your reading journey?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows="4"
                />
              </div>

              {selectedImage && (
                <div className="selected-image-container">
                  <img src={selectedImage} alt="Selected" />
                  <button className="remove-image" onClick={() => setSelectedImage(null)}>
                    <FaTimes />
                  </button>
                </div>
              )}

              <div className="post-options">
                <button className="option-btn" onClick={() => fileInputRef.current.click()}>
                  <FaImage />
                  <span>Media</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button className="option-btn">
                  <FaSmile />
                  <span>Emoji</span>
                </button>
                <button className="option-btn">
                  <FaCalendarAlt />
                  <span>Schedule</span>
                </button>
                <button className="option-btn">
                  <FaChartBar />
                  <span>Analytics</span>
                </button>
                <div className="post-privacy">
                  <FaGlobe />
                  <span>Everyone can reply</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="post-submit-btn"
                onClick={handleCreatePost}
                disabled={!postContent.trim() && !selectedImage}
                style={{
                  background: (!postContent.trim() && !selectedImage) 
                    ? '#9ca3af' 
                    : (isForestTheme ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)'),
                  cursor: (!postContent.trim() && !selectedImage) ? 'not-allowed' : 'pointer'
                }}
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