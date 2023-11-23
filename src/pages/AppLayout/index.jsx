import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import "./index.css";

export default function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <Map />
    </div>
  );
}
