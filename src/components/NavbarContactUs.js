import React from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavbarContactUs() {
 
    const navigate = useNavigate();

    return (
    <NavBar className="website-navbar">
            <NavBar.Brand href="#home" className='app-detail'>
                <img alt="Logo" src="logo.png" width="60" height="60" className="app-logo"/>{' '}
                QuizWiz
            </NavBar.Brand>
            <NavBar.Toggle />
            <NavBar.Collapse className="justify-content-end">
               
                <Button variant='primary' className="btn nav-btn" onClick={() => navigate("/home")}>Home</Button>
            </NavBar.Collapse>
    </NavBar>
    )
}