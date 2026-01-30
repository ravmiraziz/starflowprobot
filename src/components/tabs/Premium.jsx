import React from "react";
import {
  MdBolt,
  MdCalendarMonth,
  MdEvent,
  MdSchedule,
  MdVerified,
} from "react-icons/md";
import { SiMailgun } from "react-icons/si";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";

const Premium = ({
  amount,
  setAmount,
  username,
  setUsername,
  onPurchase,
  price,
}) => {
  const { t } = useLanguage();
  const { currentUser } = useInfoContext();
  return (
    <div>
      <main className="px-4 pt-6 pb-10 max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center p-6 rounded-full bg-[#f2b90d]/10 mb-5 ring-1 ring-[#f2b90d]/20 floating">
            <MdVerified className="text-[#f2b90d] text-6xl" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            Telegram Premium
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Barcha imkoniyatlarni oching
          </p>
        </div>
        <div className="glass-card rounded-[2.5rem] p-6 mb-8">
          <div className="mb-4">
            <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-3 pl-1">
              {t("home.telegramUsername")}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-white/30 font-semibold text-lg">
                <SiMailgun />
              </div>
              <input
                className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl pl-10 pr-24 focus:ring-[#f2b90d]/50 focus:border-[#f2b90d] text-white placeholder-white/20 transition-all outline-none"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                onClick={() => setUsername(currentUser?.username)}
                className="absolute right-2 h-10 px-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-white/5"
              >
                {t("home.myUsername")}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-4 pl-1">
              Obuna muddatini tanlang
            </label>
            <div className="relative group cursor-pointer">
              <div className="absolute -top-3 right-4 z-10 bg-[#f2b90d] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Eng foydali -40%
              </div>
              <div className="flex items-center justify-between p-5 rounded-3xl border-2 border-[#f2b90d] bg-[#f2b90d]/10 gold-glow transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[#f2b90d] flex items-center justify-center text-black">
                    <MdCalendarMonth className="font-bold text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">12 oy</h3>
                    <p className="text-white/60 text-xs font-medium">
                      Yillik obuna
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white">
                    450 000 <span className="text-[10px] opacity-60">UZS</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/80">
                  <MdEvent className="font-bold text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">6 oy</h3>
                  <p className="text-white/60 text-xs font-medium">
                    Yarim yillik
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white">
                  280 000 <span className="text-[10px] opacity-60">UZS</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/80">
                  <MdSchedule className="font-bold text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">3 oy</h3>
                  <p className="text-white/60 text-xs font-medium">
                    Kvartal obunasi
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white">
                  165 000 <span className="text-[10px] opacity-60">UZS</span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onPurchase}
            className="w-full h-16 mt-10 rounded-2xl bg-linear-to-br from-[#f2b90d] via-[#ffdb4d] to-[#f2b90d] text-black font-black text-lg uppercase tracking-widest gold-glow active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <MdBolt className="font-black text-2xl" />
            {t("home.buy")}
          </button>
        </div>
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            Xavfsiz to'lov tizimi orqali himoyalangan
          </p>
        </div>
      </main>
    </div>
  );
};

export default Premium;
