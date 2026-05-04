"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import SocialFooter from "./SocialFooter";
import LegalFooter from "./LegalFooter";

const Footer = () => {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <footer className={`${theme.background?.navigationDots || 'bg-gray-100 dark:bg-gray-800'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Main Footer Content */}
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4 py-8`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-4`}>
              BookQubit
            </h3>
            <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
              Your gateway to endless stories and knowledge.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-4`}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-4`}>
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/books" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  Books
                </a>
              </li>
              <li>
                <a href="/comics" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  Comics
                </a>
              </li>
              <li>
                <a href="/authors" className={`${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} transition`}>
                  Authors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-4`}>
              Get in Touch
            </h3>
            <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-2`}>
              Email: support@bookqubit.com
            </p>
            <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
              Follow us on social media
            </p>
          </div>
        </div>
      </div>

      {/* Social Footer */}
      <SocialFooter />
      
      {/* Legal Footer */}
      <LegalFooter />
    </footer>
  );
};

export default Footer;