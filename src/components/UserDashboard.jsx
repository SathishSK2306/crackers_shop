import React from "react";
import { useCrackers } from "../context/CrackersContext";

const UserDashboard = () => {
  const { orders, loggedInUser } = useCrackers();

  const userOrders = orders.filter(
    (order) => order.userId === loggedInUser?.id
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Dashboard</h2>
      <h3>Your Orders</h3>
      {userOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {userOrders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id} - ₹{order.totalAmount} - {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
