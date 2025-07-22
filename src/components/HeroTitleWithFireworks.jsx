import { motion } from "framer-motion";
import FireworkCanvas from "./FireworkCanvas";

const HeroTitleWithFireworks = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center bg-[#1e2f3f]">
      <FireworkCanvas />
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
        {"Prithivik Crackers".split("").map((char, index) => (
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
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default HeroTitleWithFireworks;
