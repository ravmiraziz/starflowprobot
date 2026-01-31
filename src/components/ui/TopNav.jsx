import { FaWallet } from "react-icons/fa";
import { useInfoContext } from "../../context/infoContext";
import { motion } from "framer-motion";

const TopNav = () => {
  const { currentUser, formatNumber } = useInfoContext();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      className="sticky top-0 z-50 px-6 pb-4 pointer-events-none"
    >
      <div className="flex items-center justify-center w-full pt-12 pointer-events-auto select-none">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer"
        >
          {/* External Glow / Shadow for depth */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#f2b90d]/20 to-[#f2b90d]/0 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/5">
            <div className="bg-[#f2b90d]/10 p-1.5 rounded-full">
              <FaWallet className="text-[#f2b90d] text-[16px]" />
            </div>
            <p className="text-white/90 text-sm font-bold tracking-tight pr-1 font-mono">
              {formatNumber(currentUser?.cashback || 0)}{" "}
              <span className="text-[#f2b90d]">UZS</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default TopNav;
