import bg from "../assets/bg.png";
import LoginForm from "../components/Common/LoginForm";
import { useDispatch } from "react-redux";
export default function Login() {
 
  return (
    <div className="h-screen">
      <div className="flex h-full">
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
