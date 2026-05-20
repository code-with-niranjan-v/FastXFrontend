import { useState } from "react";

import OperatorSideBar from "./OperatorSideBar";
import OperatorDashboard from "./OperatorDashboard";
import FleetManagement from "./FleetManagement";
import BookingManagement from "./BookingManagement";
import UserProfile from "../UserComponents/UserProfile";
import RouteManagement from "./RouteManagement";
export default function OperatorHome() {
  const [menu, setMenu] = useState("dashboard");

  const renderContent = () => {
    if (menu === "dashboard") {
      return <OperatorDashboard setMenu={setMenu} />;
    }

    if (menu === "fleet") {
      return <FleetManagement />;
    }

    if (menu == "bookings") {
      return <BookingManagement />;
    }

    if (menu == "settings") {
      return <UserProfile />;
    } else if (menu === "routes") {
      return <RouteManagement />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FB] flex">
      <OperatorSideBar menu={menu} setMenu={setMenu} />

      <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
