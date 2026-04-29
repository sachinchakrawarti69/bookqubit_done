"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { FaTwitter, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  const { theme, themeName } = useTheme();

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Social links
  const socialLinks = [
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/bookqubit", color: "hover:text-blue-400" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/bookqubit", color: "hover:text-pink-500" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com/bookqubit", color: "hover:text-blue-600" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/bookqubit", color: "hover:text-gray-700 dark:hover:text-gray-300" },
  ];

  const footerBg = isDarkMode 
    ? theme.background?.navigationDots || "bg-gray-800" 
    : theme.background?.navigationDots || "bg-gray-100";
  
  const borderColor = isDarkMode 
    ? "border-gray-700" 
    : theme.border?.default || "border-gray-200";
  
  const textPrimary = isDarkMode 
    ? theme.textColors?.primary || "text-white" 
    : theme.textColors?.primary || "text-gray-800";
  
  const textSecondary = isDarkMode 
    ? theme.textColors?.secondary || "text-gray-400" 
    : theme.textColors?.secondary || "text-gray-600";
  
  const headingColor = isDarkMode 
    ? theme.textColors?.highlight || "text-blue-400" 
    : theme.textColors?.highlight || "text-gray-800";

  return (
    <footer className={`${footerBg} border-t ${borderColor} py-8 mt-auto`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand / About */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
              BookQubit
            </h3>
            <p className={`text-sm ${textSecondary}`}>
              Your gateway to endless stories and knowledge. Discover, explore, and immerse yourself in a world of books, comics, and publications.
            </p>
            {/* Dark mode indicator (optional) */}
            {isDarkMode && (
              <div className="mt-3">
                <span className={`text-xs ${textSecondary} bg-gray-700 px-2 py-1 rounded`}>
                  🌙 Dark Theme Active
                </span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className={`${textSecondary} hover:${theme.textColors?.highlight || "text-gray-900 dark:text-blue-400"} transition`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${textSecondary} hover:${theme.textColors?.highlight || "text-gray-900 dark:text-blue-400"} transition`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`${textSecondary} hover:${theme.textColors?.highlight || "text-gray-900 dark:text-blue-400"} transition`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={`${textSecondary} hover:${theme.textColors?.highlight || "text-gray-900 dark:text-blue-400"} transition`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={`${textSecondary} hover:${theme.textColors?.highlight || "text-gray-900 dark:text-blue-400"} transition`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
              Connect
            </h3>
            <p className={`text-sm ${textSecondary} mb-3`}>
              Follow us on social media
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textSecondary} ${social.color} transition-all hover:scale-110 duration-200 text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Newsletter Signup (optional) */}
            <div className="mt-6">
              <p className={`text-sm ${textSecondary} mb-2`}>
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-1 text-sm rounded-lg border ${borderColor} ${textSecondary} ${isDarkMode ? 'bg-gray-700' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  className={`px-3 py-1 text-sm rounded-lg ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} text-white hover:scale-105 transition`}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${borderColor} mt-8 pt-4 text-center text-sm ${textSecondary}`}>
          &copy; {new Date().getFullYear()} BookQubit. All rights reserved.
          <span className="mx-2">•</span>
          <span className="text-xs">Made with ❤️ for readers worldwide</span>
        </div>
      </div>
    </footer>
  );
}