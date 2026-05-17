"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBooksByLanguage } from "@/data/books";

const TrendDashboardSlider = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [sliderKey, setSliderKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [trendingItems, setTrendingItems] = useState([]);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Get books data based on language
  const booksData = getBooksByLanguage(language);

  // Generate trending items from real data
  useEffect(() => {
    if (booksData && booksData.length > 0) {
      const items = [];
      
      // Add top 4 books
      booksData.slice(0, 4).forEach((book, index) => {
        items.push({
          id: `book-${book.id || index}`,
          type: "book",
          title: book.title,
          author: book.author,
          cover: book.imageUrl || book.coverImage || "https://via.placeholder.com/120x180?text=Book",
          trendScore: Math.floor(Math.random() * 30) + 70,
          growth: `+${Math.floor(Math.random() * 50) + 20}%`,
          link: `/books/${book.slug || book.id}`,
        });
      });
      
      // Add mock authors (you can replace with real author data)
      const mockAuthors = [
        { name: "Matt Haig", title: "Best-selling Author", trendScore: 96, growth: "+52%", slug: "matt-haig" },
        { name: "James Clear", title: "Productivity Expert", trendScore: 94, growth: "+48%", slug: "james-clear" },
        { name: "Andy Weir", title: "Science Fiction Writer", trendScore: 91, growth: "+42%", slug: "andy-weir" },
      ];
      
      mockAuthors.forEach((author, index) => {
        items.push({
          id: `author-${index}`,
          type: "author",
          title: author.name,
          author: author.title,
          cover: "https://via.placeholder.com/120x180?text=Author",
          trendScore: author.trendScore,
          growth: author.growth,
          link: `/authors/${author.slug}`,
        });
      });
      
      // Add mock comics (you can replace with real comic data)
      const mockComics = [
        { title: "Spider-Man: Across the Spider-Verse", publisher: "Marvel", trendScore: 97, growth: "+67%", slug: "spider-man" },
        { title: "Batman: The Dark Knight Returns", publisher: "DC", trendScore: 94, growth: "+54%", slug: "batman-dark-knight" },
      ];
      
      mockComics.forEach((comic, index) => {
        items.push({
          id: `comic-${index}`,
          type: "comic",
          title: comic.title,
          author: comic.publisher,
          cover: "https://via.placeholder.com/120x180?text=Comic",
          trendScore: comic.trendScore,
          growth: comic.growth,
          link: `/comics/${comic.slug}`,
        });
      });
      
      setTrendingItems(items.slice(0, 10));
    }
  }, [booksData, language]);

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

  // Get theme-based gradient for icon wrapper
  const getIconWrapperGradient = () => {
    if (theme.buttonColors?.primaryButton?.background) {
      return theme.buttonColors.primaryButton.background;
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  if (!mounted || trendingItems.length === 0) {
    return null;
  }

  return (
    <section
      className="trend-slider-section"
      style={{
        background: theme.background?.section || (isDarkMode ? '#111827' : '#f9fafb'),
        padding: '3rem 0',
        transition: 'background 0.3s ease'
      }}
    >
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div 
              className="trend-icon-wrapper"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: getIconWrapperGradient(),
                boxShadow: theme.shadow?.button || '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="trend-icon" style={{ fontSize: '2rem' }}>🔥</span>
            </div>
          </div>
          <h2 
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: theme.textColors?.primary || (isDarkMode ? '#ffffff' : '#1f2937') }}
          >
            {t("trend.trending_now")}
          </h2>
          <p 
            className="text-sm md:text-lg max-w-2xl mx-auto"
            style={{ color: theme.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280') }}
          >
            {t("trend.discover_whats_hot")}
          </p>
        </div>

        {/* Slider */}
        <div className="trend-slider-wrapper" style={{ margin: '0 -0.5rem' }}>
          <Slider key={sliderKey} {...sliderSettings}>
            {trendingItems.map((item) => (
              <div key={item.id} className="px-2 outline-none">
                <Link href={item.link}>
                  <div 
                    className="trend-card"
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      background: theme.background?.bookCoverSide || (isDarkMode ? '#1f2937' : '#ffffff'),
                      border: theme.border?.default || `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      boxShadow: theme.shadow?.container || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadow?.container || '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {/* Trend Badge */}
                    <div 
                      className="trend-badge"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: getTypeBadgeColor(item.type),
                        zIndex: 10
                      }}
                    >
                      <span className="trend-badge-icon" style={{ fontSize: '0.75rem' }}>{getTypeIcon(item.type)}</span>
                      <span className="trend-badge-text">{t(`trend.${item.type}`) || item.type}</span>
                    </div>

                    {/* Trend Score */}
                    <div 
                      className="trend-score-badge"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#f59e0b',
                        zIndex: 10
                      }}
                    >
                      <span className="trend-score-icon" style={{ fontSize: '0.7rem' }}>🔥</span>
                      <span className="trend-score-value" style={{ fontWeight: '700' }}>{item.trendScore}</span>
                    </div>

                    {/* Image */}
                    <div 
                      className="trend-image-wrapper"
                      style={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                      }}
                    >
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="trend-image"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/120x180?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="trend-content" style={{ padding: '1rem' }}>
                      <h3 
                        className="trend-title"
                        style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          marginBottom: '0.25rem',
                          color: theme.textColors?.primary || (isDarkMode ? '#ffffff' : '#1f2937'),
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="trend-author"
                        style={{
                          fontSize: '0.8rem',
                          marginBottom: '0.75rem',
                          color: theme.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280'),
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.author}
                      </p>
                      
                      {/* Growth Indicator */}
                      <div 
                        className="trend-growth"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0',
                          borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                          borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
                        }}
                      >
                        <span className="growth-label" style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                          {t("trend.trending") || "Trending"}
                        </span>
                        <span className="growth-value" style={{ fontSize: '0.8rem', fontWeight: '600', color: '#10b981' }}>
                          {item.growth}
                        </span>
                      </div>

                      {/* View Button */}
                      <div className="trend-button-wrapper" style={{ marginTop: '0.75rem' }}>
                        <span 
                          className="trend-view-btn"
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                            background: theme.buttonColors?.primaryButton?.background || 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                            color: 'white',
                            fontSize: '0.75rem',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '0.5rem',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          {t("trend.view_details")}
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
            className="view-all-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: theme.buttonColors?.primaryButton?.background || 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
              color: theme.buttonColors?.primaryButton?.textColor || 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {t("trend.view_full_dashboard")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx="true">{`
        @media (min-width: 640px) {
          .trend-title {
            font-size: 1.1rem !important;
          }
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
          z-index: 10;
        }

        .slick-next {
          right: -1.5rem;
          z-index: 10;
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

        /* RTL Support */
        [dir="rtl"] .trend-badge {
          left: auto;
          right: 0.75rem;
        }

        [dir="rtl"] .trend-score-badge {
          right: auto;
          left: 0.75rem;
        }

        [dir="rtl"] .slick-prev {
          left: auto;
          right: -1.5rem;
        }

        [dir="rtl"] .slick-next {
          right: auto;
          left: -1.5rem;
        }

        [dir="rtl"] .slick-prev:before {
          content: '→';
        }

        [dir="rtl"] .slick-next:before {
          content: '←';
        }
      `}</style>
    </section>
  );
};

export default TrendDashboardSlider;