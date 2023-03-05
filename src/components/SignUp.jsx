/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/reducer/Auth/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      password_confirmation,
    };
    dispatch(signUp(user));
  };

  useEffect(() => {
    if (message === 'Sign up success') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <div className="card">
          { status === 'failed' && <p>{message}</p> }
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="p-field pb-2">
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  placeholder="Full Name"
                  required
                />
              </span>
            </div>

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

            <div className="p-field pb-2">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                toggleMask
              />
            </div>

            <div className="p-field pb-2">
              <Password
                id="password_confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Password"
                required
                feedback={false}
                toggleMask
              />
            </div>

            <Button label="Sign Up" type="submit" className="bg-green-500 border-200" />
            <p>
              Already have an account?
              <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
