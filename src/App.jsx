import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import RouteConfig from "./routes/RouteConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  const [count, setCount] = useState(0);

  return <RouteConfig />;
}

export default App;
