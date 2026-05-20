import axios from "axios";

async function searchBus(origin, destination, date, time) {
  const token = localStorage.getItem("token");

  try {
    const data = await axios.get(
      `http://localhost:8080/api/bus/search?origin=${origin}&destination=${destination}&date=${date}&time=${time}`,
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
