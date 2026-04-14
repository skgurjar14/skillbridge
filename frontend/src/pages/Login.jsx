import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";

const API = "https://skillbridge-p3p8.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      toast.info("Logging in...");

      const res = await axios.post(`${API}/api/users/login`, {
        email,
        password,
      });

      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));

      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;