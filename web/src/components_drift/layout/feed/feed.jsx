// src/components_drift/layout/feed/feed.jsx

"use client";

import { useState, useEffect } from "react";
import FeedDesktop from "./feed_desktop/feed_desktop";
import FeedMobile from "./feed_mobile/feed_mobile";
import "./feed.css";

export default function Feed() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <FeedMobile />;
  }

  return <FeedDesktop />;
}