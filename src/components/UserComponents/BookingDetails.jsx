export default function BookinDetails({
  busName,
  busNumber,
  time,
  destination,
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[4px] text-[#2563EB] font-bold">
        Express Route
      </p>

      <h1 className="text-[58px] leading-none font-black text-[#111827] mt-4">
        Chennai to {destination}
      </h1>

      <p className="text-[#4B5563] text-[18px] mt-5">
        Volvo B11R Multi-Axle AC Sleeper Premium Class
      </p>
    </div>
  );
}
