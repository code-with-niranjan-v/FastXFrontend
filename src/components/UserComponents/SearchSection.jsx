import SearchBar from "./SearchBar";

export default function SearchSection() {
  return (
    <section>
      <h1 className="text-[60px] leading-[65px] font-black text-[#111827]">
        Where to <span className="text-[#2563EB] italic">next?</span>
      </h1>

      <p className="text-[#6B7280] mt-3 text-lg">
        Your next journey starts here.
      </p>

      <div className="mt-10">
        <SearchBar />
      </div>
    </section>
  );
}
