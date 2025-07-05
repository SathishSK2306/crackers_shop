import React, { createContext, useContext, useState, useEffect } from "react";
import crackersData from "../backend/CrackersData.json";

const CrackersContext = createContext();

export const useCrackers = () => useContext(CrackersContext);

export const CrackersProvider = ({ children }) => {
  const [crackers, setCrackers] = useState([]);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setCrackers(crackersData);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      updateCartQuantity(product.id, existing.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const registerUser = ({ username, password }) => {
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username already exists." };
    }
    const newUser = {
      id: `u-${Date.now()}`,
      username,
      password,
    };
    setUsers([...users, newUser]);
    return { success: true, message: "User registered successfully." };
  };

  const loginUser = ({ username, password }) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
      return { success: true, message: "Login successful." };
    }
    return { success: false, message: "Invalid credentials." };
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `o-${Date.now()}`,
      userId: loggedInUser.id,
      username: loggedInUser.username,
      items: cart,
      totalAmount: cart.reduce(
        (sum, item) => sum + item.discounted_price * item.quantity,
        0
      ),
      orderDate: new Date().toISOString(),
      status: "Pending",
      ...orderDetails,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]);
    return {
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    };
  };

  const updateProductStatus = (productId, newStatus) => {
    setCrackers((prevCrackers) =>
      prevCrackers.map((cracker) =>
        cracker.id === productId ? { ...cracker, status: newStatus } : cracker
      )
    );
    return { success: true, message: "Product status updated." };
  };

  const removeProduct = (productId) => {
    setCrackers((prevCrackers) =>
      prevCrackers.filter((cracker) => cracker.id !== productId)
    );
    return { success: true, message: "Product removed." };
  };

  const resetCrackers = () => {
    setCrackers(crackersData);
    setTimeout(() => {
      localStorage.setItem("crackers", JSON.stringify(crackersData));
      window.location.reload();
    }, 100);
  };

  const addProduct = (product) => {
    setCrackers((prevCrackers) => [
      ...prevCrackers,
      {
        ...product,
        id: `p-${Date.now()}`,
        status: product.status || "IN STOCK",
      },
    ]);
    return { success: true, message: "Product added." };
  };

  return (
    <CrackersContext.Provider
      value={{
        crackers,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartItemCount,
        users,
        loggedInUser,
        registerUser,
        loginUser,
        logoutUser,
        orders,
        placeOrder,
        updateProductStatus,
        removeProduct,
        resetCrackers,
        addProduct,
      }}
    >
      {children}
    </CrackersContext.Provider>
  );
};
