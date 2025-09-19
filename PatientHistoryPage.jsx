import React, { useEffect, useState } from "react";
import { loadAuditLogs } from "./storage";

export default function PatientHistoryPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(loadAuditLogs());
  }, []);

  return (
    <div className="records-page">
      <h1 className="page-title">History & Timeline</h1>
      <div className="records-list">
        {logs.map((log) => (
          <div key={log.id} className="record-card">
            <h3 style={{ marginTop: 0 }}>{log.action}</h3>
            {log.ts && <p style={{ color: "#64748b" }}>{new Date(log.ts).toLocaleString()}</p>}
            {log.details && (
              <pre style={{ whiteSpace: "pre-wrap", background: "#f8fafc", padding: 8, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
        {logs.length === 0 && <p>No history yet.</p>}
      </div>
    </div>
  );
}
