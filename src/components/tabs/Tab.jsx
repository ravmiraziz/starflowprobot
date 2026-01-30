const Tab = ({ activeTab, onChange }) => {
  return (
    <div className="flex bg-black/30 rounded-xl p-1 mb-4 px-4">
      {["STARS", "PREMIUM"].map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all
              ${
                isActive
                  ? "bg-primary text-black"
                  : "text-white/60 hover:text-white"
              }
            `}
          >
            {tab === "PREMIUM" ? "Premium" : "Stars"}
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
