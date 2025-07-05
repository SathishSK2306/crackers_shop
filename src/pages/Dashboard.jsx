import React from "react";
import { useCrackers } from "../context/CrackersContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Dashboard = () => {
  const { loggedInUser } = useCrackers();

  if (!loggedInUser) {
    return (
      <p style={{ padding: "2rem" }}>Please log in to view your dashboard.</p>
    );
  }

  // Simple logic: first user is treated as admin
  const isAdmin = loggedInUser.username === "admin";

  return (
    <div style={{ padding: "2rem" }}>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
