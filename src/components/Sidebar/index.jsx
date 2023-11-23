import Logo from "../Logo";
import AppNav from "../AppNav";
import Footer from "../Footer";
import "./index.css";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <AppNav />

      <Outlet />
      
      <Footer />
    </div>
  );
}
