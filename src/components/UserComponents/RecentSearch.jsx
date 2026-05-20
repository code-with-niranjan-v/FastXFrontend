import { FaArrowRightLong } from "react-icons/fa6";

export default function RecentSearch({
  origin = "NYC",
  destination = "BOS",
  date = "March 18 2025",
  noOfSeats = 2,
  time = "2 hours ago",
}) {
  return (
    <div className="bg-white border border-[#E8EDF5] hover:border-[#2563EB] transition-all duration-300 rounded-[22px] px-6 py-5 min-w-[280px] shadow-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        <h2 className="text-[22px] font-black text-[#111827]">{origin}</h2>

        <div className="text-[#2563EB]">
          <FaArrowRightLong size={18} />
        </div>

        <h2 className="text-[22px] font-black text-[#111827]">{destination}</h2>
      </div>

      <p className="text-[13px] text-[#6B7280] mt-3 font-medium">
        {origin} to {destination}
      </p>

      <p className="text-[11px] uppercase tracking-[2px] text-[#9CA3AF] font-bold mt-5">
        Searched {time}
      </p>
    </div>
  );
}
