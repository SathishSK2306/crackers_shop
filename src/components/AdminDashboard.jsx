import React from "react";
import { useCrackers } from "../context/CrackersContext";

const AdminDashboard = () => {
  const {
    crackers,
    orders,
    updateProductStatus,
    removeProduct,
    resetCrackers,
  } = useCrackers();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <h3>All Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.username} - {order.totalAmount} - {order.status}
          </li>
        ))}
      </ul>

      <h3>All Products</h3>
      <ul>
        {crackers.map((cracker) => (
          <li key={cracker.id}>
            {cracker.name} - {cracker.status}
            <button
              onClick={() => updateProductStatus(cracker.id, "OUT OF STOCK")}
            >
              Mark Out of Stock
            </button>
            <button onClick={() => removeProduct(cracker.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={resetCrackers}>Reset Crackers</button>
    </div>
  );
};

export default AdminDashboard;
