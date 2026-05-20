import { cancelBooking } from "../../services/bookingService.js";

import { useDispatch } from "react-redux";
import { useState } from "react";

import TicketModal from "./TicketModal";
export default function UpcomingTripCard({ booking }) {
  const dispatch = useDispatch();

  const date = new Date(booking.startDateTime);

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString();

  const handleCancelBooking = async () => {
    const response = await cancelBooking(booking.bookingId);

    if (response.success) {
      // dispatch(updateBooking(response.data));

      alert("Cancellation request sent");
    } else {
      alert(response.message);
    }
  };
  const [showTicket, setShowTicket] = useState(false);
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#EEF1F6] flex">
      <div className="w-[320px] relative">
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop"
          alt="bus"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-5 left-5">
          <p className="text-[#D1D5DB] text-[12px] uppercase tracking-[3px]">
            Destination
          </p>

          <h3 className="text-white text-[30px] font-bold mt-1">
            {booking.destination}
          </h3>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#9CA3AF] uppercase tracking-[2px] text-[12px] font-semibold">
              Departure
            </p>

            <h3 className="text-[48px] font-bold text-[#111827] leading-none mt-3">
              {formattedTime}
            </h3>

            <p className="text-[#4B5563] mt-3 text-[18px]">{booking.origin}</p>
          </div>

          <div className="flex flex-col items-end">
            <span className="bg-[#E6EEFF] text-[#005BBF] px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">
              {booking.status}
            </span>

            <p className="text-[#6B7280] text-[13px] mt-3">
              Ticket ID: {booking.bookingId}
            </p>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-5 flex justify-between items-center">
          <div className="flex gap-12">
            <div>
              <p className="text-[#9CA3AF] text-[11px] uppercase font-semibold">
                Seats
              </p>

              <p className="text-[#111827] font-semibold mt-1">
                {booking.totalNoOfSeats}
              </p>
            </div>

            <div>
              <p className="text-[#9CA3AF] text-[11px] uppercase font-semibold">
                Fare
              </p>

              <p className="text-[#111827] font-semibold mt-1">
                ₹{booking.totalFare}
              </p>
            </div>

            <div>
              <p className="text-[#9CA3AF] text-[11px] uppercase font-semibold">
                Date
              </p>

              <p className="text-[#111827] font-semibold mt-1">
                {booking.journeyDate}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowTicket(true);
              }}
              className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] px-6 py-3 rounded-xl text-[14px] font-medium transition-all"
            >
              View Ticket
            </button>

            {booking.status === "CONFIRMED" && (
              <button
                onClick={handleCancelBooking}
                className="bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] px-6 py-3 rounded-xl text-[14px] font-medium transition-all"
              >
                Cancel Booking
              </button>
            )}

            {booking.status === "CANCEL_REQUESTED" && (
              <button className="bg-[#FEF3C7] text-[#D97706] px-6 py-3 rounded-xl text-[14px] font-medium cursor-not-allowed">
                Processing Refund
              </button>
            )}

            {booking.status === "CANCELLED" && (
              <button className="bg-[#E5E7EB] text-[#6B7280] px-6 py-3 rounded-xl text-[14px] font-medium cursor-not-allowed">
                Cancelled
              </button>
            )}
          </div>
        </div>
      </div>

      {showTicket && (
        <TicketModal booking={booking} setShowTicket={setShowTicket} />
      )}
    </div>
  );
}
