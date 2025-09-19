import React, { useState } from "react";
import "./PatientProfilePage.css";

export default function PatientProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    chronicIllnesses: "",
  });

  const [documents, setDocuments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log("Updated Profile:", profile);
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">Patient Profile Management</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Personal Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={profile.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={profile.contact}
          onChange={handleChange}
        />

        <h2>Emergency Contact</h2>
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact Details"
          value={profile.emergencyContact}
          onChange={handleChange}
        />

        <h2>Health Info</h2>
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={profile.bloodGroup}
          onChange={handleChange}
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={profile.allergies}
          onChange={handleChange}
        />
        <textarea
          name="chronicIllnesses"
          placeholder="Chronic illnesses or ongoing medications"
          value={profile.chronicIllnesses}
          onChange={handleChange}
        />

        <h2>Upload Health Documents</h2>
        <input type="file" multiple onChange={handleFileUpload} />

        <div className="documents-list">
          {documents.map((doc, index) => (
            <p key={index}>{doc.name}</p>
          ))}
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
