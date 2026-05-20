import { useSearchParams } from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const res = await fetch("http://localhost:8080/api/user/reset-password", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        token,
        newPassword: password,
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
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-8 bg-[#F4F7FB] border border-[#E5E7EB] rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={handleReset}
          className="w-full mt-6 bg-[#2563EB] hover:bg-[#1E4FD8] text-white rounded-2xl py-4 font-bold"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
