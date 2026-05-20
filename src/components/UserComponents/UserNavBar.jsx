import { FaRegBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
export default function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = useSelector(
    (state) => state.notification.notifications,
  );
  const [showMenu, setShowMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const activeClass = "text-[#2563EB] font-semibold";

  const normalClass =
    "text-[#6B7280] hover:text-[#111827] transition-all duration-200 font-medium";

  return (
    <nav className="w-full h-[82px] bg-white border-b border-[#E9EDF5] px-10 flex items-center justify-between relative">
      <div className="flex items-center gap-14">
        <h1 className="text-[24px] font-black text-[#2563EB]">FastX</h1>

        <div className="hidden md:flex items-center gap-10 text-[15px]">
          <button
            onClick={() => {
              navigate("/userHome", {
                state: "home",
              });
            }}
            className={state === "home" ? activeClass : normalClass}
          >
            Book
          </button>

          <button
            onClick={() => {
              navigate("/userHome", {
                state: "trip",
              });
            }}
            className={state === "trip" ? activeClass : normalClass}
          >
            Trips
          </button>

          <button
            onClick={() => {
              navigate("/userHome", {
                state: "settings",
              });
            }}
            className={state === "settings" ? activeClass : normalClass}
          >
            Profile
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
          }}
          className="relative w-11 h-11 rounded-2xl bg-[#F4F7FB] hover:bg-[#EEF2FF] transition-all flex items-center justify-center text-[#4B5563] hover:text-[#2563EB]"
        >
          <FaRegBell size={17} />

          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-[#2563EB] text-white text-[10px] flex items-center justify-center font-bold px-1">
              {unreadCount}
            </div>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="flex items-center gap-3 bg-[#F4F7FB] rounded-2xl px-3 py-2 hover:bg-[#EEF2FF] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm uppercase">
              {user.name?.charAt(0)}
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#111827]">
                {user.name}
              </p>

              <p className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
                Premium Member
              </p>
            </div>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-[72px] w-[220px] bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden z-50">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");

                  dispatch(logoutUser());

                  navigate("/login");
                }}
                className="w-full text-left px-5 py-4 hover:bg-[#F8FAFC] transition-all font-medium text-[#DC2626]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <NotificationPanel show={showNotifications} />
    </nav>
  );
}
