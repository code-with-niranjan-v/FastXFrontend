import {
  FaChartPie,
  FaBus,
  FaRoute,
  FaTicket,
  FaUsers,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";

export default function AdminSidebar({ activeMenu, setActiveMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      id: "users",
      label: "User Management",
      icon: <FaUsers />,
    },
    {
      id: "fleet",
      label: "Fleet",
      icon: <FaBus />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <FaTicket />,
    },
    {
      id: "routes",
      label: "Routes",
      icon: <FaRoute />,
    },
  ];

  return (
    <div className="w-[290px] min-h-screen bg-white border-r border-[#E9EDF5] px-6 py-8 flex flex-col justify-between">
      <div>
        <div>
          <h1 className="text-[34px] font-black text-[#2563EB]">FastX</h1>

          <p className="text-[#9CA3AF] mt-1">Admin Control Center</p>
        </div>

        <div className="flex flex-col gap-3 mt-14">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setActiveMenu(menu.id);
              }}
              className={`rounded-2xl px-5 py-4 flex items-center gap-4 font-semibold transition-all ${
                activeMenu === menu.id
                  ? "bg-[#2563EB] text-white"
                  : "text-[#6B7280] hover:bg-[#F4F7FB]"
              }`}
            >
              {menu.icon}

              {menu.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          dispatch(logoutUser());

          navigate("/login");
        }}
        className="w-full bg-[#FEECEC] hover:bg-[#FBDADA] transition-all rounded-2xl py-4 text-[#DC2626] font-bold flex items-center justify-center gap-3"
      >
        <FaArrowRightFromBracket />
        Logout
      </button>
    </div>
  );
}
