import React, {useEffect, useState } from 'react';
import Axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const fetchData =  () => {
    Axios.get('https://reciepts-backend.onrender.com/login').then(resp => {
        
        setTitle(resp.data.title);
        
        
        
    });
    
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await Axios.post('https://reciepts-backend.onrender.com/login', { username, password });
      const data = response.data;

      if (data.errors) {
        setError(data.errors.username);
      } else if (data.user) {
        
        window.location.assign('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // showMessage();
    
  }, []);


  return (
    <section>
      <form className="responsive-form" onSubmit={handleFormSubmit}>
        <h2 id="updateTitle">{title}</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="passwordOrUsername-error">{error}</div>

        <a className="already" href="/signup">
          you don't have an account?
        </a>
        <div className="updateButtons">
          <button className="loginButton" id="loginButton" type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
