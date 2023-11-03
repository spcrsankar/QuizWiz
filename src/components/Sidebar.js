import React from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export default function Sidebar() {
 
    const navigate = useNavigate();

    //Initializing to use in Create quiz page
    localStorage.setItem("questionCount", 0);
    localStorage.setItem('questionArray', JSON.stringify([]));
    localStorage.setItem("quizName", "");
    localStorage.setItem("quizCategory", "");
    localStorage.setItem("quizTime", "");
    localStorage.setItem("quizTimeMin", "");

    const createQuiz = () => {
         navigate("/create-quiz");
    }

    return (
  
    <ul className='sidebar-content'>
        <li className="create-btn-box">
            <button type="button" className="btn btn-primary create-btn" onClick={createQuiz}>Create Quiz</button>
        </li>
        <li className="sidebar-item" onClick={() => navigate("/home")}>
           Dashboard 
        </li>
        <li className="sidebar-item" onClick={() => navigate("/all-quizzes")}>
           All Quizzes 
        </li>
        <li className="sidebar-item" onClick={() => navigate("/my-quiz")}>
           My Quiz 
        </li>
        <li className="sidebar-item" onClick={() => navigate("/quiz-history")}>
           Quiz History 
        </li>
        <li className="sidebar-item" onClick={() => navigate("/edit-profile")}>
           Edit Profile 
        </li>
        <Card className='sidebar-image'>
            <Card.Img className='side-img' src="quiz.png" />
        </Card>
    </ul>

    )
}