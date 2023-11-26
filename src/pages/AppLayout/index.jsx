import Sidebar from "../../components/Sidebar";
import WorldMap from "../../components/WorldMap";
import styles from "./index.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <WorldMap />
    </div>
  );
}
