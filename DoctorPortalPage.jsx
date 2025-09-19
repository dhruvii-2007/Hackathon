import React, { useEffect, useMemo, useState } from "react";
import "./DoctorPortalPage.css";
import { loadGrant, clearGrant, loadRecords, pushAuditLog, pushNotification } from "./storage";

export default function DoctorPortalPage() {
  const [grant, setGrant] = useState(() => loadGrant());
  const [allRecords, setAllRecords] = useState(() => loadRecords() || []);
  const [consultationNotes, setConsultationNotes] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [savedBanner, setSavedBanner] = useState("");

  useEffect(() => {
    // Refresh records on mount (in case patient changed them)
    const rec = loadRecords();
    if (rec) setAllRecords(rec);
    // Refresh grant (and auto-expire if needed)
    setGrant(loadGrant());
    // Log that doctor opened portal
    pushAuditLog({ action: "doctor_portal_opened" });
  }, []);

  const authorized = !!grant;

  const visibleRecords = useMemo(() => {
    if (!authorized) return [];
    if (grant.mode === "full") return allRecords;
    if (grant.mode === "selected" && Array.isArray(grant.selectedIds)) {
      return allRecords.filter((r) => grant.selectedIds.includes(r.id));
    }
    return [];
  }, [authorized, grant, allRecords]);

  useEffect(() => {
    if (authorized) {
      pushAuditLog({ action: "doctor_view_records", details: { mode: grant.mode, count: visibleRecords.length } });
      // Notify patient that doctor viewed records
      pushNotification({ for: "patient", type: "doctor_view", message: `Doctor viewed ${visibleRecords.length} record(s).`, ts: Date.now() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  const handleRevoke = () => {
    clearGrant();
    setGrant(null);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleSaveUpdates = (e) => {
    e.preventDefault();
    setSavedBanner("Consultation notes and treatment plan saved.");
    setConsultationNotes("");
    setTreatmentPlan("");

    // Optionally auto-expire access after consultation if grant.autoExpire is true
    if (grant?.autoExpire) {
      clearGrant();
      setGrant(null);
    }

    // Clear banner after a short delay
    setTimeout(() => setSavedBanner(""), 2000);
  };

  return (
    <div className="doctor-page">
      <h1 className="page-title">Doctor Portal</h1>

      {/* Permission Section */}
      <div className="permission-box">
        <h2>Access & Permissions</h2>
        {!authorized ? (
          <p>❌ Access denied: The patient has not granted you access.</p>
        ) : (
          <>
            <p>
              ✅ Access granted: {grant.mode === "full" ? "Full history" : "Specific records only"}
              {grant.expiresAt ? ` (expires ${new Date(grant.expiresAt).toLocaleString()})` : ""}
            </p>
            <button onClick={handleRevoke}>Revoke Access</button>
          </>
        )}
      </div>

      {/* Patient Records Section */}
      {authorized && (
        <>
          <div className="records-section">
            <h2>Patient Medical Records</h2>
            <div className="records-list">
              {visibleRecords.map((record) => (
                <div key={record.id} className="record-card">
                  <h3>{record.type}</h3>
                  <p>{record.description}</p>
                </div>
              ))}
              {visibleRecords.length === 0 && <p>No records visible with current permission.</p>}
            </div>
          </div>

          {/* Consultation Section */}
          <form className="consultation-form" onSubmit={handleSaveUpdates}>
            <h2>Consultation Notes</h2>
            <textarea
              placeholder="Write consultation notes..."
              value={consultationNotes}
              onChange={(e) => setConsultationNotes(e.target.value)}
            />

            <h2>Treatment Plan</h2>
            <textarea
              placeholder="Add treatment updates or prescriptions..."
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
            />

            <h2>Upload Diagnosis / Prescription</h2>
            <input type="file" multiple onChange={handleFileUpload} />
            <div className="documents-list">
              {uploadedFiles.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>

            {savedBanner && (
              <div style={{ color: "#0d9488", fontWeight: 600 }}>{savedBanner}</div>
            )}

            <button type="submit">Save Consultation</button>
          </form>
        </>
      )}
    </div>
  );
}
