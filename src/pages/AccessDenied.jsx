import React from "react";
import { MdPersonSearch, MdPriorityHigh } from "react-icons/md";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-[#f2b90d] rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-10 right-10 w-1 h-1 bg-[#f2b90d] rounded-full shadow-[0_0_10px_#f2b90d]"></div>
        </div>
        <div className="glass-card w-full max-w-sm rounded-[2.5rem] p-8 flex flex-col items-center gap-8 shadow-2xl">
          <div className="relative">
            <div className="size-24 rounded-full bg-[#f2b90d]/10 flex items-center justify-center border border-[#f2b90d]/20">
              <MdPersonSearch className="text-5xl text-[#f2b90d]" />
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 bg-[#f2b90d]  rounded-full flex items-center justify-center border-2 border-[#0a0904]">
              <MdPriorityHigh className="text-lg text-black font-bold" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight text-center">
              Foydalanuvchi topilmadi
            </h2>
            <p className="text-white/60 text-sm font-normal leading-relaxed text-center px-2">
              Kiritilgan username bo‘yicha ma’lumot topilmadi. Stars tushirib
              berishimiz uchun avval botimizga kirib{" "}
              <span className="text-[#f2b90d] font-semibold">"Start"</span>{" "}
              tugmasini bosgan bo‘lishingiz kerak.
            </p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <a
              href="https://t.me/starflowprobot"
              className="bg-[#f2b90d] w-full flex items-center justify-center h-14 rounded-full shadow-[0_8px_20px_-4px_rgba(242,185,13,0.4)] active:scale-95 transition-transform"
            >
              <span className="text-black text-base font-bold tracking-tight">
                Botga o‘tish
              </span>
            </a>
            <button className="w-full flex items-center justify-center h-12 rounded-full text-white/50 hover:text-white transition-colors active:scale-95">
              <span className="text-sm font-semibold">Ortga qaytish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
