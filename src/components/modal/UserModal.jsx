import React, { useEffect, useState } from "react";
import { putData } from "../../api/api";
import { MdClose } from "react-icons/md";
import { useAdminContext } from "../../context/AdminContext";
import { useInfoContext } from "../../context/infoContext";

const UserModal = () => {
  const { updateUser, setUpdateUser, getData } = useAdminContext();
  const { setToast } = useInfoContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleUpdate = async () => {
    try {
      await putData("user", {
        ...updateUser,
        is_admin: isAdmin,
        cashback_balans: Number(balance),
      });
      setToast({
        isVisible: true,
        message: "Foydalanuvchi muvaffaqiyatli yangilandi",
        type: "success",
      });
      getData();
      setUpdateUser(null);
    } catch (error) {
      console.error("Foydalanuvchini yangilashda xatolik:", error);
      setToast({
        isVisible: true,
        message: "Xatolik yuz berdi",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (updateUser) {
      setIsAdmin(updateUser.is_admin || false);
      setBalance(updateUser.cashback_balans || 0);
    }
  }, [updateUser]);

  return (
    <div class="fixed pt-15 left-0 bottom-0 z-101 h-full w-full flex items-center justify-center p-4 modal-overlay">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm w-full h-screen"></div>
      <div class="glass-card w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
        <div class="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <h2 class="text-lg font-extrabold tracking-tight text-white/90">
            Foydalanuvchini tahrirlash
          </h2>
          <button
            onClick={() => setUpdateUser(null)}
            class="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <MdClose class="text-2xl" />
          </button>
        </div>
        <div class="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                Full Name
              </p>
              <p class="text-sm font-bold">{updateUser?.full_name || "N/A"}</p>
            </div>
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                Username
              </p>
              <p class="text-sm font-bold text-primary">
                @{updateUser?.username || "N/A"}
              </p>
            </div>
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                ID
              </p>
              <p class="text-sm font-bold">{updateUser?.id || "N/A"}</p>
            </div>
            <div class="space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                Language
              </p>
              <p class="text-sm font-bold uppercase">
                {updateUser?.language || "N/A"}
              </p>
            </div>
            <div class="col-span-2 space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                Created At
              </p>
              <p class="text-sm font-bold">{updateUser?.created_at || "N/A"}</p>
            </div>
            <div class="col-span-2 space-y-1">
              <p class="text-[10px] font-black uppercase tracking-widest text-white/60">
                Premium Status
              </p>
              <div class="flex items-center gap-2">
                <span
                  class={`size-2 rounded-full ${updateUser?.is_premium ? "bg-green-500/40" : "bg-red-500/40"}`}
                ></span>
                <p class="text-sm font-bold">
                  {updateUser?.is_premium ? "True" : "False"}
                </p>
              </div>
            </div>
          </div>
          <hr class="border-white/5" />
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-primary/80">
                Cashback Balans
              </label>
              <div class="relative">
                <input
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 focus:ring-0 transition-all outline-none"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  UZS
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-white/90">
                  Admin Status
                </span>
                <span class="text-[10px] text-white/40 font-medium">
                  is_admin: {isAdmin ? "true" : "false"}
                </span>
              </div>
              <div class="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                  class={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-transparent appearance-none cursor-pointer outline-none transition-transform duration-200 ease-in-out z-10  ${isAdmin ? "bg-primary right-0" : ""}`}
                  id="toggle"
                  name="toggle"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-white/10 cursor-pointer transition-colors duration-200 ease-in-out"
                  for="toggle"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          class="w-full bg-primary py-4 rounded-2xl text-cosmic-black font-black text-sm uppercase tracking-widest gold-glow active:scale-[0.98] transition-all"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
};

export default UserModal;
