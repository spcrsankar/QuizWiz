import React from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Navbar() {
    
    const navigate = useNavigate();

    var profilePic = "user1.png"
    try {
        if(("https://quiz-app-ieqe.onrender.com/uploads/"+localStorage.getItem('userId'))){
            profilePic = "https://quiz-app-ieqe.onrender.com/uploads/"+localStorage.getItem('userId')
        }
    } catch (error) {
        console.error(error);
    }

    return (
        <NavBar className="website-navbar">
            <NavBar.Brand href="#home" className='app-detail' onClick={() => navigate('/home')} style={{color:"white"}}>
                <img alt="Logo" src="logo.png" width="60" height="60" className="app-logo"/>{' '}
                QuizWiz
            </NavBar.Brand>
            <NavBar.Toggle />
            <NavBar.Collapse className="justify-content-end">
                <NavBar.Text className='nav-user'>
                    <img alt='' src={profilePic} onError={(e) => e.target.src = 'user1.png'} className='nav-img' width="40" height="40"/>{' '}
                   &nbsp; {localStorage.getItem('userName')}
                </NavBar.Text>
                <Button variant="danger" className="btn lgt-btn" onClick={() => navigate("/")}>Logout</Button>
                <Button variant='primary' className="btn ctc-btn" onClick={() => navigate("/contact-us")}>Contact Us</Button>
            </NavBar.Collapse>
        </NavBar>
    )
}