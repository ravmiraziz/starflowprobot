// context/infoContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getOne } from "../api/api";

const InfoContext = createContext(null);
export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("PREMIUM");
  const [currentUser, setCurrentUser] = useState({
    id: 1109659429,
    full_name: "Jumaniyozov Ibodulla",
    username: "Ibodulla",
    language: "uz",
    is_premium: false,
    cashback_balans: 10000,
    is_admin: true,
    premium_prices: [
      {
        month: 12,
        price: 400000,
        created_at: "01-02-2026 16:19:55",
      },
      {
        month: 6,
        price: 220000,
        created_at: "01-02-2026 16:19:34",
      },
      {
        month: 3,
        price: 160000,
        created_at: "01-02-2026 16:19:18",
      },
    ],
    star_prices: [
      {
        amount: 1,
        price: 220,
        created_at: "04-02-2026 20:15:17",
      },
    ],
    utility: {
      id: 1,
      card_number: "9860260111997714",
      owner_name: "Ibodulla Jumaniyozov",
      phone_number: "+998996860307",
      cashback_percent: 2,
      max_cashback: 500,
      created_at: "01-02-2026 17:37:15",
    },
    purchase_histories: [
      {
        id: 15,
        user_id: 1624590734,
        status: "pending",
        price_uzs: 400512,
        cashback_balans_uzs: 500,
        cashback_want_use_uzs: 0,
        username: "ravmiraziz",
        is_premium: true,
        is_stars: false,
        amount: 12,
        created_at: "05-02-2026 14:49:09",
      },
      {
        id: 11,
        user_id: 1624590734,
        status: "pending",
        price_uzs: 22508,
        cashback_balans_uzs: 220,
        cashback_want_use_uzs: 0,
        username: "ravmiraziz",
        is_premium: false,
        is_stars: true,
        amount: 100,
        created_at: "05-02-2026 09:30:29",
      },
      {
        id: 3,
        user_id: 1624590734,
        status: "pending",
        price_uzs: 22501,
        cashback_balans_uzs: 220,
        cashback_want_use_uzs: 0,
        username: "IboduIIa",
        is_premium: false,
        is_stars: true,
        amount: 100,
        created_at: "04-02-2026 19:51:08",
      },
      {
        id: 2,
        user_id: 1624590734,
        status: "pending",
        price_uzs: 20500,
        cashback_balans_uzs: 0,
        cashback_want_use_uzs: 2000,
        username: "IboduIIa",
        is_premium: false,
        is_stars: true,
        amount: 100,
        created_at: "04-02-2026 19:50:09",
      },
    ],
    created_at: "01-02-2026 16:13:03",
  });
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
      console.log(backendUser);

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
