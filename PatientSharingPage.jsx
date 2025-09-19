import React, { useEffect, useMemo, useState } from "react";
import { seedRecordsIfEmpty, loadShareLinks, saveShareLinks, pushAuditLog } from "./storage";

export default function PatientSharingPage() {
  const [records, setRecords] = useState([]);
  const [mode, setMode] = useState("selected"); // full | selected
  const [selectedIds, setSelectedIds] = useState([]);
  const [targetType, setTargetType] = useState("specialist"); // specialist | lab | hospital
  const [expiryHours, setExpiryHours] = useState(24);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setRecords(seedRecordsIfEmpty());
    setLinks(loadShareLinks());
  }, []);

  const toggleSelected = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const createLink = (e) => {
    e.preventDefault();
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const link = {
      id: Date.now(),
      token,
      scope: mode,
      selectedIds: mode === "selected" ? selectedIds : [],
      targetType,
      expiresAt: Date.now() + Number(expiryHours) * 60 * 60 * 1000,
      createdAt: new Date().toISOString(),
    };
    const next = [link, ...links];
    setLinks(next);
    saveShareLinks(next);
    pushAuditLog({ action: "share_link_created", details: link });
  };

  const appBase = window.location.origin;

  const shareUrl = (token) => `${appBase}/share/${token}`; // placeholder route

  const downloadPdf = (link) => {
    // Placeholder for PDF generation
    alert("PDF download will be implemented with backend");
    pushAuditLog({ action: "pdf_download_requested", details: { linkId: link.id } });
  };

  return (
    <div className="records-page">
      <h1 className="page-title">Secure Sharing</h1>

      <form className="add-record" onSubmit={createLink} style={{ gap: 12 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label>
            Scope:
            <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="full">Full history</option>
              <option value="selected">Selected records</option>
            </select>
          </label>
          <label>
            Share with:
            <select value={targetType} onChange={(e) => setTargetType(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="specialist">Specialist</option>
              <option value="lab">Lab</option>
              <option value="hospital">Hospital</option>
            </select>
          </label>
          <label>
            Expires in (hours)
            <input type="number" min="1" value={expiryHours} onChange={(e) => setExpiryHours(e.target.value)} style={{ width: 100, marginLeft: 8 }} />
          </label>
        </div>

        {mode === "selected" && (
          <div style={{ width: "100%" }}>
            <p style={{ margin: "8px 0" }}>Choose records to include:</p>
            <div className="records-list">
              {records.map((r) => (
                <label key={r.id} className="record-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="checkbox" checked={selectedIds.includes(r.id)} onChange={() => toggleSelected(r.id)} />
                  <div>
                    <strong>{r.type}</strong>
                    <div style={{ color: "#475569" }}>{r.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <button type="submit">Generate Link</button>
      </form>

      <div className="records-list" style={{ marginTop: 16 }}>
        {links.map((l) => (
          <div key={l.id} className="record-card">
            <h3>Share link ({l.targetType})</h3>
            <p>Scope: {l.scope}</p>
            {l.scope === "selected" && <p>Records: {l.selectedIds.join(", ") || "none"}</p>}
            <p>Expires: {new Date(l.expiresAt).toLocaleString()}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => navigator.clipboard.writeText(shareUrl(l.token))}>Copy Link</button>
              <button onClick={() => downloadPdf(l)}>Download PDF</button>
            </div>
          </div>
        ))}
        {links.length === 0 && <p>No share links created yet.</p>}
      </div>
    </div>
  );
}
