import TicketHero from "../components/UserComponents/TicketHero";
import TicketConfirmCard from "../components/UserComponents/TicketConfirmCard";
import TicketNextSteps from "../components/UserComponents/TicketNextSteps";
import TicketHelpCard from "../components/UserComponents/TicketHelpCard";
import { useLocation } from "react-router-dom";
import UserNavbar from "../components/UserComponents/UserNavBar";
export default function ConfirmTicketPage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="">
      <UserNavbar />
      <div className="min-h-screen bg-[#F5F7FB] flex justify-center p-10">
        <div className="w-full max-w-[1300px] flex flex-col gap-10">
          <TicketHero destination={state.bookingData.destination} />

          <div className="grid grid-cols-[2fr_1fr] gap-8">
            <TicketConfirmCard
              origin={state.bookingData.origin}
              destination={state.bookingData.destination}
              bookingId={state.bookingData.bookingId}
              dateTime={state.date}
              busName={state.bookingData.busName}
              seats={state.selectedSeats}
            />

            <div className="flex flex-col gap-6">
              <TicketNextSteps />

              <TicketHelpCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
