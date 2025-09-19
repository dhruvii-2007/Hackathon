import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import PatientApp from "./PatientApp";
import DoctorApp from "./DoctorApp";
import AdminApp from "./AdminApp";
import LoginPage from "./LoginPage";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import LandingPage from "./LandingPage";

export default function RootApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/patient/*"
            element={
              <ProtectedRoute roles={["patient"]}>
                <PatientApp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor"
            element={
              <ProtectedRoute roles={["doctor"]}>
                <DoctorApp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminApp />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div style={{ padding: 24 }}>
                <h1>Not Found</h1>
                <p>
                  Go to <Link to="/">Home</Link>, <Link to="/patient">Patient App</Link> or {" "}
                  <Link to="/doctor">Doctor Portal</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
