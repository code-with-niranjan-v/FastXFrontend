import { FaBus, FaMoneyBillWave, FaUsers } from "react-icons/fa6";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBuses,
  getOperatorBookings,
} from "../../services/operatorService";
import { setAllBuses } from "../../redux/slices/operatorBusSlice";
import { setOperatorBookings } from "../../redux/slices/operatorBookingSlice";

export default function OperatorDashboard({ setMenu }) {
  const buses = useSelector((state) => state.operatorBuses.buses);
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.operatorBookings.bookings);

  const activeBuses = buses.filter((bus) => bus.status === "ON ROUTE");

  const totalRevenue = bookings
    .filter((b) => b.status == "CONFIRMED")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const activeRoutes = [
    ...new Set(
      buses.map((bus) => `${bus.route.origin}-${bus.route.destination}`),
    ),
  ];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const busResponse = await getAllBuses();

        dispatch(setAllBuses(busResponse.data));

        const bookingResponse = await getOperatorBookings();

        dispatch(setOperatorBookings(bookingResponse.data));
      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[54px] leading-none font-black text-[#111827]">
            Operations Hub
          </h1>

          <p className="uppercase tracking-[3px] text-[12px] text-[#6B7280] font-semibold mt-4">
            System Operational •{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="bg-[#E8F7EE] text-[#16A34A] px-5 py-3 rounded-2xl font-bold text-sm">
          {activeBuses.length}/{buses.length}
          {" Active"}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-[28px] p-6 border border-[#E9EDF5]">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center">
            <FaBus />
          </div>

          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mt-6">
            Total Fleet
          </p>

          <h1 className="text-[52px] leading-none font-black text-[#111827] mt-3">
            {buses.length}
          </h1>

          <p className="text-[#6B7280] mt-3">Registered buses</p>
        </div>

        <div className="bg-[#2563EB] rounded-[28px] p-6 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaUsers />
          </div>

          <p className="text-[11px] uppercase tracking-[3px] text-white/70 font-bold mt-6">
            Total Bookings
          </p>

          <h1 className="text-[52px] leading-none font-black mt-3">
            {bookings.length}
          </h1>

          <p className="mt-3 text-white/80">Reservations received</p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-[#E9EDF5]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4E8] text-[#EA580C] flex items-center justify-center">
            <FaMoneyBillWave />
          </div>

          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mt-6">
            Revenue
          </p>

          <h1 className="text-[52px] leading-none font-black text-[#111827] mt-3">
            ₹{Math.round(totalRevenue)}
          </h1>

          <p className="text-[#6B7280] mt-3">Total earnings</p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-[#E9EDF5]">
          <div className="w-12 h-12 rounded-2xl bg-[#EEFDF3] text-[#16A34A] flex items-center justify-center">
            🟢
          </div>

          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mt-6">
            Active Routes
          </p>

          <h1 className="text-[52px] leading-none font-black text-[#111827] mt-3">
            {activeRoutes.length}
          </h1>

          <p className="text-[#6B7280] mt-3">Running currently</p>
        </div>
      </div>

      <div className="grid grid-cols-[0.9fr_1.1fr] gap-6 mt-8">
        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[26px] font-black text-[#111827]">
              Live Activity
            </h2>

            <button
              onClick={() => {
                setMenu("bookings");
              }}
              className="text-[#2563EB] font-semibold text-sm"
            >
              View History
            </button>
          </div>

          <div className="flex flex-col gap-5 mt-8">
            {bookings.slice(0, 4).map((booking, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
                  👤
                </div>

                <div>
                  <h3 className="font-bold text-[#111827]">
                    {booking.passenger} booked {booking.seats}
                    {" seats for "}
                    {booking.route}
                  </h3>

                  <p className="text-[#9CA3AF] text-sm mt-1">
                    Booking #{booking.bookingId}
                  </p>
                </div>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="border border-dashed border-[#DCE3F0] rounded-[24px] py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-2xl">
                  🚌
                </div>

                <h2 className="text-[24px] font-black text-[#111827] mt-6">
                  No Booking Activity
                </h2>

                <p className="text-[#9CA3AF] mt-3">
                  Recent reservations will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[26px] font-black text-[#111827]">
              Upcoming Departures
            </h2>

            <button
              onClick={() => {
                setMenu("fleet");
              }}
              className="text-[#2563EB] font-semibold text-sm"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-5 mt-8">
            {buses.slice(0, 3).map((bus, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] border border-[#EEF2F7] rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                      {bus.route.origin}
                      {" → "}
                      {bus.route.destination}
                    </p>

                    <h3 className="text-[24px] font-black text-[#111827] mt-2">
                      {bus.route.startDateTime.split("T")[1]}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-[#2563EB] font-bold">
                      {bus.noOfSeats}
                      {" Seats"}
                    </p>

                    <p className="text-sm text-[#6B7280] mt-1">{bus.name}</p>
                  </div>
                </div>
              </div>
            ))}

            {buses.length === 0 && (
              <div className="border border-dashed border-[#DCE3F0] rounded-[24px] py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-2xl">
                  🚍
                </div>

                <h2 className="text-[24px] font-black text-[#111827] mt-6">
                  No Upcoming Trips
                </h2>

                <p className="text-[#9CA3AF] mt-3">
                  Fleet departures will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
