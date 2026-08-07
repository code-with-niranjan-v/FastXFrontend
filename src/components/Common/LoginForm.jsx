import userImg from "../../assets/user.png";
import busImg from "../../assets/bus.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/apiConfig";
export default function LoginForm() {
  const dispatch = useDispatch();
  const [isOperator, setOperator] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          const userData = {
            name: data.data.name,
            email: data.data.email,
            role: data.data.role,
            token: data.data.token,
            phoneNumber: data.data.phoneNumber,
            wallet: data.data.wallet,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          toast.success(data.message);
          dispatch(setUser(userData));
          if (data.data.role == "ROLE_USER") {
            navigate("/userhome");
          } else if (data.data.role == "ROLE_OPERATOR") {
            navigate("/operatorHome");
          } else if (data.data.role == "ROLE_ADMIN") {
            navigate("/adminHome");
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e);
      });
  };
  return (
    <div className="p-12 ">
      <p className="pb-3 text-[36px]">Welcome Back</p>
      <p className="pb-3 text-[16px]">
        Please enter your credentials to access the FastX platform.
      </p>
      <div className="mt-5 flex gap-2 w-137.5  ">
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
      <div className="flex flex-col w-full ">
        <div className="w-full mt-5 ">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-2 rounded-sm bg-[#E6E8F2] p-3 w-full"
            placeholder="Enter Email"
            type="text"
          />
        </div>
        <div className="w-full mt-5">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-2 rounded-sm bg-[#E6E8F2] p-3 w-full"
            placeholder="Enter Password"
            type="text"
          />
        </div>
        <div className="w-full mt-5">
          <button
            onClick={handleLogin}
            className="font-bold p-3 text-white rounded-lg mt-10 text-center w-full bg-linear-to-r from-[#005BBF] to-[#1A73E8] "
          >
            Sign In
          </button>
          <p className="text-center mt-3 text-[#414754]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#005BBF]">
              Sign Up
            </Link>
          </p>
        </div>
        <Link
          to="/forgot-password"
          className="text-[#2563EB] text-sm mt-3 inline-block"
        >
          <p className="text-center">Forgot Password?</p>
        </Link>
      </div>
    </div>
  );
}
