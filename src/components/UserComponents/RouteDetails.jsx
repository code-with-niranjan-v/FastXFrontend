import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
export default function RouteDetails() {
  return (
    <div className="flex flex-col  p-6 ">
      <div className="">
        <p className="m-2 text-[#414754] font-medium text-[14px]">
          ROUTE DETAILS
        </p>
        <div className="flex flex-col gap-7 bg-[#F2F3FD] w-[350px] pt-6 pb-6 pl-4 rounded-lg">
          <div className="flex gap-2 items-center text-[#005BBF]">
            <MdOutlineMyLocation size={20} />
            <p className="font-medium text-[#191C23]">San Francisco, CA</p>
          </div>
          <div className="flex gap-2 items-center text-[#005BBF]">
            <MdOutlineLocationOn size={20} />
            <p className="font-medium text-[#191C23]">Los Angeles, CA</p>
          </div>
          <div className="flex flex-col">
            <p className=" text-[#414754]  text-[14px]">DEPARTURE</p>
            <p className="font-medium text-[#191C23]">Wed, 24 Oct 2024</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>PRICE RANGE</p>
        <input
          type="range"
          min="20"
          max="250"
          className="w-full  accent-[#005BBF]
          bg-[#BFD9F5]"
        />
        <div className="flex justify-between mt-1 text-[20px] text-[#414754]">
          <p>₹100</p>
          <p>₹1500</p>
        </div>
      </div>
    </div>
  );
}
