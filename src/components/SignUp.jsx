import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/signUpSlice';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({
      user: {
        name,
        email,
        password,
        passwordConfirmation,
      },
    }));
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8 p-lg-6">
        <div className="card">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <InputText
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                placeholder='Full Name'
              />

              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder='Email'
              />

              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />

              <Password
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder='Password Confirmation'
              />

              <Button label="Sign Up" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
