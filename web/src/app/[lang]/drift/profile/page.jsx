// src/app/[lang]/drift/profile/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  HiPencil,
  HiLocationMarker,
  HiCalendar,
  HiLink,
  HiBookOpen,
  HiUsers,
  HiHeart,
  HiSparkles,
  HiShare,
  HiMail,
  HiFlag,
} from "react-icons/hi";
import { FaCrown, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import "./profile.css";

export default function ProfilePage() {
  const params = useParams();
  const lang = params?.lang || "en";
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("drifts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Sample profile data
  const sampleProfile = {
    id: "bookqubit_user",
    name: "BookQubit User",
    username: "@bookqubit",
    bio: "📚 Book lover | ✍️ Reader | 🌟 Exploring worlds through pages. Sharing my reading journey and connecting with fellow book enthusiasts!",
    avatar: "https://ui-avatars.com/api/?background=0284c7&color=fff&name=BQ&length=2&size=128",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200",
    location: "New York, USA",
    joinDate: "Joined January 2024",
    website: "https://bookqubit.com",
    stats: {
      followers: 1234,
      following: 567,
      drifts: 8901,
      likes: 45678,
    },
    isVerified: true,
    isPremium: true,
  };

  // Sample drifts data
  const sampleDrifts = [
    {
      id: 1,
      content: "Just finished 'The Midnight Library' by Matt Haig. What an incredible journey through parallel lives! This book made me reflect on all the choices I've made. Highly recommended! 📚✨",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false,
    },
    {
      id: 2,
      content: "Atomic Habits by James Clear - Chapter 4 completely changed my perspective. Small changes lead to remarkable results! Who else is on this journey? 💪",
      image: null,
      timestamp: "5 hours ago",
      likes: 567,
      comments: 89,
      shares: 34,
      liked: true,
    },
    {
      id: 3,
      content: "Starting a new book club! First pick: 'Project Hail Mary' by Andy Weir. Join me every Wednesday at 7 PM EST. Let's explore the universe together! 🚀📖",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      timestamp: "1 day ago",
      likes: 1234,
      comments: 234,
      shares: 89,
      liked: false,
    },
  ];

  // Sample bookmarks data
  const sampleBookmarks = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200",
      savedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200",
      savedAt: "1 week ago",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(sampleProfile);
      setLoading(false);
    }, 500);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        followers: isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1,
      },
    }));
  };

  const handleLike = (driftId) => {
    // Handle like functionality
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page" dir={lang === "ur" || lang === "ar" ? "rtl" : "ltr"}>
      {/* Cover Image */}
      <div className="profile-cover">
        <img src={profile.coverImage} alt="Cover" className="cover-image" />
        <div className="cover-overlay"></div>
        
        {/* Edit Profile Button */}
        <button className="edit-profile-btn">
          <HiPencil />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Info */}
      <div className="profile-info-container">
        <div className="profile-avatar-wrapper">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          {profile.isVerified && (
            <div className="verified-badge-large" title="Verified Account">
              ✓
            </div>
          )}
          {profile.isPremium && (
            <div className="premium-badge" title="Premium Member">
              <FaCrown />
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="share-btn" onClick={handleShare}>
            <HiShare />
          </button>
          <button className="message-btn">
            <HiMail />
          </button>
          <button className={`follow-btn ${isFollowing ? "following" : ""}`} onClick={handleFollow}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <h1 className="profile-name">
          {profile.name}
          {profile.isVerified && (
            <span className="verified-badge-name" title="Verified Account">
              ✓
            </span>
          )}
          {profile.isPremium && (
            <span className="premium-badge-name" title="Premium Member">
              <FaCrown />
            </span>
          )}
        </h1>
        <p className="profile-username">{profile.username}</p>
        <p className="profile-bio">{profile.bio}</p>

        <div className="profile-meta">
          {profile.location && (
            <div className="meta-item">
              <HiLocationMarker />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <div className="meta-item">
              <HiLink />
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                {profile.website.replace("https://", "")}
              </a>
            </div>
          )}
          <div className="meta-item">
            <HiCalendar />
            <span>{profile.joinDate}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{formatNumber(profile.stats.drifts)}</span>
            <span className="stat-label">Drifts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatNumber(profile.stats.followers)}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatNumber(profile.stats.following)}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatNumber(profile.stats.likes)}</span>
            <span className="stat-label">Total Likes</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "drifts" ? "active" : ""}`}
          onClick={() => setActiveTab("drifts")}
        >
          <HiSparkles />
          <span>Drifts</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "replies" ? "active" : ""}`}
          onClick={() => setActiveTab("replies")}
        >
          <HiUsers />
          <span>Replies</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "likes" ? "active" : ""}`}
          onClick={() => setActiveTab("likes")}
        >
          <HiHeart />
          <span>Likes</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "bookmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          <FaRegBookmark />
          <span>Bookmarks</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === "drifts" && (
          <div className="drifts-list">
            {sampleDrifts.map((drift) => (
              <article key={drift.id} className="drift-card">
                <div className="drift-header">
                  <img src={profile.avatar} alt={profile.name} className="drift-avatar" />
                  <div className="drift-user">
                    <div className="drift-user-name">
                      {profile.name}
                      {profile.isVerified && (
                        <span className="verified-badge">✓</span>
                      )}
                    </div>
                    <div className="drift-user-meta">
                      <span>{profile.username}</span>
                      <span>·</span>
                      <span>{drift.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="drift-content">
                  <p>{drift.content}</p>
                  {drift.image && (
                    <div className="drift-image">
                      <img src={drift.image} alt="Drift" />
                    </div>
                  )}
                </div>

                <div className="drift-actions">
                  <button
                    className={`action-btn ${drift.liked ? "liked" : ""}`}
                    onClick={() => handleLike(drift.id)}
                  >
                    <FaRegHeart />
                    <span>{formatNumber(drift.likes)}</span>
                  </button>
                  <button className="action-btn">
                    <HiUsers />
                    <span>{formatNumber(drift.comments)}</span>
                  </button>
                  <button className="action-btn">
                    <HiShare />
                    <span>{formatNumber(drift.shares)}</span>
                  </button>
                  <button className="action-btn">
                    <HiFlag />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "replies" && (
          <div className="empty-state">
            <HiUsers className="empty-icon" />
            <h3>No replies yet</h3>
            <p>When you reply to drifts, they'll appear here</p>
          </div>
        )}

        {activeTab === "likes" && (
          <div className="empty-state">
            <HiHeart className="empty-icon" />
            <h3>No liked drifts yet</h3>
            <p>When you like a drift, it will appear here</p>
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="bookmarks-list">
            {sampleBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-card">
                <img src={bookmark.cover} alt={bookmark.title} className="bookmark-cover" />
                <div className="bookmark-info">
                  <h4>{bookmark.title}</h4>
                  <p>{bookmark.author}</p>
                  <span className="bookmark-date">Saved {bookmark.savedAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Menu Modal */}
      {showShareMenu && (
        <>
          <div className="share-overlay" onClick={() => setShowShareMenu(false)} />
          <div className="share-menu">
            <div className="share-menu-header">
              <h3>Share Profile</h3>
              <button onClick={() => setShowShareMenu(false)}>✕</button>
            </div>
            <div className="share-options">
              <button className="share-option">
                <HiUsers />
                <span>Copy Link</span>
              </button>
              <button className="share-option">
                <HiMail />
                <span>Share via Message</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}