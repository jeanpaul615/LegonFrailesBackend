import React, { useState } from 'react';
import Home from './Home';
import LoginForm from './LoginForm';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.token);
        if (result.token) {
          localStorage.setItem('token', result.token);
          setLoginSuccessful(true);
        } else {
          console.log("error de usuario");
          setLoginSuccessful(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicia sesión en tu cuenta</h2>
        </div>
        {loginSuccessful ? <Home /> : <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handdleLogin={handdleLogin}
        />}
      </div>
    </div>
  );
}
