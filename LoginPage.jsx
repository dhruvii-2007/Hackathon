import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, role);
    // Redirect smartly based on role
    const target = role === "patient" ? "/patient" : role === "doctor" ? "/doctor" : "/admin";
    navigate(from === "/" ? target : from, { replace: true });
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "#f9fafb" }}>
      <form onSubmit={onSubmit} style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)", width: 360 }}>
        <h1 style={{ marginTop: 0 }}>Login</h1>
        <label style={{ display: "block", marginBottom: 12 }}>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" required style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1" }} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1" }}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" style={{ width: "100%", padding: 12, background: "#0ea5a4", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700 }}>Sign In</button>
      </form>
    </div>
  );
}
