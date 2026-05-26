"use client";

import { useState, useEffect } from "react";
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
  FaBook,
  FaUserFriends,
  FaFire,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import "./footer.css";

const BookQubitSnapFooter = () => {
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
      { label: "Feed", href: "/bookqubitsnap?tab=feed", icon: FaBook },
      { label: "Authors", href: "/bookqubitsnap?tab=authors", icon: FaUserFriends },
      { label: "Trending", href: "/bookqubitsnap?tab=trending", icon: FaFire },
    ],
    resources: [
      { label: "About Us", href: "/about", icon: null },
      { label: "Help Center", href: "/help", icon: null },
      { label: "FAQ", href: "/faq", icon: FaQuestionCircle },
      { label: "Contact", href: "/contact", icon: FaEnvelope },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy", icon: null },
      { label: "Terms of Service", href: "/terms", icon: null },
      { label: "Cookie Policy", href: "/cookies", icon: null },
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
    <footer className={`bookqubitsnap-footer ${isDarkMode ? "dark" : "light"}`} dir={direction}>
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-text">Get the latest book recommendations and community updates</p>
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
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">📚</span>
              <span className="logo-text">BookQubitSnap</span>
            </div>
            <p className="footer-tagline">Connect with readers and authors worldwide</p>
            <div className="footer-contact">
              <p><FaEnvelope /> support@bookqubitsnap.com</p>
              <p><FaPhone /> +1 (555) 123-4567</p>
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="footer-links">
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
                  {link.icon && <link.icon className="link-icon" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="footer-links-column">
              <h4>Legal</h4>
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.icon && <link.icon className="link-icon" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Section */}
          <div className="footer-social">
            <h4>Follow Us</h4>
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
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© {currentYear} BookQubitSnap. All rights reserved.</p>
            <p className="made-with-love">
              Made with <FaHeart /> for book lovers
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default BookQubitSnapFooter;