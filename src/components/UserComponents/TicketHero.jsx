import { IoCheckmarkCircle } from "react-icons/io5";

export default function TicketHero({ destination }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E7EBF3] shadow-sm">
      <div className="flex items-center gap-2 text-[#005BBF] mb-5">
        <IoCheckmarkCircle className="text-[18px]" />

        <p className="uppercase tracking-[3px] text-[12px] font-bold">
          Reservation Confirmed
        </p>
      </div>

      <h1 className="text-[88px] leading-[92px] font-black text-[#161925]">
        You're all set
        <br />
        <span className="text-[#005BBF]">for {destination}.</span>
      </h1>

      <p className="text-[24px] text-[#5B6475] mt-8 max-w-[800px] leading-[38px]">
        Your booking is secured. Get ready for a premium travel experience with
        FastX Express.
      </p>
    </div>
  );
}
