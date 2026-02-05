import { MdPersonSearch, MdPriorityHigh } from "react-icons/md";
import { motion } from "framer-motion";

const AccessDenied = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#0a0a0c] p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-96 bg-[#f2b90d]/10 rounded-full blur-[120px] animate-pulse"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 size-64 bg-white/5 rounded-full blur-[80px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card w-full max-w-sm rounded-[3rem] p-8 flex flex-col items-center gap-8 border border-white/10 bg-[#1c1c1e]/40 backdrop-blur-2xl relative z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
      >
        <motion.div variants={itemVariants} className="relative">
          {/* Radar Waves */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-[#f2b90d]/30 rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}

          <div className="size-28 rounded-full bg-[#1c1c1e] flex items-center justify-center border border-white/10 relative z-10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f2b90d]/20 to-transparent rounded-full opacity-50"></div>
            <MdPersonSearch className="text-5xl text-[#f2b90d] relative z-10" />
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-1 -right-1 size-10 bg-[#f2b90d] rounded-full flex items-center justify-center border-4 border-[#0a0a0c] z-20 shadow-lg"
          >
            <MdPriorityHigh className="text-xl text-black font-black" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-white text-3xl font-black leading-tight tracking-tight"
          >
            Foydalanuvchi
            <br />
            topilmadi
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-sm font-medium leading-relaxed px-2"
          >
            Kiritilgan username bo‘yicha ma’lumot topilmadi. Stars tushirib
            berishimiz uchun avval botimizga kirib{" "}
            <span className="text-[#f2b90d] font-bold bg-[#f2b90d]/10 px-2 py-0.5 rounded-md">
              "Start"
            </span>{" "}
            tugmasini bosgan bo‘lishingiz kerak.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col gap-3"
        >
          <a
            href="https://t.me/starflowprobot"
            className="group relative w-full flex items-center justify-center h-16 rounded-[2rem] bg-gradient-to-r from-[#f2b90d] via-[#ffd04d] to-[#f2b90d] shadow-[0_8px_25px_-6px_rgba(242,185,13,0.5)] overflow-hidden transition-transform active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="text-black text-lg font-black tracking-wide uppercase relative z-10">
              Botga o‘tish
            </span>
          </a>
          {/* Note: In a real routing scenario, this button would trigger navigation. keeping as dumb button as per original */}
          <button className="w-full flex items-center justify-center h-12 rounded-full text-white/40 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors active:scale-95">
            Ortga qaytish
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
