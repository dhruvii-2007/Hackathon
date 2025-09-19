import React from "react";
import "./SiteHeader.css";
import { Link } from "react-router-dom";

export default function SiteHeader({ hideNav = false, showMenuButton = false, onMenuClick }) {
  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">
          <Link to="/">DHRS</Link>
        </div>
        {!hideNav && (
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/patient">Patient</Link>
            <Link to="/doctor">Doctor</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        )}
        {hideNav && showMenuButton && (
          <button className="menu-button" aria-label="Open menu" onClick={onMenuClick}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        )}
      </div>
    </header>
  );
}
