import React from "react";
import { useAdminContext } from "../../context/AdminContext";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  MdTrendingUp,
  MdFiberNew,
  MdCheckCircle,
  MdLocalShipping,
  MdCancel,
  MdStar,
  MdVerified,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

const Statistics = () => {
  const { stats } = useAdminContext();
  const { formatNumber } = useInfoContext();
  const { t } = useLanguage();

  const mainStats = stats?.stats || {};
  const dailyStats = stats?.daily_stats || [];
  const topProductsList = stats?.top_products || [];

  // Calculate total revenue from daily stats
  const totalRevenue = dailyStats.reduce(
    (acc, curr) => acc + curr.total_sales,
    0,
  );

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-1 neon-glow-gold">
          <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.1em]">
            {t("admin.stats.revenue")}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white">
              {formatNumber(totalRevenue)}
            </span>
            <span className="text-primary text-[10px] font-bold">UZS</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <MdTrendingUp className="text-green-400 text-xs" />
            <span className="text-green-400 text-[10px] font-bold">
              Live Data
            </span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-1">
          <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.1em]">
            {t("admin.stats.users")}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white">
              {formatNumber(mainStats.total_users || 0)}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-primary text-[10px] font-bold">
              {t("admin.stats.registered")}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 px-1">
          {t("admin.stats.orderStatus")}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white/60">
                {t("transactions.status.pending")}
              </p>
              <p className="text-lg font-black">
                {mainStats.pending_transactions || 0}
              </p>
            </div>
            <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MdFiberNew className="text-blue-400 text-lg" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white/60">
                {t("transactions.status.success")}
              </p>
              <p className="text-lg font-black">
                {mainStats.success_transactions || 0}
              </p>
            </div>
            <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <MdCheckCircle className="text-green-400 text-lg" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white/60">
                {t("admin.stats.cashback")}
              </p>
              <p className="text-lg font-black">
                {mainStats.total_cashback_earned || 0}
              </p>
            </div>
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MdOutlineAccountBalanceWallet className="text-primary text-lg" />
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-white/60">
                {t("transactions.status.canceled")}
              </p>
              <p className="text-lg font-black">
                {mainStats.canceled_transactions || 0}
              </p>
            </div>
            <div className="size-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <MdCancel className="text-red-400 text-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
            {t("admin.stats.history")}
          </h2>
          <p className="text-[10px] font-bold text-primary">Live Data</p>
        </div>
        <div className="glass-card rounded-2xl p-5 overflow-hidden">
          <div className="h-32 flex items-end gap-2 relative">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,80 Q10,75 20,60 T40,40 T60,55 T80,25 T100,10"
                fill="none"
                stroke="#f2b90d"
                strokeWidth="2.5"
              ></path>
              <path
                d="M0,80 Q10,75 20,60 T40,40 T60,55 T80,25 T100,10 L100,100 L0,100 Z"
                fill="url(#chartGradient)"
                opacity="0.15"
              ></path>
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f2b90d"></stop>
                  <stop
                    offset="100%"
                    stopColor="#f2b90d"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute right-[10%] top-[15%] size-2 bg-primary rounded-full neon-glow-gold"></div>
          </div>
          <div className="flex justify-between mt-4">
            {dailyStats.map((stat, idx) => (
              <span
                key={idx}
                className="text-[8px] font-black text-white/20 uppercase tracking-widest"
              >
                {stat.date.split("-").slice(1).join("/")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 px-1">
          {t("admin.stats.topProducts")}
        </h2>
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
          {topProductsList.map((product, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gradient-to-tr from-cosmic-purple to-cosmic-charcoal flex items-center justify-center border border-white/10">
                  {product.type === "premium" ? (
                    <MdVerified className="text-primary text-xl" />
                  ) : (
                    <MdStar className="text-primary text-xl" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white/90">
                    {product.type === "premium"
                      ? t("tabs.premium")
                      : t("tabs.stars")}
                  </p>
                  <p className="text-[10px] text-white/40 font-medium">
                    {t("admin.stats.sales", { count: product.count })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-white">
                  {t("admin.stats.popular")}
                </p>
                <p className="text-[9px] text-primary font-bold uppercase tracking-tighter">
                  {t("admin.stats.topProduct")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center pb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          Admin Management Console v2.0
        </p>
      </div>
    </div>
  );
};

export default Statistics;
