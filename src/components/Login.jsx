import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {    
    const response = await fetch('http://localhost:3000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
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
                placeholder="Email"
              />
            </div>
            <div className="p-field">            
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <Button label="Login" type="submit" />
          </form>
        </div>
      </div>
    </div>
  ); 
};
export default Login;


  





