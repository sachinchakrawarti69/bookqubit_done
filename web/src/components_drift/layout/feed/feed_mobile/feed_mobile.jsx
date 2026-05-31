// src/components_drift/layout/feed/feed_mobile/feed_mobile.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import { HiHeart, HiChatAlt2, HiShare, HiBookmark, HiDotsHorizontal } from "react-icons/hi";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import "./feed_mobile.css";

export default function FeedMobile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [activeTab, setActiveTab] = useState("forYou");
  const feedRef = useRef(null);

  // Sample feed data (same as desktop)
  const samplePosts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahreads",
        avatar: "https://ui-avatars.com/api/?background=0284c7&color=fff&name=SJ",
        verified: true,
      },
      content: "Just finished reading 'The Midnight Library' by Matt Haig. What an incredible journey through parallel lives! This book made me reflect on all the choices I've made. Highly recommended for anyone who's ever wondered 'what if?' 📚✨",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
      timestamp: "2h",
      likes: 234,
      comments: 45,
      shares: 12,
      bookmarks: 67,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        username: "@michaelreads",
        avatar: "https://ui-avatars.com/api/?background=10b981&color=fff&name=MC",
        verified: false,
      },
      content: "Atomic Habits by James Clear - Chapter 4 completely changed my perspective. Small changes lead to remarkable results! Who else is on this journey? 💪",
      image: null,
      timestamp: "5h",
      likes: 567,
      comments: 89,
      shares: 34,
      bookmarks: 123,
    },
    {
      id: 3,
      user: {
        name: "Emma Watson",
        username: "@emmawatson",
        avatar: "https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=EW",
        verified: true,
      },
      content: "Starting a new book club! First pick: 'Project Hail Mary' by Andy Weir. Join us every Wednesday at 7 PM EST. Let's explore the universe together! 🚀📖",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
      timestamp: "1d",
      likes: 1234,
      comments: 234,
      shares: 89,
      bookmarks: 456,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="feed-mobile-loading">
        <div className="feed-spinner"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  return (
    <div className="feed-mobile" ref={feedRef}>
      {/* Sticky Header */}
      <div className="feed-mobile-header">
        <div className="feed-tabs">
          <button 
            className={`feed-tab ${activeTab === 'forYou' ? 'active' : ''}`}
            onClick={() => setActiveTab('forYou')}
          >
            For You
          </button>
          <button 
            className={`feed-tab ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="feed-mobile-posts">
        {posts.map((post) => (
          <article key={post.id} className="feed-mobile-post">
            {/* Post Header */}
            <div className="post-header">
              <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
              <div className="post-user-info">
                <div className="post-user-name">
                  {post.user.name}
                  {post.user.verified && (
                    <span className="verified-badge">✓</span>
                  )}
                </div>
                <div className="post-user-meta">
                  <span>{post.user.username}</span>
                  <span>·</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
              <button className="post-menu-btn">
                <HiDotsHorizontal />
              </button>
            </div>

            {/* Post Content */}
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post" />
                </div>
              )}
            </div>

            {/* Post Stats */}
            <div className="post-stats">
              <span>{formatNumber(post.likes + (likedPosts[post.id] ? 1 : 0))} likes</span>
              <span>{formatNumber(post.comments)} comments</span>
              <span>{formatNumber(post.shares)} shares</span>
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <button 
                className={`action-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                {likedPosts[post.id] ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <span>Like</span>
              </button>
              
              <button className="action-btn">
                <HiChatAlt2 />
                <span>Comment</span>
              </button>
              
              <button className="action-btn">
                <HiShare />
                <span>Share</span>
              </button>
              
              <button className="action-btn">
                <HiBookmark />
                <span>Save</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Pull to Refresh Indicator */}
      <div className="pull-to-refresh">
        <span>↓ Pull to refresh</span>
      </div>
    </div>
  );
}