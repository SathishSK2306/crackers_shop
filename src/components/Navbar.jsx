import React from "react";
import { Link } from "react-router-dom";
import { useCrackers } from "../context/CrackersContext";

const Navbar = () => {
  const { cartItemCount, loggedInUser, logoutUser } = useCrackers();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#333",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/cart" style={{ color: "#fff", marginRight: "1rem" }}>
          Cart ({cartItemCount()})
        </Link>
        {loggedInUser && (
          <Link to="/dashboard" style={{ color: "#fff", marginRight: "1rem" }}>
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {loggedInUser ? (
          <>
            <span style={{ marginRight: "1rem" }}>
              Hi, {loggedInUser.username}
            </span>
            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: "#fff" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
