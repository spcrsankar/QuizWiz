import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id || 0;
  const quiz = location.state.quiz;
  const questions = location.state.questions;
  const correctAnswers = location.state.correctAnswers;
  const score = location.state.score;
  const [review, setReview] = useState(false);
  const [reAttempt, setReAttempt] = useState(false);

  var num = 1;
  useEffect((async) => {
    if (num === 1) {
      submitQuiz();
    }
    num++;
  }, []);

  //Submit quiz result to backend
  const submitQuiz = async () => {
    const answers = questions.questions.map((question) => {
      console.log(question);
      return {
        Question_id: question["_id"],
        Answer: question["Answer"],
      };
    });

    const quizAnswers = {
      userId: localStorage.getItem("userId"),
      answers: answers,
    };

    console.log(answers);
    console.log(quizAnswers);

    try {
      const res = await axios.post(
        "https://quiz-app-ieqe.onrender.com/attempt_quiz/" + id,
        quizAnswers,
        {
          headers: {
            authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
          },
        }
      );
      console.log(res.data);

      if(res.data.message !== "Quiz attempted successfully"){
        setReAttempt(true);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="start-quiz-container">
      <div className="start-quiz-box res-box">
        <h4 className="res-name"> Quiz Result</h4>
        <div className="row" style={{ padding: "50px 0", margin: "0" }}>
          <div className="col-3 score-box">
            <div className="card res-det">
              Total Questions
              <br />
              <span className="figure"> {questions.questions.length}</span>
            </div>
          </div>

          <div className="col-3 score-box">
            <div className="card res-det">
              Correct Answers
              <br />
              <span className="figure"> {correctAnswers}</span>
            </div>
          </div>

          <div className="col-3 score-box">
            <div className="card res-det">
              Your Points
              <br />
              <span className="figure">
                {" "}
                {score} / {quiz.total_socre}
              </span>
            </div>
          </div>

          <div className="col-3 score-box">
            <div className="card res-det">
              Your Score
              <br />
              <span className="figure">
                {" "}
                {Math.ceil((score / quiz.total_socre) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {reAttempt && <div style={{textAlign:"center"}}>Leaderboard remains unaffected by multiple quiz attempts</div>}
        <br />

        <div className="res-page-btn">
          <button
            type="button"
            className="btn btn-info review-btn"
            onClick={() => {
              localStorage.setItem("path", window.location.pathname);
              navigate("/leaderboard", { state: { id, quiz, questions } });
            }}
          >
            {" "}
            View Leaderboard{" "}
          </button>
          <button
            type="button"
            className="btn btn-secondary review-btn"
            onClick={() => {
              setReview((review) => !review);
              console.log("hello");
            }}
          >
            {" "}
            Review Quiz{" "}
          </button>
          <button
            type="button"
            className="btn btn-warning review-btn"
            onClick={() => navigate("/home")}
          >
            {" "}
            Go to Dashboard
          </button>
        </div>

        {review &&
          questions.questions.map((data, index) => (
            <Col key={index}>
              <Card className="ans-card">
                <Card.Body className="card-body-ans">
                  <Row>
                    <Col md={{ span: 12 }} className="ans-card-details">
                      <Card.Title className="ans-title">
                        <h4>
                          Q.{index + 1} &nbsp;&nbsp;{data.Question_text}
                        </h4>
                      </Card.Title>
                      <Card.Text className="ans-details">
                        Correct Answer: {data.Correct_answer}{" "}
                      </Card.Text>
                      <Card.Text className="ans-details">
                        Your Answer: {data.Answer} &nbsp;{" "}
                        <img
                          className="icon"
                          src={
                            data.Answer === data.Correct_answer
                              ? "correct.png"
                              : "wrong.png"
                          }
                          alt={
                            data.Answer === data.Correct_answer
                              ? "Correct"
                              : "Wrong"
                          }
                        />
                      </Card.Text>
                      <Card.Text className="ans-details">
                        Explanation: {data.Explanation}{" "}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </div>
    </div>
  );
}
