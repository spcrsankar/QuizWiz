import React, { useState } from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
 
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
      e.preventDefault();
      const loginData = {
        email,
        password,
      }

      const storeToken = (token) => {
        localStorage.setItem("token", token.token);
        localStorage.setItem("userId", token.id);
        localStorage.setItem("userName", token.username);

        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("userId"));
        console.log(localStorage.getItem("userName"));

      };

      try {
        const res = await axios.post('https://quiz-app-ieqe.onrender.com/api/auth',loginData)
        storeToken(res.data.data);
        navigate("/home")
      } catch (e) {
        alert(e.message)
      }

    };

    return (
      <div className="login-bg">
        <div className="login-inner-container">
          <div className="login-container">
            <div className='details-container'>
              <Form className="login-form" onSubmit={handleLogin}>
                <h3>Login</h3>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="inp-label"><img className="icon" src="email.png" alt="Email"/>Email Address</Form.Label>
                  <Form.Control type="email" className="inp inp-user" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} autoComplete='email' required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="inp-label"><img className="icon" src="key.png" alt="Password"/>Password</Form.Label>
                  <Form.Control type="password" className="inp inp-pass" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn form-btn">
                  Login
                </Button>
                
                <Form.Group className='toggle-login'>
                    Dont have an account?{' '}<a href="/register"> Sign Up</a>
                </Form.Group>
              </Form>
            </div>
            
            <div className="img-container">
              <img className='login-img' src="login.jpeg" alt="Login/ Register" width="100%"/>
              <div className="phrase">
                Knowledge at your fingertips. Play, learn, and quiz your way to brilliance!
              </div>
            
            </div>
          </div>
        </div>
      </div>
    )
}