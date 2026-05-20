import Profile from "../../assets/Profile.png";
import { FiEdit2 } from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addMoneyToWallet } from "../../services/userService";
import { updateWallet } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

import { updateProfile, updatePassword } from "../../services/userService";

import { setUser } from "../../redux/slices/userSlice";
export default function UserProfile() {
  const user = useSelector((state) => state.user);
  const [amt, setAmt] = useState(0);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    name: user.name || "",

    email: user.email || "",

    phoneNumber: user.phoneNumber || "",

    address: user.address || "",

    gender: user.gender || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",

    newPassword: "",

    confirmPassword: "",
  });
  const handleWallet = async () => {
    const res = await addMoneyToWallet(amt);
    if (res.status == 200) {
      alert("Wallet Updated!");
      dispatch(updateWallet(amt));
    }
  };
  console.log("wallet: ", user);
  const handleProfileUpdate = async () => {
    const res = await updateProfile(profileData);

    if (res.success) {
      dispatch(
        setUser({
          ...user,
          ...profileData,
        }),
      );

      localStorage.setItem(
        "user",

        JSON.stringify({
          ...user,
          ...profileData,
        }),
      );

      toast.success("Profile Updated!");
    } else {
      toast.error(res.message);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    const res = await updatePassword(passwordData);

    if (res.success) {
      toast.success("Password Updated!");

      setPasswordData({
        currentPassword: "",

        newPassword: "",

        confirmPassword: "",
      });
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#F5F7FB] px-10 py-12">
      <div>
        <h1 className="text-[64px] leading-[65px] font-black text-[#111827]">
          Profile Settings
        </h1>

        <p className="text-[#6B7280] text-[18px] mt-5 max-w-[700px]">
          Manage your kinetic travel experience, update security credentials,
          and oversee your digital transit assets.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 mt-14">
        <div className="flex flex-col gap-8">
          <div className="bg-[#F7F9FC] border border-[#E8EDF5] rounded-[30px] p-8">
            <div>
              <p className="text-[12px] uppercase tracking-[3px] text-[#2563EB] font-bold">
                Security & Identity
              </p>

              <h2 className="text-[24px] font-bold text-[#111827] mt-3">
                Account Information
              </h2>
            </div>

            <div className="flex items-center gap-5 mt-10">
              <div className="relative">
                <div className="w-[95px] h-[95px] rounded-2xl bg-[#2563EB] text-white flex items-center justify-center text-[38px] font-black uppercase">
                  {user.name?.charAt(0)}
                </div>

                <button className="absolute -bottom-2 -right-2 bg-[#2563EB] text-white p-2 rounded-xl shadow-md">
                  <FiEdit2 size={14} />
                </button>
              </div>

              <div>
                <h3 className="text-[26px] font-bold text-[#111827]">
                  {user.name}
                </h3>

                <p className="text-[#6B7280] mt-1">Premium Member</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div>
                <label className="text-sm font-medium text-[#4B5563]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,

                      name: e.target.value,
                    });
                  }}
                  className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4B5563]">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,

                      phoneNumber: e.target.value,
                    });
                  }}
                  className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-[#4B5563]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,

                      email: e.target.value,
                    });
                  }}
                  className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={handleProfileUpdate}
                className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all text-white font-semibold px-8 py-4 rounded-2xl shadow-md"
              >
                Update Account
              </button>
            </div>

            <div className="mt-16">
              <h2 className="text-[24px] font-bold text-[#111827]">
                Password Management
              </h2>

              <div className="mt-8">
                <label className="text-sm font-medium text-[#4B5563]">
                  Current Password
                </label>

                <input
                  type="password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => {
                    setPasswordData({
                      ...passwordData,

                      currentPassword: e.target.value,
                    });
                  }}
                  placeholder="••••••••"
                  className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label className="text-sm font-medium text-[#4B5563]">
                    New Password
                  </label>

                  <input
                    value={passwordData.newPassword}
                    onChange={(e) => {
                      setPasswordData({
                        ...passwordData,

                        newPassword: e.target.value,
                      });
                    }}
                    type="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#4B5563]">
                    Confirm New Password
                  </label>

                  <input
                    value={passwordData.confirmPassword}
                    onChange={(e) => {
                      setPasswordData({
                        ...passwordData,

                        confirmPassword: e.target.value,
                      });
                    }}
                    type="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-3 bg-[#EEF2F7] border border-[#E5EAF3] rounded-2xl px-5 py-4 outline-none text-[#111827] font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  onClick={handlePasswordUpdate}
                  className="bg-[#2563EB] hover:bg-[#1E4FD8] transition-all text-white font-semibold px-8 py-4 rounded-2xl shadow-md"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#111827] to-[#0F172A] rounded-[30px] p-8 text-white h-fit self-start">
          <div>
            <div className="flex items-center gap-3">
              <FaWallet className="text-[#2563EB]" />

              <p className="uppercase tracking-[3px] text-sm font-semibold">
                FastX Wallet
              </p>
            </div>

            <div className="mt-14">
              <p className="uppercase tracking-[3px] text-sm text-white/60 font-semibold">
                Current Balance
              </p>

              <h1 className="text-[72px] leading-[75px] font-black mt-4">
                ₹{user.wallet}
                <span className="text-[#2563EB] text-[32px]"></span>
              </h1>
            </div>
          </div>

          <div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <p className="uppercase tracking-[3px] text-sm text-white/70 font-semibold">
                Amount To Add
              </p>

              <div className="flex items-center gap-4 mt-5">
                <p className="text-2xl font-bold">₹</p>

                <input
                  type="text"
                  placeholder="0.00"
                  value={amt}
                  onChange={(e) => {
                    setAmt(e.target.value);
                  }}
                  className="bg-transparent outline-none text-[30px] font-bold w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <button
                onClick={() => {
                  setAmt(amt + 50);
                }}
                className="bg-white/10 hover:bg-white/20 transition-all rounded-2xl py-4 font-semibold"
              >
                +₹50
              </button>

              <button
                onClick={() => {
                  setAmt(amt + 100);
                }}
                className="bg-white/10 hover:bg-white/20 transition-all rounded-2xl py-4 font-semibold"
              >
                +₹100
              </button>

              <button
                onClick={() => {
                  setAmt(amt + 500);
                }}
                className="bg-white/10 hover:bg-white/20 transition-all rounded-2xl py-4 font-semibold"
              >
                +₹500
              </button>
            </div>

            <button
              onClick={handleWallet}
              className="w-full mt-6 bg-[#2563EB] hover:bg-[#1E4FD8] transition-all rounded-2xl py-5 font-semibold flex items-center justify-center gap-3 shadow-lg"
            >
              Add Money to Wallet
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
