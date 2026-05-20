import RecentSearch from "../components/UserComponents/RecentSearch";
import SearchBus from "../components/UserComponents/SearchBus";
import PopularRoutes from "../components/UserComponents/PopularRoutes";
import UserProfile from "../components/UserComponents/UserProfile";
import TripHistory from "../components/UserComponents/TripHistory";
import UserNavbar from "../components/UserComponents/UserNavbar";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function UserHome() {
  const [menu, setMenu] = useState("home");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setMenu(state);
    }
  }, [state]);

  const displayContent = () => {
    if (menu === "home") {
      return (
        <div className="px-10 py-12">
          <div>
            <h1 className="text-[72px] leading-[75px] font-black text-[#111827]">
              Where to <span className="text-[#2563EB] italic">next?</span>
            </h1>

            <p className="text-[#7A8395] mt-4 text-[17px]">
              Your next journey starts here.
            </p>
          </div>

          <div className="mt-10">
            <SearchBus />
          </div>

          <div className="mt-20">
            <p className="text-[11px] uppercase tracking-[3px] text-[#2563EB] font-bold">
              Continue Planning
            </p>

            <h2 className="text-[22px] font-bold text-[#111827] mt-2">
              Recent Journeys
            </h2>

            <div className="flex flex-wrap gap-5 mt-7">
              <RecentSearch />
              <RecentSearch />
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[3px] text-[#2563EB] font-bold">
                  Get Inspired
                </p>

                <h2 className="text-[22px] font-bold text-[#111827] mt-2">
                  Discover Destinations
                </h2>
              </div>

              <button className="text-[#2563EB] font-semibold text-sm">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
              <div className="lg:row-span-2">
                <PopularRoutes
                  large
                  city="New York"
                  price="$24"
                  image="/pr1.jpg"
                />
              </div>

              <PopularRoutes city="Washington" price="$18" image="/pr1.jpg" />

              <div className="grid grid-cols-2 gap-5">
                <PopularRoutes city="Boston" price="$14" image="/pr1.jpg" />

                <PopularRoutes city="Chicago" price="$20" image="/pr1.jpg" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (menu === "settings") {
      return (
        <div className="p-10">
          <UserProfile />
        </div>
      );
    } else if (menu === "trip") {
      return (
        <div className="p-10">
          <TripHistory />
        </div>
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB]">
      <UserNavbar />

      {displayContent()}
    </div>
  );
}
