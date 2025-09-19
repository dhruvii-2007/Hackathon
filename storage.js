// Simple localStorage-backed storage for demo purposes

const KEYS = {
  records: "patient_records",
  grant: "doctor_access_grant",
  appointments: "appointments",
  shareLinks: "share_links",
  notifications: "notifications",
  auditLogs: "audit_logs",
};

export function loadRecords() {
  try {
    const raw = localStorage.getItem(KEYS.records);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveRecords(records) {
  localStorage.setItem(KEYS.records, JSON.stringify(records));
}

export function seedRecordsIfEmpty() {
  const existing = loadRecords();
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    const seed = [
      { id: 1, type: "Prescription", description: "Atorvastatin 10mg - once daily" },
      { id: 2, type: "Lab Report", description: "Blood Test - Normal" },
      { id: 3, type: "Health Record", description: "Diabetes checkup history" },
    ];
    saveRecords(seed);
    return seed;
  }
  return existing;
}

export function loadGrant() {
  try {
    const raw = localStorage.getItem(KEYS.grant);
    if (!raw) return null;
    const grant = JSON.parse(raw);
    // auto-expire if past
    if (grant?.expiresAt && Date.now() > grant.expiresAt) {
      clearGrant();
      return null;
    }
    return grant;
  } catch {
    return null;
  }
}

export function saveGrant(grant) {
  localStorage.setItem(KEYS.grant, JSON.stringify(grant));
}

export function clearGrant() {
  localStorage.removeItem(KEYS.grant);
}

// Appointments
export function loadAppointments() {
  try {
    const raw = localStorage.getItem(KEYS.appointments);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAppointments(items) {
  localStorage.setItem(KEYS.appointments, JSON.stringify(items));
}

// Sharing Links
export function loadShareLinks() {
  try {
    const raw = localStorage.getItem(KEYS.shareLinks);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveShareLinks(items) {
  localStorage.setItem(KEYS.shareLinks, JSON.stringify(items));
}

// Notifications
export function loadNotifications() {
  try {
    const raw = localStorage.getItem(KEYS.notifications);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushNotification(n) {
  const list = loadNotifications();
  list.unshift({ id: Date.now(), ...n });
  localStorage.setItem(KEYS.notifications, JSON.stringify(list));
}

// Audit Logs
export function loadAuditLogs() {
  try {
    const raw = localStorage.getItem(KEYS.auditLogs);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushAuditLog(log) {
  const list = loadAuditLogs();
  list.unshift({ id: Date.now(), ts: new Date().toISOString(), ...log });
  localStorage.setItem(KEYS.auditLogs, JSON.stringify(list));
}
