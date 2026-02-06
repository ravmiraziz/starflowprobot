import { MdOutlineSecurity, MdShoppingCart, MdStar } from "react-icons/md";
import { SiMailgun } from "react-icons/si";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";
import Tranactions from "../../pages/Tranactions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { post } from "../../api/api";

const Stars = ({
  amount,
  price,
  setAmount,
  username,
  setUsername,
  setPrice,
  setCashback,
  setPendingData,
  setTransactionId,
}) => {
  const { t } = useLanguage();
  const { currentUser, formatNumber, setCurrentScreen, setToast, getData } =
    useInfoContext();
  const options = [100, 250, 300, 500];
  const [useCashback, setUseCashback] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleMyUsernameClick = () => {
    setUsername(currentUser?.username);
  };

  const usedCashback = useCashback
    ? Math.min(price, currentUser?.cashback_balans || 0)
    : 0;
  const finalPrice = Math.max(price - usedCashback, 0);

  const handlePurchase = async () => {
    if (!username) {
      setToast({
        isVisible: true,
        message: t("home.enterUsername"),
        type: "info",
      });
      return;
    }
    if (amount < 50) {
      setToast({
        isVisible: true,
        message: t("home.minStarsError"),
        type: "info",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await post("purchase", {
        amount,
        cashback_balans_uzs: useCashback ? currentUser.cashback_balans : 0,
        cashback_want_use_uzs: useCashback ? currentUser.cashback_balans : 0,
        is_premium: false,
        is_stars: true,
        price_uzs: price,
        user_id: currentUser.id,
        username: currentUser.username,
      });
      if (data) {
        setTransactionId(data.id);
        setPrice(data.price_uzs);
        setCashback(data.cashback_balans_uzs);
        await getData("purchase");
        setCurrentScreen("PAYMENT");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 pt-4 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center p-5 rounded-full bg-[#f2b90d]/10 mb-3 ring-1 ring-[#f2b90d]/20 shadow-[0_0_40px_rgba(242,185,13,0.3)] backdrop-blur-3xl"
          >
            <MdStar className="text-[#f2b90d] text-5xl drop-shadow-[0_0_15px_rgba(242,185,13,0.5)]" />
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            {t("home.purchaseStars")}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            {t("home.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-4xl p-6 mb-8 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-2xl relative overflow-hidden gpu-accelerated"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Decorative gradients - optimized for mobile */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f2b90d]/20 blur-[60px] rounded-full pointer-events-none translate-z-0" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none translate-z-0" />

          <div className="mb-6 relative z-10">
            <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-3 pl-1">
              {t("home.telegramUsername")}
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-semibold text-lg transition-colors group-focus-within:text-[#f2b90d]">
                <SiMailgun />
              </div>
              <input
                className="w-full h-16 bg-black/20 border border-white/5 rounded-2xl pl-12 pr-32 focus:ring-2 focus:ring-[#f2b90d]/50 focus:border-[#f2b90d]/50 text-white placeholder-white/20 transition-all outline-none font-medium backdrop-blur-sm"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMyUsernameClick}
                className="absolute right-2 top-2 bottom-2 px-4 bg-white/10 hover:bg-white/20 active:bg-[#f2b90d]/20 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-white/5 overflow-hidden"
              >
                <span className="relative z-10">{t("home.myUsername")}</span>
                {username === currentUser?.username && (
                  <motion.div
                    layoutId="username-filled"
                    className="absolute inset-0 bg-[#f2b90d]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          <div className="mb-6 relative z-10">
            <label className="flex justify-between items-end text-white/50 text-xs font-bold uppercase tracking-widest mb-3 pl-1">
              <p>{t("home.starsAmount")}</p>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">
                {t("home.starsLimit")}
              </span>
            </label>
            <div className="relative">
              <input
                className="w-full h-16 bg-black/20 border border-white/5 rounded-2xl px-5 focus:ring-2 focus:ring-[#f2b90d]/50 focus:border-[#f2b90d]/50 text-white text-2xl font-bold transition-all outline-none backdrop-blur-sm"
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value < 10000 ? Number(e.target.value) : 10000,
                  )
                }
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#f2b90d] font-black text-xs tracking-tighter bg-[#f2b90d]/10 px-2 py-1 rounded-lg">
                {t("home.stars")}
              </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto justify-start items-center py-2 no-scrollbar -mx-2 px-2 mb-6 relative z-10">
            {options.map((opt) => (
              <motion.button
                key={opt}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAmount(opt)}
                className={`shrink-0 px-5 py-3 rounded-2xl border transition-all text-sm font-bold relative overflow-hidden ${
                  amount === opt
                    ? "border-[#f2b90d] text-[#f2b90d] shadow-[0_0_20px_rgba(242,185,13,0.3)]"
                    : "border-white/10 bg-white/5 hover:border-[#f2b90d]/40 text-white/70"
                }`}
              >
                {amount === opt && (
                  <motion.div
                    layoutId="active-option"
                    className="absolute inset-0 bg-[#f2b90d]/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{opt}</span>
              </motion.button>
            ))}
          </div>

          <div className="mt-2 p-6 rounded-3xl bg-black/40 border border-white/5 flex justify-between items-center relative z-10 backdrop-blur-md">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-1">
                {t("home.paymentAmount")}
              </p>

              <p className="text-3xl font-black text-white tracking-tight">
                {formatNumber(finalPrice)}{" "}
                <span className="text-sm font-bold opacity-60">UZS</span>
              </p>

              <AnimatePresence>
                {useCashback && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] text-green-400 mt-1 font-medium"
                  >
                    {t("home.usedCashbackInfo", {
                      amount: formatNumber(usedCashback),
                    })}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-1">
                1 Stars
              </p>
              <div className="bg-[#f2b90d]/10 px-3 py-1 rounded-xl inline-block border border-[#f2b90d]/20">
                <p className="text-[#f2b90d] font-black text-sm text-nowrap">
                  x220 UZS
                </p>
              </div>
            </div>
          </div>

          {currentUser?.cashback_balans >= 1000 && (
            <motion.div
              className="flex items-center gap-3 px-2 mt-4 relative z-10"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex items-center">
                <input
                  id="cashback"
                  type="checkbox"
                  checked={useCashback}
                  onChange={(e) => setUseCashback(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-md checked:bg-[#f2b90d] checked:border-[#f2b90d] transition-all cursor-pointer"
                />
                <MdOutlineSecurity className="absolute text-black text-xs opacity-0 peer-checked:opacity-100 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <label
                htmlFor="cashback"
                className="text-sm text-slate-400 cursor-pointer select-none font-medium"
              >
                {t("home.useCashback")}
              </label>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePurchase}
            disabled={loading}
            className={`w-full h-16 mt-8 rounded-2xl bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] text-black font-black text-xl uppercase tracking-widest shadow-[0_4px_30px_rgba(242,185,13,0.4)] active:shadow-[0_2px_15px_rgba(242,185,13,0.4)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            <MdShoppingCart
              className={`font-black text-2xl relative z-10 ${loading && "animate-pulse"}`}
            />
            {!loading && <span className="relative z-10">{t("home.buy")}</span>}
          </motion.button>
        </motion.div>

        <Tranactions setPendingData={setPendingData} />
      </div>
    </div>
  );
};

export default Stars;
