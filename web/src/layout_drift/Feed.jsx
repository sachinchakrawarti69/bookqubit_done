"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaRetweet, 
  FaShare, 
  FaBookmark, 
  FaRegBookmark,
  FaEllipsisH,
  FaTrash,
  FaFlag,
  FaRegSmile,
  FaImage,
  FaPoll,
  FaTimes,
  FaUserPlus,
  FaUserCheck
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useTheme } from "@/themes/useTheme";
import { formatDistanceToNow } from "date-fns";
import "./Feed.css";

const Feed = ({ posts: initialPosts, onPostUpdate, currentUser }) => {
  const { theme, themeName } = useTheme();
  const [posts, setPosts] = useState(initialPosts || []);
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState({});
  const textareaRef = useRef(null);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const isForestTheme = themeName === 'forest';

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return timestamp;
    }
  };

  const handleLike = useCallback(async (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1
          } 
        : post
    ));
    
    if (onPostUpdate) {
      onPostUpdate(postId, { liked: !posts.find(p => p.id === postId)?.liked });
    }
  }, [onPostUpdate, posts]);

  const handleBookmark = useCallback((postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked } 
        : post
    ));
  }, []);

  const handleRetweet = useCallback((postId) => {
    const originalPost = posts.find(p => p.id === postId);
    if (!originalPost) return;
    
    const newRetweet = {
      ...originalPost,
      id: Date.now(),
      isRetweet: true,
      originalAuthor: originalPost.author,
      retweetedBy: currentUser || { name: "You", username: "@you", avatar: "https://ui-avatars.com/api/?background=6366F1&color=fff&name=You" },
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
    
    setPosts(prev => [newRetweet, ...prev]);
    
    // Update original post retweet count
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, retweets: post.retweets + 1, retweetCount: post.retweetCount + 1 }
        : post
    ));
  }, [posts, currentUser]);

  const handleReply = useCallback((postId) => {
    if (!replyContent.trim()) return;
    
    const parentPost = posts.find(p => p.id === postId);
    
    const newReply = {
      id: Date.now(),
      author: currentUser || {
        id: "current_user",
        name: "Current User",
        username: "@currentuser",
        avatar: "https://ui-avatars.com/api/?background=6366F1&color=fff&name=Current+User",
        verified: false,
        role: "Reader"
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      retweets: 0,
      liked: false,
      bookmarked: false,
      isReply: true,
      parentId: postId,
      replyingTo: parentPost?.author?.username
    };
    
    setPosts(prev => {
      const updatedPosts = prev.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1, commentCount: (post.commentCount || 0) + 1 }
          : post
      );
      return [newReply, ...updatedPosts];
    });
    
    setReplyContent("");
    setReplyTo(null);
    setShowEmojiPicker(false);
  }, [replyContent, currentUser, posts]);

  const handleDeletePost = useCallback((postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    setMenuOpen(null);
  }, []);

  const handleReportPost = useCallback((postId) => {
    // Implement report functionality
    console.log("Report post:", postId);
    alert("Post has been reported. Our team will review it.");
    setMenuOpen(null);
  }, []);

  const handleFollowUser = useCallback((userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  }, []);

  const handleShare = useCallback(async (post) => {
    const shareText = `${post.content}\n\n- ${post.author.name} (${post.author.username})`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share post',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Post copied to clipboard!');
    }
  }, []);

  const getPostTypeIcon = (post) => {
    if (post.isRetweet) return <FaRetweet className="retweet-icon" />;
    if (post.isReply) return <FaComment className="reply-icon" />;
    return null;
  };

  const getPostTypeText = (post) => {
    if (post.isRetweet) {
      return `${post.retweetedBy?.name || "Someone"} retweeted`;
    }
    if (post.isReply && post.replyingTo) {
      return `Replying to ${post.replyingTo}`;
    }
    return null;
  };

  return (
    <div className={`feed-container ${isDarkMode ? 'dark' : 'light'} ${isForestTheme ? 'forest' : ''}`}>
      {posts.length === 0 ? (
        <div className="feed-empty">
          <div className="empty-state">
            <FaComment className="empty-icon" />
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community!</p>
          </div>
        </div>
      ) : (
        posts.map((post) => (
          <div 
            key={post.id} 
            className={`feed-post ${expandedPost === post.id ? 'expanded' : ''}`}
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
          >
            {/* Post Type Indicator */}
            {getPostTypeIcon(post) && (
              <div className="post-type-indicator">
                {getPostTypeIcon(post)}
                <span>{getPostTypeText(post)}</span>
              </div>
            )}

            <div className="post-content-wrapper">
              {/* Avatar */}
              <div className="post-avatar-wrapper">
                <img 
                  src={post.author?.avatar || `https://ui-avatars.com/api/?background=6366F1&color=fff&name=${post.author?.name || 'User'}`} 
                  alt={post.author?.name} 
                  className="post-avatar"
                />
                {post.author?.verified && (
                  <MdVerified className="verified-badge" />
                )}
              </div>

              {/* Main Content */}
              <div className="post-main-content">
                {/* Header */}
                <div className="post-header">
                  <div className="post-author-info">
                    <span className="post-author-name">
                      {post.author?.name}
                      {post.author?.verified && <MdVerified className="inline-verified" />}
                    </span>
                    <span className="post-author-username">{post.author?.username}</span>
                    <span className="post-timestamp">{formatTimestamp(post.timestamp)}</span>
                    {post.author?.role && (
                      <span className="post-author-role">{post.author.role}</span>
                    )}
                  </div>

                  <div className="post-actions-right">
                    {/* Follow Button */}
                    {currentUser?.id !== post.author?.id && (
                      <button 
                        className={`follow-btn ${following[post.author?.id] ? 'following' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowUser(post.author?.id);
                        }}
                      >
                        {following[post.author?.id] ? (
                          <><FaUserCheck /> Following</>
                        ) : (
                          <><FaUserPlus /> Follow</>
                        )}
                      </button>
                    )}

                    {/* Menu Button */}
                    <div className="post-menu-container">
                      <button 
                        className="post-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(menuOpen === post.id ? null : post.id);
                        }}
                      >
                        <FaEllipsisH />
                      </button>
                      
                      {menuOpen === post.id && (
                        <div className="post-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleReportPost(post.id)}>
                            <FaFlag /> Report
                          </button>
                          {currentUser?.id === post.author?.id && (
                            <button onClick={() => handleDeletePost(post.id)}>
                              <FaTrash /> Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="post-body">
                  <p>{post.content}</p>
                  {post.media && (
                    <div className="post-media">
                      {post.media.type === 'image' ? (
                        <img src={post.media.url} alt="Post media" loading="lazy" />
                      ) : post.media.type === 'video' ? (
                        <video src={post.media.url} controls />
                      ) : null}
                    </div>
                  )}
                  
                  {/* Poll */}
                  {post.poll && (
                    <div className="post-poll" onClick={(e) => e.stopPropagation()}>
                      <h4>{post.poll.question}</h4>
                      {post.poll.options.map((option, idx) => (
                        <div key={idx} className="poll-option">
                          <button className="poll-vote-btn">
                            {option.text}
                          </button>
                          <div className="poll-progress">
                            <div 
                              className="poll-progress-bar" 
                              style={{ width: `${option.percentage}%` }}
                            />
                            <span>{option.percentage}% ({option.votes} votes)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="post-stats">
                  <span>{post.likes || post.likeCount || 0} Likes</span>
                  <span>{post.comments || post.commentCount || 0} Comments</span>
                  <span>{post.retweets || post.retweetCount || 0} Retweets</span>
                </div>

                {/* Actions */}
                <div className="post-actions">
                  <button 
                    className={`action-btn ${post.liked ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    {post.liked ? <FaHeart /> : <FaRegHeart />}
                    <span>Like</span>
                  </button>
                  
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReplyTo(replyTo === post.id ? null : post.id);
                      setTimeout(() => textareaRef.current?.focus(), 100);
                    }}
                  >
                    <FaComment />
                    <span>Reply</span>
                  </button>
                  
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRetweet(post.id);
                    }}
                  >
                    <FaRetweet />
                    <span>Retweet</span>
                  </button>
                  
                  <button 
                    className={`action-btn ${post.bookmarked ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(post.id);
                    }}
                  >
                    {post.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    <span>Save</span>
                  </button>
                  
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post);
                    }}
                  >
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>

                {/* Reply Box */}
                {replyTo === post.id && (
                  <div className="reply-box" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={currentUser?.avatar || "https://ui-avatars.com/api/?background=6366F1&color=fff&name=You"} 
                      alt="Your avatar" 
                      className="reply-avatar"
                    />
                    <div className="reply-input-wrapper">
                      <textarea
                        ref={textareaRef}
                        className="reply-textarea"
                        placeholder={`Reply to ${post.author?.username}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows="3"
                      />
                      <div className="reply-actions">
                        <button 
                          className="reply-emoji-btn"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <FaRegSmile />
                        </button>
                        <button className="reply-image-btn">
                          <FaImage />
                        </button>
                        <div className="reply-actions-right">
                          <button 
                            className="reply-cancel-btn"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyContent("");
                            }}
                          >
                            Cancel
                          </button>
                          <button 
                            className="reply-submit-btn"
                            onClick={() => handleReply(post.id)}
                            disabled={!replyContent.trim()}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;