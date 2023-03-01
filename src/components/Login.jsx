import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignIn } from 'react-auth-kit'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { loginUser } from '../redux/loginSlice';


const Login = () => {
  const signIn = useSignIn()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      user: {
        email,
        password,
      },
    }));
  };  

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <div className="card">
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
              />
            </div>

            <div className="p-field">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <Button type="submit" label="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
