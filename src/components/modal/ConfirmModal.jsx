import React from "react";
import { MdHelpOutline } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";

const ConfirmModal = ({ onContinue, onCancel }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-[460px] rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-[#f2b90d]/30 shadow-[0_0_50px_rgba(242,185,13,0.1)]">
        <div className="mb-6 size-16 rounded-full bg-[#f2b90d]/10 flex items-center justify-center">
          <MdHelpOutline className="text-[#f2b90d] text-3xl" />
        </div>

        <h2 className="text-xl font-bold text-white mb-8 leading-tight">
          {t("confirm.title")}
        </h2>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={onContinue}
            className="w-full h-14 rounded-2xl bg-gradient-to-br from-[#f2b90d] to-[#d4a00b] text-black font-extrabold text-sm uppercase tracking-wider gold-glow active:scale-95 transition-all"
          >
            {t("confirm.continue")}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 text-red-500/80 hover:text-red-500 font-bold text-sm transition-colors active:scale-95"
          >
            {t("confirm.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
