import { useLocation } from "react-router-dom";
import BookinDetails from "../components/UserComponents/BookingDetails";
import SeatArrangement from "../components/UserComponents/SeatArrangement";
import UserNavbar from "../components/UserComponents/UserNavBar";

export default function SelectSeat() {
  const location = useLocation();

  const data = location.state.data;
  const time = location.state.time;
  const date = location.state.date;
  console.log("Selected Date: ", date);

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB] overflow-x-hidden">
      <UserNavbar />

      <div className="w-full max-w-[1700px] mx-auto px-6 xl:px-14 py-10">
        <BookinDetails
          busName={data.name}
          busNumber={data.busNumber}
          time={time}
          destination={data.route.destination}
        />

        <div className="mt-8 w-full">
          <SeatArrangement
            singleFare={data.fare}
            totalSeats={data.noOfSeats}
            busId={data.busId}
            selectedDate={date}
          />
        </div>
      </div>
    </div>
  );
}
