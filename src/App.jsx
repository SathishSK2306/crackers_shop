import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CrackersTable from "./components/CrackersTable";
import ContactForm from "./components/ContactForm";
import OrderForm from "./components/OrderForm";
import WhatsAppSticky from "./components/WhatsAppSticky";
import BackgroundFireworks from "./components/FireworkCanvas";
import crackersData from "./data/crackers.json";
import Banner from "./components/Banner";

const toNumber = (v) => {
  if (v == null) return 0;
  const s = String(v).replace(/[^0-9.-]+/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // fake preloader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add item to cart (normalize id & price)
  const handleAddToCart = (item) => {
    const itemId = String(item.s_no ?? item.id);
    setCart((prev) => {
      const exist = prev.find((i) => i.id === itemId);
      if (exist) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const price = toNumber(
        item.offer_price ??
          item.offerPrice ??
          item.price ??
          item.actual_price ??
          item.actualPrice
      );
      const name = item.product ?? item.name ?? "";
      const category = item.category ?? "Uncategorized";
      return [
        ...prev,
        {
          id: itemId,
          s_no: item.s_no ?? null,
          product: name,
          price,
          category,
          quantity: 1,
        },
      ];
    });
  };

  // Update quantity (id should be same string we used when adding)
  const handleUpdateQuantity = (id, qty) => {
    const itemId = String(id);
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== itemId);
      return prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i));
    });
  };

  // totals (price MUST be normalized when added)
  const total = cart.reduce(
    (acc, cur) => acc + (Number(cur.price) || 0) * (cur.quantity || 0),
    0
  );
  const discount = total * 0.0; // you had 50% discount
  const final = total - discount;

  // Form submit (minimum order check)
  const handleFormSubmit = (data) => {
    if (final < 3000) {
      alert(
        `Minimum order value is ₹3000. Your order total is ₹${final.toFixed(
          2
        )}.`
      );
      return;
    }
    // Place order logic here (send to API etc.)
    setFormData({ ...data, cart, total, discount, final });
    alert("Order placed successfully!");
    // Optional: clear cart after placing order:
    // setCart([]);
  };

  return (
    <>
      <div className="font-sans scroll-smooth">
        <AnimatePresence>
          {loading && (
            <motion.div
              key="preloader"
              className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
            >
              <img
                src="/Explosive animation.gif"
                alt="Loading Animation"
                className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[350px] object-contain"
              />
              <motion.h1 className="text-black text-xl mt-6 font-bold tracking-widest text-center">
                Lighting Up the Festive Mood...
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <Banner />

        {!loading && (
          <>
            <div className="flex justify-end my-4 px-4">
              <a
                href="/Prithivik_Crackers_Price_List_2025.pdf"
                download="Prithivik_Crackers_Price_List_2025.pdf"
                className="bg-[#DCEAF5] text-[#1A3D63] font-semibold px-5 py-3 rounded shadow hover:bg-[#c9dfef] transition-all duration-300"
              >
                Download Price List
              </a>
            </div>

            <motion.img
              src="/purchace_banner.png"
              alt="Minimum Purchase ₹3,000"
              className="absolute top-96 right-46 w-48 z-[9999] pointer-events-none"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="px-4 mb-10">
              <CrackersTable
                data={crackersData}
                cart={cart}
                onAdd={handleAddToCart}
                onUpdate={handleUpdateQuantity}
              />
            </div>

            {/* Order Summary */}
            <div className="mb-10 p-6 bg-[#EDF4FA] rounded-lg shadow-lg mx-4">
              <h2 className="text-2xl font-semibold text-[#0A1931] mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-gray-800 font-ovo text-lg">
                <p className="flex justify-between border-b pb-1">
                  <span>Total Products:</span>{" "}
                  <span>{cart.reduce((s, i) => s + (i.quantity || 0), 0)}</span>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span>Total Price:</span> <span>₹{total.toFixed(2)}</span>
                </p>
                {/* <p className="flex justify-between border-b pb-1">
                  <span>Discount (80%):</span>
                  <span>- ₹{discount.toFixed(2)}</span>
                </p> */}
                <p className="flex justify-between font-bold text-xl text-[#1A3D63] pt-2">
                  <span>Total:</span> <span>₹{final.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Minimum order: ₹3000.{" "}
                  {final < 3000
                    ? `Add ₹${(3000 - final).toFixed(2)} more to place order.`
                    : "You can place the order."}
                </p>
              </div>
            </div>

            <div className="mb-10 px-4">
              <OrderForm
                onSubmit={handleFormSubmit}
                cart={cart}
                total={total}
                // discount={discount}
                final={final}
              />
            </div>

            <div className="mb-10 px-4">
              <ContactForm />
            </div>

            <WhatsAppSticky />
          </>
        )}
      </div>
    </>
  );
};

export default App;
