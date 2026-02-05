import React, { useState } from "react";
import ChangeLang from "../modal/ChangeLang";
import { BiSupport } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useInfoContext } from "../../context/infoContext";

const SwipeContainer = ({ activeTab, setActiveTab, children }) => {
  const [startX, setStartX] = useState(null);
  const { currentUser } = useInfoContext();

  const onTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (startX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // minimal swipe distance
    if (Math.abs(diff) < 150) return; // Reduced threshold for better responsiveness

    if (diff > 0 && activeTab === "STARS") {
      setActiveTab("PREMIUM"); // chapga
    }

    if (diff < 0 && activeTab === "PREMIUM") {
      setActiveTab("STARS"); // o‘ngga
    }

    setStartX(null);
  };

  // Variants for the slide animation
  // Variants for the slide animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95, // Reduced scale effect for performance
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 }, // Slightly softer spring
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  const direction = activeTab === "PREMIUM" ? 1 : -1;

  // We need to render only the active child for AnimatePresence to work efficiently
  // assuming children is an array [Stars, Premium]
  const activeChild = React.Children.toArray(children).find((child, index) => {
    return (
      (activeTab === "STARS" && index === 0) ||
      (activeTab === "PREMIUM" && index === 1)
    );
  });

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden min-h-screen"
    >
      <div className="flex items-center justify-between px-4 z-50 relative">
        <ChangeLang />
        <motion.button
          className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-black text-xs tracking-wider transition-colors bg-white/10 text-white"
          whileTap={{ scale: 0.9 }}
        >
          <a
            href={
              currentUser.language === "ru"
                ? "https://t.me/+998934905134"
                : "https://t.me/+998996860307"
            }
            className="h-full w-full flex items-center justify-center"
          >
            <BiSupport className="text-lg text-[#f2b90d]" />
          </a>
        </motion.button>
      </div>

      <div className="relative mt-4">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full gpu-accelerated"
            style={{ willChange: "transform, opacity" }}
          >
            {activeChild}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SwipeContainer;
