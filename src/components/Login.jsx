import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { signIn } from '../redux/reducer/Auth/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, message } = useSelector((state) => state.auth);

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
      navigate('/rooms');
    }
  }, [message, navigate]);

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <div className="card">
          { status === 'failed' && <p>{message}</p> }
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="Email"
                icon="pi pi-envelope"
                required
              />
            </div>

            <div className="p-field">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                feedback={false}
                required
              />
            </div>

            <Button type="submit" label="Login" />
            <p>
              Don &apos t Have an Account?
              <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
