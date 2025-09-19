import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-section">Patient</div>
        <nav className="sidebar-nav">
          <NavLink to="profile" className={({ isActive }) => isActive ? "active" : undefined}>Profile</NavLink>
          <NavLink to="records" className={({ isActive }) => isActive ? "active" : undefined}>Medical Records</NavLink>
          <NavLink to="access" className={({ isActive }) => isActive ? "active" : undefined}>Access Control</NavLink>
        </nav>
        <div className="sidebar-section">Care</div>
        <nav className="sidebar-nav">
          <NavLink to="appointments" className={({ isActive }) => isActive ? "active" : undefined}>Appointments</NavLink>
          <NavLink to="sharing" className={({ isActive }) => isActive ? "active" : undefined}>Sharing</NavLink>
        </nav>
        <div className="sidebar-section">Activity</div>
        <nav className="sidebar-nav">
          <NavLink to="notifications" className={({ isActive }) => isActive ? "active" : undefined}>Notifications</NavLink>
          <NavLink to="history" className={({ isActive }) => isActive ? "active" : undefined}>History</NavLink>
        </nav>
      </div>
    </aside>
  );
}
