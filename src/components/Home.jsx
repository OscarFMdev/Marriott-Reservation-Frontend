import React from 'react';
import img from '../assets/img/marriot-wobg.png';
import home from './Home.module.css';

const Home = () => (
  <div className={home.background}>
    <img src={img} alt="Logo" className={home.hotel} />
    <h1 className={home.header}>The new Marriott Hotel</h1>
    <button type="button" className={home.loginBtn}>Login</button>
    <button type="button" className={home.signupBtn}>Sign up</button>
  </div>
);

export default Home;
