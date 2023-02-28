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
        <NavLink to="/rooms" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Rooms
        </NavLink>
        <NavLink to="/booking" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Booking
        </NavLink>
        <NavLink to="/mybookings" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          My bookings
        </NavLink>
        <NavLink to="/addroom" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Add room
        </NavLink>
        <NavLink to="/deleteroom" style={handleActive} className={navbar.link} onClick={toggleMenu}>
          Delete room
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
