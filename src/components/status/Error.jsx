import { RiSignalWifiErrorFill } from "react-icons/ri";
import { MdClose, MdStar } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

const Error = ({ onRetry, onCancel }) => {
  const { t } = useLanguage();

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
        <div className="absolute top-1/4 left-1/4 size-80 bg-red-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 size-64 bg-[#f2b90d]/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        variants={itemVariants}
        className="w-full flex justify-end relative z-10 mt-11"
      >
        <button
          onClick={onCancel}
          className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-md"
        >
          <MdClose className="text-white text-xl" />
        </button>
      </motion.div>

      <div className="flex flex-col items-center text-center w-full max-w-md relative z-10">
        <motion.div variants={itemVariants} className="relative mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"
          />
          <div className="size-32 bg-gradient-to-br from-[#ff4d4d] to-[#cc0000] rounded-[32px] flex items-center justify-center relative z-10 shadow-[0_10px_40px_rgba(255,77,77,0.4)] rotate-3 border-4 border-[#0a0a0c]">
            <MdStar className="text-7xl text-black/20 absolute" />
            <MdClose className="text-6xl text-white relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-black mb-2 tracking-tight text-white drop-shadow-lg"
        >
          {t("error.title")}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-white/60 text-lg font-medium mb-8 px-8"
        >
          {t("error.description")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-white/5 border border-red-500/20 backdrop-blur-xl flex items-center gap-4 rounded-2xl p-5 min-w-[280px]"
        >
          <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <RiSignalWifiErrorFill className="text-xl" />
          </div>
          <p className="text-sm font-medium text-white/80 text-left">
            {t("error.networkError")}
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="w-full max-w-sm z-10 space-y-3 pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="w-full h-16 rounded-3xl bg-gradient-to-r from-[#ff4d4d] via-[#ff6666] to-[#ff4d4d] text-white font-black text-lg uppercase tracking-widest shadow-[0_10px_40px_rgba(255,77,77,0.3)] flex items-center justify-center relative overflow-hidden group"
        >
          <span className="relative z-10">{t("error.retry")}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="w-full h-14 rounded-3xl text-white/40 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
        >
          {t("error.cancel")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Error;
