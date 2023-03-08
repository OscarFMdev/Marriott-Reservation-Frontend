import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { signIn, getUser } from '../redux/reducer/Auth/auth';
import stl from './componentsCss/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signIn(user));
  };

  useEffect(() => {
    if (message === 'Logged in succesfully.') {
      dispatch(getUser());
      navigate('/rooms');
    }
  }, [message, navigate]);

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <div className={stl.card}>
          <p>{message}</p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="p-field pb-2">
              <span className="p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="Email"
                  required
                />
              </span>
            </div>

            <div className="p-field pb-3">

              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                feedback={false}
                toggleMask
              />

            </div>
            <Button type="submit" label="Login" className="bg-green-500 border-200" />
            <p>
              Don`&apos;`t Have an Account?
              <span>
                <NavLink to="/signup"> Sign Up</NavLink>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
