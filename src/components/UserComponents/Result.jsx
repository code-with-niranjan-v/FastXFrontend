import TripResultCard from "./TripResultCard";

export default function Result() {
  return (
    <div className="w-full">
      <div className="p-3">
        <h1 className="font-bold text-[#191C23] text-[36px]">
          12 Trips Available
        </h1>
        <p className="text-[#414754]">
          Showing results for San Francisco to Los Angeles
        </p>
      </div>
      <div className="mr-10 flex flex-col gap-3">
        <TripResultCard />
        <TripResultCard />
        <TripResultCard />
      </div>
    </div>
  );
}
