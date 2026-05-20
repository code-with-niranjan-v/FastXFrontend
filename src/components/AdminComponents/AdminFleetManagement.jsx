import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaBus, FaPlus, FaEllipsisVertical } from "react-icons/fa6";

import toast from "react-hot-toast";

import { getAllBusesAdmin } from "../../services/adminService";

import { deleteBus } from "../../services/operatorService";

import {
  setAdminBuses,
  removeAdminBus,
} from "../../redux/slices/adminBusSlice";

import AddBusModal from "../BusOperatorComponents/AddBusModal";

export default function AdminFleetManagement() {
  const dispatch = useDispatch();

  const buses = useSelector((state) => state.adminBuses.buses) || [];

  const [showMenu, setShowMenu] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    async function loadBuses() {
      const data = await getAllBusesAdmin();

      dispatch(setAdminBuses(data.data || []));
    }

    loadBuses();
  }, []);

  const handleDeleteBus = async (id) => {
    const res = await deleteBus(id);

    if (res.success) {
      dispatch(removeAdminBus(id));

      toast.success("Bus Deleted!");
    } else {
      toast.error(res.message);
    }
  };
  const [search, setSearch] = useState("");
  const filteredBuses = buses.filter((bus) => {
    const value = search.toLowerCase();

    return (
      bus.name?.toLowerCase().includes(value) ||
      bus.busNumber?.toLowerCase().includes(value) ||
      bus.busType?.toLowerCase().includes(value) ||
      bus.route?.origin?.toLowerCase().includes(value) ||
      bus.route?.destination?.toLowerCase().includes(value) ||
      String(bus.busId).includes(value)
    );
  });
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[56px] font-black text-[#111827] leading-none">
            Fleet Management
          </h1>

          <p className="text-[#6B7280] mt-4 max-w-[700px] leading-7">
            Monitor and manage all fleet assets across the platform.
          </p>
        </div>

        <div className="w-[380px]">
          <input
            type="text"
            placeholder="Search by id, name, plate number, type..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-5 py-4 outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-8 mt-10">
        <div className="overflow-visible rounded-2xl border border-[#EEF2F7]">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Bus Id
                </th>
                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Bus
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Plate Number
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Route
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Fare
                </th>

                <th className="text-left px-6 py-5 text-[11px] uppercase tracking-[3px] text-[#9CA3AF] font-bold">
                  Status
                </th>

                <th className="px-6 py-5" />
              </tr>
            </thead>

            <tbody>
              {filteredBuses.map((bus, index) => (
                <tr key={index} className="border-t border-[#EEF2F7]">
                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {bus.busId}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] text-xl">
                        <FaBus />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#111827]">{bus.name}</h3>

                        <p className="text-[#9CA3AF] text-sm mt-1">
                          {bus.busType}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {bus.busNumber}
                  </td>

                  <td className="px-6 py-6 font-medium text-[#374151]">
                    {bus.route?.origin}
                    {" → "}
                    {bus.route?.destination}
                  </td>

                  <td className="px-6 py-6 font-black text-[#111827]">
                    ₹{bus.fare}
                  </td>

                  <td className="px-6 py-6">
                    <span className="bg-[#EEF4FF] text-[#2563EB] px-4 py-2 rounded-xl text-sm font-bold">
                      {bus.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
