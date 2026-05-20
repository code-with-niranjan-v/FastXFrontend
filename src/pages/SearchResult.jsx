import Result from "../components/UserComponents/Result";
import RouteDetails from "../components/UserComponents/RouteDetails";
import UserNavbar from "../components/UserComponents/UserNavBar";

export default function SearchResult() {
  return (
    <div className="bg-[#F9F9FF] w-full h-screen flex gap-3">
      
      <div className="flex-1">
        <RouteDetails />
      </div>
      <div className="flex-6 m-3">
        <Result />
      </div>
    </div>
  );
}
