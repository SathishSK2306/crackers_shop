import React, { useState } from "react";
import { motion } from "framer-motion";
import CrackersTable from "./components/CrackersTable";
import ContactForm from "./components/ContactForm";
import OrderForm from "./components/OrderForm";
import WhatsAppSticky from "./components/WhatsAppSticky";
import crackersData from "./data/crackers.json";

const App = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState(null);

  const handleAddToCart = (item) => {
    const exist = cart.find((i) => i.id === item.id);
    if (exist) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty === 0) return setCart(cart.filter((i) => i.id !== id));
    setCart(cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const total = cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
  const discount = total * 0.5;
  const final = total - discount;

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="p-4 font-sans scroll-smooth">
      <h1 className="text-4xl font-bold text-center text-[#0A1931] mb-10">
        Prithivik Crackers
      </h1>

      <div className="flex justify-end my-4">
        <button
          type="button"
          className="bg-[#DCEAF5] text-[#1A3D63] font-semibold px-5 py-3 rounded shadow hover:bg-[#c9dfef] transition-all duration-300"
        >
          Download Price List
        </button>
      </div>

      <div className="mb-10">
        <CrackersTable
          data={crackersData}
          cart={cart}
          onAdd={handleAddToCart}
          onUpdate={handleUpdateQuantity}
        />
      </div>

      {cart.length > 0 && (
        <motion.div
          className="mb-10 p-6 bg-[#EDF4FA] rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-[#0A1931] mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-gray-800 font-ovo text-lg">
            <p className="flex justify-between border-b pb-1">
              <span>Total Products:</span> <span>{cart.length}</span>
            </p>
            <p className="flex justify-between border-b pb-1">
              <span>Total Price:</span> <span>₹{total.toFixed(2)}</span>
            </p>
            <p className="flex justify-between border-b pb-1">
              <span>Discount (50%):</span> <span>- ₹{discount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-xl text-[#1A3D63] pt-2">
              <span>Total:</span> <span>₹{final.toFixed(2)}</span>
            </p>
          </div>
        </motion.div>
      )}

      <div className="mb-10">
        <OrderForm
          onSubmit={handleFormSubmit}
          cart={cart}
          total={total}
          discount={discount}
          final={final}
        />
      </div>

      <div className="mb-10">
        <ContactForm />
      </div>

      <WhatsAppSticky />
    </div>
  );
};

export default App;
