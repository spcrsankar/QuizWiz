import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function StartQuizWithTimeLimit() {


  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const quiz = location.state.quiz;
  const questions = location.state.questions;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [fib, setFib] = useState('');

  const [timeLeft, setTimeLeft] = useState(localStorage.getItem("timeLimit"));

  useEffect(() => {
   //Set countdown in case timer is required
      const countdown = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(prevTime => prevTime - 1);
        } else {
          clearInterval(countdown);
          setIndex(questions.questions.length + 1);
          playQuiz();
        }
      }, 1000);
  
      return () => clearInterval(countdown); // Cleanup the interval on unmount or re-render
  }, [timeLeft]);

   // Initializing the quiz
  const playQuiz = () => {
    console.log(index);
    
    if (index < questions.questions.length) {

      return QuizBox(questions.questions[index]); //Render UI if index less than length of question array
    } else {
      console.log("Score "+score)

      questions.questions.forEach((item, index) => {
        if (!item.hasOwnProperty('Answer')) {
          item['Answer'] = "NA"; // Add 'Answer' property with value null
        }
      });
      
      navigate("/result", {state : {id, quiz, questions, correctAnswers, score}}); //Else navigate to Results page
    }
  };

  //Function to change to next question
  const changeQuestion = () => {
    if (index < questions.questions.length) {
      console.log(questions)
      setIndex(index + 1);
      playQuiz();
    }
  };

 //Check answer to give immediate feedback
  const checkAnswer = (ans) => {
    console.log(ans);
    if (ans !== ""){
    var element = document.getElementById(ans);


    if(ans.toLowerCase() ===  questions.questions[index].Correct_answer.toLowerCase()){
      changeColor(element, "green");
      setCorrectAnswers(correctAnswers+1);
      setScore(score + questions.questions[index].Score);
    }
    else{
      changeColor(element, "rgb(227, 7, 7)");
    }

    questions.questions[index].Answer = ans;
    (console.log(questions.questions[index]['Answer']))
    setTimeout(function() {
      element.style.backgroundColor = "white";
      element.style.color = "black";
      setFib('');
      changeQuestion();
    }, 1000);

  }else{
    changeQuestion();
  }
  };

  //Change color based on answer feedback
  const changeColor = (element, color) => {
    element.style.backgroundColor = color;
    element.style.color = "white";
  }

    // The UI which is rendered
  const QuizBox = ( question ) => {
    
    return (
      <div className="start-quiz-box">
        

<div className="d-flex justify-content-center">
<div id="countdown" className=" overall-countdown">
       {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' + (timeLeft % 60) : timeLeft % 60}

        </div>
</div>

        
<div className="row">
        <div className="col-10 title-col">
        <h4>  {quiz.Title}</h4>
        </div>
        <div className="col-2 end-btn-col">
        <button type="button" className="btn btn-danger end-test" onClick={() => setIndex(questions.questions.length+1)}> End Test</button>
        </div>
      </div>

      <hr/>
        <div className="row quiz-header">
        <div className="col-4 time-progress-col">
        Completed 
        <div className="progress time-progress">
        <div className="progress-bar" role="progressbar" style={{width: ((index)/questions.questions.length)*100+"%" }} aria-valuenow={index} aria-valuemin="0" aria-valuemax={questions.questions.length}></div>
</div>
        </div>
        <div className="col-4 time-count-col">
          Question: {index+1} of {questions.questions.length}
        </div>
        <div className="col-4 time-score-col">
          Question Points: {question.Score}
        </div>
        </div>

        <hr/>

      <div className="question-display">
  Q. {question.Question_text}
  </div>

{/* Render UI for MCQ type question */}
      { question.Question_type === 1 && Array.from({ length: question.Options.length }, (_, i) => <span key={i}>

      <div className="card option-card" id={question.Options[i]} onClick={() => checkAnswer(question.Options[i])}>
      {question.Options[i]}
      </div>
            </span>)}

 {/* Render UI for True or False type question */}
      { question.Question_type=== 2 && <>
      <div className="card option-card" id="true" onClick={() => checkAnswer("true")}>
      True
      </div> 
      <div className="card option-card" id="false" onClick={() => checkAnswer("false")}>
      False
      </div> 
      </>
      }

 {/* Render UI for Fill-in-the-blank type question */}
{ question.Question_type === 3 && <>
    
      <input type="text" id={fib} value={fib} className="input-box option-card" placeholder="Enter answer here..." style={{marginTop:"10px"}} onChange={(e) => setFib(e.target.value)} required></input>
     
      <div class="d-flex justify-content-center" style={{marginTop:"40px"}}>
      <button type="button" className="btn btn-primary" style={{width:"150px",padding:"10px"}} onClick={() => checkAnswer(fib)}> Next</button>
</div>
      </>
      }

      </div>
      
      
    );
  };

  /*

const quizBox = () => (
    <div className="quiz-box">
     {quiz.Title}
      */
  return <div className="start-quiz-container">{playQuiz()}</div>;
}
