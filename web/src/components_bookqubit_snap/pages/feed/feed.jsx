"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaBookmark, 
  FaUser, 
  FaBook, 
  FaImage, 
  FaVideo, 
  FaPoll, 
  FaSmile,
  FaRegClock,
  FaEllipsisH,
} from "react-icons/fa";
import "./feed.css";

const FeedPage = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { direction, textAlign } = useRTL();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Mock posts data
  const mockPosts = [
    // ... your existing mock posts data
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleShare = (postId) => {
    alert("Share this post with your friends!");
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        type: "reader",
        user: {
          name: "You",
          avatar: null,
          username: "@you",
          role: "reader",
          followers: 0,
          joined: new Date().toISOString(),
        },
        content: newPost,
        image: selectedImage,
        book: null,
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: "Just now",
        liked: false,
        saved: false,
      };
      setPosts([newPostObj, ...posts]);
      setNewPost("");
      setSelectedImage(null);
    }
  };

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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">½</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  return (
    <div className={`feed-page ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      {/* Create Post Card */}
      <div className="create-post-card">
        <div className="create-post-header">
          <div className="user-avatar-small">
            <FaUser />
          </div>
          <textarea
            placeholder="Share your reading journey... What are you reading today?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className={`post-input ${textAlign}`}
            rows="3"
          />
        </div>
        
        {selectedImage && (
          <div className="selected-image-preview">
            <img src={selectedImage} alt="Preview" />
            <button onClick={() => setSelectedImage(null)} className="remove-image">
              ✕
            </button>
          </div>
        )}
        
        <div className="create-post-actions">
          <label className="action-btn">
            <FaImage /> Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
          <button className="action-btn"><FaVideo /> Video</button>
          <button className="action-btn"><FaPoll /> Poll</button>
          <button className="action-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FaSmile /> Emoji
          </button>
          <button className="post-submit-btn" onClick={handleCreatePost}>
            Post
          </button>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="feed-posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Post Header */}
            <div className="post-header">
              <div className="post-user-info">
                <div className={`user-avatar ${post.user.role}`}>
                  {post.user.avatar ? (
                    <img src={post.user.avatar} alt={post.user.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="user-details">
                  <div className="user-name-row">
                    <span className="user-name">{post.user.name}</span>
                    {post.user.verified && <span className="verified-badge">✓</span>}
                    <span className="user-role">{post.user.role}</span>
                  </div>
                  <span className="user-username">{post.user.username}</span>
                  <span className="post-time">
                    <FaRegClock /> {post.timestamp}
                  </span>
                </div>
              </div>
              <button className="post-menu">
                <FaEllipsisH />
              </button>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p className={textAlign}>{post.content}</p>
              
              {post.book && (
                <div className="book-tag">
                  <div className="book-tag-cover">
                    {post.book.cover ? (
                      <img src={post.book.cover} alt={post.book.title} />
                    ) : (
                      <FaBook />
                    )}
                  </div>
                  <div className="book-tag-info">
                    <span className="book-title">{post.book.title}</span>
                    <span className="book-author">by {post.book.author}</span>
                    <div className="book-rating">
                      {renderStars(post.book.rating)}
                    </div>
                  </div>
                </div>
              )}
              
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post" />
                </div>
              )}
            </div>

            {/* Post Stats */}
            <div className="post-stats">
              <span><FaHeart /> {post.likes.toLocaleString()}</span>
              <span><FaComment /> {post.comments.length}</span>
              <span><FaShare /> {post.shares.toLocaleString()}</span>
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <button 
                className={`action-like ${post.liked ? "liked" : ""}`}
                onClick={() => handleLike(post.id)}
              >
                <FaHeart /> {post.liked ? "Liked" : "Like"}
              </button>
              <button className="action-comment">
                <FaComment /> Comment
              </button>
              <button 
                className={`action-save ${post.saved ? "saved" : ""}`}
                onClick={() => handleSave(post.id)}
              >
                <FaBookmark /> {post.saved ? "Saved" : "Save"}
              </button>
              <button className="action-share" onClick={() => handleShare(post.id)}>
                <FaShare /> Share
              </button>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="comments-section">
                <div className="comments-header">
                  <span>Top comments</span>
                </div>
                {post.comments.slice(0, 2).map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      <FaUser />
                    </div>
                    <div className="comment-content">
                      <div className="comment-user">{comment.user}</div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-time">{comment.timestamp}</div>
                    </div>
                    <button className="comment-like">
                      <FaHeart />
                    </button>
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <button className="view-more-comments">
                    View all {post.comments.length} comments
                  </button>
                )}
              </div>
            )}

            {/* Add Comment */}
            <div className="add-comment">
              <div className="comment-avatar-small">
                <FaUser />
              </div>
              <input 
                type="text" 
                placeholder="Write a comment..." 
                className="comment-input"
              />
              <button className="comment-submit">
                <FaSmile />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;