import { IoLocationOutline } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { searchBus } from "../../services/busService";
import { useNavigate } from "react-router-dom";

export default function SearchBus() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    const data = await searchBus(origin, destination, date, time);

    navigate("/search", { state: { data, origin, destination, date, time } });
  };

  return (
    <div className="w-full max-w-[1050px] bg-white rounded-[28px] border border-[#E8EDF5] shadow-lg p-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="bg-[#F7F9FC] border border-[#EDF1F7] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="text-[#2563EB]">
            <IoLocationOutline size={20} />
          </div>

          <div className="w-full">
            <p className="text-[10px] tracking-[2px] uppercase text-[#9CA3AF] font-semibold">
              Origin
            </p>

            <input
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
              className="bg-transparent outline-none text-[#111827] font-semibold mt-1 w-full placeholder:text-[#9CA3AF]"
              type="text"
              placeholder="Departure City"
            />
          </div>
        </div>

        <div className="bg-[#F7F9FC] border border-[#EDF1F7] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="text-[#2563EB]">
            <MdMyLocation size={20} />
          </div>

          <div className="w-full">
            <p className="text-[10px] tracking-[2px] uppercase text-[#9CA3AF] font-semibold">
              Destination
            </p>

            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-transparent outline-none text-[#111827] font-semibold mt-1 w-full placeholder:text-[#9CA3AF]"
              type="text"
              placeholder="Arrival City"
            />
          </div>
        </div>

        <div className="bg-[#F7F9FC] border border-[#EDF1F7] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="text-[#2563EB]">
            <MdOutlineDateRange size={20} />
          </div>

          <div className="w-full">
            <p className="text-[10px] tracking-[2px] uppercase text-[#9CA3AF] font-semibold">
              Travel Date
            </p>

            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="bg-transparent outline-none text-[#111827] font-semibold mt-1 w-full appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
              type="date"
            />
          </div>
        </div>

        <div className="bg-[#F7F9FC] border border-[#EDF1F7] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="text-[#2563EB]">
            <MdAccessTime size={20} />
          </div>

          <div className="w-full">
            <p className="text-[10px] tracking-[2px] uppercase text-[#9CA3AF] font-semibold">
              Travel Time
            </p>

            <input
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              className="bg-transparent outline-none text-[#111827] font-semibold mt-1 w-full"
              type="time"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all duration-300 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 min-h-[72px] shadow-md"
        >
          Search Buses
          <FaArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
