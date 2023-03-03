import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  const [menuClass, setMenuClass] = useState('');
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/addroom':
        setMenuClass('white-bars');
        break;
      case '/booking':
        setMenuClass('white-bars');
        break;
      default:
        setMenuClass('');
    }
  }, [location.pathname]);

  return (
    <nav className={navbar.nav}>
      <div role="presentation" className={`${navbar.menuIcon} ${isOpen ? navbar.open : ''}`} onClick={toggleMenu}>
        <div id={`${isOpen ? '' : menuClass}`} className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.firstBar : ''}`} />
        <div id={`${isOpen ? '' : menuClass}`} className={`${isOpen ? navbar.menuIconCross : navbar.menuIconLines} ${isOpen ? navbar.secondBar : ''}`} />
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
        <NavLink to="/" style={handleActive} className={navbar.link} onClick={handleLogout}>
          Log out
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
