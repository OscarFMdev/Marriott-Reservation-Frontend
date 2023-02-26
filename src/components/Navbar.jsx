import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import navbar from './Navbar.module.css';
import logo from '../assets/img/marriott-logo-mobile.png';

const handleActive = ({ isActive }) => (isActive
  ? {
    backgroundColor: '#95C010',
    color: 'white',
    textDecoration: 'none',
  }
  : { 
    color: 'black',
  });

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={navbar.nav}>
      <div className={`${navbar.menuIcon} ${isOpen ? navbar.open : ''}`} onClick={toggleMenu}>
        <div className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.firstBar : ''}`}></div>
        <div className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.secondBar : ''}`}></div>
      </div>
      <div className={`${navbar.menuItems} ${isOpen ? navbar.open : ''}`}>
        <NavLink to="/">
          <img src={logo} alt="Logo" className={navbar.logo} onClick={toggleMenu}/>
        </NavLink>
        <NavLink to="/" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/Rooms" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Rooms
        </NavLink>
        <NavLink to="/Reservation" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Reservation
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;