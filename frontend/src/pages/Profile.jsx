import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/profile.css";

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
    try {

      setLoading(true)

      const res = await axios.put(
        `https://skillbridge-p3p8.onrender.com/${user._id}`,
        {
          name,
          phone,
          skill,
          location,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage"));

      setLoading(false)

      toast.success("Profile Updated Successfully 🎉")

    } catch (err) {

      console.log(err);
      setLoading(false);

      toast.error("Update Failed")

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

          <input
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            value={email}
            disabled
            placeholder="Email (cannot change)"
          />

          <input
            value={phone}
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            value={skill}
            placeholder="Your Skill (e.g. Plumber, Electrician)"
            onChange={(e) => setSkill(e.target.value)}
          />

          <input
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={update} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;