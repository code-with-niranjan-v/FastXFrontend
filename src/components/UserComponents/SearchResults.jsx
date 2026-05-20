import { FaArrowRightLong } from "react-icons/fa6";
import SearchResultCard from "./SearchResultCard";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { useState } from "react";

export default function SearchResults() {
  const location = useLocation();

  const { data = [], origin, destination, date } = location.state || {};

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    chargingPoint: false,

    blanket: false,

    waterBottle: false,

    tv: false,
  });
  console.log("Selected Date: ", date);
  const handleSelectSeat = (bus, time) => {
    navigate("/booking", {
      state: {
        data: bus,
        time: time,
        date: date,
      },
    });
  };

  const filteredBuses = data.filter((bus) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      bus.name?.toLowerCase().includes(searchValue) ||
      bus.busType?.toLowerCase().includes(searchValue);

    const matchesFilters =
      (!filters.chargingPoint || bus.chargingPoint) &&
      (!filters.blanket || bus.blanket) &&
      (!filters.waterBottle || bus.waterBottle) &&
      (!filters.tv || bus.tv);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB]">
      <UserNavbar />

      <div className="max-w-[1450px] mx-auto px-10 py-10">
        <div>
          <div className="flex items-center gap-5">
            <h1 className="text-[62px] leading-none font-black text-[#111827]">
              {origin}
            </h1>

            <div className="text-[#2563EB] text-[34px]">
              <FaArrowRightLong />
            </div>

            <h1 className="text-[62px] leading-none font-black text-[#111827]">
              {destination}
            </h1>
          </div>

          <div className="flex items-center gap-12 mt-6">
            <div>
              <p className="text-[10px] uppercase tracking-[4px] text-[#374151] font-bold">
                Departure Date
              </p>

              <p className="text-[#2563EB] font-bold text-[18px] mt-2">
                {date}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[4px] text-[#374151] font-bold">
                Passengers
              </p>

              <p className="text-[#2563EB] font-bold text-[18px] mt-2">
                01 Traveler
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[30px] border border-[#E9EDF5] p-7 mt-12">
          <div className="flex items-center justify-between gap-8">
            <input
              type="text"
              placeholder="Search by bus name or type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="flex-1 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4 outline-none focus:border-[#2563EB]"
            />

            <div className="flex items-center gap-5 flex-wrap">
              <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <input
                  type="checkbox"
                  checked={filters.chargingPoint}
                  onChange={() => {
                    setFilters({
                      ...filters,

                      chargingPoint: !filters.chargingPoint,
                    });
                  }}
                />
                Charging Point
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <input
                  type="checkbox"
                  checked={filters.blanket}
                  onChange={() => {
                    setFilters({
                      ...filters,

                      blanket: !filters.blanket,
                    });
                  }}
                />
                Blanket
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <input
                  type="checkbox"
                  checked={filters.waterBottle}
                  onChange={() => {
                    setFilters({
                      ...filters,

                      waterBottle: !filters.waterBottle,
                    });
                  }}
                />
                Water Bottle
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                <input
                  type="checkbox"
                  checked={filters.tv}
                  onChange={() => {
                    setFilters({
                      ...filters,

                      tv: !filters.tv,
                    });
                  }}
                />
                TV
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <p className="text-[12px] tracking-[3px] uppercase font-bold text-[#374151]">
            {filteredBuses.length}
            {" Results Found"}
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((b, index) => {
              return (
                <SearchResultCard
                  key={index}
                  operator={b.name}
                  price={b.fare}
                  highlighted={index % 2 === 0}
                  time={b.route.startDateTime.split("T")[1].slice(0, 5)}
                  handleSelectSeat={handleSelectSeat}
                  data={b}
                  seats={Math.floor(Math.random() * 30) + 1}
                />
              );
            })
          ) : (
            <div className="bg-white rounded-[30px] border border-[#E9EDF5] py-20 flex flex-col items-center justify-center">
              <div className="text-6xl">🚌</div>

              <h2 className="text-[32px] font-black text-[#111827] mt-6">
                No Buses Found
              </h2>

              <p className="text-[#6B7280] mt-3">
                Try changing filters or search keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
