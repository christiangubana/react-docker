import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  return (
    <div>
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <NavLink exact to="/" className="nav-logo">
        F1 world champions starting from 2005 until now
        </NavLink>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/contact"
              className="nav-links"
              onClick={click ? handleClick : null}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
