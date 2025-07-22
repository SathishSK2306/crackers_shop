import React from "react";
import { motion } from "framer-motion";

const WhatsAppSticky = () => (
  <motion.a
    href="https://wa.me/917604648644"
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
