import React, { useEffect } from "react";
import { useCrackers } from "../context/CrackersContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, loggedInUser, placeOrder } =
    useCrackers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  if (!loggedInUser) {
    return null;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalOriginalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalDiscountedPrice = cart.reduce(
    (total, item) => total + item.discounted_price * item.quantity,
    0
  );
  const totalSavings = totalOriginalPrice - totalDiscountedPrice;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    const result = placeOrder({});
    if (result.success) {
      alert(result.message);
      navigate("/dashboard");
    } else {
      alert("Failed to place order: " + result.message);
    }
  };

  return (
    <div style={{ padding: "2rem", background: "#f0f2f5", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🛒 Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: "12px",
          }}
        >
          <p>Looks like your cart is empty.</p>
          <Link
            to="/"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Start Adding Crackers!
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  background: "#fff",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.discounted_price} x {item.quantity} = ₹
                    {item.discounted_price * item.quantity}
                  </p>
                  {item.price > item.discounted_price && (
                    <p style={{ textDecoration: "line-through" }}>
                      ₹{item.price * item.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span style={{ margin: "0 1rem" }}>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ marginLeft: "1rem", color: "red" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              maxWidth: "900px",
              margin: "2rem auto",
              textAlign: "right",
            }}
          >
            <h3>Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p style={{ textDecoration: "line-through" }}>
              Original Total: {formatPrice(totalOriginalPrice)}
            </p>
            <p style={{ fontSize: "1.5rem" }}>
              Discounted Total: {formatPrice(totalDiscountedPrice)}
            </p>
            <p style={{ color: "green" }}>
              You Saved: {formatPrice(totalSavings)}
            </p>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "6px",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
