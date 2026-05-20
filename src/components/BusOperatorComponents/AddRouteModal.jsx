import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { addRoute } from "../../services/routeService";
import { addRouteRedux, updateRoute } from "../../redux/slices/routeSlice";
import { updateRouteData } from "../../services/routeService";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function AddRouteModal({ setShowModal, selectedRoute }) {
  const dispatch = useDispatch();
  const [routeData, setRouteData] = useState(
    selectedRoute || {
      origin: "",
      destination: "",
      startDateTime: "",
    },
  );

  const handleAddRoute = async () => {
    const res = await addRoute(routeData);

    console.log(res);

    if (res.success) {
      dispatch(addRouteRedux(res.data));

      toast.success("Route Added!");
    } else {
      toast.error(res.message);
    }

    setShowModal(false);
  };

  const handleUpdateRoute = async () => {
    console.log(routeData);
    try {
      const response = await updateRouteData(selectedRoute.routeId, routeData);
      console.log(response);
      if (response.success) {
        dispatch(updateRoute(response.data));

        setShowModal(false);
      }
    } catch (e) {
      console.log(e);
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[700px] rounded-[32px] p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[34px] font-black text-[#111827]">
              {selectedRoute ? "Edit Route" : "Add New Route"}
            </h1>

            <p className="text-[#6B7280] mt-2">
              Configure journey route information
            </p>
          </div>

          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="w-12 h-12 rounded-2xl bg-[#F4F7FB] flex items-center justify-center text-[#6B7280]"
          >
            <FaXmark />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-10">
          <div>
            <p className="text-[13px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mb-3">
              Origin
            </p>

            <input
              type="text"
              placeholder="Enter origin city"
              value={routeData.origin}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  origin: e.target.value,
                });
              }}
              className="w-full bg-[#F4F7FB] rounded-2xl px-6 py-5 outline-none text-[#111827]"
            />
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mb-3">
              Destination
            </p>

            <input
              type="text"
              placeholder="Enter destination city"
              value={routeData.destination}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  destination: e.target.value,
                });
              }}
              className="w-full bg-[#F4F7FB] rounded-2xl px-6 py-5 outline-none text-[#111827]"
            />
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-[3px] text-[#9CA3AF] font-bold mb-3">
              Departure Date & Time
            </p>

            <input
              type="datetime-local"
              value={routeData.startDateTime}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  startDateTime: e.target.value,
                });
              }}
              className="w-full bg-[#F4F7FB] rounded-2xl px-6 py-5 outline-none text-[#111827]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="bg-[#F4F7FB] hover:bg-[#E9EDF5] transition-all px-8 py-4 rounded-2xl font-semibold text-[#374151]"
          >
            Cancel
          </button>

          <button
            onClick={selectedRoute ? handleUpdateRoute : handleAddRoute}
            className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all px-8 py-4 rounded-2xl font-semibold text-white"
          >
            {selectedRoute ? "Update Route" : "Add Route"}
          </button>
        </div>
      </div>
    </div>
  );
}
