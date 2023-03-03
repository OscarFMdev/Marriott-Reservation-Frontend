import React from 'react';
import { NavLink } from 'react-router-dom';
import img from '../assets/img/marriott-wobg.png';
import home from './Home.module.css';

const Home = () => (
  <div className={home.background}>
    <img src={img} alt="Logo" className={home.hotel} />
    <h1 className={home.header}>The new Marriott Hotel</h1>
    <NavLink to="/login">
      <button type="button" className={home.loginBtn}>Login</button>
    </NavLink>
    <NavLink to="/signup">
      <button type="button" className={home.signupBtn}>Sign up</button>
    </NavLink>
  </div>
);

export default Home;
