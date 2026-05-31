// src/components_drift/layout/feed/feed_desktop/feed_desktop.jsx

"use client";

import { useState, useEffect } from "react";
import { HiHeart, HiChatAlt2, HiShare, HiBookmark, HiDotsHorizontal, HiFlag } from "react-icons/hi";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import "./feed_desktop.css";

export default function FeedDesktop() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});

  // Sample feed data
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
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      bookmarks: 67,
      tags: ["#BookReview", "#TheMidnightLibrary", "#MattHaig"],
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
      timestamp: "5 hours ago",
      likes: 567,
      comments: 89,
      shares: 34,
      bookmarks: 123,
      tags: ["#AtomicHabits", "#SelfImprovement", "#JamesClear"],
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
      timestamp: "1 day ago",
      likes: 1234,
      comments: 234,
      shares: 89,
      bookmarks: 456,
      tags: ["#BookClub", "#ProjectHailMary", "#ReadingCommunity"],
    },
  ];

  useEffect(() => {
    // Simulate API call
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
      <div className="feed-loading">
        <div className="feed-spinner"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  return (
    <div className="feed-desktop">
      <div className="feed-header">
        <h2>Feed</h2>
        <div className="feed-tabs">
          <button className="feed-tab active">For You</button>
          <button className="feed-tab">Following</button>
          <button className="feed-tab">Trending</button>
        </div>
      </div>

      <div className="feed-posts">
        {posts.map((post) => (
          <article key={post.id} className="feed-post">
            {/* Post Header */}
            <div className="post-header">
              <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
              <div className="post-user-info">
                <div className="post-user-name">
                  {post.user.name}
                  {post.user.verified && (
                    <span className="verified-badge" title="Verified">✓</span>
                  )}
                </div>
                <div className="post-user-meta">
                  <span className="post-username">{post.user.username}</span>
                  <span className="post-time">• {post.timestamp}</span>
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
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="post-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <button 
                className={`action-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                {likedPosts[post.id] ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <span>{formatNumber(post.likes + (likedPosts[post.id] ? 1 : 0))}</span>
              </button>
              
              <button className="action-btn">
                <HiChatAlt2 />
                <span>{formatNumber(post.comments)}</span>
              </button>
              
              <button className="action-btn">
                <HiShare />
                <span>{formatNumber(post.shares)}</span>
              </button>
              
              <button className="action-btn">
                <HiBookmark />
                <span>{formatNumber(post.bookmarks)}</span>
              </button>
            </div>

            {/* Comments Preview */}
            <div className="post-comments-preview">
              <img 
                src="https://ui-avatars.com/api/?background=64748b&color=fff&name=User" 
                alt="Commenter"
                className="comment-avatar"
              />
              <div className="comment-preview">
                <span className="comment-user">@booklover</span>
                <span className="comment-text">Great recommendation! Added to my list 📚</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Create Post Section */}
      <div className="create-post">
        <img 
          src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User" 
          alt="Your avatar"
          className="create-post-avatar"
        />
        <input 
          type="text" 
          placeholder="Share your thoughts..."
          className="create-post-input"
        />
        <button className="create-post-btn">Post</button>
      </div>
    </div>
  );
}