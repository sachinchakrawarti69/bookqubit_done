"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaImage, FaTimes, FaUpload } from "react-icons/fa";

const DriftImageUpload = ({ onImageSelect, onImageRemove, selectedImage }) => {
  const { themeName } = useTheme();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => onImageSelect(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => onImageSelect(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      {!selectedImage ? (
        <div
          className={`upload-area ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FaUpload className="upload-icon" />
          <p>Click or drag image here</p>
          <span>PNG, JPG, GIF up to 5MB</span>
          <input type="file" accept="image/*" onChange={handleFileSelect} hidden ref={fileInputRef} />
        </div>
      ) : (
        <div className="selected-image">
          <img src={selectedImage} alt="Selected" />
          <button className="remove-image" onClick={onImageRemove}>
            <FaTimes />
          </button>
        </div>
      )}

      <style jsx>{`
        .image-upload-container { margin-bottom: 16px; }
        .upload-area {
          border: 2px dashed ${isDarkMode ? "#475569" : "#cbd5e1"};
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: ${isDarkMode ? "#0f172a" : "#f8fafc"};
        }
        .upload-area.dragging {
          border-color: #3b82f6;
          background: ${isDarkMode ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.05)"};
        }
        .upload-icon { font-size: 32px; color: #64748b; margin-bottom: 12px; }
        .upload-area p { margin: 8px 0 4px; font-size: 14px; color: ${isDarkMode ? "#f1f5f9" : "#1e293b"}; }
        .upload-area span { font-size: 11px; color: #64748b; }
        .selected-image { position: relative; }
        .selected-image img { width: 100%; border-radius: 12px; }
        .remove-image {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default DriftImageUpload;