"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaCode, FaUsers } from 'react-icons/fa';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "123-456-7890",
    profilePic: "https://via.placeholder.com/100",
  });


  const [imagePreview, setImagePreview] = useState(formData.profilePic);

  const hackathons = [
    { name: "HackFusion 2024", start: "2024-02-01", end: "2024-02-03", role: "Participant", position: "Top 5" },
    { name: "CodeSprint", start: "2023-11-10", end: "2023-11-12", role: "Organizer", position: "-" },
  ];

  const teams = [
    { name: "Team Alpha", role: "Developer", project: "AI Chatbot", status: "Active" },
    { name: "Team Beta", role: "Designer", project: "Mobile App", status: "Completed" },
    { name: "Team Gamma", role: "Manager", project: "Web Platform", status: "Active" },
  ];

  const awards = ["Top Innovator", "Team Player", "Bug Hunter"];
  const points = 2350;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-36 relative">

      {/* Navigation sidebar that smooth scrolls to the section */}
      <aside
        className="fixed flex flex-col items-center justify-center top-1/2 left-4 -translate-y-1/2 space-y-4 z-10 border-4 border-solid rounded-full py-6 px-4 hidden md:flex"
        style={{ borderColor: "var(--text-color)" }}
      >
        <nav className="space-y-2">
          <button onClick={() => scrollToSection('info')} className="flex items-center justify-center hover:text-[var(--host-primary)] transition-colors w-full">
            <FaUserCircle className="mr-2" />
          </button>
          <button onClick={() => scrollToSection('achievements')} className="flex items-center justify-center hover:text-[var(--candidate-primary)] transition-colors w-full">
            <FaTrophy className="mr-2" />
          </button>
          <button onClick={() => scrollToSection('hackathons')} className="flex items-center justify-center hover:text-[var(--web-secondary)] transition-colors w-full">
            <FaCode className="mr-2" />
          </button>
          <button onClick={() => scrollToSection('teams')} className="flex items-center justify-center hover:text-[var(--host-primary)] transition-colors w-full">
            <FaUsers className="mr-2" />
          </button>
        </nav>
      </aside>

      {/* Sections */}
      <motion.section id="info" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="border-2 p-6 my-2 rounded-2xl shadow-md bg-white" style={{ borderColor: "var(--host-primary)" }}>
        <h2 className="text-2xl font-heading text-[var(--host-primary)] mb-6">Personal Information</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <img src={imagePreview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-[var(--web-secondary)] cursor-pointer transition-transform group-hover:scale-105" onClick={() => document.getElementById("fileInput").click()} />
            <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {["name", "email", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-bold text-[var(--text-color)] capitalize">{field}</label>
                <input name={field} value={formData[field]} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--candidate-primary)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 text-white rounded-full bg-[var(--candidate-primary)] hover:bg-[var(--web-secondary)] transition-all">Save</button>
        </div>
      </motion.section>

      <motion.section
        id="achievements"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="border-2 p-8 rounded-2xl shadow-lg bg-white"
        style={{ borderColor: "var(--candidate-primary)" }}
      >
        <h2 className="text-3xl font-bold text-[var(--candidate-primary)] mb-8 border-b pb-3">Achievements</h2>

        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="space-y-2">
            <p className="text-gray-500">Total Points</p>
            <p className="text-5xl font-extrabold text-[var(--text-color)]">{points}</p>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            {awards.map((award, idx) => (
              <span
                key={idx}
                className="px-5 py-2 rounded-full bg-[var(--host-primary)] text-white text-sm shadow-md hover:scale-105 transition-transform"
              >
                {award}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="hackathons" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="border-2 p-6 rounded-2xl shadow-md bg-white" style={{ borderColor: "var(--web-secondary)" }}>
        <h2 className="text-2xl font-heading text-[var(--web-secondary)] mb-6">Hackathons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                {["Event", "Start", "End", "Role", "Position"].map((h, i) => (
                  <th key={i} className="px-4 py-2 border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hackathons.map((h, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{h.name}</td>
                  <td className="px-4 py-2 border">{h.start}</td>
                  <td className="px-4 py-2 border">{h.end}</td>
                  <td className="px-4 py-2 border">{h.role}</td>
                  <td className="px-4 py-2 border">{h.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section id="teams" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="border-2 p-6 rounded-2xl shadow-md bg-white" style={{ borderColor: "var(--host-primary)" }}>
        <h2 className="text-2xl font-heading text-[var(--host-primary)] mb-6 ">Teams</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                {["Team", "Role", "Project", "Status"].map((h, i) => (
                  <th key={i} className="px-4 py-2 border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{team.name}</td>
                  <td className="px-4 py-2 border">{team.role}</td>
                  <td className="px-4 py-2 border">{team.project}</td>
                  <td className="px-4 py-2 border">{team.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

    </div>
  );
}
