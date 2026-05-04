"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

const ExplorePage = () => {
  const { theme, themeName } = useTheme();

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const footerLinks = [
    {
      title: "Explore Library",
      subtitle: "Discover new reads",
      icon: <span className={theme.textColors?.highlight || 'text-sky-600'}>📚</span>,
      links: [
        {
          name: "Featured Books",
          href: "/books/featured",
          icon: <span className="text-amber-400 text-sm">⭐</span>,
        },
        {
          name: "New Releases",
          href: "/books/new",
          icon: <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>,
        },
        {
          name: "Genres",
          href: "/genres",
          icon: <span className="text-purple-400 text-sm">🏷️</span>,
        },
        {
          name: "Collections",
          href: "/collections",
          icon: <span className="text-indigo-400 text-sm">📚</span>,
        },
      ],
      gradient: "from-sky-50 to-blue-50",
      darkGradient: "from-sky-900/30 to-blue-900/30",
    },
    {
      title: "News & Blog",
      subtitle: "Latest updates & articles",
      icon: <span className="text-rose-500">📰</span>,
      links: [
        {
          name: "News",
          href: "/news",
          icon: <span className="text-red-400 text-sm">📰</span>,
        },
        {
          name: "Blog Articles",
          href: "/blog",
          icon: <span className="text-blue-400 text-sm">✍️</span>,
        },
        {
          name: "Book Reviews & Analysis",
          href: "/book-reviews",
          icon: <span className="text-amber-400 text-sm">⭐</span>,
        },
      ],
      gradient: "from-rose-50 to-orange-50",
      darkGradient: "from-rose-900/30 to-orange-900/30",
    },
    {
      title: "Features",
      subtitle: "Premium tools",
      icon: <span className="text-purple-500">🤖</span>,
      links: [
        {
          name: "AI Book Summaries",
          href: "/book-summarizer",
          icon: (
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
          ),
        },
        {
          name: "Audiobooks",
          href: "/audiobooks",
          icon: <span className="text-rose-400 text-sm">🎧</span>,
        },
        {
          name: "Reading Lists",
          href: "/reading-lists",
          icon: <span className="text-emerald-400 text-sm">📋</span>,
        },
        {
          name: "AI Assistant",
          href: "/ai-assistant",
          icon: (
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
          ),
        },
      ],
      gradient: "from-purple-50 to-pink-50",
      darkGradient: "from-purple-900/30 to-pink-900/30",
    },
    {
      title: "Help & Support",
      subtitle: "Get assistance",
      icon: <span className="text-rose-500">🆘</span>,
      links: [
        {
          name: "Help Center",
          href: "/help",
          icon: <span className="text-sky-400 text-sm">❓</span>,
        },
        {
          name: "Contact Support",
          href: "/support/contact",
          icon: <span className="text-rose-400 text-sm">🤝</span>,
        },
        {
          name: "FAQ",
          href: "/faq",
          icon: <span className="text-amber-400 text-sm">❓</span>,
        },
        {
          name: "Troubleshooting",
          href: "/support/troubleshooting",
          icon: (
            <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></span>
          ),
        },
      ],
      gradient: "from-rose-50 to-pink-50",
      darkGradient: "from-rose-900/30 to-pink-900/30",
    },
    {
      title: "Community",
      subtitle: "Connect & share",
      icon: <span className="text-emerald-500">👥</span>,
      links: [
        {
          name: "Forums",
          href: "/community/forums",
          icon: <span className="text-blue-400 text-sm">💬</span>,
        },
        {
          name: "Book Clubs",
          href: "/community/book-clubs",
          icon: <span className="text-purple-400 text-sm">👥</span>,
        },
        {
          name: "Events",
          href: "/community/events",
          icon: <span className="text-amber-400 text-sm">📅</span>,
        },
        {
          name: "Contributors",
          href: "/community/contributors",
          icon: <span className="text-cyan-400 text-sm">🏅</span>,
        },
      ],
      gradient: "from-emerald-50 to-green-50",
      darkGradient: "from-emerald-900/30 to-green-900/30",
    },
    {
      title: "Authors",
      subtitle: "Meet the creators",
      icon: <span className="text-amber-500">✍️</span>,
      links: [
        {
          name: "All Authors",
          href: "/authors",
          icon: <span className="text-sky-400 text-sm">👥</span>,
        },
        {
          name: "Top Authors",
          href: "/authors/top",
          icon: <span className="text-amber-400 text-sm">👑</span>,
        },
      ],
      gradient: "from-amber-50 to-orange-50",
      darkGradient: "from-amber-900/30 to-orange-900/30",
    },
    {
      title: "About",
      subtitle: "Learn more",
      icon: <span className="text-indigo-500">ℹ️</span>,
      links: [
        {
          name: "About Us",
          href: "/about-us",
          icon: <span className="w-2 h-2 bg-sky-400 rounded-full"></span>,
        },
        {
          name: "Contact",
          href: "/contact",
          icon: <span className="text-rose-400 text-sm">✉️</span>,
        },
        {
          name: "Terms of Service",
          href: "/terms",
          icon: <span className="text-gray-400 text-sm">📄</span>,
        },
        {
          name: "Privacy Policy",
          href: "/privacy",
          icon: <span className="text-indigo-400 text-sm">🛡️</span>,
        },
      ],
      gradient: "from-indigo-50 to-purple-50",
      darkGradient: "from-indigo-900/30 to-purple-900/30",
    },
  ];

  return (
    <section className={`${theme.background?.section || 'bg-white dark:bg-gray-900'} mt-10 py-12`}>
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4 sm:px-6`}>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4">
            <span className="text-xs">📚</span>
            Explore BookQubit
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-3`}
          >
            Discover Your{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
              Reading Ecosystem
            </span>
          </h2>

          <p
            className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-sm sm:text-base max-w-2xl mx-auto`}
          >
            Explore our vast library, premium features, developer tools, and
            vibrant community all in one place.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {footerLinks.map((col) => (
            <div
              key={col.title}
              className={`
                group relative 
                ${theme.background?.section || 'bg-white dark:bg-gray-800'} 
                ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} 
                ${theme.shadow?.container || 'shadow-lg'}
                rounded-2xl 
                p-5 sm:p-6 
                hover:shadow-xl 
                transition-all duration-300 
                hover:-translate-y-1
                ${theme.ringEffect || ''}
              `}
            >
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div
                  className={`
                    relative w-12 h-12 rounded-xl 
                    bg-gradient-to-br ${isDarkMode ? col.darkGradient : col.gradient} 
                    flex items-center justify-center 
                    group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  {col.icon}
                </div>
                <div>
                  <h3
                    className={`text-lg sm:text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} group-hover:text-sky-600 transition-colors`}
                  >
                    {col.title}
                  </h3>
                  <p
                    className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-xs sm:text-sm mt-1`}
                  >
                    {col.subtitle}
                  </p>
                </div>
              </div>

              {/* Links List */}
              <ul className="space-y-2 sm:space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`
                        flex items-center justify-between p-2 sm:p-3 
                        rounded-lg 
                        hover:bg-gradient-to-r ${isDarkMode ? "hover:from-gray-800 hover:to-gray-900" : "hover:from-gray-50 hover:to-white"}
                        group/link 
                        transition-all duration-200 
                        active:scale-[0.98]
                        ${theme.border?.button || 'border border-transparent'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-md bg-gradient-to-br ${isDarkMode ? "from-gray-700 to-gray-800" : "from-sky-50 to-blue-50"} flex items-center justify-center`}
                        >
                          {link.icon}
                        </div>
                        <span
                          className={`text-sm sm:text-base font-medium ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} group-hover/link:text-sky-600 transition-colors`}
                        >
                          {link.name}
                        </span>
                      </div>
                      <span
                        className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-xs group-hover/link:text-sky-500 group-hover/link:translate-x-1 transition-all duration-300`}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-sky-500/50 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;