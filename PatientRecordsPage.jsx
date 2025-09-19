import React, { useEffect, useState } from "react";
import "./PatientRecordsPage.css";
import { seedRecordsIfEmpty, saveRecords } from "./storage";

export default function PatientRecordsPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Initialize from storage (with seed if empty)
    const initial = seedRecordsIfEmpty();
    setRecords(initial);
  }, []);

  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addRecord = () => {
    if (newType && newDescription) {
      const newRecord = {
        id: records.length + 1,
        type: newType,
        description: newDescription,
      };
      const next = [...records, newRecord];
      setRecords(next);
      saveRecords(next);
      setNewType("");
      setNewDescription("");
    }
  };

  const deleteRecord = (id) => {
    const next = records.filter((record) => record.id !== id);
    setRecords(next);
    saveRecords(next);
  };

  return (
    <div className="records-page">
      <h1 className="page-title">Patient Medical Records</h1>

      <div className="add-record">
        <input
          type="text"
          placeholder="Record Type (e.g., Prescription)"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addRecord}>Add Record</button>
      </div>

      <div className="records-list">
        {records.map((record) => (
          <div key={record.id} className="record-card">
            <h3>{record.type}</h3>
            <p>{record.description}</p>
            <button onClick={() => deleteRecord(record.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}