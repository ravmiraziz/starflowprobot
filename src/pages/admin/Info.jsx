import { useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { MdCheck, MdDelete, MdEdit, MdPayments, MdSave } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useAdminContext } from "../../context/AdminContext";
import { post, remove } from "../../api/api";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { useInfoContext } from "../../context/infoContext";

const Info = () => {
  const { info, premiumInfo, getData, stars } = useAdminContext();
  const { setToast, setCurrentScreen } = useInfoContext();
  const [cardInfo, setCardInfo] = useState({
    card_number: "",
    owner_name: "",
    phone_number: "",
    cashback_percent: 0,
    max_cashback: 0,
  });
  const [update, setUpdate] = useState(null);
  const [starPrice, setStarPrice] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  console.log(deleteData);

  useEffect(() => {
    if (info) {
      setCardInfo({
        ...info,
      });
      setStarPrice(stars[0].price || "");
    }
  }, [info, stars]);

  const [premiumPrice, setPremiumPrice] = useState("");
  const [premiumMonth, setPremiumMonth] = useState("");

  const updateInfo = async () => {
    try {
      await post("utility", cardInfo);
      getData();
      setToast({
        isVisible: true,
        message: "Muvaffaqiyatli o'zgartirildi",
        type: "success",
      });
    } catch (err) {
      console.error("User olishda xatolik:", err);
    }
  };

  const updatePremium = async (item) => {
    try {
      if (item) {
        await post("premium", { ...item, price: Number(premiumPrice) });
      } else {
        await post("premium", {
          month: Number(premiumMonth),
          price: Number(premiumPrice),
        });
      }
      setToast({
        isVisible: true,
        message: "Premium narxi o'zgartirildi",
        type: "success",
      });
      setPremiumMonth("");
      setPremiumPrice("");
      setUpdate(null);
      getData();
    } catch (err) {
      console.error("Premium olishda xatolik:", err);
    }
  };

  const updateStar = async () => {
    try {
      await post("star", { price: Number(starPrice) });
      setToast({
        isVisible: true,
        message: "Star narxi o'zgartirildi",
        type: "success",
      });
      getData();
    } catch (err) {
      console.error("Star olishda xatolik:", err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await remove("premium", item.month);
      getData();
      setDeleteData(null);
      setToast({
        isVisible: true,
        message: "Premium o'chirildi",
        type: "success",
      });
    } catch (err) {
      console.error("Premium olishda xatolik:", err);
    }
  };

  return (
    <div className="px-4 pt-8 max-w-lg mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-2">
          <FaRegCreditCard
            onClick={() => setCurrentScreen("STARS")}
            className="text-primary text-2xl"
          />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
            Karta Ma'lumotlari
          </h2>
        </div>
        <div className="relative glass-card rounded-4xl p-6 space-y-5">
          <button
            onClick={updateInfo}
            className="absolute right-2 top-2 bg-green-500 p-1 rounded-full"
          >
            <MdCheck className=" text-white" />
          </button>
          <div>
            <label className="flex items-center gap-2 justify-between text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
              Karta raqami
            </label>
            <div className="relative">
              <input
                className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-5 focus:ring-primary/50 focus:border-primary text-white font-bold tracking-widest transition-all"
                placeholder="0000 0000 0000 0000"
                type="text"
                value={cardInfo.card_number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_number: e.target.value })
                }
              />
              <IoMdLock className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 text-white/20" />
            </div>
          </div>
          <div>
            <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
              Karta egasi
            </label>
            <input
              className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-5 focus:ring-primary/50 focus:border-primary text-white font-bold transition-all"
              placeholder="Full Name"
              type="text"
              value={cardInfo.owner_name}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, owner_name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
              Telefon raqami
            </label>
            <input
              className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-5 focus:ring-primary/50 focus:border-primary text-white font-bold transition-all"
              placeholder="+998"
              type="text"
              value={cardInfo.phone_number}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, phone_number: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                Keshbek foizi
              </label>
              <div className="relative">
                <input
                  className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-5 focus:ring-primary/50 focus:border-primary text-white font-bold transition-all"
                  type="text"
                  value={cardInfo.cashback_percent}
                  onChange={(e) =>
                    setCardInfo({
                      ...cardInfo,
                      cashback_percent: Number(e.target.value),
                    })
                  }
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f2b90d] text-sm font-bold uppercase tracking-widest mb-2 ml-1">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                Maksimal keshbek
              </label>
              <div className="relative">
                <input
                  className="w-full h-14 bg-white/3 border border-white/10 rounded-2xl px-5 focus:ring-primary/50 focus:border-primary text-white font-bold transition-all"
                  type="text"
                  value={cardInfo.max_cashback}
                  onChange={(e) =>
                    setCardInfo({
                      ...cardInfo,
                      max_cashback: Number(e.target.value),
                    })
                  }
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f2b90d] text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                  UZS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-2">
          <MdPayments className="text-primary text-2xl" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
            Premium Obunalar
          </h2>
        </div>
        <div className="glass-card rounded-4xl p-6 space-y-8">
          <div className="space-y-4">
            <div>
              <label class="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
                1 dona Stars narxi
              </label>
              <div class="relative">
                <input
                  onChange={(e) => setStarPrice(e.target.value)}
                  class="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-5 pr-16 focus:ring-primary/50 focus:border-primary text-white text-xl font-black transition-all"
                  type="number"
                  inputMode="numeric"
                  value={starPrice}
                />
                <div
                  onClick={updateStar}
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-bold text-xs uppercase tracking-tighter"
                >
                  UZS
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  {/* <span className="text-primary font-black text-sm">12</span> */}
                  <input
                    onChange={(e) => setPremiumMonth(e.target.value)}
                    inputMode="numeric"
                    type="text"
                    className="w-10 p-1"
                  />
                </div>
                <div className="grow">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">
                    {premiumMonth || 0} oylik
                  </p>
                  <div className="relative">
                    <input
                      className="w-full h-10 bg-black/20 border border-white/5 rounded-lg px-3 focus:ring-primary/50 focus:border-primary text-white font-bold"
                      type="text"
                      inputMode="numeric"
                      value={premiumPrice}
                      onChange={(e) => setPremiumPrice(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className=" text-primary text-2xl"
                  onClick={() => updatePremium()}
                >
                  <MdSave />
                </button>
              </div>
              {premiumInfo?.length > 0 &&
                premiumInfo.map((option) => (
                  <div
                    key={option.month}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
                  >
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                      <span className="text-primary font-black text-sm">
                        {option.month}
                      </span>
                    </div>
                    <div className="grow">
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">
                        {option.month} oylik
                      </p>
                      {update?.month === option.month ? (
                        <div className="relative">
                          <input
                            className="w-full h-10 bg-black/20 border border-white/5 rounded-lg px-3 focus:ring-primary/50 focus:border-primary text-white font-bold"
                            type="text"
                            value={premiumPrice}
                            onChange={(e) => setPremiumPrice(e.target.value)}
                          />
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-2xl"
                            onClick={() => updatePremium(option)}
                          >
                            <MdSave />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm h-10 text-white font-bold flex items-center">
                          {option.price.toLocaleString("uz-UZ")} UZS
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setUpdate(option);
                        setPremiumPrice(option.price);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button onClick={() => setDeleteData(option)}>
                      <MdDelete />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {deleteData && (
        <ConfirmModal
          key="confirm-delete"
          onContinue={() => setDeleteData(null)}
          onCancel={() => handleDelete(deleteData)}
        />
      )}
    </div>
  );
};

export default Info;
