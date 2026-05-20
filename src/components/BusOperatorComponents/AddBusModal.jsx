import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { addBus, updateBus } from "../../services/operatorService";
import { useDispatch } from "react-redux";

import {
  addBusRedux,
  updateBusRedux,
} from "../../redux/slices/operatorBusSlice";

import toast from "react-hot-toast";
export default function AddBusModal({ setShowModal, selectedBus }) {
  const [busData, setBusData] = useState(
    selectedBus || {
      name: "",
      busNumber: "",
      busType: "",
      noOfSeats: "",
      fare: "",
      waterBottle: false,
      blanket: false,
      chargingPoint: false,
      tv: false,
      status: "ON ROUTE",
      route: {
        routeId: "",
      },
    },
  );
  const handleAddBus = async () => {
    const res = await addBus(busData);

    if (res.success) {
      dispatch(addBusRedux(res.data));

      toast.success("Bus added successfully");

      setShowModal(false);
    } else {
      toast.error(res.message);
    }
  };
  const dispatch = useDispatch();
  const handleUpdateBus = async () => {
    const res = await updateBus(busData.busId, busData);

    if (res.success) {
      dispatch(updateBusRedux(res.data));

      toast.success("Bus updated successfully");

      setShowModal(false);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[850px] rounded-[32px] p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[34px] font-black text-[#111827]">
              {selectedBus ? "Edit Bus" : "Add New Bus"}
            </h1>

            <p className="text-[#6B7280] mt-2">Register a new fleet vehicle</p>
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

        <div className="grid grid-cols-2 gap-6 mt-10">
          <input
            placeholder="Bus Name"
            value={busData.name}
            onChange={(e) => {
              setBusData({
                ...busData,
                name: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />

          <input
            placeholder="Bus Number"
            value={busData.busNumber}
            onChange={(e) => {
              setBusData({
                ...busData,
                busNumber: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />

          <input
            placeholder="Bus Type"
            value={busData.busType}
            onChange={(e) => {
              setBusData({
                ...busData,
                busType: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="No Of Seats"
            value={busData.noOfSeats}
            onChange={(e) => {
              setBusData({
                ...busData,
                noOfSeats: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Fare"
            value={busData.fare}
            onChange={(e) => {
              setBusData({
                ...busData,
                fare: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />

          <select
            value={busData.status}
            onChange={(e) => {
              setBusData({
                ...busData,
                status: e.target.value,
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          >
            <option>ON ROUTE</option>

            <option>ON MAINTENANCE</option>

            <option>IDLE</option>
          </select>

          <input
            type="number"
            placeholder="Route ID"
            value={busData.route.routeId}
            onChange={(e) => {
              setBusData({
                ...busData,

                route: {
                  routeId: e.target.value,
                },
              });
            }}
            className="bg-[#F4F7FB] rounded-2xl px-5 py-4 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-8">
          <label className="bg-[#F4F7FB] rounded-2xl p-5 flex items-center justify-between">
            <p className="font-semibold text-[#111827]">Water Bottle</p>

            <input
              type="checkbox"
              checked={busData.waterBottle}
              onChange={(e) => {
                setBusData({
                  ...busData,
                  waterBottle: e.target.checked,
                });
              }}
            />
          </label>

          <label className="bg-[#F4F7FB] rounded-2xl p-5 flex items-center justify-between">
            <p className="font-semibold text-[#111827]">Blanket</p>

            <input
              type="checkbox"
              checked={busData.blanket}
              onChange={(e) => {
                setBusData({
                  ...busData,
                  blanket: e.target.checked,
                });
              }}
            />
          </label>

          <label className="bg-[#F4F7FB] rounded-2xl p-5 flex items-center justify-between">
            <p className="font-semibold text-[#111827]">Charging Point</p>

            <input
              type="checkbox"
              checked={busData.chargingPoint}
              onChange={(e) => {
                setBusData({
                  ...busData,
                  chargingPoint: e.target.checked,
                });
              }}
            />
          </label>

          <label className="bg-[#F4F7FB] rounded-2xl p-5 flex items-center justify-between">
            <p className="font-semibold text-[#111827]">TV</p>

            <input
              type="checkbox"
              checked={busData.tv}
              onChange={(e) => {
                setBusData({
                  ...busData,
                  tv: e.target.checked,
                });
              }}
            />
          </label>
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
            onClick={selectedBus ? handleUpdateBus : handleAddBus}
            className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all px-8 py-4 rounded-2xl font-semibold text-white"
          >
            {selectedBus ? "Update Bus" : "Add Bus"}
          </button>
        </div>
      </div>
    </div>
  );
}
