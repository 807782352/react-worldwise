import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import styles from "./index.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
