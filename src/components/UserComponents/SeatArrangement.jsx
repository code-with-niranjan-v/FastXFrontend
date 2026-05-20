import { useEffect, useState } from "react";

import { RiSteering2Fill } from "react-icons/ri";

import { bookTicket, getBookedSeats } from "../../services/bookingService.js";

import { useNavigate } from "react-router-dom";

import { FaArrowRightLong, FaWallet } from "react-icons/fa6";

import { useDispatch } from "react-redux";

import { addNotification } from "../../redux/slices/notificationSlice.js";
import toast from "react-hot-toast";

export default function SeatArrangement({
  totalSeats,
  singleFare,
  busId,
  selectedDate,
}) {
  const seats = Array.from(
    {
      length: totalSeats,
    },
    (_, i) => i + 1,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [bookedSeats, setBookedSeats] = useState([]);

  const totalFare = selectedSeats.length * singleFare;

  useEffect(() => {
    async function loadBookedSeats() {
      const response = await getBookedSeats(busId, selectedDate);

      if (response.success) {
        setBookedSeats(response.data || []);
      }
    }

    loadBookedSeats();
  }, [busId, selectedDate]);

  const handleSeatSelection = (seat) => {
    if (!seat || bookedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      return;
    }
    const id = toast.loading("Processing Payment...");
    const res = await bookTicket(busId, selectedSeats, selectedDate);
    const bookingData = res.data;
    if (res.success) {
      navigate("/confirm-ticket", {
        state: {
          bookingData,
          selectedSeats,
          totalFare,
          date: selectedDate,
        },
      });
      toast.success("Booking Confirmed!", { id });
      dispatch(
        addNotification({
          title: "Booking Confirmed",

          message: `Your seats ${selectedSeats.join(
            ", ",
          )} have been successfully booked.`,

          time: "Just now",
        }),
      );
    } else {
      alert(bookingData.message);
    }
  };

  const getSeatClass = (seat, idx) => {
    if (bookedSeats.includes(seat)) {
      return "bg-[#EF4444] text-white cursor-not-allowed";
    }

    if (selectedSeats.includes(seat)) {
      return "bg-[#2563EB] text-white shadow-lg scale-105";
    }

    if (idx === 1) {
      return "bg-[#DDE3EE] text-[#9CA3AF] hover:bg-[#CBD5E1]";
    }

    return "bg-[#E5E9F1] text-[#111827] hover:bg-[#D9DEE8]";
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_0.8fr] gap-8 w-full">
      <div className="bg-[#EEF1F7] border border-[#E1E6EF] rounded-[34px] p-8 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <div />

          <div className="text-[#9CA3AF] flex flex-col items-center">
            <RiSteering2Fill size={32} />

            <p className="text-[10px] uppercase tracking-[3px] mt-2">Cockpit</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#D9DEE8] mt-6 mb-8" />

        <div className="flex items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-[#E5E9F1]" />

            <p className="text-sm font-medium text-[#374151]">Available</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-[#2563EB]" />

            <p className="text-sm font-medium text-[#374151]">Selected</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-[#EF4444]" />

            <p className="text-sm font-medium text-[#374151]">Booked</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center w-full">
          {Array.from({
            length: Math.ceil(seats.length / 3),
          }).map((_, rowIndex) => {
            const leftSeat1 = seats[rowIndex * 3];

            const leftSeat2 = seats[rowIndex * 3 + 1];

            const rightSeat = seats[rowIndex * 3 + 2];

            return (
              <div
                key={rowIndex}
                className="flex items-center justify-center gap-24 w-full"
              >
                <div className="flex gap-4">
                  {[leftSeat1, leftSeat2].map(
                    (seat, idx) =>
                      seat && (
                        <div
                          key={seat}
                          onClick={() => handleSeatSelection(seat)}
                          className={`w-[64px] h-[64px] rounded-2xl flex items-center justify-center font-bold transition-all duration-200 ${getSeatClass(
                            seat,
                            idx,
                          )}`}
                        >
                          {seat}
                        </div>
                      ),
                  )}
                </div>

                <div>
                  {rightSeat && (
                    <div
                      onClick={() => handleSeatSelection(rightSeat)}
                      className={`w-[64px] h-[64px] rounded-2xl flex items-center justify-center font-bold transition-all duration-200 ${getSeatClass(
                        rightSeat,
                        0,
                      )}`}
                    >
                      {rightSeat}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-[#F8F9FC] border border-[#D9DEE8] rounded-[30px] p-8">
          <h2 className="text-[30px] font-black text-[#111827]">
            Fare Summary
          </h2>

          <div className="flex justify-between items-center mt-10">
            <p className="text-[#374151] font-medium">Selected Seats</p>

            <p className="font-bold text-[#2563EB]">
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
            </p>
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-[#374151] font-medium">Base Fare</p>

            <p className="font-bold text-[#111827]">₹{totalFare}</p>
          </div>

          <div className="w-full h-[1px] bg-[#E5E7EB] my-8" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[4px] text-[#374151] font-bold">
                Total Amount
              </p>

              <h1 className="text-[52px] font-black text-[#111827] mt-2">
                ₹{totalFare}
              </h1>
            </div>

            <FaWallet className="text-[#2563EB] text-[24px]" />
          </div>

          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className={`w-full mt-8 rounded-2xl py-5 text-white font-bold tracking-[2px] uppercase flex items-center justify-center gap-3 transition-all ${
              selectedSeats.length === 0
                ? "bg-[#9CA3AF] cursor-not-allowed"
                : "bg-[#2563EB] hover:bg-[#1E4FD8]"
            }`}
          >
            Confirm Selection & Pay
            <FaArrowRightLong />
          </button>

          <p className="text-[#6B7280] text-xs text-center mt-6 leading-6">
            By proceeding, you agree to our Terms of Service and Cancellation
            Policy.
          </p>
        </div>

        <div className="bg-[#F7D6C3] rounded-[24px] p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5B38D] flex items-center justify-center">
              ⚡
            </div>

            <div>
              <h3 className="font-black text-[#111827]">EXPRESS ADVANTAGE</h3>

              <p className="text-sm text-[#6B7280] mt-2 leading-6">
                FastX members get priority boarding and 15% extra comfort room
                on this route.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
