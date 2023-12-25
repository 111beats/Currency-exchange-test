import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
       ДОМ.РФ
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">CURRENCY</NavLink>
        </li>
        <li>
          <NavLink to="/chart">CHARTS</NavLink>
        </li>
        <li>
          <NavLink to="/wallet">WALLET</NavLink>
        </li>
      </ul>
    </nav>
  );
};