// context/infoContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { get } from "../api/api";

const AdminContext = createContext(null);
export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [premiumInfo, setPremiumInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [purchase, setPurchase] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [purchasePage, setPurchasePage] = useState(1);
  const [stars, setStars] = useState([]);
  const [stats, setStats] = useState([]);
  const [updateUser, setUpdateUser] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const utilityRes = await get("utility");
      const premiumRes = await get("premiums");
      const starRes = await get("stars");
      const statRes = await get("dashboard");
      console.log(statRes);
      setInfo(utilityRes?.data);
      setPremiumInfo(premiumRes?.data?.premium_prices || []);
      setStars(starRes?.data?.star_prices || []);
      setStats(statRes?.data || []);
    } catch (err) {
      console.error("Admin ma'lumotlarini olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async (params = {}) => {
    try {
      const { data } = await get("users", params);
      setUsers(data.users || []);
      setTotalUsers(data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchase = async (params = {}) => {
    try {
      const { data } = await get("purchase", params);
      setPurchase(data.purchase_histories || []);
      setTotalPurchase(data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers({ page: 1, limit: 10 });
    getPurchase({ page: 1, limit: 10 });
  }, []);

  const value = {
    loading,
    info,
    setInfo,
    premiumInfo,
    setPremiumInfo,
    users,
    setUsers,
    totalUsers,
    userPage,
    setUserPage,
    updateUser,
    setUpdateUser,
    getData,
    getUsers,
    purchase,
    setPurchase,
    totalPurchase,
    purchasePage,
    setPurchasePage,
    getPurchase,
    stars,
    setStars,
    stats,
    setStats,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
