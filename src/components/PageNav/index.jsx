import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./index.css";

export default function PageNav() {
  return (
    <nav className="page-nav">
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="ctaLink">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}