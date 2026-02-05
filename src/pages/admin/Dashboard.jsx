import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Statistics from "./Statistics";
import { AnimatePresence, motion } from "framer-motion";
import Users from "./Users";
import Info from "./Info";

const Dashboard = () => {
  const { t } = useLanguage();
  const tabs = [
    { id: "STAT", label: t("admin.tabs.stat") },
    { id: "USERS", label: t("admin.tabs.users") },
    { id: "INFO", label: t("admin.tabs.info") },
  ];
  const [startX, setStartX] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const onChange = (tabId) => {
    setActiveTab(tabId);
  };

  const onTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (startX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // minimal swipe distance
    if (Math.abs(diff) < 100) return;

    // Chapga swipe (left swipe) - INFO -> USERS
    if (diff > 0 && activeTab === "STAT") {
      setActiveTab("USERS");
    }

    // O'ngga swipe (right swipe) - USERS -> INFO
    if (diff < 0 && activeTab === "USERS") {
      setActiveTab("STAT");
    }

    setStartX(null);
  };

  // Variants for the slide animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
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

  const direction = activeTab === "USERS" ? 1 : -1;

  // Render the active component
  const activeChild =
    activeTab === "STAT" ? (
      <Statistics />
    ) : activeTab === "USERS" ? (
      <Users />
    ) : (
      <Info />
    );

  return (
    <div className="mt-20">
      <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 mx-6 relative z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex-1 relative py-2.5 rounded-full text-sm font-medium transition-colors duration-300 outline-none select-none ${
                isActive ? "text-black" : "text-white/60 hover:text-white"
              }`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#f2b90d] rounded-full shadow-[0_2px_10px_rgba(242,185,13,0.3)]"
                  initial={false}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  }}
                />
              )}
              <span className="relative z-10 font-bold tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative overflow-hidden min-h-screen"
      >
        <div className="relative">
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
    </div>
  );
};

export default Dashboard;
