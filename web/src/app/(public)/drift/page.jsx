"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import DriftNavbar from "@/components_drift/layout/drift_navbar/DriftNavbar";
import DriftMobileNav from "@/components_drift/layout/drift_mobilenav/DriftMobileNav";
import DriftFooter from "@/components_drift/layout/drift_footer/DriftFooter";
import CreateDrift from "@/components_drift/feed/CreateDrift";
import DriftFeed from "@/components_drift/feed/DriftFeed";
import LoadingSpinner from "@/components_drift/common/LoadingSpinner";
import EmptyState from "@/components_drift/common/EmptyState";
import TrendingTopics from "@/components_drift/sidebar/TrendingTopics";
import SuggestedUsers from "@/components_drift/sidebar/SuggestedUsers";
import DiscoverSection from "@/components_drift/sidebar/DiscoverSection";
import { GiWaves } from "react-icons/gi";

const DriftPage = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [drifts, setDrifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for-you");

  // Mock Drift data with comments structure
  const mockDrifts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarah_reads",
        avatar: null,
        verified: false,
        role: "reader",
      },
      content: "Just finished reading 'The Midnight Library' by Matt Haig. What an incredible journey through parallel lives! ⭐⭐⭐⭐⭐ #BookRecommendations",
      image: null,
      book: {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: null,
        rating: 4.8,
      },
      likes: 234,
      comments: [
        { id: 1, user: "booklover42", text: "This book changed my perspective!", timestamp: "1 hour ago" },
        { id: 2, user: "reading_addict", text: "Matt Haig is amazing!", timestamp: "30 mins ago" },
      ],
      shares: 12,
      timestamp: "2 hours ago",
      liked: false,
      saved: false,
      views: 1234,
    },
    {
      id: 2,
      user: {
        name: "Neil Gaiman",
        username: "@neilhimself",
        avatar: null,
        verified: true,
        role: "author",
      },
      content: "Excited to announce that 'The Ocean at the End of the Lane' is being adapted into a stage play! The creative team is absolutely brilliant. #BookNews",
      image: "https://picsum.photos/800/400?random=1",
      book: null,
      likes: 5678,
      comments: [
        { id: 1, user: "theater_fan", text: "Can't wait!", timestamp: "4 hours ago" },
      ],
      shares: 345,
      timestamp: "5 hours ago",
      liked: false,
      saved: false,
      views: 8900,
    },
    {
      id: 3,
      user: {
        name: "Marcus Chen",
        username: "@marcus_reads",
        avatar: null,
        verified: false,
        role: "reader",
      },
      content: "Currently reading 'Dune' for the first time! The world-building is absolutely phenomenal. 🤯",
      image: "https://picsum.photos/800/400?random=2",
      book: {
        title: "Dune",
        author: "Frank Herbert",
        cover: null,
        rating: 4.9,
      },
      likes: 456,
      comments: [
        { id: 1, user: "scifi_fan", text: "One of the best ever!", timestamp: "1 day ago" },
      ],
      shares: 23,
      timestamp: "1 day ago",
      liked: false,
      saved: false,
      views: 567,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setDrifts(mockDrifts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (driftId, liked) => {
    setDrifts(drifts.map(drift =>
      drift.id === driftId
        ? { ...drift, liked, likes: liked ? drift.likes + 1 : drift.likes - 1 }
        : drift
    ));
  };

  const handleSave = (driftId, saved) => {
    setDrifts(drifts.map(drift =>
      drift.id === driftId ? { ...drift, saved } : drift
    ));
  };

  const handleComment = (driftId, newComment) => {
    setDrifts(drifts.map(drift =>
      drift.id === driftId
        ? { ...drift, comments: [...drift.comments, newComment] }
        : drift
    ));
  };

  const handleShare = (driftId) => {
    console.log("Share drift:", driftId);
    alert("Share functionality would open share dialog");
  };

  const handleDriftCreated = (newDrift) => {
    setDrifts([newDrift, ...drifts]);
  };

  if (loading) {
    return (
      <div className="drift-loading">
        <LoadingSpinner text="Drifting into your feed..." size="large" />
        <style jsx>{`
          .drift-loading {
            min-height: 100vh;
            background: ${isDarkMode ? "#0f172a" : "#f8fafc"};
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <DriftNavbar />
      <div className={`drift-page ${isDarkMode ? "dark" : "light"}`} dir={direction} style={{ fontFamily: currentFont?.family }}>
        {/* Hero Section */}
        <div className="drift-hero">
          <div className="drift-hero-content">
            <GiWaves className="hero-wave" />
            <h1 className="hero-title">Welcome to Drift</h1>
            <p className="hero-subtitle">Where book lovers connect and stories come alive</p>
          </div>
        </div>

        <div className="drift-container">
          {/* Main Feed */}
          <main className="drift-main-feed">
            <CreateDrift onDriftCreated={handleDriftCreated} />
            
            {drifts.length === 0 ? (
              <EmptyState 
                icon="🌊"
                title="No drifts yet"
                message="Be the first to share your thoughts about books!"
                actionText="Create your first drift"
                onAction={() => document.querySelector('textarea')?.focus()}
              />
            ) : (
              <DriftFeed 
                drifts={drifts}
                loading={false}
                onLike={handleLike}
                onSave={handleSave}
                onComment={handleComment}
                onShare={handleShare}
              />
            )}
          </main>

          {/* Right Sidebar - Desktop */}
          <aside className="drift-sidebar-wrapper">
            <TrendingTopics />
            <SuggestedUsers />
            <DiscoverSection />
          </aside>
        </div>

        <DriftFooter />
      </div>
      <DriftMobileNav />

      <style jsx>{`
        .drift-page {
          min-height: 100vh;
          background: ${isDarkMode ? "#0f172a" : "#f8fafc"};
        }

        /* Hero Section */
        .drift-hero {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 80px 20px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-top: 60px;
        }

        .drift-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
          background-size: cover;
          opacity: 0.3;
        }

        .drift-hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-wave {
          font-size: 64px;
          color: white;
          animation: wave 3s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }

        .hero-title {
          font-size: 48px;
          font-weight: bold;
          color: white;
          margin: 16px 0 8px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
        }

        /* Main Container */
        .drift-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
          display: flex;
          gap: 32px;
        }

        /* Main Feed */
        .drift-main-feed {
          flex: 1;
          min-width: 0;
        }

        /* Sidebar Wrapper */
        .drift-sidebar-wrapper {
          width: 320px;
          flex-shrink: 0;
          position: sticky;
          top: 80px;
          height: fit-content;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .drift-container {
            padding: 24px 16px;
            gap: 24px;
          }
          
          .hero-title {
            font-size: 36px;
          }
          
          .drift-sidebar-wrapper {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .drift-container {
            padding: 20px;
          }
          
          .hero-title {
            font-size: 28px;
          }
          
          .hero-subtitle {
            font-size: 14px;
          }
          
          .drift-hero {
            padding: 60px 20px 40px;
            margin-top: 56px;
          }
          
          .hero-wave {
            font-size: 48px;
          }
        }
      `}</style>
    </>
  );
};

export default DriftPage;