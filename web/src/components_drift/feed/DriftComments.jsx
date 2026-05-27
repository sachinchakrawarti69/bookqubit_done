"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaUser, FaHeart, FaPaperPlane } from "react-icons/fa";

const DriftComments = ({ drift, onAddComment }) => {
  const { themeName } = useTheme();
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";
  
  const displayedComments = showAllComments ? drift.comments : drift.comments?.slice(0, 2) || [];

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.(drift.id, newComment);
      setNewComment("");
    }
  };

  if (!drift.comments?.length && !newComment) return null;

  return (
    <div className="comments-section">
      {drift.comments?.length > 0 && (
        <>
          <div className="comments-header">Comments ({drift.comments.length})</div>
          {displayedComments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar"><FaUser /></div>
              <div className="comment-content">
                <div className="comment-user">{comment.user}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-time">{comment.timestamp}</div>
              </div>
              <button className="comment-like"><FaHeart /></button>
            </div>
          ))}
          {drift.comments.length > 2 && !showAllComments && (
            <button className="view-more" onClick={() => setShowAllComments(true)}>
              View all {drift.comments.length} comments
            </button>
          )}
        </>
      )}
      
      <div className="add-comment">
        <div className="comment-avatar-small"><FaUser /></div>
        <input 
          type="text" 
          placeholder="Write a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
          className="comment-input"
        />
        <button className="comment-submit" onClick={handleAddComment}><FaPaperPlane /></button>
      </div>

      <style jsx>{`
        .comments-section {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .comments-header {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .comment-item {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }
        .comment-avatar, .comment-avatar-small {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          flex-shrink: 0;
        }
        .comment-avatar-small { width: 32px; height: 32px; }
        .comment-content { flex: 1; }
        .comment-user { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
        .comment-text { font-size: 13px; margin-bottom: 4px; }
        .comment-time { font-size: 10px; opacity: 0.6; }
        .comment-like {
          background: transparent;
          border: none;
          cursor: pointer;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .view-more {
          background: transparent;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-size: 12px;
          margin: 8px 0;
        }
        .add-comment {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .comment-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid ${isDarkMode ? "#475569" : "#e2e8f0"};
          border-radius: 20px;
          background: ${isDarkMode ? "#0f172a" : "#f8fafc"};
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .comment-input:focus { outline: none; border-color: #3b82f6; }
        .comment-submit {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default DriftComments;