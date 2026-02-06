import { useEffect, useState } from "react";
import ConfirmModal from "./components/modal/ConfirmModal";
import PaymentModal from "./components/modal/PaymentModal";
import Error from "./components/status/Error";
import Success from "./components/status/Success";
import { useInfoContext } from "./context/infoContext";
import TopNav from "./components/ui/TopNav";
import AccessDenied from "./pages/AccessDenied";
import Tab from "./components/tabs/Tab";
import SwipeContainer from "./components/ui/SwipeContainer";
import Stars from "./components/tabs/Stars";
import Premium from "./components/tabs/Premium";
import { AnimatePresence } from "framer-motion";
import Toast from "./components/ui/Toast";
import Dashboard from "./pages/admin/Dashboard";
import { useAdminContext } from "./context/AdminContext";
import UserModal from "./components/modal/UserModal";
import { putData } from "./api/api";
import { useLanguage } from "./context/LanguageContext";

function App() {
  const {
    currentUser,
    currentScreen,
    setCurrentScreen,
    loading,
    setToast,
    getData,
  } = useInfoContext();
  const { updateUser, getData: getAdminData } = useAdminContext();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("STARS");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [amount, setAmount] = useState(100);
  const [username, setUsername] = useState("");
  const [pendingData, setPendingData] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [price, setPrice] = useState(
    amount * (currentUser?.star_prices[0]?.price || 220),
  ); // Example conversion
  const [cashback, setCashback] = useState(0);

  useEffect(() => {
    if (currentUser?.is_admin && currentScreen === "ADMIN") {
      getAdminData();
    }
  }, [currentScreen, currentUser]);

  useEffect(() => {
    setPrice(amount * (currentUser?.star_prices[0]?.price || 220));
  }, [amount]);

  const handleConfirmCancel = async () => {
    try {
      const res = await putData("cancel-purchase", { id: pendingData?.id });

      setPendingData(null);
      setShowCancelDialog(false);
      getData();
      setCurrentScreen("STARS");
      setToast({
        isVisible: true,
        message: t("home.canceled"),
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePayment = () => {
    setShowCancelDialog(true);
  };

  useEffect(() => {
    if (!window.Telegram?.WebApp) return;
    const webApp = window.Telegram.WebApp;

    // webApp.ready();
    // if (webApp.requestFullscreen) {
    //   webApp.requestFullscreen();
    // } else {
    //   webApp.expand();
    // }
    webApp.disableVerticalSwipes();

    // ✅ Viewport meta tag
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      );
    }

    // ✅ Body Styles - FIXED
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "auto";
    document.body.style.overflowX = "hidden";
  }, []);

  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const webApp = window.Telegram.WebApp;

    if (username) {
      webApp.enableClosingConfirmation();
    } else {
      webApp.disableClosingConfirmation();
    }
  }, [username]);

  return (
    <div className="relative w-screen min-h-screen flex flex-col max-w-[500px] mx-auto">
      <div className="cosmic-bg">
        <div
          style={{ animationDelay: ".5s" }}
          className="absolute animate-pulse w-1 h-1 bg-white rounded-full top-30 left-[15%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".8s" }}
          className="absolute animate-pulse w-0.5 h-0.5 bg-white rounded-full top-60 left-[80%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".4s" }}
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 top-30 left-[15%]"
        ></div>
        <div
          style={{ animationDelay: ".3s" }}
          className="absolute animate-pulse w-1 h-1 bg-white rounded-full top-60 left-[10%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".6s" }}
          className="absolute animate-pulse bg-white rounded-full w-0.5 h-0.5 top-40 left-[80%]"
        ></div>
        <div
          style={{ animationDelay: ".4s" }}
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 top-75 left-[20%]"
        ></div>
        <div
          style={{ animationDelay: ".7s" }}
          className="absolute animate-pulse w-0.5 h-0.5 bg-white rounded-full top-80 left-[45%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".4s" }}
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 top-20 right-[15%]"
        ></div>
        <div
          style={{ animationDelay: ".8s" }}
          className="absolute animate-pulse bg-white rounded-full w-0.5 h-0.5 top-80 left-[45%]"
        ></div>
        <div
          style={{ animationDelay: ".3s" }}
          className="absolute animate-pulse bg-white rounded-full w-0.5 h-0.5 top-50 right-[65%]"
        ></div>
        <div
          style={{ animationDelay: ".7s" }}
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 bottom-40 right-20 opacity-20"
        ></div>
      </div>
      <Toast />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f2b90d]"></div>
        </div>
      ) : !currentUser ? (
        <AccessDenied />
      ) : (
        <div
          className={`transition-all duration-300 ${showCancelDialog ? "blur-md brightness-[0.3]" : ""}`}
        >
          {currentScreen === "ADMIN" && <Dashboard />}
          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <TopNav />
          )}
          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <Tab activeTab={activeTab} onChange={setActiveTab} />
          )}

          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <SwipeContainer activeTab={activeTab} setActiveTab={setActiveTab}>
              <Stars
                key="STARS"
                price={price}
                amount={amount}
                setAmount={setAmount}
                username={username}
                setUsername={setUsername}
                setPrice={setPrice}
                setCashback={setCashback}
                setPendingData={setPendingData}
                setTransactionId={setTransactionId}
              />
              <Premium
                key="PREMIUM"
                username={username}
                setUsername={setUsername}
                setPrice={setPrice}
                setCashback={setCashback}
                setPendingData={setPendingData}
                setTransactionId={setTransactionId}
              />
            </SwipeContainer>
          )}

          <AnimatePresence mode="wait">
            {currentScreen === "PAYMENT" && (
              <PaymentModal
                transactionId={transactionId}
                data={pendingData}
                setData={setPendingData}
                key="payment-modal"
                onClose={handleClosePayment}
                price={price}
                cashback={cashback}
              />
            )}

            {currentScreen === "SUCCESS" && (
              <Success
                key="success-screen"
                cashback={cashback}
                amount={amount}
                onReset={() => {
                  setCurrentScreen("STARS");
                  setUsername("");
                }}
              />
            )}

            {currentScreen === "ERROR" && (
              <Error
                key="error-screen"
                onCancel={() => {
                  setCurrentScreen("STARS");
                  setUsername("");
                }}
              />
            )}
          </AnimatePresence>
        </div>
      )}
      {updateUser && <UserModal />}
      <AnimatePresence>
        {showCancelDialog && (
          <ConfirmModal
            key="confirm-modal"
            onContinue={() => setShowCancelDialog(false)}
            onCancel={handleConfirmCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
