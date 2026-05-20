import userImg from "../../assets/user.png";
import busImg from "../../assets/bus.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import toast from "react-hot-toast";
export default function RegisterForm({ user }) {
  const [isOperator, setOperator] = useState(false);
  const handleRegister = () => {
    if (!user.name.trim()) {
      toast.error("Full name is required");

      return;
    }

    if (!user.gender.trim()) {
      toast.error("Gender is required");

      return;
    }

    if (!user.email.trim()) {
      toast.error("Email is required");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      toast.error("Enter valid email address");

      return;
    }

    if (!user.phoneNumber.trim()) {
      toast.error("Phone number is required");

      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(user.phoneNumber)) {
      toast.error("Phone number must contain 10 digits");

      return;
    }

    if (!user.password.trim()) {
      toast.error("Password is required");

      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    if (!user.address.trim()) {
      toast.error("Address is required");

      return;
    }

    if (!user.city.trim()) {
      toast.error("City is required");

      return;
    }

    if (!user.state.trim()) {
      toast.error("State is required");

      return;
    }

    if (!user.zip.trim()) {
      toast.error("ZIP code is required");

      return;
    }

    const zipRegex = /^[0-9]{6}$/;

    if (!zipRegex.test(user.zip)) {
      toast.error("ZIP code must contain 6 digits");

      return;
    }

    const toastId = toast.loading("Creating account...");

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: user.name,

        email: user.email,

        password: user.password,

        address:
          user.address +
          ", " +
          user.city +
          ", " +
          user.state +
          " - " +
          user.zip,

        gender: user.gender,

        wallet: 1000,

        role: isOperator ? "OPERATOR" : "USER",

        phoneNumber: user.phoneNumber,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        if (data.success) {
          toast.success("Registration successful", {
            id: toastId,
          });
        } else {
          toast.error(data.message, {
            id: toastId,
          });
        }
      })

      .catch((e) => {
        console.log(e);

        toast.error("Server error", {
          id: toastId,
        });
      });
  };
  return (
    <div className="p-12 ">
      <p className="pb-3 text-[36px]">Create Account</p>
      <p className="pb-3 text-[16px]">Join Network of precision transit.</p>
      <div className="mt-10 flex gap-2 w-137.5  ">
        <div
          onClick={() => {
            setOperator(false);
          }}
          className={`${!isOperator ? "bg-[#1A73E8] text-white" : "bg-[#E6E8F2]"} text-black p-3 rounded-lg flex-1 delay-75 `}
        >
          <div className="p-3">
            <FaUser />
          </div>
          <p className="pb-3 text-[16px] font-bold">Passenger</p>
          <p className="pb-3 font-thin">TRAVEL IN STYLE</p>
        </div>
        <div
          onClick={() => {
            setOperator(true);
          }}
          className={`${isOperator ? "bg-[#1A73E8] text-white" : "bg-[#E6E8F2]"} text-black p-3 rounded-lg flex-1 delay-75`}
        >
          <div className="p-3">
            <FaBusSimple />
          </div>
          <p className="pb-3 text-[16px] font-bold">Operator</p>
          <p className="pb-3 font-thin">DRIVE SUCCESS </p>
        </div>
      </div>
      <div>
        <div>
          <div className="mt-4 flex gap-3">
            <p className="text-[#005BBF] font-bold">01</p>
            <p className="font-bold text-[#191C23]">IDENTITY</p>
          </div>
          <div className="flex mt-5 gap-3">
            <div>
              <p className="text-[#414754]">FULL NAME</p>
              <input
                value={user.name}
                onChange={(e) => {
                  user.setName(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3"
                placeholder="Enter Your Name"
                type="text"
              />
            </div>
            <div>
              <p className="text-[#414754]">GENDER</p>
              <input
                value={user.gender}
                onChange={(e) => {
                  user.setGender(e.target.value);
                }}
                className="mt-2 p-3 rounded-sm bg-[#E6E8F2]"
                placeholder="Enter Your Gender"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 flex gap-3">
            <p className="text-[#005BBF] font-bold">02</p>
            <p className="font-bold text-[#191C23]">CONNECTIVITY</p>
          </div>
          <div className="flex mt-5 gap-3">
            <div>
              <p className="text-[#414754]">EMAIL ADDRESS</p>
              <input
                value={user.email}
                onChange={(e) => {
                  user.setEmail(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3"
                placeholder="Enter Your Email"
                type="text"
              />
            </div>
            <div>
              <p className="text-[#414754]">PHONE NUMBER</p>
              <input
                value={user.phoneNumber}
                onChange={(e) => {
                  user.setPhoneNumber(e.target.value);
                }}
                className="mt-2 p-3 rounded-sm bg-[#E6E8F2]"
                placeholder="Enter Your Phone"
                type="text"
              />
            </div>
            <div>
              <p className="text-[#414754]">PASSWORD</p>
              <input
                value={user.password}
                onChange={(e) => {
                  user.setPassword(e.target.value);
                }}
                className="mt-2 p-3 rounded-sm bg-[#E6E8F2]"
                placeholder="Enter Your Password"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 flex gap-3">
            <p className="text-[#005BBF] font-bold">03</p>
            <p className="font-bold text-[#191C23]">LOCATION</p>
          </div>
          <div className="flex mt-5 gap-3">
            <div className="flex-1">
              <p className="text-[#414754]">ADDRESS</p>
              <input
                value={user.address}
                onChange={(e) => {
                  user.setAddress(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3 w-full "
                placeholder="Enter Your Address"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex mt-5 gap-3">
            <div className="flex-1">
              <p className="text-[#414754]">CITY</p>
              <input
                value={user.city}
                onChange={(e) => {
                  user.setCity(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3 "
                placeholder="Chennai"
                type="text"
              />
            </div>
            <div className="flex-1">
              <p className="text-[#414754]">STATE</p>
              <input
                value={user.state}
                onChange={(e) => {
                  user.setState(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3 "
                placeholder="Tamilnadu"
                type="text"
              />
            </div>
            <div className="flex-1">
              <p className="text-[#414754]">ZIP</p>
              <input
                value={user.zip}
                onChange={(e) => {
                  user.setZip(e.target.value);
                }}
                className="mt-2 rounded-sm bg-[#E6E8F2] p-3 "
                placeholder="800000"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleRegister}
        className="font-bold p-3 text-white rounded-lg mt-10 text-center w-full bg-linear-to-r from-[#005BBF] to-[#1A73E8] "
      >
        Complete Registration
      </button>
      <p className="text-center mt-3 text-[#414754]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#005BBF]">
          Log in
        </Link>
      </p>
    </div>
  );
}
