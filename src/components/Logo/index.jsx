import { Link } from "react-router-dom";
import "./index.css";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className="logo" />
    </Link>
  );
}
