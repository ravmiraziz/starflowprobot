import { MdRssFeed } from "react-icons/md";
import { GrCopy } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import { useInfoContext } from "../../context/infoContext";
import { useState } from "react";
import { motion } from "framer-motion";

const formatCardNumber = (number) => {
  if (!number) return "•••• •••• •••• ••••";
  return number.replace(/(.{4})/g, "$1 ").trim();
};

const PaymentModal = ({ onClose, onVerify, price, cashback }) => {
  const { t } = useLanguage();
  const { formatNumber, setToast } = useInfoContext();

  const copyToClipboard = async (value) => {
    console.log(value);
    try {
      const cleanValue =
        typeof value === "number" ? value.toString() : value.replace(/\s/g, "");

      await navigator.clipboard.writeText(cleanValue);
      setToast({
        isVisible: true,
        message: "Muvaffaqiyatli nusxalandi",
        type: "success",
      });
    } catch (e) {
      console.error("Copy failed", e);
      setToast({
        isVisible: true,
        message: "Nusxalashda xatolik",
        type: "error",
      });
    }
  };

  const [cardData, setCardData] = useState({
    cardNumber: "5614682110787878",
    owner: "RAVSHANOV MIRAZIZ",
    price: 120000,
    cashback: 6000,
    cardType: "UZCARD",
  });
  const [loading, setLoading] = useState(false);

  // Consider adding fetch logic here if needed, keeping mock for now as per previous code

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        className="absolute inset-0"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative glass-card w-full max-w-lg mx-auto rounded-t-[2.5rem] p-6 pb-4 flex flex-col gap-6 bg-[#121214]/90 backdrop-blur-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] gpu-accelerated"
        style={{ willChange: "transform" }}
      >
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-2" />

        <div className="text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-2">
            {t("payment.title")}
          </p>
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl flex items-center justify-center gap-3 font-black tracking-tight"
          >
            {formatNumber(price)}{" "}
            <span className="text-xl opacity-50">UZS</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => copyToClipboard(price)}
              className="text-black text-lg p-2 rounded-xl bg-[#f2b90d] hover:bg-[#ffe066] transition-colors"
            >
              <GrCopy />
            </motion.button>
          </motion.h2>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center text-white/50 animate-pulse">
            Loading card...
          </div>
        ) : (
          cardData && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl p-4 border border-white/10 overflow-hidden group bg-gradient-to-br from-white/10 to-transparent isolate"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f2b90d]/20 rounded-full blur-3xl group-hover:bg-[#f2b90d]/30 transition-all duration-500"></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-8 rounded-full bg-[#f2b90d] flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <MdRssFeed className="text-black text-lg" />
                    </div>
                    <p className="font-bold text-sm tracking-wide">
                      {t("payment.cardDetails")}
                    </p>
                  </div>
                </div>

                <div className="h-8 opacity-80 backdrop-blur-md rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img
                    src={`/${cardData.cardType.toLowerCase()}.jpg`}
                    alt="card"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>

              {/* Card number */}
              <p className="text-white/40 text-[9px] font-bold uppercase mb-1 tracking-widest">
                {t("payment.cardNumber")}
              </p>

              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="font-mono text-white tracking-[0.10em] text-lg drop-shadow-sm">
                  {formatCardNumber(cardData.cardNumber)}
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyToClipboard(cardData.cardNumber)}
                  className="bg-[#f2b90d] text-black size-9 z-10 flex items-center justify-center rounded-xl shadow-lg shadow-orange-500/20"
                >
                  <GrCopy className="text-sm" />
                </motion.button>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/40 text-[9px] font-bold uppercase mb-1 tracking-widest">
                    {t("payment.cardOwner")}
                  </p>
                  <p className="text-xs font-bold tracking-widest text-[#f2b90d]">
                    {cardData.owner}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 text-xs bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-4xl text-blue-400" />
              <span className="text-blue-100/80 font-medium">
                {t("payment.paymentWarning")}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center py-1 px-1">
            <div className="flex flex-col">
              <p className="text-white/40 text-[10px] font-bold uppercase mb-1">
                {t("payment.cashback")}
              </p>
              <div className="flex items-center gap-2 text-[#f2b90d]">
                <FaArrowUpRightDots className="text-lg font-bold" />
                <p className="font-black text-lg">
                  +{formatNumber(cashback)} UZS
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-[#f2b90d]/10 rounded-xl text-[10px] font-black text-[#f2b90d] uppercase border border-[#f2b90d]/20">
              {t("payment.statusActive")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onVerify}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] text-black font-black text-xl uppercase tracking-widest shadow-[0_4px_25px_rgba(242,185,13,0.4)] relative overflow-hidden flex items-center justify-center"
          >
            {t("payment.verifyPayment")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="h-10 rounded-2xl font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            {t("payment.cancel")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
