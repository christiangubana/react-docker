import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink exact="true" className="nav-logo">
          F1 world champions starting from 2005 until now
        </NavLink>
      </nav>
    </div>
  );
}
