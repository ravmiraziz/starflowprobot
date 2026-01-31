import { BiWinkSmile } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { MdClose, MdStar } from "react-icons/md";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useLanguage } from "../../context/LanguageContext";
import { useInfoContext } from "../../context/infoContext";
import { motion } from "framer-motion";

const Success = ({ cashback, amount, onReset }) => {
  const { t } = useLanguage();
  const { formatNumber } = useInfoContext();
  const { width, height } = useWindowSize();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-5 bg-[#0a0a0c]/90 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-80 bg-[#f2b90d]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 size-64 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <Confetti
        recycle={false}
        numberOfPieces={500}
        width={width}
        height={height}
        gravity={0.2}
      />

      <motion.div
        variants={itemVariants}
        className="w-full flex justify-end relative z-10 mt-11"
      >
        <button
          onClick={onReset}
          className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-md"
        >
          <MdClose className="text-white text-xl" />
        </button>
      </motion.div>

      <div className="flex flex-col items-center text-center w-full max-w-md relative z-10">
        <motion.div variants={itemVariants} className="relative mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#f2b90d]/30 blur-3xl rounded-full"
          />
          <div className="size-32 bg-gradient-to-br from-[#f2b90d] to-[#ffdb4d] rounded-[32px] flex items-center justify-center relative z-10 shadow-[0_10px_40px_rgba(242,185,13,0.4)] rotate-3">
            <MdStar className="text-7xl text-black drop-shadow-sm" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-black mb-2 tracking-tight text-white drop-shadow-lg"
        >
          {t("success.title")}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-white/60 text-lg font-medium mb-8"
        >
          {t("success.subtitle")}
        </motion.p>

        <div className="flex flex-col w-full gap-3">
          <motion.div
            variants={itemVariants}
            className="glass-card p-2 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-2xl bg-[#f2b90d]/10 flex items-center justify-center text-[#f2b90d]">
                <MdStar className="text-2xl" />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                  STARS
                </p>
                <p className="text-xl font-black text-white tracking-tight">
                  +{formatNumber(amount)}
                </p>
              </div>
            </div>
            <div className="text-[#f2b90d] text-xs font-black bg-[#f2b90d]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Received
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-2 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <FaWallet className="text-xl" />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                  {t("success.cashbackLabel")}
                </p>
                <p className="text-xl font-black text-[#f2b90d] tracking-tight">
                  +{formatNumber(cashback)} UZS
                </p>
              </div>
            </div>
            <div className="text-white/50 text-xs font-black bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
              {t("success.cashbackLabel")}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="w-full max-w-sm relative z-10 pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="w-full h-16 rounded-3xl bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] text-black font-black text-lg uppercase tracking-widest shadow-[0_10px_40px_rgba(242,185,13,0.3)] flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <span className="relative z-10">{t("success.again")}</span>
          <BiWinkSmile className="text-[28px] relative z-10" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Success;
