import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CrackersTable from "./components/CrackersTable";
import ContactForm from "./components/ContactForm";
import OrderForm from "./components/OrderForm";
import WhatsAppSticky from "./components/WhatsAppSticky";
import BackgroundFireworks from "./components/BackgroundFireworks";
import crackersData from "./data/crackers.json";

const App = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
    <>
      <div className="font-sans scroll-smooth">
        {/* Preloader Animation */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="preloader"
              className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img
                src="/Explosive animation.gif"
                alt="Loading Animation"
                className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[350px] object-contain"
                style={{ imageRendering: "auto" }}
              />
              <motion.h1
                className="text-black text-xl mt-6 font-bold tracking-widest text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Lighting Up the Festive Mood...
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {!loading && (
          <>
            {/* Header Banner with Fireworks */}
            <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center bg-[#1e2f3f]">
              <BackgroundFireworks />
              <motion.h1
                className="text-center text-white text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] xl:text-[4vw] px-4 uppercase font-extrabold tracking-widest"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 8, duration: 1.2 }}
              >
                PRITHIVIK CRACKERS
              </motion.h1>
            </div>
            {/* Minimum Purchase Banner */}
            <motion.img
              src="/purchace_banner.png"
              alt="Minimum Purchase ₹3,000"
              className="absolute top-60 right-48 w-48 z-[9999] pointer-events-none"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Price List Button */}
            <div className="flex justify-end my-4 px-4">
              <button
                type="button"
                className="bg-[#DCEAF5] text-[#1A3D63] font-semibold px-5 py-3 rounded shadow hover:bg-[#c9dfef] transition-all duration-300"
              >
                Download Price List
              </button>
            </div>

            {/* Crackers Table */}
            <div className="px-4 mb-10">
              <CrackersTable
                data={crackersData}
                cart={cart}
                onAdd={handleAddToCart}
                onUpdate={handleUpdateQuantity}
              />
            </div>

            {/* Order Summary */}
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
                    <span>Discount (50%):</span>
                    <span>- ₹{discount.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between font-bold text-xl text-[#1A3D63] pt-2">
                    <span>Total:</span> <span>₹{final.toFixed(2)}</span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Order Form */}
            <div className="mb-10 px-4">
              <OrderForm
                onSubmit={handleFormSubmit}
                cart={cart}
                total={total}
                discount={discount}
                final={final}
              />
            </div>

            {/* Contact Form */}
            <div className="mb-10 px-4">
              <ContactForm />
            </div>

            {/* WhatsApp Sticky */}
            <WhatsAppSticky />
          </>
        )}
      </div>
    </>
  );
};

export default App;
