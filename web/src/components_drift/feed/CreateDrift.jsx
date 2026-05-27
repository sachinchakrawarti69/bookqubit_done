"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { FaUser, FaImage, FaSmile, FaPaperPlane, FaTimes } from "react-icons/fa";

const CreateDrift = ({ onDriftCreated }) => {
  const { themeName } = useTheme();
  const { direction } = useRTL();
  const [newDrift, setNewDrift] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDrift = async () => {
    if (!newDrift.trim() && !selectedImage) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newDriftObj = {
        id: Date.now(),
        user: {
          name: "You",
          username: "@you",
          avatar: null,
          verified: false,
        },
        content: newDrift,
        image: selectedImage,
        book: null,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
        liked: false,
        saved: false,
      };
      onDriftCreated?.(newDriftObj);
      setNewDrift("");
      setSelectedImage(null);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`create-drift-card ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="create-drift-header">
        <div className="user-avatar-small">
          <FaUser />
        </div>
        <textarea
          placeholder="What's on your mind? Share your thoughts about books..."
          value={newDrift}
          onChange={(e) => setNewDrift(e.target.value)}
          className="drift-input"
          rows="3"
        />
      </div>

      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Preview" />
          <button onClick={() => setSelectedImage(null)} className="remove-image">
            <FaTimes />
          </button>
        </div>
      )}

      <div className="create-drift-actions">
        <label className="action-btn">
          <FaImage /> Photo
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden ref={fileInputRef} />
        </label>
        <button className="action-btn"><FaSmile /> Emoji</button>
        <button 
          className="drift-submit-btn" 
          onClick={handleCreateDrift}
          disabled={isLoading || (!newDrift.trim() && !selectedImage)}
        >
          <FaPaperPlane /> {isLoading ? "Drifting..." : "Drift"}
        </button>
      </div>

      <style jsx>{`
        .create-drift-card {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .create-drift-header {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .user-avatar-small {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .drift-input {
          flex: 1;
          padding: 12px;
          border: 1px solid ${isDarkMode ? "#475569" : "#e2e8f0"};
          border-radius: 16px;
          resize: none;
          font-family: inherit;
          font-size: 14px;
          background: ${isDarkMode ? "#0f172a" : "#ffffff"};
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .drift-input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .image-preview {
          position: relative;
          margin-bottom: 16px;
        }
        .image-preview img {
          width: 100%;
          border-radius: 12px;
        }
        .remove-image {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .create-drift-actions {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .action-btn {
          padding: 8px 16px;
          background: ${isDarkMode ? "#334155" : "#f1f5f9"};
          border: none;
          border-radius: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: ${isDarkMode ? "#f1f5f9" : "#475569"};
        }
        .action-btn:hover {
          background: ${isDarkMode ? "#475569" : "#e2e8f0"};
        }
        .drift-submit-btn {
          margin-left: auto;
          padding: 8px 20px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }
        .drift-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .create-drift-header { flex-direction: column; }
          .user-avatar-small { align-self: center; }
          .create-drift-actions { flex-wrap: wrap; }
          .drift-submit-btn { margin-left: 0; width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default CreateDrift;