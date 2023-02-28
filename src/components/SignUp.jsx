import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';        
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/signUpSlice';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(signUpUser({
      fullName, email, password, confirmPassword,
    }));
  };

  return (
    <div className="flex flex-column align-items-center">
      <h1>Sign Up</h1>      .
      <InputText placeholder="Full Name" value={fullName} required onChange={(e) => setFullName(e.target.value)} />
      <InputText placeholder="Email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
      <Password placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
      <Password placeholder="Confirm Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
      
     
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
