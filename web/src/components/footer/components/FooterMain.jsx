"use client";

import React from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaBrain,
  FaHeadphones,
  FaLightbulb,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const FooterMain = () => {
  const { theme, themeName } = useTheme();

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const features = [
    {
      icon: <FaBrain className="text-2xl text-white" />,
      title: "Intelligent Discovery",
      description:
        "AI-powered recommendations based on your reading patterns and interests.",
      gradient: "from-sky-500 to-cyan-400",
      link: "/features/ai-discovery",
    },
    {
      icon: <FaHeadphones className="text-2xl text-white" />,
      title: "Immersive Audio",
      description:
        "Professional audiobooks and summaries for learning on the go.",
      gradient: "from-blue-500 to-indigo-400",
      link: "/features/audiobooks",
    },
    {
      icon: <FaLightbulb className="text-2xl text-white" />,
      title: "Deep Insights",
      description:
        "Critical analysis and philosophical perspectives on every book.",
      gradient: "from-purple-500 to-pink-400",
      link: "/features/insights",
    },
  ];

  const stats = [
    {
      value: "50K+",
      label: "Books",
      desc: "Curated Collection",
      gradient: "from-sky-500 to-blue-500",
      icon: "📚",
    },
    {
      value: "10K+",
      label: "Authors",
      desc: "Global Community",
      gradient: "from-emerald-500 to-green-500",
      icon: "✍️",
    },
    {
      value: "1M+",
      label: "Readers",
      desc: "Active Community",
      gradient: "from-amber-500 to-orange-500",
      icon: "👥",
    },
    {
      value: "99%",
      label: "Satisfaction",
      desc: "Rating",
      gradient: "from-rose-500 to-pink-500",
      icon: "⭐",
    },
  ];

  const featuresList = [
    "✓ Unlimited Book Access",
    "✓ AI Summaries & Analysis",
    "✓ Ad-Free Experience",
  ];

  return (
    <section className={`${theme.background?.section || 'bg-white dark:bg-gray-900'} relative overflow-hidden`}>
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? "from-gray-900/30 via-gray-800 to-gray-900/20" : "from-sky-50/30 via-white to-blue-50/20"} -z-10`}
      />

      {/* Animated Background Elements */}
      <div
        className={`absolute top-10 left-10 w-72 h-72 ${isDarkMode ? "bg-blue-900/20" : "bg-sky-100"} rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-10" : "opacity-20"} animate-blob`}
      ></div>
      <div
        className={`absolute top-10 right-10 w-72 h-72 ${isDarkMode ? "bg-indigo-900/20" : "bg-blue-100"} rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-10" : "opacity-20"} animate-blob animation-delay-2000`}
      ></div>
      <div
        className={`absolute -bottom-8 left-20 w-72 h-72 ${isDarkMode ? "bg-sky-900/20" : "bg-sky-200"} rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob animation-delay-4000`}
      ></div>

      <div
        className={`max-w-7xl mx-auto ${theme.layout?.sectionPadding || 'py-12 px-4 sm:px-6 lg:px-8'} relative z-10`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Brand & Tagline */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              The Future of Reading
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-xl opacity-30"></div>
                <FaBookOpen className="relative text-5xl text-white p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-2xl" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent mb-2">
                BookQubit
              </h1>
              <p className={`text-lg ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} max-w-md`}>
                Where literature meets intelligence
              </p>
            </div>

            {/* Main Vision Statement */}
            <div className="max-w-3xl mx-auto">
              <p
                className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-xl sm:text-2xl leading-relaxed sm:leading-loose font-medium`}
              >
                Your{" "}
                <span className="font-bold text-sky-600">quantum leap</span>{" "}
                into the world of literature. We bridge timeless wisdom with
                modern intelligence, creating a reading ecosystem that grows
                with your mind.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative ${theme.background?.section || 'bg-white dark:bg-gray-800'} rounded-2xl border ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-3 group-hover:text-sky-600 transition-colors`}
                >
                  {feature.title}
                </h3>
                <p className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} leading-relaxed`}>
                  {feature.description}
                </p>
                <div className="mt-6">
                  <Link
                    href={feature.link}
                    className={`inline-flex items-center text-sm font-medium ${theme.textColors?.highlight || 'text-sky-600'} hover:text-sky-700 group/learn`}
                  >
                    Learn more
                    <FaArrowRight className="ml-2 text-xs transition-transform group-hover/learn:translate-x-1" />
                  </Link>
                </div>

                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? "from-sky-900/10 to-blue-900/10" : "from-sky-50/0 to-blue-50/0"} group-hover:${isDarkMode ? "from-sky-900/30 to-blue-900/30" : "from-sky-50/30 to-blue-50/30"} rounded-2xl -z-10 transition-all duration-500`}
                />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8">
              <h2
                className={`text-2xl sm:text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-3`}
              >
                Trusted by Readers Worldwide
              </h2>
              <p className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} max-w-2xl mx-auto`}>
                Join our growing community of curious minds and lifelong
                learners.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`group relative ${theme.background?.section || 'bg-white dark:bg-gray-800'} rounded-xl sm:rounded-2xl border ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} p-4 sm:p-6 hover:shadow-xl hover:border-sky-200 transition-all duration-300`}
                >
                  <div className="text-3xl sm:text-4xl mb-3">{stat.icon}</div>
                  <div
                    className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm sm:text-base font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
                  >
                    {stat.label}
                  </div>
                  <div className={`text-xs ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mt-1`}>
                    {stat.desc}
                  </div>

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-3/4 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div
            className={`bg-gradient-to-r ${isDarkMode ? "from-gray-800 to-gray-900" : "from-sky-50 to-blue-50"} rounded-3xl sm:rounded-4xl p-6 sm:p-10 md:p-12 text-center border ${isDarkMode ? "border-gray-700" : "border-sky-100"} shadow-lg`}
          >
            <div className="max-w-2xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <FaRocket className="text-xs" />
                <span>Limited Time: 30-Day Premium Trial</span>
              </div>

              {/* Main CTA */}
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-4`}
              >
                Begin Your Intellectual Journey
              </h2>

              <p
                className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed`}
              >
                Access our complete library, AI-powered tools, and join a
                community that values deep thinking and continuous learning.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {featuresList.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/premium/trial"
                  className="group relative px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-sky-500/30 active:scale-[0.98] transition-all duration-300 text-base min-w-[200px] overflow-hidden inline-block text-center"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/demo"
                  className={`group px-8 py-4 ${theme.background?.section || 'bg-white dark:bg-gray-800'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} font-semibold rounded-xl border-2 ${isDarkMode ? "border-gray-700 hover:border-gray-600" : "border-sky-200 hover:border-sky-300"} ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-sky-50"} transition-all duration-300 text-base min-w-[200px] inline-block text-center`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Watch Demo
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div
                className={`mt-8 pt-6 border-t ${isDarkMode ? "border-gray-700" : "border-sky-200"}`}
              >
                <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-3`}>
                  Trusted and secure
                </p>
                <div
                  className={`flex justify-center gap-6 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
                >
                  <span className="text-xs">🔒 SSL Encrypted</span>
                  <span className="text-xs">💳 Secure Payment</span>
                  <span className="text-xs">📱 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Inspiration */}
          <div className="mt-12 sm:mt-16 text-center">
            <div
              className={`inline-flex items-center gap-3 bg-gradient-to-r ${isDarkMode ? "from-purple-900/30 to-pink-900/30" : "from-purple-50 to-pink-50"} px-6 py-4 rounded-2xl border ${isDarkMode ? "border-purple-800" : "border-purple-100"}`}
            >
              <FaLightbulb
                className={`text-2xl ${theme.textColors?.highlight || 'text-sky-600'}`}
              />
              <p className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} font-medium`}>
                "The more that you read, the more things you will know. The more
                that you learn, the more places you'll go."
                <span
                  className={`block text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mt-1`}
                >
                  — Dr. Seuss
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default FooterMain;