import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/loginSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-column">
      <h1>Login User</h1>
      <InputText placeholder="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputText placeholder="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>

  );
};

export default Login;
