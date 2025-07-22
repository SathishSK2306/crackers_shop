import React, { useState } from "react";
import { motion } from "framer-motion";
import CrackersTable from "./components/CrackersTable";
import ContactForm from "./components/ContactForm";
import OrderForm from "./components/OrderForm";
import WhatsAppSticky from "./components/WhatsAppSticky";
import BackgroundFireworks from "./components/BackgroundFireworks";
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
    <div className="font-sans scroll-smooth">
      <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center bg-[#1e2f3f]">
        <BackgroundFireworks />

        <motion.h1
          className="relative z-10 text-center text-white font-extrabold px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
        >
          {"PRITHIVIK CRACKERS".split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block text-[8vw] sm:text-[5vw] md:text-5xl"
              variants={{
                hidden: { opacity: 0, y: -40, scale: 0.5 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  },
                },
              }}
            >
              {char === " " ? (
                <>
                  <span className="block sm:hidden w-full h-0"></span>
                  &nbsp;
                </>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* 💸 Price List Button */}
      <div className="flex justify-end my-4 px-4">
        <button
          type="button"
          className="bg-[#DCEAF5] text-[#1A3D63] font-semibold px-5 py-3 rounded shadow hover:bg-[#c9dfef] transition-all duration-300"
        >
          Download Price List
        </button>
      </div>

      {/* 🧨 Crackers Table */}
      <div className="px-4 mb-10">
        <CrackersTable
          data={crackersData}
          cart={cart}
          onAdd={handleAddToCart}
          onUpdate={handleUpdateQuantity}
        />
      </div>

      {/* 🧾 Order Summary */}
      {cart.length > 0 && (
        <motion.div
          className="mb-10 p-6 bg-[#EDF4FA] rounded-lg shadow-lg mx-4"
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

      {/* 📝 Order Form */}
      <div className="mb-10 px-4">
        <OrderForm
          onSubmit={handleFormSubmit}
          cart={cart}
          total={total}
          discount={discount}
          final={final}
        />
      </div>

      {/* 📞 Contact Form */}
      <div className="mb-10 px-4">
        <ContactForm />
      </div>

      {/* 📱 WhatsApp Sticky */}
      <WhatsAppSticky />
    </div>
  );
};

export default App;
