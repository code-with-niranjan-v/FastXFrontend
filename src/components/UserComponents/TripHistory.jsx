import { useEffect, useState } from "react";

import UpcomingTripCard from "./UpcomingTrip";

import PastJourneyCard from "./PastJourneyCard";

import { getBookings } from "../../services/bookingService";

export default function TripHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const data = await getBookings();

      setBookings(data || []);
    }

    fetchBookings();
  }, []);

  const currentDate = new Date();

  const upcomingBookings = bookings.filter((booking) => {
    const journeyDate = new Date(booking.startDateTime);

    return journeyDate > currentDate;
  });

  const pastBookings = bookings.filter((booking) => {
    const journeyDate = new Date(booking.startDateTime);

    return journeyDate <= currentDate;
  });

  return (
    <div className="w-full bg-[#F5F7FB] p-8 overflow-y-auto">
      <div>
        <h1 className="text-[42px] font-bold text-[#1C1F26]">
          Manage Bookings
        </h1>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <h2 className="text-[24px] font-semibold text-[#1F2937]">
            Upcoming Trips
          </h2>

          <span className="bg-[#E6F0FF] text-[#005BBF] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {upcomingBookings.length}
            {" Active"}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <UpcomingTripCard key={booking.bookingId} booking={booking} />
            ))
          ) : (
            <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[28px] py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#2563EB] text-2xl">
                🚌
              </div>

              <h2 className="text-[24px] font-bold text-[#111827] mt-6">
                No Upcoming Journeys
              </h2>

              <p className="text-[#6B7280] mt-3 text-center max-w-[400px] leading-7">
                Your future bookings will appear here once you reserve your next
                ride.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-[24px] font-semibold text-[#1F2937]">
          Past Journeys
        </h2>

        <div
          className={`mt-6 ${
            pastBookings.length > 0 ? "grid grid-cols-2 gap-8" : "w-full"
          }`}
        >
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <PastJourneyCard key={booking.bookingId} booking={booking} />
            ))
          ) : (
            <div className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[28px] py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] text-2xl">
                📍
              </div>

              <h2 className="text-[24px] font-bold text-[#111827] mt-6">
                No Past Journeys
              </h2>

              <p className="text-[#6B7280] mt-3 text-center max-w-[400px] leading-7">
                Completed trips and travel history will appear here after your
                journeys.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
