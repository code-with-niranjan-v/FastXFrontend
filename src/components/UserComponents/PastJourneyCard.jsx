export default function PastJourneyCard({ booking }) {
  const date = new Date(booking.startDateTime);

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#EEF1F6] shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[22px] font-bold text-[#1F2937]">
            {booking.origin}
            {" → "}
            {booking.destination}
          </h3>

          <p className="text-[#6B7280] mt-1">{date.toLocaleDateString()}</p>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide bg-[#ECEEF4] text-[#6B7280]">
          {booking.status}
        </span>
      </div>

      <div className="flex gap-10 mt-8">
        <div>
          <p className="text-[#9CA3AF] uppercase text-[11px] font-semibold">
            Amount
          </p>

          <p className="text-[#005BBF] text-[24px] font-bold mt-1">
            ₹{booking.totalFare}
          </p>
        </div>

        <div>
          <p className="text-[#9CA3AF] uppercase text-[11px] font-semibold">
            Seats
          </p>

          <p className="text-[#F97316] text-[24px] font-bold mt-1">
            {booking.totalNoOfSeats}
          </p>
        </div>
      </div>
    </div>
  );
}
