import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe } from "react-icons/fa";

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const ChangeLang = () => {
  const { lang, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  // Current language first
  const currentLang = LANGS.find((l) => l.code === lang);
  const otherLangs = LANGS.filter((l) => l.code !== lang);

  return (
    <div className="relative z-50">
      <motion.div
        layout
        className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden relative shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-1 gap-1"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.8
        }}
        style={{ borderRadius: 24 }}
      >
        {/* Toggle Button (Active Language) */}
        <motion.button
          layout="position"
          onClick={() => setOpen(!open)}
          className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-black text-xs tracking-wider transition-colors shrink-0 ${open ? "bg-white/10 text-white" : "bg-transparent text-[#f2b90d]"
            }`}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <FaGlobe className="text-lg" /> : currentLang.label}
        </motion.button>

        {/* Other Languages */}
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{
                width: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
                opacity: { duration: 0.2 }
              }}
              className="flex items-center gap-1 overflow-hidden"
            >
              {[currentLang, ...otherLangs].map((l) => (
                <motion.button
                  key={l.code}
                  layout="position"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => {
                    changeLanguage(l.code);
                    setOpen(false);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${l.code === lang
                    ? "bg-[#f2b90d] text-black shadow-[0_2px_10px_rgba(242,185,13,0.3)]"
                    : "hover:bg-white/10 text-white/70 hover:text-white"
                    }`}
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ChangeLang;
