// context/infoContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const InfoContext = createContext(null);
export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    username: "ravmiraziz",
    cashback: 120000,
  });

  // 20000 -> "20 000"
  const formatNumber = (value) => {
    if (value === null || value === undefined) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // "20 000" -> 20000
  const parseNumber = (value) => {
    if (!value) return 0;
    return Number(value.toString().replace(/\s/g, ""));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

        if (!tgUser) {
          console.warn("Telegram user topilmadi");
          return;
        }
        setCurrentUser(tgUser);
        console.log(tgUser);
      } catch (err) {
        console.error("User olishda xatolik:", err);
      }
    };
    getData();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    formatNumber,
    parseNumber,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};
