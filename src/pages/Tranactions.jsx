import React from "react";
import { MdStar, MdVerified } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const Tranactions = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-xl font-black tracking-tight text-white/90">
          Tranzaksiyalar tarixi
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 rounded-full bg-[#f2b90d]/10 text-[10px] font-black uppercase tracking-widest text-[#f2b90d] border border-[#f2b90d]/20 hover:bg-[#f2b90d]/20 transition-colors"
        >
          Hammasi
        </motion.button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#1c1c1e]/40 backdrop-blur-xl"
      >
        <div className="divide-y divide-white/5">
          <motion.div
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="flex items-center justify-between p-5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-[#f2b90d]/10 border border-[#f2b90d]/20 flex items-center justify-center shadow-[0_4px_12px_rgba(242,185,13,0.1)]">
                <MdStar className="text-[#f2b90d] text-2xl" />
              </div>
              <div>
                <p className="font-bold text-base text-white/90 tracking-tight">500 Stars</p>
                <p className="text-[11px] text-white/40 font-medium tracking-wide">
                  Bugun, 14:20
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-white tracking-tight">90 000 UZS</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/10 mt-1">
                <p className="text-[9px] text-green-400 font-black uppercase tracking-wider">
                  Muvaffaqiyatli
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="flex items-center justify-between p-5 transition-colors cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.1)]">
                <MdVerified className="text-blue-400 text-2xl" />
              </div>
              <div>
                <p className="font-bold text-base text-white/90 tracking-tight">
                  Premium - 6 Oy
                </p>
                <p className="text-[11px] text-white/40 font-medium tracking-wide">
                  Kecha, 09:15
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-white tracking-tight">280 000 UZS</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/10 mt-1">
                <p className="text-[9px] text-green-400 font-black uppercase tracking-wider">
                  Muvaffaqiyatli
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="flex items-center justify-between p-5 transition-colors cursor-default relative overflow-hidden"
          >
            <div className="flex items-center gap-4 opacity-50">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <MdStar className="material-symbols-outlined text-white/40 text-2xl" />
              </div>
              <div>
                <p className="font-bold text-base text-white/90 line-through tracking-tight">
                  250 Stars
                </p>
                <p className="text-[11px] text-white/40 font-medium tracking-wide">
                  12 Oktyabr
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-white/50 tracking-tight">45 000 UZS</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/10 mt-1">
                <p className="text-[9px] text-red-400 font-black uppercase tracking-wider">
                  Bekor qilingan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-8 text-center pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          {t("home.secureFooter")}
        </p>
      </div>
    </div>
  );
};

export default Tranactions;
