import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { getOperatorBookings } from "../../services/operatorService";

import { setOperatorBookings } from "../../redux/slices/operatorBookingSlice";
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";
import {
  getRefundRequests,
  approveRefund,
  rejectRefund,
} from "../../services/refundService";

export default function BookingManagement() {
  const dispatch = useDispatch();

  const [refundRequests, setRefundRequests] = useState([]);

  const bookings =
    useSelector((state) => state.operatorBookings.bookings) || [];

  useEffect(() => {
    async function fetchBookings() {
      const data = await getOperatorBookings();
      console.log(data.data);
      dispatch(setOperatorBookings(data.data || []));
    }

    async function fetchRefunds() {
      const data = await getRefundRequests();

      setRefundRequests(data.data || []);
    }

    fetchBookings();

    fetchRefunds();
  }, []);

  const handleApproveRefund = async (refundId) => {
    const response = await approveRefund(refundId);

    if (response.success) {
      setRefundRequests((prev) =>
        prev.filter((refund) => refund.refundId !== refundId),
      );

      dispatch(
        setOperatorBookings(
          bookings.map((booking) =>
            booking.bookingId === response.data.bookingId
              ? {
                  ...booking,

                  status: "CANCELLED",
                }
              : booking,
          ),
        ),
      );

      alert("Refund approved");
    } else {
      alert("Refund Approved!");
      console.log(response);
    }
  };

  const handleRejectRefund = async (refundId) => {
    const response = await rejectRefund(refundId);

    if (response.success) {
      setRefundRequests((prev) =>
        prev.filter((refund) => refund.refundId !== refundId),
      );

      dispatch(
        setOperatorBookings(
          bookings.map((booking) =>
            booking.bookingId === response.data.bookingId
              ? {
                  ...booking,

                  status: "CONFIRMED",
                }
              : booking,
          ),
        ),
      );

      alert("Refund rejected");
    } else {
      alert(response.message);
    }
  };
  const handleExportReport = () => {
    const reportData = bookings.map((booking) => ({
      Booking_ID: booking.bookingId,

      Passenger: booking.passenger,

      Route: booking.route,

      Seats: booking.seats,
      Amount: booking.amount,
      Status: booking.status,

      Journey_Date: new Date(booking.startDateTime).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(reportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, `FastX_Bookings_Report.xlsx`);
  };
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[52px] leading-none font-black text-[#111827]">
            Booking Management
          </h1>

          <p className="text-[#6B7280] text-[16px] mt-4 max-w-[700px] leading-7">
            Monitor recent reservations and passenger activity across your
            routes.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all rounded-2xl px-7 py-4 text-white font-semibold"
        >
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Total Bookings
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {bookings.length}
          </h1>

          <p className="text-[#2563EB] font-semibold mt-2">Reservations</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Confirmed
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {bookings.filter((b) => b.status === "CONFIRMED").length}
          </h1>

          <p className="text-[#16A34A] font-semibold mt-2">Active tickets</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Cancelled
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {bookings.filter((b) => b.status === "CANCELLED").length}
          </h1>

          <p className="text-[#DC2626] font-semibold mt-2">Cancelled</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Revenue
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            ₹
            {bookings
              .filter((b) => b.status == "CONFIRMED")
              .reduce((acc, curr) => acc + curr.amount, 0)}
          </h1>

          <p className="text-[#2563EB] font-semibold mt-2">Total earnings</p>
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-black text-[#111827]">
              Refund Requests
            </h2>

            <p className="text-[#9CA3AF] mt-2">
              Passenger initiated cancellation requests
            </p>
          </div>

          <div className="bg-[#FFF4E8] text-[#EA580C] px-5 py-3 rounded-2xl font-bold text-sm">
            {
              refundRequests.filter((refund) => refund.status === "PENDING")
                .length
            }
            {" Pending"}
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-8">
          {refundRequests.filter((refund) => refund.status === "PENDING")
            .length === 0 && (
            <div className="w-full border border-dashed border-[#D7DFEA] rounded-[28px] py-20 flex flex-col items-center justify-center bg-[#FAFBFD]">
              <div className="w-20 h-20 rounded-[24px] bg-[#EEF4FF] flex items-center justify-center text-[34px]">
                💸
              </div>

              <h2 className="text-[28px] font-black text-[#111827] mt-8">
                No Refund Requests
              </h2>

              <p className="text-[#9CA3AF] text-center mt-4 max-w-[420px] leading-7">
                All passenger bookings are currently active and there are no
                pending refund approvals waiting for action.
              </p>
            </div>
          )}
          {refundRequests
            .filter((refund) => refund.status === "PENDING")
            .map((refund, index) => (
              <div
                key={index}
                className="border border-[#EEF2F7] rounded-[24px] p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                      Booking ID
                    </p>

                    <h3 className="text-[22px] font-black text-[#111827] mt-2">
                      #{refund.bookingId}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                      Passenger
                    </p>

                    <h3 className="text-[18px] font-bold text-[#111827] mt-2">
                      {refund.passengerName}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                      Route
                    </p>

                    <h3 className="text-[18px] font-bold text-[#111827] mt-2">
                      {refund.origin}
                      {" → "}
                      {refund.destination}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                      Refund Amount
                    </p>

                    <h3 className="text-[18px] font-black text-[#2563EB] mt-2">
                      ₹{refund.amount}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      handleApproveRefund(refund.refundId);
                    }}
                    className="bg-[#E8F7EE] hover:bg-[#DDF5E7] transition-all text-[#16A34A] px-6 py-4 rounded-2xl font-bold"
                  >
                    Approve Refund
                  </button>

                  <button
                    onClick={() => {
                      handleRejectRefund(refund.refundId);
                    }}
                    className="bg-[#FEECEC] hover:bg-[#FBDADA] transition-all text-[#DC2626] px-6 py-4 rounded-2xl font-bold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-black text-[#111827]">
              Recent Reservations
            </h2>

            <p className="text-[#9CA3AF] mt-2">
              Latest passenger booking activity
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#F4F7FB] rounded-2xl px-5 py-4 flex items-center gap-3">
              <FaMagnifyingGlass className="text-[#9CA3AF]" />

              <input
                type="text"
                placeholder="Search booking..."
                className="bg-transparent outline-none text-sm"
              />
            </div>

            <button className="bg-[#F4F7FB] hover:bg-[#E9EDF5] transition-all rounded-2xl px-5 py-4 flex items-center gap-3 text-[#374151] font-semibold">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#EEF2F7]">
          {bookings.length === 0 ? (
            <div className="w-full py-24 flex flex-col items-center justify-center bg-[#FAFBFD]">
              <div className="w-20 h-20 rounded-[24px] bg-[#EEF4FF] flex items-center justify-center text-[34px]">
                🚌
              </div>

              <h2 className="text-[30px] font-black text-[#111827] mt-8">
                No Reservations Yet
              </h2>

              <p className="text-[#9CA3AF] text-center mt-4 max-w-[450px] leading-7">
                Passenger bookings and travel reservations will appear here once
                customers start booking your routes.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                    Booking ID
                  </th>

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
                    Amount
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
                      #{booking.bookingId}
                    </td>

                    <td className="px-6 py-6 font-medium text-[#374151]">
                      {booking.passenger}
                    </td>

                    <td className="px-6 py-6 font-medium text-[#374151]">
                      {booking.route}
                    </td>

                    <td className="px-6 py-6">
                      <span className="bg-[#F4F7FB] px-4 py-2 rounded-lg text-[#374151] font-semibold">
                        {booking.seats}
                      </span>
                    </td>

                    <td className="px-6 py-6 font-black text-[#111827]">
                      ₹{booking.amount}
                    </td>

                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${
                          booking.status === "CONFIRMED"
                            ? "bg-[#E8F7EE] text-[#16A34A]"
                            : booking.status === "CANCEL_REQUESTED"
                              ? "bg-[#FEF3C7] text-[#D97706]"
                              : "bg-[#FEECEC] text-[#DC2626]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
