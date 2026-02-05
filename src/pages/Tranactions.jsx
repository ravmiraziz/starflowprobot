import React from "react";
import { MdStar, MdVerified } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { useInfoContext } from "../context/infoContext";

const Tranactions = ({ setPendingData }) => {
  const { t } = useLanguage();
  const { currentUser, formatNumber, setCurrentScreen } = useInfoContext();

  const renderStatus = (status) => {
    if (status === "canceled") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/10 mt-1">
          <p className="text-[9px] text-red-400 font-black uppercase tracking-wider">
            {t("transactions.status.canceled")}
          </p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/10 mt-1">
          <p className="text-[9px] text-green-400 font-black uppercase tracking-wider">
            {t("transactions.status.success")}
          </p>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f2b90d]/10 border border-[#f2b90d]/10 mt-1">
          <p className="text-[9px] text-[#f2b90d] font-black uppercase tracking-wider animate-pulse">
            {t("transactions.status.pending")}
          </p>
        </div>
      );
    }

    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-xl font-black tracking-tight text-white/90">
          {t("transactions.title")}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 rounded-full bg-[#f2b90d]/10 text-[10px] font-black uppercase tracking-widest text-[#f2b90d] border border-[#f2b90d]/20 hover:bg-[#f2b90d]/20 transition-colors"
        >
          {t("transactions.all")}
        </motion.button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#1c1c1e]/40 backdrop-blur-xl"
      >
        <div className="divide-y divide-white/5">
          {currentUser?.purchase_histories?.length > 0 ? (
            currentUser.purchase_histories.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (item.status === "pending") {
                      setPendingData(item);
                      setCurrentScreen("PAYMENT");
                    }
                  }}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="flex items-center justify-between p-5 transition-colors cursor-default"
                >
                  <div className="flex items-center gap-4">
                    {item.is_stars && (
                      <div className="size-12 rounded-2xl bg-[#f2b90d]/10 border border-[#f2b90d]/20 flex items-center justify-center shadow-[0_4px_12px_rgba(242,185,13,0.1)]">
                        <MdStar className="text-[#f2b90d] text-2xl" />
                      </div>
                    )}
                    {item.is_premium && (
                      <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.1)]">
                        <MdVerified className="text-blue-400 text-2xl" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-base text-white/90 tracking-tight">
                        #{item.id} •{" "}
                        {item.is_stars &&
                          t("transactions.starsLabel", { amount: item.amount })}
                        {item.is_premium &&
                          t("transactions.premiumLabel", {
                            amount: item.amount,
                          })}
                      </p>
                      <a
                        href={`https://t.me/${item.username}`}
                        className="font-bold text-sm text-blue-500/90 tracking-tight"
                      >
                        @{item.username}
                      </a>
                      <p className="text-[11px] text-white/40 font-medium tracking-wide">
                        {item.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-white tracking-tight">
                      {formatNumber(item.price_uzs)} UZS
                    </p>
                    {renderStatus(item.status)}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-5 text-center text-white/40 font-medium">
              {t("transactions.noHistory")}
            </div>
          )}
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
