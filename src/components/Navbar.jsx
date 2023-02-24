import { NavLink } from 'react-router-dom';

const handleActive = ({ isActive }) => (isActive
  ? {
    color: 'blue',
    textDecoration: 'underline',
  }
  : { });

const NavBar = () => (
  <header>
    <NavLink to="/">
      <h1>Hotel Marriott</h1>
    </NavLink>
    <nav>
      <NavLink
        to="/"
        style={handleActive}
      >
        Home
      </NavLink>
      <NavLink
        to="/Rooms"
        style={handleActive}
      >
        Rooms
      </NavLink>
      <NavLink
        to="/Reservation"
        style={handleActive}
      >
        Reservation
      </NavLink>
    </nav>
  </header>
);

export default NavBar;
