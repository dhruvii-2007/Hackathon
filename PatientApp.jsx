import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import PatientProfilePage from "./PatientProfilePage";
import PatientRecordsPage from "./PatientRecordsPage";
import "./PatientApp.css";
import PatientAccessPage from "./PatientAccessPage";
import { useAuth } from "./auth/AuthContext";
import PatientAppointmentsPage from "./PatientAppointmentsPage";
import PatientSharingPage from "./PatientSharingPage";
import PatientNotificationsPage from "./PatientNotificationsPage";
import PatientHistoryPage from "./PatientHistoryPage";
import Sidebar from "./components/Sidebar";

export default function PatientApp() {
  const { user, logout } = useAuth();
  return (
    <div className="patient-app">
      {/* Top Navigation */}
      <nav className="navbar">
        <h1 className="logo">Patient Portal</h1>
        <div className="nav-links">
          {/* Use relative paths under /patient/* */}
          <Link to="profile">Profile</Link>
          <Link to="records">Medical Records</Link>
          <Link to="access">Access Control</Link>
          <Link to="appointments">Appointments</Link>
          <Link to="sharing">Sharing</Link>
          <Link to="notifications">Notifications</Link>
          <Link to="history">History</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14 }}>{user?.email}</span>
          <button onClick={logout} style={{ padding: "8px 12px", background: "#e11d48" }}>Logout</button>
        </div>
      </nav>

      {/* Page Content with Sidebar */}
      <div className="app-body">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<PatientProfilePage />} />
            <Route path="records" element={<PatientRecordsPage />} />
            <Route path="access" element={<PatientAccessPage />} />
            <Route path="appointments" element={<PatientAppointmentsPage />} />
            <Route path="sharing" element={<PatientSharingPage />} />
            <Route path="notifications" element={<PatientNotificationsPage />} />
            <Route path="history" element={<PatientHistoryPage />} />
            {/* Fallback within patient section */}
            <Route path="*" element={<Navigate to="profile" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
