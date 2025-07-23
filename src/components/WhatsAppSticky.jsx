import React from "react";
import { motion } from "framer-motion";

const WhatsAppSticky = () => (
  <motion.a
    href="https://wa.me/917904648644?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order%20from%20your%20website."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-4 right-4 z-50"
    whileHover={{ scale: 1.2 }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      className="w-12 h-12"
    />
  </motion.a>
);

export default WhatsAppSticky;
