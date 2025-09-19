import React, { useEffect, useState } from "react";
import { loadNotifications } from "./storage";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(loadNotifications());
  }, []);

  return (
    <div className="records-page">
      <h1 className="page-title">Notifications</h1>
      <div className="records-list">
        {notifications.map((n) => (
          <div key={n.id} className="record-card">
            <h3 style={{ marginTop: 0, marginBottom: 6 }}>{n.type || "Notification"}</h3>
            <p>{n.message}</p>
            {n.ts && <p style={{ color: "#64748b" }}>{new Date(n.ts).toLocaleString()}</p>}
          </div>
        ))}
        {notifications.length === 0 && <p>No notifications yet.</p>}
      </div>
    </div>
  );
}
