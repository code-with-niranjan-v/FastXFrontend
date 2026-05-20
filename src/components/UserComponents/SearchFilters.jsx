export default function SearchFilters() {
  return (
    <div className="w-[280px]">
      <div>
        <p className="text-[13px] uppercase tracking-[4px] font-bold text-[#4B5563]">
          Price Range
        </p>

        <input
          type="range"
          min="20"
          max="250"
          className="w-full  accent-[#005BBF]
          bg-[#BFD9F5]"
        />

        <div className="flex justify-between mt-5 text-[28px] font-medium text-[#374151]">
          <span>$45</span>
          <span>$450</span>
        </div>
      </div>

      <div className="mt-14">
        <p className="text-[13px] uppercase tracking-[4px] font-bold text-[#4B5563]">
          Departure Time
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button className="bg-[#005BBF] text-white px-6 py-3 rounded-full text-[15px] font-medium">
            Anytime
          </button>

          <button className="bg-[#EEF1F7] px-6 py-3 rounded-full text-[15px] text-[#4B5563]">
            Morning
          </button>

          <button className="bg-[#EEF1F7] px-6 py-3 rounded-full text-[15px] text-[#4B5563]">
            Afternoon
          </button>

          <button className="bg-[#EEF1F7] px-6 py-3 rounded-full text-[15px] text-[#4B5563]">
            Evening
          </button>
        </div>
      </div>

      <div className="mt-14">
        <p className="text-[13px] uppercase tracking-[4px] font-bold text-[#4B5563]">
          Operator
        </p>

        <div className="flex flex-col gap-6 mt-8">
          {["FastX Kinetic", "Velocity Rail", "Silver Bullet"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-4 text-[20px] text-[#374151]"
            >
              <input type="checkbox" className="w-5 h-5" />

              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
