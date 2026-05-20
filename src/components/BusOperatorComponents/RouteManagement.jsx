import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AddRouteModal from "./AddRouteModal";

import { getAllRoutes, deleteRoute } from "../../services/routeService";

import {
  setRoutes,
  deleteRoute as removeRoute,
} from "../../redux/slices/routeSlice";
import toast from "react-hot-toast";

export default function RouteManagement() {
  const dispatch = useDispatch();

  const routes = useSelector((state) => state.routes.routes);

  const [showMenu, setShowMenu] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await getAllRoutes();

        dispatch(setRoutes(response.data));
      } catch (e) {
        console.log(e);
      }
    }

    fetchRoutes();
  }, []);

  const handleDeleteRoute = async (id) => {
    try {
      const response = await deleteRoute(id);
      console.log(response);
      if (response.success) {
        toast.success("Route Deleted!");
        dispatch(removeRoute(id));
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[52px] leading-none font-black text-[#111827]">
            Route Management
          </h1>

          <p className="text-[#6B7280] text-[16px] mt-4 max-w-[700px] leading-7">
            Manage operational routes and departure schedules.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRoute(null);

            setShowModal(true);
          }}
          className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all rounded-2xl px-7 py-4 flex items-center gap-3 font-semibold text-white"
        >
          <FaPlus />
          Add Route
        </button>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-[26px] font-black text-[#111827]">
            Route Directory
          </h2>
        </div>

        <div className="mt-8 overflow-visible rounded-2xl border border-[#EEF2F7]">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Route ID
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Origin
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Destination
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Departure
                </th>

                <th className="px-6 py-5" />
              </tr>
            </thead>

            <tbody>
              {routes.map((route, index) => (
                <tr key={index} className="border-t border-[#EEF2F7]">
                  <td className="px-6 py-6 font-bold text-[#111827]">
                    #{route.routeId}
                  </td>

                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {route.origin}
                  </td>

                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {route.destination}
                  </td>

                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {route.startDateTime.replace("T", " • ")}
                  </td>

                  <td className="px-6 py-6 text-right relative">
                    <button
                      onClick={() => {
                        setShowMenu(
                          showMenu === route.routeId ? null : route.routeId,
                        );
                      }}
                      className="text-[#6B7280] hover:text-[#111827]"
                    >
                      <FaEllipsisVertical />
                    </button>

                    {showMenu === route.routeId && (
                      <div className="absolute right-10 top-14 bg-white border border-[#E9EDF5] shadow-xl rounded-2xl overflow-hidden z-20 min-w-[160px]">
                        <button
                          onClick={() => {
                            setSelectedRoute(route);

                            setShowModal(true);

                            setShowMenu(null);
                          }}
                          className="w-full text-left px-5 py-4 hover:bg-[#F4F7FB] transition-all font-medium text-[#111827]"
                        >
                          Edit Route
                        </button>

                        <button
                          onClick={() => {
                            handleDeleteRoute(route.routeId);

                            setShowMenu(null);
                          }}
                          className="w-full text-left px-5 py-4 hover:bg-[#FEECEC] transition-all font-medium text-[#DC2626]"
                        >
                          Delete Route
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AddRouteModal
          setShowModal={setShowModal}
          selectedRoute={selectedRoute}
        />
      )}
    </div>
  );
}
