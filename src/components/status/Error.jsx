import { RiSignalWifiErrorFill } from "react-icons/ri";
import { MdClose, MdStar } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";

const Error = ({ onRetry, onCancel }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 bg-[#0a0a0c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,77,77,0.08)_0%,_rgba(10,10,12,1)_70%)] pointer-events-none"></div>

      <div className="w-full flex justify-end z-10">
        <button
          onClick={onCancel}
          className="size-10 rounded-full bg-white/5 flex items-center justify-center"
        >
          <MdClose className="text-white/40 text-2xl" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center z-10">
        <div className="relative mb-12 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff4d4d] to-[#f2b90d] p-1 error-star-glow">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0c]">
            <MdStar className="text-[80px] text-[#ff4d4d]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <MdClose className="text-[100px] text-black/70 font-light translate-y-1" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black mb-3 tracking-tight">
          {t("error.title")}
        </h1>
        <p className="text-white/60 text-lg px-8">{t("error.description")}</p>

        <div className="mt-10 bg-white/5 border border-red-500/20 backdrop-blur-md flex items-center gap-3 rounded-2xl p-4 min-w-[280px]">
          <RiSignalWifiErrorFill className="text-red-500" />
          <p className="text-sm font-medium text-white/80">
            {t("error.networkError")}
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm z-10 space-y-3">
        <button
          onClick={onRetry}
          className="w-full h-16 rounded-full bg-gradient-to-r from-red-500 to-[#f2b90d] text-black font-black text-lg uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
        >
          {t("error.retry")}
        </button>
        <button
          onClick={onCancel}
          className="w-full h-14 rounded-full text-white/40 font-bold text-lg active:scale-95 transition-all"
        >
          {t("error.cancel")}
        </button>
      </div>
    </div>
  );
};

export default Error;
