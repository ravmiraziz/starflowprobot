import { BiWinkSmile } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { MdClose, MdStar } from "react-icons/md";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLanguage } from "../../context/LanguageContext";
import { useInfoContext } from "../../context/infoContext";

const Success = ({ cashback, amount, onReset }) => {
  const { t } = useLanguage();
  const { formatNumber } = useInfoContext();
  const { width, height } = useWindowSize();
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 bg-cosmic-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-64 bg-[#f2b90d]/10 rounded-full blur-[100px]"></div>
      </div>

      <Confetti
        recycle={false}
        numberOfPieces={500}
        width={width}
        height={height}
      />

      <div className="w-full flex justify-end">
        <button
          onClick={onReset}
          className="size-10 rounded-full bg-white/5 flex items-center justify-center"
        >
          <MdClose className="text-white/40 text-2xl" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#f2b90d]/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="size-30 bg-[#f2b90d] rounded-full flex items-center justify-center relative z-10 gold-glow">
            <MdStar className="text-6xl text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-black mb-2 tracking-tight">
          {t("success.title")}
        </h1>
        <p className="text-white/60 text-lg">{t("success.subtitle")}</p>

        <div className="flex not-sm:flex-col items-center gap-2 mt-8">
          <div className="glass-card p-3 rounded-2xl min-w-[240px] border border-[#f2b90d]/20">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">
              STARS
            </p>
            <div className="flex items-center justify-center gap-2 text-[#f2b90d]">
              <MdStar className="text-2xl" />
              <p className="text-2xl font-black tracking-tight">
                +{formatNumber(amount)} Stars
              </p>
            </div>
          </div>
          <div className="glass-card p-3 rounded-2xl min-w-[240px] border border-[#f2b90d]/20">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">
              {t("success.cashbackLabel")}
            </p>
            <div className="flex items-center justify-center gap-2 text-[#f2b90d]">
              <FaWallet className="text-2xl" />
              <p className="text-2xl font-black tracking-tight">
                +{formatNumber(cashback)} UZS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <button
          onClick={onReset}
          className="w-full h-16 rounded-full bg-[#f2b90d] text-black font-black text-lg uppercase tracking-widest gold-glow flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {t("success.again")}
          <BiWinkSmile className="text-[26px]" />
        </button>
      </div>
    </div>
  );
};

export default Success;
