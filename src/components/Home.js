import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Footer from "./Footer";
import Modal from "react-bootstrap/Modal";

export default function Home() {
  const navigate = useNavigate();
  const [searchTxt, setsearchTxt] = useState("");
  const [searchbox, setsearchbox] = useState(false);
  const [quizArray, setquizArray] = useState([]);
  const [recommendedArray, setrecommendedArray] = useState([]);
  const [searchArray, setsearchArray] = useState([]);
  const [startModal, setStartModal] = useState(false);
  const [notAllowedModal, setNotAllowedModal] = useState(false);
  const [modalData, setModalData] = useState("");

  localStorage.setItem("quiz_array", JSON.stringify([]));

  var num = 1;
  useEffect((async) => {
    if (num === 1) {
      getQuiz();
      getRecommended();
      num++;
    }
  }, []);

  //Get all quiz from db
  const getQuiz = async (e) => {
    try {
      const res = await axios.get("https://quiz-app-ieqe.onrender.com/quiz", {
        headers: {
          authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
        },
      });
      setquizArray(res.data);
    } catch (e) {
      alert(e.message);
    }
  };
  const storedArr = JSON.parse(localStorage.getItem("quiz_array"));
  quizArray.forEach((quiz) => storedArr.push(quiz));
  localStorage.setItem("quiz_array", JSON.stringify(storedArr));

  //Get recommended quiz list from db
  const getRecommended = async (e) => {
    try {
      console.log("getting recommended");
      const res = await axios.get("https://quiz-app-ieqe.onrender.com/recommend", {
        headers: {
          authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
        },
      });
      console.log("recommended: ",res.data);
      setrecommendedArray(res.data.quizzes);
      console.log(recommendedArray)
    } catch (e) {
      alert(e.message);
    }
  };

  //Start quiz
  const startQuiz = async (id) => {
    try {
      const res = await axios.get("https://quiz-app-ieqe.onrender.com/quiz/byId/" + id, {
        headers: {
          authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
        },
      });
      const quiz = res.data;
      console.log(quiz);

      const questionRes = await axios.get(
        "https://quiz-app-ieqe.onrender.com/attempt_quiz/" + id,
        {
          headers: {
            authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
          },
        }
      );
      const questions = questionRes.data;
      console.log(questions);

      if (questions.message) {
        setNotAllowedModal(true);
      } else {

        // Route quiz based on the timer choice
        if (quiz.Timer.TimerAvailable === 1) {
          localStorage.setItem("timeLimit", quiz.Timer.TimerDuration);
          console.log(localStorage.getItem("timeLimit"));
          navigate("/start-quiz-time-limit", {
            state: { id, quiz, questions },
          });
        } else if (quiz.Timer.TimerAvailable === 2) {
          localStorage.setItem("isTimer", "yes");
          console.log(localStorage.getItem("timeLimit"));
          navigate("/start-quiz-no-limit", { state: { id, quiz, questions } });
        } else if (quiz.Timer.TimerAvailable === 0) {
          localStorage.setItem("isTimer", "no");
          console.log(localStorage.getItem("timeLimit"));
          navigate("/start-quiz-no-limit", { state: { id, quiz, questions } });
        } else {
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };

  //Search for quiz by quiz title
  const searchQuiz = async (e) => {
    e.preventDefault();
    setsearchTxt(e.target.value.toLowerCase());
    console.log(searchTxt.toLowerCase());
    try {
      setsearchbox(true);
      const temp = JSON.parse(localStorage.getItem("quiz_array"));
      const res = temp.filter((quiz) =>
        quiz.Title.toLowerCase().includes(searchTxt)
      );

      console.log(res);
      setsearchArray(res);
      console.log(searchArray);
      if (searchTxt === "") {
        setsearchbox(false);
      }
    } catch (error) {
      alert(e.message);
    }
  };

  return (
    <div className="main-container">
      <div className="home-search">
        <div className="search">
          <input
            type="text"
            id="search"
            className="search-box"
            onChange={searchQuiz}
            placeholder="Search for quizzes on any topic"
          />
          {searchbox && (
            <ul className="searchlist">
              {searchArray.map((quiz) => (
                <li
                  className="search-item"
                  onClick={() => {
                    setModalData(quiz._id);
                    setStartModal(true);
                  }}
                >
                  {quiz.Title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Row className="home-head">
        <Col className="home-categories-label">
          <h3>Latest Quizzes</h3>
          <hr />
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-4">
        {quizArray.slice(0, 12).map((quiz) => (
          <>
            <Col key={quiz._id} className="home-quiz-card">
              <Card
                className="card-box"
                onClick={() => {
                  setModalData(quiz._id);
                  setStartModal(true);
                }}
              >
                <Card.Img
                  variant="top"
                  className="home-card-img"
                  src={`https://quiz-app-ieqe.onrender.com/uploads/${quiz._id}`}
                  onError={(e) => (e.target.src = "quizDefault.png")}
                />
                <Card.Body className="quiz-card-body">
                  <Card.Text className="quiz-cat">
                    Category: {quiz.Category}
                  </Card.Text>
                  <Card.Title className="quiz-title">{quiz.Title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Modal show={startModal}>
              <Modal.Header closeButton>
                <Modal.Title>Start Quiz</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    Proceed to Start Quiz?
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    className="btn"
                    onClick={() => setStartModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    className="btn"
                    type="button"
                    onClick={() => {
                      setStartModal(false);
                      startQuiz(modalData);
                    }}
                  >
                    Start Quiz
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </>
        ))}
      </Row>

      <Row>
        <Col md={12}>
          <Button
            variant="primary"
            className="btn see-btn"
            onClick={() => navigate("/all-quizzes")}
          >
            See More
          </Button>
        </Col>
      </Row>

      <Row className="home-head">
        <Col className="home-recommended-label">
          <h3>Recommended Quizzes for you</h3>
          <hr />
        </Col>
      </Row>
      <div className="home-items">
        <Row xs={1} md={3} className="g-4">
          {recommendedArray.slice(0, 12).map((quiz) => (
            <>
              <Col key={quiz._id} className="home-quiz-card">
                <Card
                  className="card-box"
                  onClick={() => {
                    setModalData(quiz._id);
                    setStartModal(true);
                  }}
                >
                  <Card.Img
                    variant="top"
                    className="home-card-img"
                    src={`https://quiz-app-ieqe.onrender.com/uploads/${quiz._id}`}
                    onError={(e) => (e.target.src = "quizDefault.png")}
                  />
                  <Card.Body className="quiz-card-body">
                    <Card.Text className="quiz-cat">
                      Category: {quiz.Category}
                    </Card.Text>
                    <Card.Title className="quiz-title">{quiz.Title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>

              <Modal show={startModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Start Quiz</Modal.Title>
                </Modal.Header>
                <Form>
                  <Modal.Body>
                    <Form.Group className="mb-3">
                      Proceed to Start Quiz?
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      className="btn"
                      onClick={() => setStartModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="success"
                      className="btn"
                      type="button"
                      onClick={() => {
                        setStartModal(false);
                        startQuiz(modalData);
                      }}
                    >
                      Start Quiz
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </>
          ))}
        </Row>

        <Modal show={notAllowedModal}>
          <Modal.Header closeButton>
            <Modal.Title>Creator Access Denied</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                You cannot attempt this quiz as it was created by you!
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="btn"
                onClick={() => setNotAllowedModal(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
