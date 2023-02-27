import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/loginSlice';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    console.table(fullName, email, password, confirmPassword);
    dispatch(signUpUser({ fullName, email, password, confirmPassword }));    
  };

  return (
    <div className="flex flex-column">
      <h1>Sign Up</h1>
      .
      <InputText placeholder="Full Name" value={fullName} required onChange={(e) => setFullName(e.target.value)} />
      <InputText placeholder="Email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
      <InputText placeholder="Password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
      <InputText placeholder="Confirm Password" type="password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />

      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
