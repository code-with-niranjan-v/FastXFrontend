import { ReactQRCode } from "@lglab/react-qr-code";
import { splitDateTime } from "../../utils/dateTimeUtils";

export default function TicketConfirmCard({
  origin = "Chennai",
  destination = "Ooty",
  bookingId = 1234,
  dateTime,
  busName,
  seats,
}) {
  const { date, time } = splitDateTime(dateTime);
  return (
    <div className="bg-white rounded-[32px] border border-[#E7EBF3] p-8 shadow-sm">
      <div className="grid grid-cols-[220px_1fr] gap-10">
        <div className="flex flex-col">
          <div className="rounded-3xl overflow-hidden h-[220px] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8">
            <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
              Booking ID
            </p>

            <p className="text-[34px] font-bold text-[#191C23] mt-2">
              #FX-{bookingId}
            </p>
          </div>

          <div className="mt-8 bg-[#F7F9FC] rounded-2xl p-4 flex justify-center">
            <ReactQRCode
              value={"BookingId: #FX-" + bookingId}
              className="w-[120px] h-[120px]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-y-12">
            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                From
              </p>

              <h2 className="text-[48px] font-black text-[#191C23] mt-2">
                {origin}
              </h2>
            </div>

            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                To
              </p>

              <h2 className="text-[48px] font-black text-[#191C23] mt-2">
                {destination}
              </h2>
            </div>

            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                Departure Date
              </p>

              <p className="text-[30px] font-bold text-[#191C23] mt-2">
                {date}
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                Bus Name
              </p>

              <p className="text-[30px] font-bold text-[#005BBF] mt-2">
                {busName}
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                Seat Number
              </p>

              <p className="text-[30px] font-bold text-[#191C23] mt-2 flex">
                {seats.map((s) => (
                  <p className="pr-1">{s}</p>
                ))}
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[4px] uppercase text-[#8C93A8] font-bold">
                Time
              </p>

              <p className="text-[30px] font-bold text-[#191C23] mt-2">
                {time}
              </p>
            </div>
          </div>

          <div className="flex gap-5 mt-14">
            <button className="bg-[#005BBF] text-white px-10 py-5 rounded-2xl text-[20px] font-bold shadow-lg hover:scale-[1.02] duration-200">
              View My Trips
            </button>

            <button className="bg-[#EEF1F7] text-[#414754] px-10 py-5 rounded-2xl text-[20px] font-bold hover:scale-[1.02] duration-200">
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
