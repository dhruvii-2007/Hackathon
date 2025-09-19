import React from "react";
import { Link } from "react-router-dom";
import "./LandingSidebar.css";

export default function LandingSidebar({ className = "", onClose }) {
  return (
    <aside className={`landing-sidebar ${className}`}>
      <div className="lsb-inner">
        <button className="lsb-close" onClick={onClose} aria-label="Close menu">✕</button>
        <div className="lsb-section">Navigation</div>
        <nav className="lsb-nav">
          <a href="#about" onClick={onClose}>About</a>
          <a href="#features" onClick={onClose}>Features</a>
          <a href="#roles" onClick={onClose}>Roles</a>
        </nav>

        <div className="lsb-section">Get Started</div>
        <nav className="lsb-nav">
          <Link to="/login" onClick={onClose}>Login</Link>
          <Link to="/patient" onClick={onClose}>Patient</Link>
          <Link to="/doctor" onClick={onClose}>Doctor</Link>
          <Link to="/admin" onClick={onClose}>Admin</Link>
        </nav>
      </div>
    </aside>
  );
}
