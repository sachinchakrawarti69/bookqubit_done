"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="drift-navbar">
      <div className="drift-navbar-container">

        <div className="drift-logo">
          <Link href="/drift">
            <span className="drift-logo-text">BookQubit Drift</span>
          </Link>
        </div>

        <nav className="drift-nav">
          <Link
            href="/"
            className="drift-mode-switch"
          >
            📚 Discovery
          </Link>

          <span className="drift-active-mode">
            💬 Drift
          </span>
        </nav>

        <div className="drift-actions">
          <Link href="/drift/search" className="drift-action-btn">
            Search
          </Link>

          <Link href="/drift/notifications" className="drift-action-btn">
            Notifications
          </Link>

          <Link href="/drift/profile" className="drift-profile-btn">
            Profile
          </Link>
        </div>

      </div>
    </header>
  );
}