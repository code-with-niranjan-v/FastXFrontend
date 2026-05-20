import RegisterForm from "../components/Common/RegisterForm";
import bg from "../assets/bg.png";
import { use, useState } from "react";
export default function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  return (
    <div>
      <div className="flex">
        <div
          style={{
            backgroundImage: `
      linear-gradient(
        rgba(0, 91, 191, 0.95),
        rgba(26, 115, 232, 0.95)
      ),
      url(${bg})
    `,
          }}
          className="flex-1 bg-cover bg-center"
        >
          <p className="text-white font-medium text-[40px] p-3 m-3 ">FastX</p>
          <div className="font-light">
            <p className="text-white pl-3 pt-3 ml-3 mt-3">
              Kinetic Minimalism in Motion.
            </p>
            <p className="text-white pl-3 pt-3 ml-3 ">
              Experience the next evolution of
            </p>
            <p className="pl-3 pt-3 ml-3 text-white">
              transit management and booking.
            </p>
          </div>
        </div>
        <div className="flex-2 flex justify-center">
          <RegisterForm
            user={{
              name,
              phoneNumber,
              email,
              gender,
              address,
              password,
              setName,
              setPhoneNumber,
              setEmail,
              setGender,
              setAddress,
              setPassword,
              city,
              state,
              zip,
              setCity,
              setState,
              setZip,
            }}
          />
        </div>
      </div>
    </div>
  );
}
