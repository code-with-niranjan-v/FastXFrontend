import { useState } from "react";

import AdminSidebar from "./AdminSidebar";

import AdminDashboard from "./AdminDashboard";

import AdminUserManagement from "./AdminUserManagement";

import AdminBookingManagement from "./AdminBookingManagement";

import AdminFleetManagement from "./AdminFleetManagement";

import RouteManagement from "../BusOperatorComponents/RouteManagement";

export default function AdminHome() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-10 overflow-y-auto">
        {activeMenu === "dashboard" && <AdminDashboard />}

        {activeMenu === "users" && <AdminUserManagement />}

        {activeMenu === "fleet" && <AdminFleetManagement />}

        {activeMenu === "bookings" && <AdminBookingManagement />}

        {activeMenu === "routes" && <RouteManagement />}
      </div>
    </div>
  );
}
