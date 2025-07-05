import React from "react";
import { useCrackers } from "../context/CrackersContext";

const ProductCard = ({ cracker }) => {
  const { addToCart } = useCrackers();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <img
        src={`/images/${cracker.image}`}
        alt={cracker.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3>{cracker.name}</h3>
      <p>
        <del>₹{cracker.price}</del> ₹{cracker.discounted_price}
      </p>
      <button onClick={() => addToCart(cracker)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
