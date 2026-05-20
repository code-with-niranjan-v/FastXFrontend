import { ReactQRCode } from "@lglab/react-qr-code";

export default function TicketModal({
  booking,

  setShowTicket,
}) {
  const date = new Date(booking.startDateTime);

  const qrData = JSON.stringify({
    bookingId: booking.bookingId,

    passenger: booking.passengerName,

    bus: booking.busName,

    from: booking.origin,

    to: booking.destination,

    seats: booking.seatNumbers,
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[700px] rounded-[32px] overflow-hidden shadow-2xl">
        <div className="bg-[#2563EB] px-10 py-8 text-white flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[4px] text-sm opacity-80">
              FastX Ticket
            </p>

            <h1 className="text-[42px] font-black mt-2">
              {booking.origin}
              {" → "}
              {booking.destination}
            </h1>
          </div>

          <button
            onClick={() => {
              setShowTicket(false);
            }}
            className="text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[#9CA3AF] uppercase text-[11px] tracking-[3px] font-bold">
                  Passenger
                </p>

                <h2 className="text-[24px] font-black text-[#111827] mt-2">
                  {booking.passengerName}
                </h2>
              </div>

              <div>
                <p className="text-[#9CA3AF] uppercase text-[11px] tracking-[3px] font-bold">
                  Bus
                </p>

                <h2 className="text-[24px] font-black text-[#111827] mt-2">
                  {booking.busName}
                </h2>
              </div>

              <div>
                <p className="text-[#9CA3AF] uppercase text-[11px] tracking-[3px] font-bold">
                  Seats
                </p>

                <h2 className="text-[24px] font-black text-[#111827] mt-2">
                  {booking.seatNumbers?.join(", ")}
                </h2>
              </div>

              <div>
                <p className="text-[#9CA3AF] uppercase text-[11px] tracking-[3px] font-bold">
                  Date & Time
                </p>

                <h2 className="text-[24px] font-black text-[#111827] mt-2">
                  {booking.journeyDate}
                </h2>

                <p className="text-[#2563EB] font-bold text-lg mt-1">
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB]">
                <ReactQRCode value={qrData} size={220} />
              </div>

              <p className="text-[#6B7280] text-sm mt-5 text-center leading-6">
                Scan QR at boarding point for ticket verification.
              </p>

              <div className="mt-6 bg-[#EEF4FF] text-[#2563EB] px-5 py-3 rounded-2xl font-bold">
                Ticket ID: {booking.bookingId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
