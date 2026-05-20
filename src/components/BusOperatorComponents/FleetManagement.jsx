import { useEffect, useState } from "react";
import { FaBus, FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteBus, getAllBuses } from "../../services/operatorService";
import {
  setAllBuses,
  deleteBusRedux,
} from "../../redux/slices/operatorBusSlice";
import AddBusModal from "./AddBusModal";
import AddRouteModal from "./AddRouteModal";
import toast from "react-hot-toast";
export default function FleetManagement() {
  const buses = useSelector((state) => state.operatorBuses.buses);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const handleDeleteBus = async (id) => {
    const res = await deleteBus(id);

    if (res.success) {
      dispatch(deleteBusRedux(id));

      toast.success("Bus Deleted!");
    } else {
      toast.error(res.message);
    }
  };

  const calculateActiveBuses = () => {
    let active = 0;
    let idle = 0;
    let maintenance = 0;
    for (let bus of buses) {
      if (bus.status == "ON ROUTE") {
        active++;
      } else if (bus.status == "ON MAINTENANCE") {
        maintenance++;
      } else {
        idle++;
      }
    }
    return { active, idle, maintenance };
  };
  const { active, idle, maintenance } = calculateActiveBuses();
  const filteredBuses = buses.filter((bus) => {
    const searchText = search.toLowerCase();

    return (
      bus.busId.toString().includes(searchText) ||
      bus.name.toLowerCase().includes(searchText) ||
      bus.busNumber.toLowerCase().includes(searchText) ||
      bus.busType.toLowerCase().includes(searchText)
    );
  });
  useEffect(() => {
    async function loadBuses() {
      const data = await getAllBuses();

      dispatch(setAllBuses(data.data));
      console.log("data: ", data.data);
    }
    loadBuses();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[52px] leading-none font-black text-[#111827]">
            Fleet Asset Inventory
          </h1>

          <p className="text-[#6B7280] text-[16px] mt-4 max-w-[700px] leading-7">
            Manage your high-velocity fleet, monitor maintenance cycles, and
            optimize vehicle deployment across active routes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setShowRouteModal(true);
            }}
            className="bg-[#E9EDF5] hover:bg-[#DDE3EE] transition-all rounded-2xl px-7 py-4 flex items-center gap-3 font-semibold text-[#374151]"
          >
            <FaPlus />
            Create New Route
          </button>

          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all rounded-2xl px-7 py-4 flex items-center gap-3 font-semibold text-white"
          >
            <FaBus />
            Add New Bus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Total Fleet
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {buses.length}
          </h1>

          <p className="text-[#2563EB] font-semibold mt-2">Units</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            On Route
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {active}
          </h1>

          <p className="text-[#2563EB] font-semibold mt-2">
            {Math.round((active / buses.length) * 100)}%
          </p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Idle Assets
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {active}
          </h1>

          <p className="text-[#16A34A] font-semibold mt-2">Ready</p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6">
          <p className="text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
            Maintenance
          </p>

          <h1 className="text-[48px] leading-none font-black text-[#111827] mt-4">
            {maintenance}
          </h1>

          <p className="text-[#EA580C] font-semibold mt-2">Alert</p>
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[26px] font-black text-[#111827]">
            Active Inventory
          </h2>

          <div className="flex items-center gap-4">
            <div className="bg-[#F4F7FB] border border-[#E9EDF5] rounded-2xl px-5 py-3 w-[320px]">
              <input
                type="text"
                placeholder="Search by ID, name, plate no, type..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="bg-transparent w-full outline-none text-[#111827] placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-visible rounded-2xl border border-[#EEF2F7]">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Bus ID
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Plate Number
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Service Class
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Status
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Last Route
                </th>

                <th className="px-6 py-5" />
              </tr>
            </thead>

            <tbody>
              {filteredBuses.map((bus, index) => (
                <tr key={index} className="border-t border-[#EEF2F7]">
                  <td className="px-6 py-6 font-bold text-[#111827]">
                    {bus.busId}
                  </td>

                  <td className="px-6 py-6">
                    <span className="bg-[#F4F7FB] px-4 py-2 rounded-lg text-[#374151] font-medium">
                      {bus.busNumber}
                    </span>
                  </td>

                  <td className="px-6 py-6 text-[#374151] font-medium">
                    {bus.busType}
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          bus.status === "ON ROUTE"
                            ? "bg-[#2563EB]"
                            : bus.status === "IDLE"
                              ? "bg-[#6B7280]"
                              : "bg-[#EA580C]"
                        }`}
                      />

                      <p className={`font-bold text-sm ${bus.statusColor}`}>
                        {bus.status}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-6 text-[#374151] font-medium">
                    {bus.route.origin} → {bus.route.destination}
                  </td>

                  <td className="px-6 py-6 text-right relative">
                    <button
                      onClick={() => {
                        setShowMenu(showMenu === bus.busId ? null : bus.busId);
                      }}
                      className="text-[#6B7280] hover:text-[#111827] transition-all"
                    >
                      <FaEllipsisVertical />
                    </button>

                    {showMenu === bus.busId && (
                      <div className="absolute right-10 top-14 bg-white border border-[#E9EDF5] shadow-xl rounded-2xl overflow-hidden z-20 min-w-[160px]">
                        <button
                          onClick={() => {
                            setSelectedBus(bus);

                            setShowModal(true);

                            setShowMenu(null);
                          }}
                          className="w-full text-left px-5 py-4 hover:bg-[#F4F7FB] transition-all font-medium text-[#111827]"
                        >
                          Edit Bus
                        </button>

                        <button
                          onClick={() => {
                            handleDeleteBus(bus.busId);
                          }}
                          className="w-full text-left px-5 py-4 hover:bg-[#FEECEC] transition-all font-medium text-[#DC2626]"
                        >
                          Delete Bus
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
        <AddBusModal setShowModal={setShowModal} selectedBus={selectedBus} />
      )}
      {showRouteModal && <AddRouteModal setShowModal={setShowRouteModal} />}
    </div>
  );
}
