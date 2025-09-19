import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, Users, Activity, UserCircle, Stethoscope, Building2 } from "lucide-react";
import "./LandingPage.css";
import SiteHeader from "./components/SiteHeader";
import LandingSidebar from "./components/LandingSidebar";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const project = {
    title: "Digital Health Record System (DHRS)",
    tagline: "A Secure, Centralized Platform for Smarter Healthcare",
    description:
      "The Digital Health Record System provides a centralized and secure platform for managing patient medical records. Patients can upload prescriptions, reports, vaccination records, and past diagnoses in digital format. Doctors can view authorized patient data for consultations, ensuring faster decision-making and better treatment planning. This system improves hospital efficiency, reduces paperwork, and enables quick data access while maintaining data security and privacy.",
    features: [
      "Patients can upload prescriptions, reports, and vaccination records.",
      "Doctors can access authorized data for better treatment planning.",
      "Centralized system reduces paperwork and improves efficiency.",
      "Quick access to data while ensuring security and privacy.",
    ],
    roles: [
      {
        icon: <UserCircle />,
        role: "Patient",
        points: [
          "Register, log in, and manage personal medical records.",
          "Upload prescriptions, lab reports, and past health records.",
          "Control access by granting or revoking permissions for doctors.",
        ],
      },
      {
        icon: <Stethoscope />,
        role: "Doctor",
        points: [
          "Securely view patient health records when authorized.",
          "Add consultation notes and treatment updates.",
        ],
      },
      {
        icon: <Building2 />,
        role: "Admin (Hospital Authority)",
        points: [
          "Manage doctors, verify patients, and ensure data privacy compliance.",
        ],
      },
    ],
  };

  return (
    <div className="landing-root">
      <SiteHeader hideNav showMenuButton onMenuClick={() => setMenuOpen(true)} />
      <div className="landing-body">
        {menuOpen && (
          <LandingSidebar className="overlay" onClose={() => setMenuOpen(false)} />
        )}
        <div className="landing-main">
          {/* Hero Section */}
          <section className="hero">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-title"
            >
              {project.title}
            </motion.h1>
            <p className="hero-tagline">{project.tagline}</p>
            <motion.button whileHover={{ scale: 1.05 }} className="hero-btn">
              Learn More
            </motion.button>
          </section>

          {/* About Section */}
          <section id="about" className="section">
            <h2>About the Project</h2>
            <p className="lead">{project.description}</p>
          </section>

          {/* Features Section */}
          <section id="features" className="section section-alt">
            <h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <FileText size={24} /> Key Features
              </span>
            </h2>
            <div className="features-grid">
              {project.features.map((f, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="feature-card">
                  <p>{f}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Roles Section */}
          <section id="roles" className="section">
            <h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={24} /> User Roles & Responsibilities
              </span>
            </h2>
            <div className="roles-grid">
              {project.roles.map((role, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="role-card">
                  <div className="role-header">
                    {role.icon} {role.role}
                  </div>
                  <ul className="role-points">
                    {role.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p className="line">
              <Users size={16} /> Designed for hospitals, doctors, and patients.
            </p>
            <p className="line">
              <Activity size={16} /> Enhancing efficiency, security, and patient care.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}