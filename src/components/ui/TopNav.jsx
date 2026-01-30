import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useInfoContext } from "../../context/infoContext";
import { useLanguage } from "../../context/LanguageContext";

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const TopNav = () => {
  const { currentUser, formatNumber } = useInfoContext();
  const { lang, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const sortedLangs = [
    LANGS.find((l) => l.code === lang),
    ...LANGS.filter((l) => l.code !== lang),
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-cosmic-black/30">
      {/* Til tanlash */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/5 w-10 h-10 text-sm font-bold"
        >
          {lang.toUpperCase()}
        </button>

        {/* Dropdown */}
        <div
          className={`absolute top-0 left-full flex gap-2 ml-2 transition-all duration-300 ${
            open
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-5 pointer-events-none"
          }`}
        >
          {sortedLangs.slice(1).map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLanguage(l.code);
                setOpen(false);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cashback */}
      <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
        <FaWallet className="text-[#f2b90d] text-[18px]" />
        <p className="text-white/90 text-sm font-bold tracking-tight">
          {formatNumber(currentUser?.cashback || 0)} UZS
        </p>
      </div>
    </nav>
  );
};

export default TopNav;
