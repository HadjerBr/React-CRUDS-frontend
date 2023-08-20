import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Signup = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', username: '' });


  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    
  });
  
  const handleChange = (event) => {
    
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    
  }


  const fetchData =  () => {
    Axios.get('https://reciepts-backend.onrender.com/signup').then(resp => {
        
        setTitle(resp.data.title);
        
        
        
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); 

    try {
      const response = await Axios.post('https://reciepts-backend.onrender.com/signup',formValues);

      const data = response.data;
      if (data.errors) {
        setErrors(data.errors);
        console.log(errors);
      }
      if (data.user) {
        console.log(data.user); // This should log the user ID
        console.log(data.username); 
        window.location.assign('/');
      }
    } catch (err) {
      console.log(err);
      
      console.log(formValues);
      
    }
  };

  useEffect(() => {
    fetchData();
    // showMessage();
    
  }, []);

  return (
    <section>
      <div id='danger-alert' className="alert alert-danger">{message}</div>
      <form className="responsive-form" id="signupForm" onSubmit={handleSubmit} >
        <h2 id="updateTitle">{title}</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required onChange={handleChange} />
        <div className="email-error" onChange={handleChange}>{errors.email}</div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" required onChange={handleChange} />
        <div className="username-error" onChange={handleChange}>{errors.username}</div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required onChange={handleChange} />
        <div className="password-error" onChange={handleChange}>{errors.password}</div>
        <a className="already" href="/login">already have an account?</a>
        <div className="updateButtons">
          <button className="signupButton" id="signupButton" type="submit">Signup</button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
