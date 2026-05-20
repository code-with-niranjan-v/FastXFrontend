import { useState } from "react";

import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8080/api/user/forgot-password", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB]">
      <div className="bg-white rounded-[30px] p-10 w-[500px] border border-[#E9EDF5]">
        <h1 className="text-[38px] font-black text-[#111827]">
          Forgot Password
        </h1>

        <p className="text-[#6B7280] mt-3">
          Enter your email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-8 bg-[#F4F7FB] border border-[#E5E7EB] rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#2563EB] hover:bg-[#1E4FD8] text-white rounded-2xl py-4 font-bold"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
