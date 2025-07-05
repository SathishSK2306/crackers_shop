import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useCrackers } from "./context/CrackersContext";

const App = () => {
  const { crackers } = useCrackers();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="products-container">
              {crackers.map((cracker) => (
                <ProductCard key={cracker.id} cracker={cracker} />
              ))}
            </div>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
