import { FaBottleWater } from "react-icons/fa6";
import { FaChargingStation } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
export default function TripResultCard({
  time = "08:30",
  origin = "Chennai",
  destination = "Ooty",
  fare = "150",
}) {
  return (
    <div className="p-6 rounded-lg bg-[#FFFFFF]">
      <div className="flex gap-3 justify-between">
        <div className="flex justify-between">
          <div>
            <p className="text-[#414754]">DEPARTURE</p>
            <p className="text-[#191C23] font-bold">{time}</p>
            <p>{origin}</p>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-[#005BBF] text-[14px] font-semibold tracking-[3px] mb-2">
            5H 45M
          </p>

          <div className="relative w-full flex items-center">
            <div className="w-3 h-3 rounded-full border-2 border-[#005BBF] bg-white z-10"></div>

            <div className="flex-1 h-[2px] bg-[#D7DCE5]"></div>

            <div className="w-3 h-3 rounded-full bg-[#005BBF] z-10"></div>
          </div>

          <p className="mt-3 text-[#414754] text-[14px] font-semibold tracking-[4px]">
            NON-STOP
          </p>
        </div>
        <div>
          <p className="text-[#414754]">ARRIVAL</p>
          <p className="text-[#191C23] font-bold">14:15</p>
          <p>{destination}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 text-[#414754]">
            <FaBottleWater />
            <FaChargingStation />
            <FaTv />
            <FaBed />
          </div>
          <div className="font-bold text-[#005BBF] text-[30px]">
            <p>₹{fare}</p>
          </div>
          <div>
            <button className="bg-gradient-to-r font-medium from-[#005BBF] to-[#1A73E8] text-white p-3 rounded-lg">
              SELECT SEATS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
