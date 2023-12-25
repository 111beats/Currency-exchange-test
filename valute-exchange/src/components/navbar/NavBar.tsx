import { useState } from 'react';

import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { Switcher } from '../swither/Swither';

export const Navbar = ():JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to='/' className='title'>
        ДОМ.РФ
      </Link>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <Switcher />
        </li>
        <li>
          <NavLink to='/'>CURRENCY</NavLink>
        </li>
        <li>
          <NavLink to='/charts'>CHARTS</NavLink>
        </li>
        <li>
          <NavLink to='/wallet'>WALLET</NavLink>
        </li>
      </ul>
    </nav>
  );
};
