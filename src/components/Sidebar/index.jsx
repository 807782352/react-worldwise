import Logo from "../Logo";
import AppNav from "../AppNav";
import Footer from "../Footer";
import styles from "./index.module.css";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
