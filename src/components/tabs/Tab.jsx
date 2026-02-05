import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const Tab = ({ activeTab, onChange }) => {
  const { t } = useLanguage();
  const tabs = [
    { id: "STARS", label: t("tabs.stars") },
    { id: "PREMIUM", label: t("tabs.premium") },
  ];

  return (
    <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 mb-6 mx-6 relative z-10">
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
  );
};

export default Tab;
