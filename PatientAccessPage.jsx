import React, { useEffect, useMemo, useState } from "react";
import { loadGrant, saveGrant, clearGrant, seedRecordsIfEmpty } from "./storage";
import "./PatientRecordsPage.css"; // reuse basic styles

export default function PatientAccessPage() {
  const [records, setRecords] = useState([]);
  const [mode, setMode] = useState("full"); // full | selected
  const [selectedIds, setSelectedIds] = useState([]);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryHours, setExpiryHours] = useState(1);
  const [autoExpire, setAutoExpire] = useState(false);

  const currentGrant = useMemo(() => loadGrant(), []);

  useEffect(() => {
    const rec = seedRecordsIfEmpty();
    setRecords(rec);

    if (currentGrant) {
      setMode(currentGrant.mode || "full");
      setSelectedIds(currentGrant.selectedIds || []);
      setAutoExpire(!!currentGrant.autoExpire);
      if (currentGrant.expiresAt) {
        setExpiryEnabled(true);
        const msLeft = currentGrant.expiresAt - Date.now();
        if (msLeft > 0) setExpiryHours(Math.ceil(msLeft / (60 * 60 * 1000)));
      }
    }
    // We intentionally want to read currentGrant only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelected = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const grant = {
      mode,
      selectedIds: mode === "selected" ? selectedIds : [],
      autoExpire,
    };
    if (expiryEnabled && Number(expiryHours) > 0) {
      grant.expiresAt = Date.now() + Number(expiryHours) * 60 * 60 * 1000;
    }
    saveGrant(grant);
    alert("Access grant saved.");
  };

  const handleClear = () => {
    clearGrant();
    alert("Access grant cleared.");
  };

  return (
    <div className="records-page">
      <h1 className="page-title">Grant Doctor Access</h1>

      <form className="add-record" onSubmit={handleSave} style={{gap: 12}}>
        <div style={{background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", width: "100%"}}>
          <h3 style={{marginTop: 0}}>Access Scope</h3>
          <label style={{display: "block", marginBottom: 8}}>
            <input
              type="radio"
              name="mode"
              value="full"
              checked={mode === "full"}
              onChange={() => setMode("full")}
            />
            <span style={{marginLeft: 8}}>Full medical history</span>
          </label>
          <label style={{display: "block", marginBottom: 8}}>
            <input
              type="radio"
              name="mode"
              value="selected"
              checked={mode === "selected"}
              onChange={() => setMode("selected")}
            />
            <span style={{marginLeft: 8}}>Specific records only</span>
          </label>

          {mode === "selected" && (
            <div style={{marginTop: 8}}>
              <p style={{margin: "8px 0"}}>Choose records to share:</p>
              <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8}}>
                {records.map((r) => (
                  <label key={r.id} className="record-card" style={{display: "flex", alignItems: "center", gap: 12}}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(r.id)}
                      onChange={() => toggleSelected(r.id)}
                    />
                    <div>
                      <strong>{r.type}</strong>
                      <div style={{color: "#475569"}}>{r.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", width: "100%"}}>
          <h3 style={{marginTop: 0}}>Expiration (optional)</h3>
          <label style={{display: "flex", alignItems: "center", gap: 8}}>
            <input
              type="checkbox"
              checked={expiryEnabled}
              onChange={(e) => setExpiryEnabled(e.target.checked)}
            />
            Enable expiry
          </label>
          {expiryEnabled && (
            <div style={{marginTop: 8}}>
              <label>
                Expires in
                <input
                  type="number"
                  min="1"
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(e.target.value)}
                  style={{marginLeft: 8, width: 80}}
                />
                hours
              </label>
            </div>
          )}

          <label style={{display: "flex", alignItems: "center", gap: 8, marginTop: 12}}>
            <input
              type="checkbox"
              checked={autoExpire}
              onChange={(e) => setAutoExpire(e.target.checked)}
            />
            Auto-expire after doctor saves consultation
          </label>
        </div>

        <div style={{display: "flex", gap: 12}}>
          <button type="submit">Save Access</button>
          <button type="button" onClick={handleClear} style={{background: "#e11d48"}}>Clear Access</button>
        </div>
      </form>
    </div>
  );
}
