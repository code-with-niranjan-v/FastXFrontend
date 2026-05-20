import { useDispatch, useSelector } from "react-redux";
import { markAsRead } from "../../redux/slices/notificationSlice.js";
import { FaBus } from "react-icons/fa6";

export default function NotificationPanel({ show }) {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notification.notifications,
  );

  if (!show) return null;

  return (
    <div className="absolute top-[85px] right-8 w-[420px] bg-white border border-[#E5E7EB] rounded-[28px] shadow-2xl overflow-hidden z-50">
      <div className="px-6 py-5 border-b border-[#EEF2F7]">
        <h2 className="text-[24px] font-black text-[#111827]">Notifications</h2>

        <p className="text-sm text-[#6B7280] mt-1">
          Recent activity and booking updates
        </p>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                dispatch(markAsRead(n.id));
              }}
              className={`px-6 py-5 border-b border-[#F3F4F6] cursor-pointer hover:bg-[#F8FAFC] transition-all ${
                !n.read ? "bg-[#EEF4FF]" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center">
                  <FaBus />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111827]">{n.title}</h3>

                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    )}
                  </div>

                  <p className="text-[#6B7280] text-sm mt-2 leading-6">
                    {n.message}
                  </p>

                  <p className="text-xs text-[#9CA3AF] mt-3">{n.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[220px] flex items-center justify-center text-[#9CA3AF] font-medium">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
}
