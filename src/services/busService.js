import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

async function searchBus(origin, destination, date, time) {
  const token = localStorage.getItem("token");

  try {
    const data = await axios.get(
      `${BASE_URL}/api/bus/search?origin=${origin}&destination=${destination}&date=${date}&time=${time}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(data.data.data);
    return data.data.data;
  } catch (e) {
    console.log(e);
  }
}

export { searchBus };
