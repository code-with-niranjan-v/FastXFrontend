import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineMap } from "react-icons/hi";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function TicketNextSteps() {
  return (
    <div className="bg-white rounded-[32px] border border-[#E7EBF3] p-8 shadow-sm">
      <p className="uppercase tracking-[4px] text-[12px] font-bold text-[#191C23]">
        Next Steps
      </p>

      <div className="flex flex-col gap-8 mt-10">
        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F3F6FC] flex justify-center items-center text-[#005BBF] text-[24px]">
            <HiOutlineTicket />
          </div>

          <div>
            <h3 className="text-[22px] font-bold text-[#191C23]">
              Digital Ticket Ready
            </h3>

            <p className="text-[17px] text-[#6B7280] leading-[30px] mt-2">
              Show the QR code in your FastX app to the conductor during
              boarding.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F3F6FC] flex justify-center items-center text-[#005BBF] text-[24px]">
            <HiOutlineMap />
          </div>

          <div>
            <h3 className="text-[22px] font-bold text-[#191C23]">
              Track Your Journey
            </h3>

            <p className="text-[17px] text-[#6B7280] leading-[30px] mt-2">
              View Trip History to view ticket details later.
            </p>
          </div>
        </div>

        <div className="bg-[#FFF4EF] rounded-2xl p-5 flex gap-4">
          <IoInformationCircleOutline className="text-[#D97706] text-[26px] mt-1" />

          <div>
            <p className="uppercase tracking-[3px] text-[11px] font-bold text-[#D97706]">
              Travel Tip
            </p>

            <p className="text-[16px] text-[#9A3412] leading-[28px] mt-2">
              Arrive at pickup point at least 15 minutes before departure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
