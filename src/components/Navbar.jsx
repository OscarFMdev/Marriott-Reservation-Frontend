import React, { useCallback, useState } from 'react';
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

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <nav className={navbar.nav}>
      <div role="presentation" className={`${navbar.menuIcon} ${isOpen ? navbar.open : ''}`} onClick={toggleMenu}>
        <div className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.firstBar : ''}`} />
        <div className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.secondBar : ''}`} />
      </div>
      <div className={`${navbar.menuItems} ${isOpen ? navbar.open : ''}`}>
        <img src={logo} alt="Logo" className={navbar.logo} />
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
