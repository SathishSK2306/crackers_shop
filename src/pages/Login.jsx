import React, { useState, useEffect } from "react";
import { useCrackers } from "../context/CrackersContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser, loggedInUser } = useCrackers();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = loginUser({ username, password });
    if (result.success) {
      alert(result.message);
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>Sign In</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
