"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@/themes/useTheme";

const TrendDashboardSlider = () => {
  const { theme, themeName } = useTheme();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [sliderKey, setSliderKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Mock data for trending items
  const trendingItems = [
    {
      id: 1,
      type: "book",
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 98,
      growth: "+45%",
      link: "/books/midnight-library",
    },
    {
      id: 2,
      type: "book",
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 95,
      growth: "+38%",
      link: "/books/atomic-habits",
    },
    {
      id: 3,
      type: "author",
      title: "Matt Haig",
      author: "Best-selling Author",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 96,
      growth: "+52%",
      link: "/authors/matt-haig",
    },
    {
      id: 4,
      type: "comic",
      title: "Spider-Man: Across the Spider-Verse",
      author: "Marvel",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 97,
      growth: "+67%",
      link: "/comics/spider-man",
    },
    {
      id: 5,
      type: "book",
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 92,
      growth: "+42%",
      link: "/books/project-hail-mary",
    },
    {
      id: 6,
      type: "author",
      title: "James Clear",
      author: "Productivity Expert",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 94,
      growth: "+48%",
      link: "/authors/james-clear",
    },
    {
      id: 7,
      type: "comic",
      title: "Batman: The Dark Knight Returns",
      author: "DC",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 94,
      growth: "+54%",
      link: "/comics/batman-dark-knight",
    },
    {
      id: 8,
      type: "book",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://via.placeholder.com/120x180",
      trendScore: 89,
      growth: "+31%",
      link: "/books/psychology-of-money",
    },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSliderKey((prev) => prev + 1);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth <= 640) return 1;
    if (windowWidth <= 768) return 2;
    if (windowWidth <= 1024) return 3;
    if (windowWidth <= 1280) return 4;
    return 5;
  };

  const sliderSettings = {
    dots: true,
    infinite: trendingItems.length > 1,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: windowWidth > 768,
    pauseOnHover: true,
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "book":
        return "📚";
      case "author":
        return "✍️";
      case "comic":
        return "🎬";
      default:
        return "🔥";
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "book":
        return "#667eea";
      case "author":
        return "#f59e0b";
      case "comic":
        return "#ef4444";
      default:
        return "#10b981";
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section
      className={`trend-slider-section ${theme.background?.section || 'bg-gray-50 dark:bg-gray-900'}`}
      style={{ fontFamily: 'inherit' }}
    >
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className={`trend-icon-wrapper ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}`}>
              <span className="trend-icon">🔥</span>
            </div>
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-3`}>
            Trending Now
          </h2>
          <p className={`text-sm md:text-lg ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} max-w-2xl mx-auto`}>
            Discover what's hot in our community right now
          </p>
        </div>

        {/* Slider */}
        <div className="trend-slider-wrapper">
          <Slider key={sliderKey} {...sliderSettings}>
            {trendingItems.map((item) => (
              <div key={item.id} className="px-2 outline-none">
                <Link href={item.link}>
                  <div className={`trend-card ${theme.background?.bookCoverSide || 'bg-white dark:bg-gray-800'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                    {/* Trend Badge */}
                    <div className="trend-badge" style={{ backgroundColor: getTypeBadgeColor(item.type) }}>
                      <span className="trend-badge-icon">{getTypeIcon(item.type)}</span>
                      <span className="trend-badge-text">{item.type}</span>
                    </div>

                    {/* Trend Score */}
                    <div className="trend-score-badge">
                      <span className="trend-score-icon">🔥</span>
                      <span className="trend-score-value">{item.trendScore}</span>
                    </div>

                    {/* Image */}
                    <div className="trend-image-wrapper">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="trend-image"
                      />
                    </div>

                    {/* Content */}
                    <div className="trend-content p-4">
                      <h3 className={`trend-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} truncate`}>
                        {item.title}
                      </h3>
                      <p className={`trend-author ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-sm truncate mb-3`}>
                        {item.author}
                      </p>
                      
                      {/* Growth Indicator */}
                      <div className="trend-growth">
                        <span className="growth-label">Trending</span>
                        <span className="growth-value" style={{ color: '#10b981' }}>
                          {item.growth}
                        </span>
                      </div>

                      {/* View Button */}
                      <div className="trend-button-wrapper mt-3">
                        <span className={`trend-view-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all hover:scale-105`}>
                          View Details
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/trend_dashboard"
            className={`view-all-btn ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:from-sky-700 hover:to-sky-600'} ${theme.buttonColors?.primaryButton?.textColor || 'text-white'} px-6 sm:px-8 py-3 text-base sm:text-lg font-medium inline-flex items-center gap-2 hover:scale-105 transition-all rounded-lg`}
          >
            View Full Dashboard
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx="true">{`
        .trend-slider-section {
          padding: 3rem 0;
        }

        .trend-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .trend-icon {
          font-size: 2rem;
        }

        .trend-slider-wrapper {
          margin: 0 -0.5rem;
        }

        .trend-card {
          position: relative;
          cursor: pointer;
        }

        .trend-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
          z-index: 10;
        }

        .trend-badge-icon {
          font-size: 0.75rem;
        }

        .trend-score-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #f59e0b;
          z-index: 10;
        }

        .trend-score-icon {
          font-size: 0.7rem;
        }

        .trend-score-value {
          font-weight: 700;
        }

        .trend-image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }

        .trend-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .trend-card:hover .trend-image {
          transform: scale(1.05);
        }

        .trend-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 640px) {
          .trend-title {
            font-size: 1.1rem;
          }
        }

        .trend-author {
          font-size: 0.8rem;
        }

        .trend-growth {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .dark .trend-growth {
          border-color: #374151;
        }

        .growth-label {
          font-size: 0.7rem;
          color: #6b7280;
        }

        .growth-value {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .trend-view-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .view-all-btn {
          transition: all 0.3s ease;
        }

        /* Slider Custom Styles */
        .slick-dots {
          bottom: -2rem;
        }

        .slick-dots li button:before {
          font-size: 0.5rem;
          color: ${isDarkMode ? "#9ca3af" : "#d1d5db"};
          opacity: 0.5;
        }

        .slick-dots li.slick-active button:before {
          color: ${isDarkMode ? "#60a5fa" : "#3b82f6"};
          opacity: 1;
        }

        .slick-prev:before,
        .slick-next:before {
          color: ${isDarkMode ? "#60a5fa" : "#3b82f6"};
          font-size: 1.5rem;
        }

        .slick-prev {
          left: -1.5rem;
        }

        .slick-next {
          right: -1.5rem;
        }

        @media (max-width: 768px) {
          .slick-prev:before,
          .slick-next:before {
            font-size: 1rem;
          }
          
          .slick-prev {
            left: -1rem;
          }
          
          .slick-next {
            right: -1rem;
          }
        }

        @media (max-width: 640px) {
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrendDashboardSlider;