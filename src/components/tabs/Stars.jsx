import { FaWallet } from "react-icons/fa";
import { MdOutlineSecurity, MdShoppingCart, MdStar } from "react-icons/md";
import { SiMailgun } from "react-icons/si";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";

const Stars = ({
  amount,
  setAmount,
  username,
  setUsername,
  onPurchase,
  finalPrice,
  usedCashback,
  setUseCashback,
  useCashback,
  cashbackBalance,
}) => {
  const { t } = useLanguage();
  const { currentUser, formatNumber } = useInfoContext();
  const options = [100, 200, 250, 300, 500];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="px-4 pt-4 pb-10 max-w-lg mx-auto w-full">
        <div className="mb-5 text-center">
          <div className="inline-flex items-center justify-center p-5 rounded-full bg-[#f2b90d]/10 mb-3 ring-1 ring-[#f2b90d]/20 floating">
            <MdStar className="text-[#f2b90d] text-5xl" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            {t("home.purchaseStars")}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            {t("home.subtitle")}
          </p>
        </div>

        <div className="glass-card rounded-4xl p-6 mb-8 border border-white/10">
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

          <div className="mb-4">
            <label className="flex justify-between items-end text-white/50 text-xs font-bold uppercase tracking-widest mb-3 pl-1">
              <p>{t("home.starsAmount")}</p>
              <span className="text-[10px]">{t("home.starsLimit")}</span>
            </label>
            <div className="relative">
              <input
                className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-4 focus:ring-[#f2b90d]/50 focus:border-[#f2b90d] text-white text-xl font-bold transition-all outline-none"
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value < 10000 ? Number(e.target.value) : 10000,
                  )
                }
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f2b90d] font-black text-xs tracking-tighter">
                {t("home.stars")}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto justify-start items-center py-2 no-scrollbar -mx-2 px-2 mb-4">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => setAmount(opt)}
                className={`shrink-0 px-4 py-2 rounded-2xl border transition-all text-sm font-semibold ${
                  amount === opt
                    ? "border-[#f2b90d] bg-[#f2b90d]/10 text-[#f2b90d] ring-2 ring-[#f2b90d]/20"
                    : "border-white/10 bg-white/5 hover:border-[#f2b90d]/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-2 p-5 rounded-2xl bg-black/40 border border-white/5 flex justify-between items-center">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-1">
                {t("home.paymentAmount")}
              </p>

              <p className="text-2xl font-black text-white">
                {formatNumber(finalPrice)}{" "}
                <span className="text-sm font-bold opacity-60">UZS</span>
              </p>

              {useCashback && (
                <p className="text-[11px] text-green-400 mt-1">
                  − {formatNumber(usedCashback)} UZS keshbek ishlatildi
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-1">
                1 Stars
              </p>
              <p className="text-[#f2b90d] font-black text-lg">x220 UZS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 mt-2">
            <input
              id="cashback"
              type="checkbox"
              checked={useCashback}
              onChange={(e) => setUseCashback(e.target.checked)}
              className="accent-[#f2b90d]"
            />
            <label
              htmlFor="cashback"
              className="text-sm text-slate-400 cursor-pointer"
            >
              Keshbekdan foydalanish
            </label>
          </div>

          <button
            onClick={onPurchase}
            className="w-full h-16 mt-8 rounded-2xl bg-linear-to-br from-[#f2b90d] via-[#ffdb4d] to-[#f2b90d] text-black font-black text-lg uppercase tracking-widest gold-glow active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <MdShoppingCart className="font-black" />
            {t("home.buy")}
          </button>
        </div>

        <div className="flex flex-col items-stretch justify-start rounded-4xl shadow-2xl glass-card overflow-hidden">
          <div
            className="w-full bg-center bg-no-repeat aspect-16/7 bg-cover opacity-80"
            style={{
              backgroundImage: 'url("https://picsum.photos/800/400?random=20")',
            }}
          >
            <div className="w-full h-full bg-linear-to-t from-cosmic-black/80 to-transparent"></div>
          </div>
          <div className="flex w-full flex-col items-start gap-1 p-6">
            <p className="text-white text-lg font-black leading-tight tracking-tight">
              {t("home.premiumSupport")}
            </p>
            <div className="flex items-center gap-4 w-full justify-between mt-1">
              <p className="text-white/50 text-sm font-medium leading-snug">
                {t("home.premiumSupportDesc")}
              </p>
              <div className="shrink-0 size-10 rounded-full bg-[#f2b90d]/10 flex items-center justify-center border border-[#f2b90d]/20">
                <MdOutlineSecurity className="text-[#f2b90d] text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            {t("home.secureFooter")}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Stars;
