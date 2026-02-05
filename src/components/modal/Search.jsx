import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useAdminContext } from "../../context/AdminContext";

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const SearchInput = ({ type }) => {
  const { getUsers, getPurchase, setUserPage, setPurchasePage } =
    useAdminContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const userData = (value) => {
    let item = null;

    if (value.startsWith("@")) {
      item = { search_by_username: value.slice(1) };
    } else if (/^\d+$/.test(value)) {
      item = { search_by_id: Number(value) };
    } else {
      item = { search_by_full_name: value };
    }
    setUserPage(1);
    getUsers({ ...item, page: 1, limit: 10 });
  };

  const purchaseData = (value) => {
    let item = null;

    if (/^\d+$/.test(value)) {
      item = { user_id: Number(value) };
    } else {
      item = { username: value };
    }
    setPurchasePage(1);
    getPurchase({ ...item, page: 1, limit: 10 });
  };

  const handleSearch = () => {
    const value = search.trim();

    if (!value) return;

    if (type === "users") {
      userData(value);
    } else {
      purchaseData(value);
    }
  };

  const close = () => {
    if (open) {
      getUsers({ page: 1, limit: 10 });
      getPurchase({ page: 1, limit: 10 });
      setUserPage(1);
      setPurchasePage(1);
      setSearch("");
    }
    setOpen(!open);
  };

  return (
    <div className="absolute right-4 z-50">
      <motion.div
        layout
        className={`flex items-center ${open ? "bg-[#f2b90d]" : "bg-white/5"} backdrop-blur-xl border border-white/10 rounded-full overflow-hidden relative shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-1 gap-1`}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        }}
      >
        {/* Toggle Button (Active Language) */}
        <motion.button
          layout="position"
          onClick={close}
          className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-black text-xs tracking-wider transition-colors shrink-0 ${
            open ? "bg-[#f2b90d] text-white" : "bg-transparent text-[#f2b90d]"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {open ? (
            <MdClose className="text-xl" />
          ) : (
            <FaSearch className="text-xl" />
          )}
        </motion.button>

        {/* Other Languages */}
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <motion.button
                layout="position"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={handleSearch}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-black text-xs tracking-wider transition-colors shrink-0 bg-white/10 text-white`}
              >
                <FaCircleCheck className="text-2xl text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchInput;
