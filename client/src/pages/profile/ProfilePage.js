import { useState } from "react";

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Personal Info Section */}
      <div className="border rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl">Personal Information</h2>
        <div className="flex items-center space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>

          {/* Info Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                className="w-full border rounded px-3 py-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="w-full border rounded px-3 py-2"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            className="text-white px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--candidate-primary)",
              transition: "background-color 0.3s",
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Points and Awards */}
      <div className="border rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl">Achievements</h2>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="text-3xl font-bold">
              {points}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {awards.map((award, idx) => (
              <span
                key={idx}
                className="text-white px-3 py-2 rounded-full text-sm"
                style={{ backgroundColor: "var(--candidate-primary)" }}
              >
                {award}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hackathons Section */}
      <div className="border rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl">Hackathons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Event Name</th>
                <th className="p-3 border">Start Date</th>
                <th className="p-3 border">End Date</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Position</th>
              </tr>
            </thead>
            <tbody>
              {hackathons.map((h, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="p-3 border">{h.name}</td>
                  <td className="p-3 border">{h.start}</td>
                  <td className="p-3 border">{h.end}</td>
                  <td className="p-3 border">{h.role}</td>
                  <td className="p-3 border">{h.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teams Section */}
      <div className="border rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl">Teams</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Team Name</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Project</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="p-3 border">{team.name}</td>
                  <td className="p-3 border">{team.role}</td>
                  <td className="p-3 border">{team.project}</td>
                  <td className="p-3 border">{team.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
