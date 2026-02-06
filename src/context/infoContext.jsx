// context/infoContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getOne } from "../api/api";

const InfoContext = createContext(null);
export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("PREMIUM");
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
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

  const getData = async () => {
    setLoading(true);
    try {
      const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      if (!tgUser) {
        console.warn("Telegram user topilmadi");
        setLoading(false);
        return;
      }

      const response = await getOne("user", tgUser.id);
      const backendUser = response?.data;
      if (backendUser) {
        setCurrentUser({ ...tgUser, ...backendUser });
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("User olishda xatolik:", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    formatNumber,
    parseNumber,
    toast,
    setToast,
    loading,
    currentScreen,
    setCurrentScreen,
    getData,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};
