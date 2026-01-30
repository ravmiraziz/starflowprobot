import { MdRssFeed } from "react-icons/md";
import { GrCopy } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useLanguage } from "../../context/LanguageContext";
import { useInfoContext } from "../../context/infoContext";
import { useState } from "react";

const formatCardNumber = (number) => {
  if (!number) return "•••• •••• •••• ••••";
  return number.replace(/(.{4})/g, "$1 ").trim();
};

const PaymentModal = ({ onClose, onVerify, price, cashback }) => {
  const { t } = useLanguage();
  const { formatNumber } = useInfoContext();

  const copyToClipboard = async (value) => {
    try {
      const cleanValue =
        typeof value === "number" ? value.toString() : value.replace(/\s/g, "");

      await navigator.clipboard.writeText(cleanValue);
    } catch (e) {
      console.error("Copy failed", e);
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

  const openPaymentModal = async () => {
    setLoading(true);
    try {
      const res = await get("/payment/virtual-card"); // backend endpoint
      setCardData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex flex-col justify-end bg-black/60">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative glass-card w-full max-w-lg mx-auto rounded-t-[2.5rem] p-8 pb-2 flex flex-col gap-6 animate-slide-up">
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-2"></div>

        <div className="text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-2">
            {t("payment.title")}
          </p>
          <h2 className="text-4xl flex items-center justify-center gap-4 font-black">
            {formatNumber(price)} UZS
            <button
              type="button"
              onClick={() => copyToClipboard(price)}
              className="animate-pulse text-black text-2xl p-1 rounded-lg bg-[#f2b90d]"
            >
              <GrCopy />
            </button>
          </h2>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center text-white/50">
            Loading card...
          </div>
        ) : (
          cardData && (
            <div className="vertual rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f2b90d]/10 rounded-full blur-2xl group-hover:bg-[#f2b90d]/20 transition-all"></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#f2b90d] flex items-center justify-center">
                      <MdRssFeed className="text-black text-lg" />
                    </div>
                    <p className="font-bold text-sm">
                      {t("payment.cardDetails")}
                    </p>
                  </div>
                </div>

                <div className="h-10 rounded-lg border border-white/10 overflow-hidden">
                  <img
                    src={`/${cardData.cardType.toLowerCase()}.jpg`}
                    alt="card"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Card number */}
              <p className="text-white text-[8px] font-bold uppercase mb-1">
                {t("payment.cardNumber")}
              </p>

              <div className="flex items-center sm:flex-col gap-3 mb-3">
                <div className="font-mono text-white/90 tracking-[0.15em] text-[17px] sm:text-lg">
                  {formatCardNumber(cardData.cardNumber)}
                </div>

                <button
                  onClick={() => copyToClipboard(cardData.cardNumber)}
                  className="bg-[#f2b90d] text-black w-8 p-2 rounded-lg hover:scale-105 transition-all"
                >
                  <GrCopy />
                </button>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-[8px] font-bold uppercase mb-1">
                    {t("payment.cardOwner")}
                  </p>
                  <p className="text-xs font-bold tracking-widest">
                    {cardData.owner}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 text-xs bg-blue-500/20 rounded-lg">
            <FaInfoCircle className="text-2xl m-2 text-[#f2b90d]" />
            {t("payment.paymentWarning")}
          </div>
          <div className="h-px bg-white/5"></div>
          <div className="flex justify-between items-center py-2">
            <div className="flex flex-col">
              <p className="text-white/40 text-[10px] font-bold uppercase mb-1">
                {t("payment.cashback")}
              </p>
              <div className="flex items-center gap-2 text-[#f2b90d]">
                <FaArrowUpRightDots className="text-lg font-bold" />
                <p className="font-black">+{formatNumber(cashback)} UZS</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#f2b90d]/10 rounded-full text-[10px] font-black text-[#f2b90d] uppercase">
              {t("payment.statusActive")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            onClick={onVerify}
            className="w-full h-14 rounded-2xl bg-[#f2b90d] text-black font-black text-lg uppercase tracking-wider gold-glow active:scale-95 transition-all"
          >
            {t("payment.verifyPayment")}
          </button>
          <button
            onClick={onClose}
            className="h-10 rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-all"
          >
            {t("payment.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
