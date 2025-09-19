import React from "react";
import DoctorPortalPage from "./DoctorPortalPage";
import "./PatientApp.css"; // reuse base layout styles for consistency
import { useAuth } from "./auth/AuthContext";

export default function DoctorApp() {
  const { user, logout } = useAuth();
  return (
    <div className="patient-app">
      <nav className="navbar">
        <h1 className="logo">Doctor Portal</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14 }}>{user?.email}</span>
          <button onClick={logout} style={{ padding: "8px 12px", background: "#e11d48" }}>Logout</button>
        </div>
      </nav>
      <main className="content">
        <DoctorPortalPage />
      </main>
    </div>
  );
}
