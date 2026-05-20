import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="bg-white border border-[#E8EDF5] rounded-[28px] p-4 shadow-lg max-w-[1000px]">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="bg-[#F7F9FC] rounded-2xl px-5 py-4 border border-[#EDF1F7] flex items-center gap-4">
          <FaMapMarkerAlt className="text-[#2563EB]" />

          <div>
            <p className="text-xs text-[#9CA3AF] uppercase">From</p>

            <p className="font-semibold text-[#111827]">New York City</p>
          </div>
        </div>

        <div className="bg-[#F7F9FC] rounded-2xl px-5 py-4 border border-[#EDF1F7] flex items-center gap-4">
          <FaMapMarkerAlt className="text-[#2563EB]" />

          <div>
            <p className="text-xs text-[#9CA3AF] uppercase">Destination</p>

            <p className="font-semibold text-[#111827]">Atlanta City</p>
          </div>
        </div>

        <div className="bg-[#F7F9FC] rounded-2xl px-5 py-4 border border-[#EDF1F7] flex items-center gap-4">
          <FaCalendarAlt className="text-[#2563EB]" />

          <div>
            <p className="text-xs text-[#9CA3AF] uppercase">Travel Date</p>

            <p className="font-semibold text-[#111827]">Add Date</p>
          </div>
        </div>

        <div className="bg-[#F7F9FC] rounded-2xl px-5 py-4 border border-[#EDF1F7] flex items-center gap-4">
          <FaCalendarAlt className="text-[#2563EB]" />

          <div>
            <p className="text-xs text-[#9CA3AF] uppercase">Travel Type</p>

            <p className="font-semibold text-[#111827]">One Way</p>
          </div>
        </div>

        <button className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all text-white rounded-2xl font-semibold flex items-center justify-center gap-3">
          Search Buses
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
