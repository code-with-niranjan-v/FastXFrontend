import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaBus,
  FaMoneyBillWave,
  FaTicket,
  FaUsers,
  FaRoute,
  FaArrowTrendUp,
} from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllUsers,
  getAllBookings,
  getAllBusesAdmin,
} from "../../services/adminService";

import { setUsers } from "../../redux/slices/adminUserSlice";

import { setAdminBookings } from "../../redux/slices/adminBookingSlice";

import { setAdminBuses } from "../../redux/slices/adminBusSlice";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.adminUsers?.users) || [];

  const bookings = useSelector((state) => state.adminBookings?.bookings) || [];

  const buses = useSelector((state) => state.adminBuses?.buses) || [];

  useEffect(() => {
    async function loadDashboard() {
      const usersData = await getAllUsers();

      dispatch(setUsers(usersData.data || []));

      const bookingsData = await getAllBookings();

      dispatch(setAdminBookings(bookingsData.data || []));

      const busesData = await getAllBusesAdmin();

      dispatch(setAdminBuses(busesData.data || []));
    }

    loadDashboard();
  }, []);

  const totalRevenue = bookings
    .filter((b) => b.status == "CONFIRMED")
    .reduce((acc, curr) => acc + curr.totalFare, 0);

  const activeBuses = buses.filter((bus) => bus.status === "ON ROUTE").length;

  const maintenanceBuses = buses.filter(
    (bus) => bus.status === "ON MAINTENANCE",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const activeRoutes = [...new Set(buses.map((bus) => bus.route?.routeId))]
    .length;

  const bookingSuccess =
    bookings.length > 0
      ? Math.round(
          ((bookings.length - cancelledBookings) / bookings.length) * 100,
        )
      : 0;

  const fleetUtilization =
    buses.length > 0 ? Math.round((activeBuses / buses.length) * 100) : 0;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      subtitle: "Registered accounts",
      icon: <FaUsers />,
    },
    {
      title: "Fleet Size",
      value: buses.length,
      subtitle: `${activeBuses} active buses`,
      icon: <FaBus />,
    },
    {
      title: "Bookings",
      value: bookings.length,
      subtitle: `${bookingSuccess}% success rate`,
      icon: <FaTicket />,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      subtitle: "Platform earnings",
      icon: <FaMoneyBillWave />,
    },
  ];
  const bookingChartData = [
    {
      name: "Confirmed",
      value: bookings.filter((b) => b.status === "CONFIRMED").length,
    },

    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "CANCELLED").length,
    },

    {
      name: "Refund Pending",
      value: bookings.filter((b) => b.status === "CANCEL_REQUESTED").length,
    },
  ];

  const fleetChartData = [
    {
      status: "ON ROUTE",
      count: buses.filter((b) => b.status === "ON ROUTE").length,
    },

    {
      status: "IDLE",
      count: buses.filter((b) => b.status === "IDLE").length,
    },

    {
      status: "MAINTENANCE",
      count: buses.filter((b) => b.status === "ON MAINTENANCE").length,
    },
  ];

  const COLORS = ["#2563EB", "#DC2626", "#EA580C"];
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[58px] font-black text-[#111827] leading-none">
            Platform Analytics
          </h1>

          <p className="text-[#6B7280] mt-5 text-[17px] max-w-[850px] leading-8">
            Centralized operational insights across users, routes, bookings and
            fleet management.
          </p>
        </div>

        <div className="bg-[#EEF4FF] rounded-[24px] px-7 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white text-2xl">
            <FaArrowTrendUp />
          </div>

          <div>
            <p className="text-[#9CA3AF] text-sm font-semibold uppercase tracking-[2px]">
              Growth
            </p>

            <h2 className="text-[30px] font-black text-[#111827] mt-1">+24%</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[30px] border border-[#E9EDF5] p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  {stat.title}
                </p>

                <h1 className="text-[52px] leading-none font-black text-[#111827] mt-5">
                  {stat.value}
                </h1>

                <p className="text-[#2563EB] font-semibold mt-4">
                  {stat.subtitle}
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] text-2xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 mt-10">
        <div className="col-span-2 bg-white rounded-[30px] border border-[#E9EDF5] p-8">
          <div>
            <h2 className="text-[30px] font-black text-[#111827]">
              System Health
            </h2>

            <p className="text-[#9CA3AF] mt-2">
              Operational monitoring and live statistics
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-[#F8FAFC] rounded-[26px] border border-[#EEF2F7] p-7">
              <p className="text-[#9CA3AF] uppercase tracking-[3px] text-[11px] font-bold">
                Fleet Utilization
              </p>

              <h1 className="text-[44px] font-black text-[#111827] mt-4">
                {fleetUtilization}%
              </h1>

              <p className="text-[#2563EB] mt-3 font-semibold">
                {activeBuses} buses active
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-[26px] border border-[#EEF2F7] p-7">
              <p className="text-[#9CA3AF] uppercase tracking-[3px] text-[11px] font-bold">
                Maintenance
              </p>

              <h1 className="text-[44px] font-black text-[#111827] mt-4">
                {maintenanceBuses}
              </h1>

              <p className="text-[#EA580C] mt-3 font-semibold">Under service</p>
            </div>

            <div className="bg-[#F8FAFC] rounded-[26px] border border-[#EEF2F7] p-7">
              <p className="text-[#9CA3AF] uppercase tracking-[3px] text-[11px] font-bold">
                Active Routes
              </p>

              <h1 className="text-[44px] font-black text-[#111827] mt-4">
                {activeRoutes}
              </h1>

              <p className="text-[#16A34A] mt-3 font-semibold">
                Running routes
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-[26px] border border-[#EEF2F7] p-7">
              <p className="text-[#9CA3AF] uppercase tracking-[3px] text-[11px] font-bold">
                Booking Success
              </p>

              <h1 className="text-[44px] font-black text-[#111827] mt-4">
                {bookingSuccess}%
              </h1>

              <p className="text-[#2563EB] mt-3 font-semibold">
                Reservation completion
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8">
          <div>
            <h2 className="text-[30px] font-black text-[#111827]">
              Recent Users
            </h2>

            <p className="text-[#9CA3AF] mt-2">Latest registered accounts</p>
          </div>

          <div className="flex flex-col gap-5 mt-8">
            {users.slice(0, 5).map((user, index) => (
              <div
                key={index}
                className="border border-[#EEF2F7] rounded-[22px] p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] font-black text-lg">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#111827]">{user.name}</h3>

                    <p className="text-[#6B7280] text-sm mt-1">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8">
          <div>
            <h2 className="text-[30px] font-black text-[#111827]">
              Booking Analytics
            </h2>

            <p className="text-[#9CA3AF] mt-2">Booking status distribution</p>
          </div>

          <div className="h-[350px] mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {bookingChartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8">
          <div>
            <h2 className="text-[30px] font-black text-[#111827]">
              Fleet Monitoring
            </h2>

            <p className="text-[#9CA3AF] mt-2">Fleet operational overview</p>
          </div>

          <div className="h-[350px] mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetChartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="status" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" radius={[10, 10, 0, 0]} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
