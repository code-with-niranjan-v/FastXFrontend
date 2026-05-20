export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E7EBF3] px-10 py-8 mt-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        <div>
          <h1 className="text-[22px] font-black text-[#2563EB]">
            FastX
          </h1>

          <p className="text-sm text-[#6B7280] mt-2">
            © 2024 FastX Transit.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm text-[#6B7280] font-medium">
          <button>Privacy Policy</button>
          <button>Terms</button>
          <button>Sustainability</button>
          <button>Careers</button>
        </div>
      </div>
    </footer>
  );
}