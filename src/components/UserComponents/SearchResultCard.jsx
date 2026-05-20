export default function SearchResultCard({
  time,
  operator,
  price,
  highlighted,
  handleSelectSeat,
  data,
  seats,
}) {
  return (
    <div
      className={`rounded-[24px] px-6 py-7 flex items-center justify-between ${
        highlighted ? "bg-white" : "bg-[#EEF1F7]"
      }`}
    >
      <div className="flex items-center gap-20">
        <div className="min-w-[260px]">
          <p className="text-[10px] uppercase tracking-[4px] text-[#D97706] font-bold">
            Express Service
          </p>

          <h2 className="text-[24px] font-black text-[#111827] mt-3">
            {operator}
          </h2>

          <p className="text-[12px] uppercase tracking-[2px] text-[#374151] font-semibold mt-3">
            Multi-Axle AC Sleeper
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[#374151] font-bold">
            Departure
          </p>

          <h2 className="text-[28px] font-black text-[#111827] mt-3">{time}</h2>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[#374151] font-bold">
            Availability
          </p>

          <div className="flex items-center gap-3 mt-3">
            <h2 className="text-[28px] font-black text-[#111827]">
              {data.noOfSeats} Seats
            </h2>

            <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[4px] text-[#374151] font-bold">
            Fare
          </p>

          <h2 className="text-[42px] font-black text-[#2563EB] mt-3">
            ₹{price}
          </h2>
        </div>

        <button
          onClick={() => {
            handleSelectSeat(data, time);
          }}
          className={`px-8 py-4 rounded-2xl text-[13px] uppercase tracking-[2px] font-bold transition-all ${
            highlighted
              ? "bg-[#2563EB] hover:bg-[#1E4FD8] text-white"
              : "bg-[#DDE3EE] hover:bg-[#CFD6E3] text-[#111827]"
          }`}
        >
          Select Seats
        </button>
      </div>
    </div>
  );
}
