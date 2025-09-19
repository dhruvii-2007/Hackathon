import React, { useEffect, useState } from "react";
import { loadAppointments, saveAppointments, saveGrant, pushAuditLog, pushNotification } from "./storage";
import { seedRecordsIfEmpty } from "./storage";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState("Dr. Smith");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(30); // minutes
  const [fullAccess, setFullAccess] = useState(true);

  useEffect(() => {
    setAppointments(loadAppointments());
    seedRecordsIfEmpty();
  }, []);

  const book = (e) => {
    e.preventDefault();
    if (!date || !time) return;
    const start = new Date(`${date}T${time}:00`).getTime();
    const end = start + duration * 60 * 1000;
    const appt = { id: Date.now(), doctor, start, end, status: "scheduled" };
    const next = [appt, ...appointments];
    setAppointments(next);
    saveAppointments(next);

    // Create a temporary grant for the doctor during the appointment window
    const grant = { mode: fullAccess ? "full" : "selected", selectedIds: [], expiresAt: end };
    saveGrant(grant);

    pushNotification({ for: "doctor", type: "appointment", message: `New appointment scheduled with patient on ${new Date(start).toLocaleString()}` });
    pushAuditLog({ action: "appointment_booked", details: { doctor, start, end } });

    setDoctor("Dr. Smith");
    setDate("");
    setTime("");
    setDuration(30);
  };

  return (
    <div className="records-page">
      <h1 className="page-title">Appointments</h1>

      <form className="add-record" onSubmit={book} style={{ gap: 12 }}>
        <input type="text" placeholder="Doctor Name" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Duration (min)
          <input type="number" min="15" step="5" value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={{ width: 80 }} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={fullAccess} onChange={(e) => setFullAccess(e.target.checked)} />
          Grant full access during the appointment
        </label>
        <button type="submit">Book Appointment</button>
      </form>

      <div className="records-list" style={{ marginTop: 16 }}>
        {appointments.map((a) => (
          <div key={a.id} className="record-card">
            <h3>{a.doctor}</h3>
            <p>
              {new Date(a.start).toLocaleString()} - {new Date(a.end).toLocaleTimeString()}
            </p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
