import React, { useState } from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function Register() {
 
    const navigate = useNavigate();

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    
    const handleSignup = async (e) => {
      e.preventDefault();
      if (password === cnfPassword){
        const signupData = {
          "firstName": fname,
          "lastName": lname,
          "email": email,
          "password": password 
        };
        
        try {
          const res = await axios.post('https://quiz-app-ieqe.onrender.com/api/users/',signupData)
          navigate("/")
          console.log(res.data);
        } catch (e) {
          alert(e.message)
        }
      } else {
        alert("Passwords Dont Match")
      }

    };

    return (
      <div className="login-bg">
        <div className="register-inner-container">
          <div className="login-container">
            
            <div className='details-container'>
              <Form className="login-form" onSubmit={handleSignup}>
                <h3>Sign Up/Register</h3>

                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label className="inp-label"><img className="icon" src="user.png" alt="Email"/>First Name</Form.Label>
                  <Form.Control type="text" className="inp inp-user" placeholder='Enter your first Name' onChange={(e) => setfname(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lname">
                  <Form.Label className="inp-label"><img className="icon" src="user.png" alt="Email"/>Last Name</Form.Label>
                  <Form.Control type="text" className="inp inp-user" placeholder='Enter your last Name' onChange={(e) => setlname(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="inp-label"><img className="icon" src="email.png" alt="Email"/>Email Address</Form.Label>
                  <Form.Control type="email" className="inp inp-user" placeholder='Ex: example@gmail.com' onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="inp-label"><img className="icon" src="key.png" alt="Password"/>Password</Form.Label>
                  <Form.Control type="password" className="inp inp-pass" placeholder='Minimum 8 characters' onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cnf-password">
              <Form.Label className="inp-label register-label"><img className="icon" src="key.png" alt="Password"/>Confirm Password</Form.Label>
              <Form.Control type="password" className="inp inp-pass" placeholder='Confirm Password' onChange={(e) => setCnfPassword(e.target.value)} required />
            </Form.Group>

                <div className="both-button">
                <Button variant="primary" type="submit" className="btn form-btn">
                    Sign Up
                </Button>
                </div>
                <Form.Group className='toggle-login'>
                    Already have an account?{' '} <Link to="/">Login</Link>
                </Form.Group>
              </Form>

            </div>
            
            <div className="img-container img-register">
              <img className='login-img' src="login.jpeg" alt="Login/ Register" width="100%"/>

              <div className="reg-phrase">
                Knowledge at your fingertips. Play, learn, and quiz your way to brilliance!
              </div>

            </div>
          </div>
        </div>
    </div>
    )
}