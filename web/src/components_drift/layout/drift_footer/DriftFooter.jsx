"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FaTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaGithub, 
  FaHeart, 
  FaYoutube,
  FaLinkedin,
  FaArrowUp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBook,
  FaUsers,
  FaCrown,
} from "react-icons/fa";
import { GiWaves } from "react-icons/gi";
import "./DriftFooter.css";

const DriftFooter = () => {
  const { theme, themeName } = useTheme();
  const { direction } = useRTL();
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    explore: [
      { label: "Home", href: "/drift", icon: GiWaves },
      { label: "Explore", href: "/drift/explore", icon: FaBook },
      { label: "Trending", href: "/drift/trending", icon: FaCrown },
      { label: "Communities", href: "/drift/communities", icon: FaUsers },
    ],
    resources: [
      { label: "About Drift", href: "/drift/about" },
      { label: "Help Center", href: "/drift/help" },
      { label: "Safety Tips", href: "/drift/safety" },
      { label: "Community Guidelines", href: "/drift/guidelines" },
    ],
    company: [
      { label: "About BookQubit", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact Us", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/drift/privacy" },
      { label: "Terms of Service", href: "/drift/terms" },
      { label: "Cookie Policy", href: "/drift/cookies" },
      { label: "Copyright", href: "/drift/copyright" },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com", color: "#1DA1F2", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", color: "#E4405F", label: "Instagram" },
    { icon: FaFacebook, href: "https://facebook.com", color: "#1877F2", label: "Facebook" },
    { icon: FaGithub, href: "https://github.com", color: "#333", label: "GitHub" },
    { icon: FaYoutube, href: "https://youtube.com", color: "#FF0000", label: "YouTube" },
    { icon: FaLinkedin, href: "https://linkedin.com", color: "#0077B5", label: "LinkedIn" },
  ];

  return (
    <footer className={`drift-footer ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="drift-footer-container">
        {/* Newsletter Section */}
        <div className="drift-newsletter">
          <div className="newsletter-content">
            <GiWaves className="newsletter-wave" />
            <h3 className="newsletter-title">Stay in the Drift</h3>
            <p className="newsletter-text">Get the latest updates, book recommendations, and community news</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="drift-footer-top">
          {/* Brand Section */}
          <div className="drift-footer-brand">
            <div className="drift-footer-logo">
              <GiWaves className="logo-wave" />
              <span className="logo-text">Drift</span>
              <span className="logo-by">by BookQubit</span>
            </div>
            <p className="footer-tagline">Where book lovers connect and stories come alive</p>
            <div className="footer-contact">
              <p><FaEnvelope /> hello@drift.com</p>
              <p><FaPhone /> +1 (555) 123-4567</p>
              <p><FaMapMarkerAlt /> San Francisco, CA</p>
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="drift-footer-links">
            <div className="footer-links-column">
              <h4>Explore</h4>
              {footerLinks.explore.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.icon && <link.icon className="link-icon" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="footer-links-column">
              <h4>Resources</h4>
              {footerLinks.resources.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="footer-links-column">
              <h4>Company</h4>
              {footerLinks.company.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="footer-links-column">
              <h4>Legal</h4>
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Section */}
          <div className="drift-footer-social">
            <h4>Follow the Drift</h4>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            <div className="app-download">
              <h4>Download App</h4>
              <div className="app-buttons">
                <button className="app-btn">App Store</button>
                <button className="app-btn">Google Play</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="drift-footer-bottom">
          <div className="footer-bottom-content">
            <p>© {currentYear} Drift by BookQubit. All rights reserved.</p>
            <p className="made-with-love">
              Made with <FaHeart /> for book lovers
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="drift-scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default DriftFooter;