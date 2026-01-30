import { useState } from "react";
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
import useTelegramFullscreen from "./components/ui/useTelegramFullscreen";

function App() {
  useTelegramFullscreen();
  const { currentUser } = useInfoContext();
  const [activeTab, setActiveTab] = useState("STARS");
  const [currentScreen, setCurrentScreen] = useState("PREMIUM");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [amount, setAmount] = useState(100);
  const [username, setUsername] = useState("");
  const price = amount * 220; // Example conversion
  const cashback = Math.floor(price * 0.01);
  const [useCashback, setUseCashback] = useState(false);

  const cashbackBalance = currentUser?.cashback || 0;
  const usedCashback = useCashback ? Math.min(price, cashbackBalance) : 0;
  const finalPrice = Math.max(price - usedCashback, 0);

  const handlePurchase = () => {
    setCurrentScreen("PAYMENT");
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    setCurrentScreen("PURCHASE");
  };

  const handleClosePayment = () => {
    setShowCancelDialog(true);
  };

  return (
    <div className="relative min-h-screen">
      <div className="cosmic-bg">
        <div
          style={{ animationDelay: ".5s" }}
          className="absolute animate-pulse w-1 h-1 bg-white rounded-full top-10 left-[15%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".8s" }}
          className="absolute animate-pulse w-0.5 h-0.5 bg-white rounded-full top-40 left-[80%] opacity-30"
        ></div>
        <div
          style={{ animationDelay: ".4s" }}
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 top-10 left-[15%]"
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
          className="absolute animate-pulse bg-white rounded-full w-1 h-1 top-60 left-[10%]"
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

      {!currentUser ? (
        <AccessDenied />
      ) : (
        <div
          className={`transition-all duration-300 ${showCancelDialog ? "blur-md brightness-[0.3]" : ""}`}
        >
          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <TopNav />
          )}
          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <Tab activeTab={activeTab} onChange={setActiveTab} />
          )}

          {(currentScreen === "PREMIUM" || currentScreen === "STARS") && (
            <SwipeContainer activeTab={activeTab} setActiveTab={setActiveTab}>
              {/* STARS */}
              <div className="w-full shrink-0">
                <Stars
                  amount={amount}
                  setAmount={setAmount}
                  username={username}
                  setUsername={setUsername}
                  onPurchase={handlePurchase}
                  cashback={cashback}
                  finalPrice={finalPrice}
                  usedCashback={usedCashback}
                  useCashback={useCashback}
                  setUseCashback={setUseCashback}
                  cashbackBalance={cashbackBalance}
                />
              </div>
              {/* PREMIUM */}
              <div className="w-full shrink-0">
                <Premium
                  amount={amount}
                  setAmount={setAmount}
                  username={username}
                  setUsername={setUsername}
                  onPurchase={handlePurchase}
                  cashback={cashback}
                  price={price}
                />
              </div>
            </SwipeContainer>
          )}

          {currentScreen === "PAYMENT" && (
            <PaymentModal
              onClose={handleClosePayment}
              onVerify={() => setCurrentScreen("SUCCESS")}
              price={price}
              cashback={cashback}
            />
          )}

          {currentScreen === "SUCCESS" && (
            <Success
              cashback={cashback}
              amount={amount}
              onReset={() => setCurrentScreen("STARS")}
            />
          )}

          {currentScreen === "ERROR" && (
            <Error
              onRetry={() => setCurrentScreen("PAYMENT")}
              onCancel={() => setCurrentScreen("STARS")}
            />
          )}
        </div>
      )}

      {showCancelDialog && (
        <ConfirmModal
          onContinue={() => setShowCancelDialog(false)}
          onCancel={handleConfirmCancel}
        />
      )}
    </div>
  );
}

export default App;
