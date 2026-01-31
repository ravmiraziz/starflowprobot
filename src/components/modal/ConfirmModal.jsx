import React from "react";
import { MdHelpOutline } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

const ConfirmModal = ({ onContinue, onCancel }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card w-full max-w-[460px] rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] bg-white/10 backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="mb-6 size-20 rounded-full bg-[#f2b90d]/10 flex items-center justify-center ring-1 ring-[#f2b90d]/20 relative">
          <div className="absolute inset-0 bg-[#f2b90d]/20 blur-xl rounded-full" />
          <MdHelpOutline className="text-[#f2b90d] text-4xl relative z-10" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-8 leading-tight tracking-tight">
          {t("confirm.title")}
        </h2>

        <div className="w-full flex flex-col gap-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] text-black font-black text-sm uppercase tracking-widest shadow-[0_4px_20px_rgba(242,185,13,0.3)] transition-all flex items-center justify-center"
          >
            {t("confirm.continue")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="w-full py-3 text-red-500/80 hover:text-red-500 font-bold text-sm transition-colors uppercase tracking-wider hover:bg-red-500/5 rounded-xl"
          >
            {t("confirm.cancel")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
