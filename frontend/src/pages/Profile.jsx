import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/profile.css";

const API = "https://skillbridge-p3p8.onrender.com";

function Profile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
      setSkill(storedUser.skill || "");
      setLocation(storedUser.location || "");
    }
  }, []);

  const update = async () => {
    if (!user) return toast.error("User not found");

    try {
      setLoading(true);

      const res = await axios.put(
        `${API}/api/users/update/${user._id}`,
        {
          name,
          phone,
          skill,
          location,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile Updated Successfully 🎉");

    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <div className="profile-header">
          <h2>👤 My Profile</h2>
          <p>Manage your personal information</p>
        </div>

        <div className="profile-form">

          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

          <input value={email} disabled placeholder="Email (cannot change)" />

          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />

          <input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Skill" />

          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />

          <button onClick={update} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;