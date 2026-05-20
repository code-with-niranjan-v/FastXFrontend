import {
  FaChartPie,
  FaBus,
  FaClipboardList,
  FaGear,
  FaRoute,
} from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
export default function OperatorSideBar({ menu, setMenu }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div className="w-[280px] min-h-screen bg-white border-r border-[#E9EDF5] px-6 py-8 flex flex-col justify-between">
      <div>
        <div>
          <h1 className="text-[30px] font-black text-[#2563EB]">FastX</h1>

          <p className="text-[#9CA3AF] text-sm mt-1">Fleet Management</p>
        </div>

        <div className="flex flex-col gap-3 mt-14">
          <button
            onClick={() => {
              setMenu("dashboard");
            }}
            className={`rounded-2xl px-5 py-4 flex items-center gap-4 font-semibold transition-all ${
              menu === "dashboard"
                ? "bg-[#2563EB] text-white"
                : "text-[#6B7280] hover:bg-[#F4F7FB]"
            }`}
          >
            <FaChartPie />
            Dashboard
          </button>

          <button
            onClick={() => {
              setMenu("fleet");
            }}
            className={`rounded-2xl px-5 py-4 flex items-center gap-4 font-semibold transition-all ${
              menu === "fleet"
                ? "bg-[#2563EB] text-white"
                : "text-[#6B7280] hover:bg-[#F4F7FB]"
            }`}
          >
            <FaBus />
            Fleet
          </button>

          <button
            onClick={() => {
              setMenu("bookings");
            }}
            className={`rounded-2xl px-5 py-4 flex items-center gap-4 font-semibold transition-all ${
              menu === "bookings"
                ? "bg-[#2563EB] text-white"
                : "text-[#6B7280] hover:bg-[#F4F7FB]"
            }`}
          >
            <FaClipboardList />
            Bookings
          </button>

          <button
            onClick={() => {
              setMenu("routes");
            }}
            className={`${
              menu === "routes"
                ? "bg-[#2563EB] text-white"
                : "text-[#6B7280] hover:bg-[#F4F7FB]"
            } rounded-2xl px-5 py-4 flex items-center gap-4 font-medium transition-all`}
          >
            <FaRoute />
            Routes
          </button>

          <button
            onClick={() => {
              setMenu("settings");
            }}
            className={`rounded-2xl px-5 py-4 flex items-center gap-4 font-semibold transition-all ${
              menu === "settings"
                ? "bg-[#2563EB] text-white"
                : "text-[#6B7280] hover:bg-[#F4F7FB]"
            }`}
          >
            <FaGear />
            Settings
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            dispatch(logoutUser());

            navigate("/login");
          }}
          className="w-full bg-[#FEECEC] hover:bg-[#FBDADA] transition-all rounded-2xl py-4 text-[#DC2626] font-semibold flex items-center justify-center gap-3"
        >
          <FaRightFromBracket />
          Logout
        </button>

        <div className="text-[#9CA3AF] text-sm text-center">
          © 2026 FastX Transit Systems
        </div>
      </div>
    </div>
  );
}
