import React, { useEffect, useMemo, useState } from "react";
import {
  MdBolt,
  MdCalendarMonth,
  MdEvent,
  MdOutlineSecurity,
  MdSchedule,
  MdVerified,
} from "react-icons/md";
import { SiMailgun } from "react-icons/si";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";
import Tranactions from "../../pages/Tranactions";
import { motion, AnimatePresence } from "framer-motion";
import { post } from "../../api/api";

const PLAN_META = {
  12: {
    id: "12",
    icon: <MdCalendarMonth />,
    highlight: true,
  },
  6: {
    id: "6",
    icon: <MdEvent />,
  },
  3: {
    id: "3",
    icon: <MdSchedule />,
  },
};

const Premium = ({
  username,
  setUsername,
  setPrice,
  setCashback,
  setPendingData,
  setTransactionId,
}) => {
  const { t } = useLanguage();
  const { currentUser, formatNumber, setToast, setCurrentScreen, getData } =
    useInfoContext();
  const [loading, setLoading] = useState(false);
  const PLANS = useMemo(() => {
    return (currentUser?.premium_prices || [])
      .map((item) => {
        const meta = PLAN_META[item.month];
        if (!meta) return null;

        return {
          ...meta,
          months: item.month,
          price: item.price,
          title: t(`premium.plans.${item.month}.title`),
          subtitle: t(`premium.plans.${item.month}.subtitle`),
          badge:
            t(`premium.plans.${item.month}.badge`) ===
            `premium.plans.${item.month}.badge`
              ? null
              : t(`premium.plans.${item.month}.badge`),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.months - a.months);
  }, [currentUser?.premium_prices, t]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [useCashback, setUseCashback] = useState(false);

  useEffect(() => {
    if (PLANS.length && !selectedPlan) {
      setSelectedPlan(PLANS[0]);
    }
  }, [PLANS, selectedPlan]);

  const handlePurchase = async () => {
    if (!username) {
      setToast({
        isVisible: true,
        message: t("home.enterUsername"),
        type: "info",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await post("purchase", {
        amount: selectedPlan.months,
        cashback_balans_uzs: useCashback ? currentUser.cashback_balans : 0,
        cashback_want_use_uzs: useCashback ? currentUser.cashback_balans : 0,
        is_premium: true,
        is_stars: false,
        price_uzs: selectedPlan.price,
        user_id: currentUser.id,
        username: currentUser.username,
      });
      if (data) {
        setTransactionId(data.id);
        setPrice(data.price_uzs);
        setCashback(data.cashback_balans_uzs);
        getData();
        setCurrentScreen("PAYMENT");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMyUsernameClick = () => {
    setUsername(currentUser?.username || "");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 pt-4 max-w-lg mx-auto w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="inline-flex items-center justify-center p-6 rounded-full bg-[#f2b90d]/10 mb-5 ring-1 ring-[#f2b90d]/20 shadow-[0_0_30px_rgba(242,185,13,0.3)] backdrop-blur-3xl"
          >
            <MdVerified className="text-[#f2b90d] text-6xl drop-shadow-[0_0_15px_rgba(242,185,13,0.5)]" />
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            {t("premium.title")}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            {t("premium.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-[32px] p-6 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] bg-white/5 backdrop-blur-2xl relative overflow-hidden gpu-accelerated"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Decorative gradients - optimized */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none translate-z-0" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#f2b90d]/10 blur-[60px] rounded-full pointer-events-none translate-z-0" />

          {/* USERNAME */}
          <div className="mb-8 relative z-10">
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
                    layoutId="username-filled-premium"
                    className="absolute inset-0 bg-[#f2b90d]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* PLANS */}
          <div className="space-y-4 relative z-10 mb-8">
            <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2 pl-1">
              {t("premium.selectPlan")}
            </label>

            <div className="flex flex-col gap-3">
              {PLANS.map((plan) => {
                const active = selectedPlan?.id === plan.id;

                return (
                  <motion.div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    whileTap={{ scale: 0.98 }}
                    className="relative cursor-pointer p-0.5 rounded-[24px]"
                  >
                    {/* Active Border & Glow Container */}
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          layoutId="plan-active-glow"
                          className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-[#f2b90d] to-[#ffd04d] blur-[2px]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <div
                      className={`relative h-full w-full p-4 rounded-[22px] overflow-hidden border transition-all duration-300 ${
                        active
                          ? "bg-[#1a1a1e] border-transparent"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Active Background Fill */}
                      {active && (
                        <div className="absolute inset-0 bg-[#f2b90d]/10" />
                      )}

                      {plan.badge && (
                        <div className="absolute top-0 right-0 rounded-bl-2xl bg-[#f2b90d] text-black text-[10px] font-black px-3 py-1.5 shadow-lg z-10">
                          {plan.badge}
                        </div>
                      )}

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex gap-4 items-center">
                          <div
                            className={`size-12 rounded-2xl flex items-center justify-center text-2xl transition-colors duration-300
                            ${
                              active
                                ? "bg-[#f2b90d] text-black shadow-[0_0_15px_rgba(242,185,13,0.4)]"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            {plan.icon}
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-bold transition-colors ${active ? "text-white" : "text-white/80"}`}
                            >
                              {plan.title}
                            </h3>
                            <p className="text-white/50 text-xs">
                              {plan.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-right pr-2">
                          <p
                            className={`text-lg font-black transition-colors ${active ? "text-[#f2b90d]" : "text-white"}`}
                          >
                            {formatNumber(plan.price)}
                            <span className="text-[10px] opacity-60 ml-1 text-white">
                              UZS
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
          </div>
          <motion.button
            onClick={handlePurchase}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full h-16 rounded-2xl bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] text-black font-black text-xl uppercase tracking-widest shadow-[0_4px_30px_rgba(242,185,13,0.4)] relative overflow-hidden group flex items-center justify-center gap-3 z-10 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            <MdBolt
              className={`text-2xl relative z-10 ${loading && "animate-pulse"}`}
            />
            {!loading && <span className="relative z-10">{t("home.buy")}</span>}
          </motion.button>
        </motion.div>

        <Tranactions setPendingData={setPendingData} />
      </div>
    </div>
  );
};

export default Premium;
