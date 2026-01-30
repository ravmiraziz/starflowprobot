import React, { useState } from "react";

const SwipeContainer = ({ activeTab, setActiveTab, children }) => {
  const [startX, setStartX] = useState(null);

  const onTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (startX === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // minimal swipe distance
    if (Math.abs(diff) < 100) return;

    if (diff > 0 && activeTab === "STARS") {
      setActiveTab("PREMIUM"); // chapga
    }

    if (diff < 0 && activeTab === "PREMIUM") {
      setActiveTab("STARS"); // o‘ngga
    }

    setStartX(null);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden"
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform:
            activeTab === "STARS" ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeContainer;
