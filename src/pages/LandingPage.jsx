import {
  FaArrowRightLong,
  FaBusSimple,
  FaShieldHalved,
  FaWifi,
  FaBolt,
} from "react-icons/fa6";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

export default function LandingPage() {
  const destinations = [
    {
      name: "Chennai",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const features = [
    {
      title: "Smart Booking",
      desc: "Real-time seat availability with lightning-fast reservations.",
      icon: <FaBolt />,
    },
    {
      title: "Premium Comfort",
      desc: "Luxury buses equipped with AC, charging ports and sleeper seats.",
      icon: <FaBusSimple />,
    },
    {
      title: "Safe Travel",
      desc: "Verified operators and live trip tracking for secure journeys.",
      icon: <FaShieldHalved />,
    },
    {
      title: "Onboard WiFi",
      desc: "Stay connected during your journey with high-speed internet.",
      icon: <FaWifi />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB] overflow-x-hidden">
      <nav className="w-full h-[90px] flex items-center justify-between px-10 xl:px-20 bg-white border-b border-[#E9EDF5]">
        <div className="flex items-center gap-14">
          <h1 className="text-[34px] font-black text-[#2563EB]">FastX</h1>

          <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-[#6B7280]">
            <a href="#features">Features</a>
            <a href="#destinations">Destinations</a>
            <a href="#services">Services</a>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/login" className="text-[#374151] font-semibold">
            Sign In
          </Link>

          <Link
            to="/signup"
            className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all text-white px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="px-10 xl:px-20 pt-16 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="bg-[#EEF4FF] text-[#2563EB] inline-flex px-4 py-2 rounded-full text-sm font-bold tracking-wide">
              NEXT GENERATION TRANSIT
            </div>

            <h1 className="text-[72px] leading-[78px] font-black text-[#111827] mt-8">
              The Future of
              <span className="text-[#2563EB] block">Bus Travel</span>
              Starts Here.
            </h1>

            <p className="text-[#6B7280] text-[18px] leading-8 mt-8 max-w-[620px]">
              Experience seamless booking, real-time tracking and premium travel
              comfort with FastX — the intelligent transport platform built for
              modern travelers.
            </p>

            <div className="flex items-center gap-5 mt-12">
              <Link
                to="/signup"
                className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-3"
              >
                Start Booking
                <FaArrowRightLong />
              </Link>

              <button className="bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-all px-8 py-5 rounded-2xl font-bold text-[#374151]">
                Explore Routes
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">
              <div className="bg-white rounded-2xl p-5 border border-[#EEF2F7]">
                <h2 className="text-[34px] font-black text-[#111827]">250+</h2>

                <p className="text-[#6B7280] mt-2">Daily Trips</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EEF2F7]">
                <h2 className="text-[34px] font-black text-[#111827]">50K+</h2>

                <p className="text-[#6B7280] mt-2">Travelers</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EEF2F7]">
                <h2 className="text-[34px] font-black text-[#111827]">120+</h2>

                <p className="text-[#6B7280] mt-2">Premium Buses</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#2563EB] blur-[120px] opacity-20 rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1400&auto=format&fit=crop"
              alt="bus"
              className="relative rounded-[40px] shadow-2xl border border-[#E9EDF5]"
            />
          </motion.div>
        </div>
      </section>

      <section id="features" className="px-10 xl:px-20 py-24 bg-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#2563EB] font-black tracking-[3px] uppercase text-sm">
              WHY FASTX
            </p>

            <h1 className="text-[58px] leading-[64px] font-black text-[#111827] mt-5">
              Intelligent Travel.
              <br />
              Elevated Experience.
            </h1>
          </div>

          <p className="text-[#6B7280] max-w-[400px] leading-8">
            Designed for next-generation mobility with advanced booking, secure
            payment systems and operator-grade fleet management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className={`rounded-[30px] p-8 border transition-all ${
                index === 1
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "bg-[#F8FAFC] border-[#EEF2F7]"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                  index === 1
                    ? "bg-white text-[#2563EB]"
                    : "bg-[#EEF4FF] text-[#2563EB]"
                }`}
              >
                {feature.icon}
              </div>

              <h2 className="text-[26px] font-black mt-8">{feature.title}</h2>

              <p
                className={`leading-8 mt-5 ${
                  index === 1 ? "text-[#E0E7FF]" : "text-[#6B7280]"
                }`}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="destinations" className="px-10 xl:px-20 py-24">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#2563EB] font-black tracking-[3px] uppercase text-sm">
              POPULAR ROUTES
            </p>

            <h1 className="text-[58px] font-black text-[#111827] mt-5">
              Explore Top Destinations
            </h1>
          </div>

          <button className="bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-all px-7 py-4 rounded-2xl font-bold text-[#374151]">
            View All Routes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="relative overflow-hidden rounded-[32px] group"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-[460px] object-cover group-hover:scale-110 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="text-[#D1D5DB] uppercase tracking-[3px] text-sm">
                  Premium Route
                </p>

                <h2 className="text-white text-[38px] font-black mt-3">
                  {destination.name}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-[#E9EDF5] px-10 xl:px-20 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-[34px] font-black text-[#2563EB]">FastX</h1>

            <p className="text-[#6B7280] leading-8 mt-5">
              Building the future of intelligent transport and premium intercity
              mobility.
            </p>
          </div>

          <div>
            <h3 className="font-black text-[#111827]">Platform</h3>

            <div className="flex flex-col gap-4 mt-6 text-[#6B7280]">
              <a href="#">Book Tickets</a>
              <a href="#">Fleet Tracking</a>
              <a href="#">Operators</a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#111827]">Company</h3>

            <div className="flex flex-col gap-4 mt-6 text-[#6B7280]">
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#111827]">Support</h3>

            <div className="flex flex-col gap-4 mt-6 text-[#6B7280]">
              <a href="#">Help Center</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E5E7EB] my-12" />

        <div className="flex items-center justify-between">
          <p className="text-[#9CA3AF]">© 2026 FastX. All rights reserved.</p>

          <p className="text-[#9CA3AF]">Designed for modern mobility.</p>
        </div>
      </footer>
    </div>
  );
}
