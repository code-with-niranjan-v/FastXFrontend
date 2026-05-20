import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllBookings } from "../../services/adminService";

import { setAdminBookings } from "../../redux/slices/adminBookingSlice";

export default function AdminBookingManagement() {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.adminBookings.bookings) || [];

  useEffect(() => {
    async function loadBookings() {
      const data = await getAllBookings();

      dispatch(setAdminBookings(data.data || []));
    }

    loadBookings();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-[56px] font-black text-[#111827] leading-none">
        Booking Management
      </h1>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-10">
        <div className="overflow-hidden rounded-2xl border border-[#EEF2F7]">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Passenger
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Route
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Seats
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Fare
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-t border-[#EEF2F7]">
                  <td className="px-6 py-6 font-bold text-[#111827]">
                    {booking.passengerName}
                  </td>

                  <td className="px-6 py-6">
                    {booking.origin}
                    {" → "}
                    {booking.destination}
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-2">
                      {booking.seatNumbers?.map((seat, i) => (
                        <div
                          key={i}
                          className="bg-[#EEF4FF] text-[#2563EB] px-3 py-2 rounded-xl font-bold text-sm"
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-6 font-black text-[#111827]">
                    ₹{booking.totalFare}
                  </td>

                  <td className="px-6 py-6">
                    <span className="bg-[#EEF4FF] text-[#2563EB] px-4 py-2 rounded-xl text-sm font-bold">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
