"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="drift-footer">
      <div className="drift-footer-container">
        <div className="drift-footer-brand">
          <h3>BookQubit Drift</h3>
          <p>
            Connect with readers, share reviews, discuss books,
            and discover new ideas.
          </p>
        </div>

        <div className="drift-footer-links">
          <Link href="/drift">Home</Link>
          <Link href="/drift/explore">Explore</Link>
          <Link href="/drift/trending">Trending</Link>
          <Link href="/drift/profile">Profile</Link>
        </div>

        <div className="drift-footer-bottom">
          © {new Date().getFullYear()} BookQubit Drift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}