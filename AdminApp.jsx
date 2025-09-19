import React from "react";
import "./PatientApp.css";
import { useAuth } from "./auth/AuthContext";

export default function AdminApp() {
  const { user, logout } = useAuth();
  return (
    <div className="patient-app">
      <nav className="navbar">
        <h1 className="logo">Admin Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14 }}>{user?.email}</span>
          <button onClick={logout} style={{ padding: "8px 12px", background: "#e11d48" }}>Logout</button>
        </div>
      </nav>
      <main className="content">
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginTop: 0 }}>Welcome, Admin</h2>
          <p>Manage doctors, verify patients, and review audit logs (scaffold).</p>
          <ul>
            <li>Doctors management (to build)</li>
            <li>Patients verification (to build)</li>
            <li>Audit & compliance reports (to build)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
