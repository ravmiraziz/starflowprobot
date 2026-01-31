import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import { useInfoContext } from "../../context/infoContext";

const Toast = () => {
  const { toast, setToast } = useInfoContext();
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const icons = {
    success: <MdCheckCircle className="text-[#f2b90d] text-2xl" />,
    error: <MdError className="text-red-500 text-2xl" />,
    info: <MdInfo className="text-blue-400 text-2xl" />,
  };

  const bgColors = {
    success: "bg-[#f2b90d]/10 border-[#f2b90d]/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  };

  return (
    <AnimatePresence>
      {toast.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`fixed mt- top-6 left-1/2 -translate-x-1/2 z-300 flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border ${bgColors[toast.type] || bgColors.success} min-w-[300px] justify-center`}
        >
          <div className={`p-1 rounded-full bg-white/5`}>
            {icons[toast.type] || icons.success}
          </div>
          <p className="text-white font-bold text-sm tracking-wide shadow-black drop-shadow-md">
            {toast.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
