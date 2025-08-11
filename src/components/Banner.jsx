import React from "react";
import { motion } from "framer-motion";
import FireworkCanvas from "./FireworkCanvas";

const Banner = () => {
  return (
    <div className="relative w-full bg-[#2E0A54] overflow-hidden flex flex-col items-center justify-center py-20 px-4 min-h-[500px]">
      {/* Fireworks Animation */}
      <FireworkCanvas />

      {/* Decorative Hanging Lights */}
      {/* <div className="absolute top-4 left-0 w-full flex justify-center space-x-6 z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="w-1 h-20 bg-gradient-to-b from-yellow-200 to-yellow-600 rounded-full shadow-lg"
          />
        ))}
      </div> */}

      {/* Real Lamp GIF */}
      <motion.img
        src="/diya.gif"
        alt="Diwali Lamp"
        className="w-32 h-32 sm:w-44 sm:h-44 object-contain z-10 mix-blend-lighten"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h1
        className="mt-4 text-white text-center z-10"
        style={{
          fontFamily: "'Montserrat Alternates', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(2.5rem, 5vw, 5rem)",
          letterSpacing: "0.03em",
          textShadow: "3px 3px 8px rgba(0,0,0,0.6)",
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        PRITHIVIK CRACKERS
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-1 text-lg sm:text-xl md:text-2xl text-yellow-300 font-semibold z-10 tracking-widest"
        style={{
          fontFamily: "'Montserrat Alternates', sans-serif",
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        80% DISCOUNT
      </motion.p>

      {/* City Silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1C0635] to-transparent z-5">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="#1C0635"
            d="M0,192L30,186.7C60,181,120,171,180,149.3C240,128,300,96,360,101.3C420,107,480,149,540,170.7C600,192,
               660,192,720,165.3C780,139,840,85,900,80C960,75,1020,117,1080,149.3C1140,181,1200,203,1260,208C1320,213,
               1380,203,1410,197.3L1440,192V320H0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
