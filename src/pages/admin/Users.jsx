import React, { useState, useEffect } from "react";
import { MdCheck, MdClose, MdStar, MdVerified } from "react-icons/md";
import { useAdminContext } from "../../context/AdminContext";
import { IoMdEye } from "react-icons/io";
import SearchInput from "../../components/modal/Search";
import { useInfoContext } from "../../context/infoContext";
import { patch, putData } from "../../api/api";
import ConfirmModal from "../../components/modal/ConfirmModal";
import Pagination from "../../components/common/Pagination";

const Users = () => {
  const {
    users,
    totalUsers,
    userPage,
    setUserPage,
    getUsers,
    setUpdateUser,
    purchase,
    totalPurchase,
    purchasePage,
    setPurchasePage,
    getPurchase,
  } = useAdminContext();
  const { formatNumber, setToast } = useInfoContext();
  const [updateStatus, setUpdateStatus] = useState({ item: null, type: "" });

  // Pagination constants
  const itemsPerPage = 10;

  const totalUserPages = Math.ceil(totalUsers / itemsPerPage);
  const totalPurchasePages = Math.ceil(totalPurchase / itemsPerPage);

  // Fetch users when page changes
  useEffect(() => {
    getUsers({ page: userPage, limit: itemsPerPage });
  }, [userPage]);

  // Fetch purchases when page changes
  useEffect(() => {
    getPurchase({ page: purchasePage, limit: itemsPerPage });
  }, [purchasePage]);

  const renderStatus = (status) => {
    if (status === "canceled") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/10 mt-1">
          <p className="text-[9px] text-red-400 font-black uppercase tracking-wider">
            Bekor qilingan
          </p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/10 mt-1">
          <p className="text-[9px] text-green-400 font-black uppercase tracking-wider">
            Muvaffaqiyatli
          </p>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f2b90d]/10 border border-[#f2b90d]/10 mt-1">
          <p className="text-[9px] text-[#f2b90d] font-black uppercase tracking-wider animate-pulse">
            Jarayonda...
          </p>
        </div>
      );
    }

    return null;
  };

  const handleCheck = async () => {
    if (!updateStatus.item && !updateStatus.type) return;
    const data = updateStatus.item;
    try {
      if (updateStatus.type === "close") {
        await putData("cancel-purchase", { id: data.id });
        setToast({
          isVisible: true,
          message: "Status tasdiqlandi",
          type: "success",
        });
      } else if (updateStatus.type === "done") {
        await patch(`success-purchase-admin/${data.id}`);
        setToast({
          isVisible: true,
          message: "Status bekor qilindi",
          type: "success",
        });
      }
      setUpdateStatus({ item: null, type: "" });
      getPurchase({ page: purchasePage, limit: itemsPerPage });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="px-4 pt-6 pb-20 max-w-lg mx-auto">
      <div class="grid grid-cols-2 gap-3 mb-8">
        <div class="glass-card p-4 rounded-2xl flex flex-col gap-1">
          <p class="text-white/40 text-[10px] uppercase font-black tracking-[0.1em]">
            Jami foydalanuvchilar
          </p>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-white">{totalUsers}</span>
          </div>
        </div>
        <div class="glass-card p-4 rounded-2xl flex flex-col gap-1">
          <p class="text-white/40 text-[10px] uppercase font-black tracking-[0.1em]">
            Jami tranzaksiyalar
          </p>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-white">{totalPurchase}</span>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4 px-2">
          <h2 class="text-lg font-black tracking-tight text-white/90">
            Foydalanuvchilar
          </h2>
          <SearchInput type={"users"} />
        </div>
        <div class="glass-card rounded-4xl overflow-hidden">
          <div class="divide-y divide-white/5">
            {users?.length > 0 &&
              users.map((user) => (
                <div
                  key={user.id}
                  class="flex items-center justify-between p-4 hover:bg-white/2 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-gradient-to-tr from-cosmic-purple to-cosmic-charcoal flex items-center justify-center border border-white/10">
                      <span class="text-xs font-black text-primary">DB</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-white/90">
                        {user.full_name}
                      </p>
                      <p class="text-[11px] text-white/70 font-medium">
                        @{user.username} _ {user.created_at}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <button onClick={() => setUpdateUser(user)}>
                      <IoMdEye className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Pagination
          currentPage={userPage}
          totalPages={totalUserPages}
          onPageChange={setUserPage}
        />
      </div>
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4 px-2">
          <h2 class="text-lg font-black tracking-tight text-white/90">
            Tranzaksiyalar
          </h2>
          <SearchInput type={"purchase"} />
        </div>
        <div class="glass-card rounded-4xl overflow-hidden">
          <div class="divide-y divide-white/5">
            {purchase.length > 0 &&
              purchase.map((item) => {
                return (
                  <div key={item.id}>
                    <div
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      className="flex items-center justify-between p-5 transition-colors cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        {item.is_stars && (
                          <div className="size-12 rounded-2xl bg-[#f2b90d]/10 border border-[#f2b90d]/20 flex items-center justify-center shadow-[0_4px_12px_rgba(242,185,13,0.1)]">
                            <MdStar className="text-[#f2b90d] text-2xl" />
                          </div>
                        )}
                        {item.is_premium && (
                          <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.1)]">
                            <MdVerified className="text-blue-400 text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-base text-white/90 tracking-tight">
                            #{item.id} •{" "}
                            {item.is_stars && `${item.amount} Stars`}
                            {item.is_premium && `Premium  ${item.amount} Oy`}
                          </p>
                          <a
                            href={`https://t.me/${item.username}`}
                            className="font-bold text-sm text-blue-500/90 tracking-tight"
                          >
                            @{item.username}
                          </a>
                          <p className="text-[11px] text-white/40 font-medium tracking-wide">
                            {item.created_at}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-white tracking-tight">
                          {formatNumber(item.price_uzs)} UZS
                        </p>
                        {renderStatus(item.status)}
                      </div>
                    </div>
                    {item.status === "pending" && (
                      <div className="flex items-center justify-between gap-2 px-5 pb-4">
                        <button
                          onClick={() =>
                            setUpdateStatus({ item, type: "close" })
                          }
                          className="bg-red-500/80 flex justify-center items-center text-white w-20 rounded-lg p-1"
                        >
                          <MdClose />
                        </button>
                        <button
                          onClick={() =>
                            setUpdateStatus({ item, type: "done" })
                          }
                          className="bg-green-500/80 flex justify-center items-center text-white w-20 rounded-lg p-1"
                        >
                          <MdCheck />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <Pagination
          currentPage={purchasePage}
          totalPages={totalPurchasePages}
          onPageChange={setPurchasePage}
        />
      </div>
      {updateStatus.item && (
        <ConfirmModal
          onCancel={handleCheck}
          onContinue={() => setUpdateStatus({ item: null, type: "" })}
        />
      )}
      <div class="mt-6 text-center">
        <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          Admin Management Console v2.0
        </p>
      </div>
    </div>
  );
};

export default Users;
