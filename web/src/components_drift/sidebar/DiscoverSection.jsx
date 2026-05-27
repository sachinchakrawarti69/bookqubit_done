"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { 
  FaCompass, 
  FaBook, 
  FaUser, 
  FaHashtag, 
  FaUsers, 
  FaCalendarAlt, 
  FaTrophy,
  FaArrowRight 
} from "react-icons/fa";

const DiscoverSection = () => {
  const { themeName } = useTheme();
  const { direction } = useRTL();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const discoverItems = [
    { 
      icon: FaBook, 
      label: "Popular Books", 
      description: "Trending books right now",
      href: "/drift/explore/books",
      color: "#3b82f6"
    },
    { 
      icon: FaUser, 
      label: "Trending Authors", 
      description: "Most talked about writers",
      href: "/drift/explore/authors",
      color: "#8b5cf6"
    },
    { 
      icon: FaHashtag, 
      label: "Top Hashtags", 
      description: "Join the conversation",
      href: "/drift/explore/hashtags",
      color: "#f59e0b"
    },
    { 
      icon: FaUsers, 
      label: "Reading Communities", 
      description: "Find your tribe",
      href: "/drift/explore/communities",
      color: "#10b981"
    },
    { 
      icon: FaCalendarAlt, 
      label: "Upcoming Events", 
      description: "Book launches & meetups",
      href: "/drift/explore/events",
      color: "#ec4899"
    },
    { 
      icon: FaTrophy, 
      label: "Reading Challenges", 
      description: "Set and achieve goals",
      href: "/drift/explore/challenges",
      color: "#f97316"
    },
  ];

  return (
    <div className={`discover-section ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="section-header">
        <FaCompass className="section-icon" />
        <h3 className="section-title">Discover</h3>
      </div>

      <div className="discover-grid">
        {discoverItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="discover-card">
              <div className="card-icon" style={{ backgroundColor: `${item.color}15` }}>
                <Icon style={{ color: item.color }} />
              </div>
              <div className="card-info">
                <span className="card-label">{item.label}</span>
                <span className="card-description">{item.description}</span>
              </div>
              <FaArrowRight className="card-arrow" />
            </Link>
          );
        })}
      </div>

      <div className="featured-badge">
        <div className="badge-content">
          <span className="badge-icon">✨</span>
          <div className="badge-text">
            <strong>New!</strong> Join the Drift Book Club
          </div>
          <button className="badge-btn">Learn more</button>
        </div>
      </div>

      <style jsx>{`
        .discover-section {
          background: ${isDarkMode ? "#1e293b" : "#ffffff"};
          border-radius: 20px;
          padding: 20px;
          border: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .discover-section:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .section-icon {
          font-size: 18px;
          color: #3b82f6;
        }
        .section-title {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
        .discover-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .discover-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          background: ${isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"};
        }
        .discover-card:hover {
          background: ${isDarkMode ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.05)"};
          transform: translateX(4px);
        }
        [dir="rtl"] .discover-card:hover {
          transform: translateX(-4px);
        }
        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .card-info {
          flex: 1;
          min-width: 0;
        }
        .card-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .card-description {
          display: block;
          font-size: 10px;
          color: ${isDarkMode ? "#94a3b8" : "#64748b"};
        }
        .card-arrow {
          font-size: 12px;
          color: ${isDarkMode ? "#64748b" : "#94a3b8"};
          opacity: 0;
          transition: all 0.2s ease;
        }
        .discover-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(4px);
        }
        [dir="rtl"] .discover-card:hover .card-arrow {
          transform: translateX(-4px);
        }
        .featured-badge {
          padding-top: 12px;
          border-top: 1px solid ${isDarkMode ? "#334155" : "#e2e8f0"};
        }
        .badge-content {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
          border-radius: 12px;
          flex-wrap: wrap;
        }
        .badge-icon {
          font-size: 24px;
        }
        .badge-text {
          flex: 1;
          font-size: 13px;
          color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
        }
        .badge-text strong {
          color: #3b82f6;
        }
        .badge-btn {
          padding: 6px 12px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .badge-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        @media (max-width: 640px) {
          .discover-grid { grid-template-columns: 1fr; }
          .badge-content { flex-direction: column; text-align: center; }
          .badge-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DiscoverSection;