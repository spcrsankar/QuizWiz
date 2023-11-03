import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";

export default function QuizCategory() {
  const navigate = useNavigate();
  const [filterModal, setFilterModal] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [notAllowedModal, setNotAllowedModal] = useState(false);
  const [searchPin, setsearchPin] = useState('');

  const [filterCategory, setfilterCategory] = useState("");

  const [quizArray, setquizArray] = useState([]);

  var num = 1;
  useEffect(() => {
    if (num === 1) {
        if(searchPin) {
            searchQuiz();
        }else {
            getQuiz();
        }
    }
    num++;
  }, []);

  //Get quiz from the db
  const getQuiz = async (e) => {
    try {
      if (!filterCategory) {
        const res = await axios.get("https://quiz-app-ieqe.onrender.com/quiz/", {
          headers: {
            authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
          },
        });
        setquizArray(res.data);
        console.log(res.data);
      } else {
        const res = await axios.get("https://quiz-app-ieqe.onrender.com/quiz/", {
          headers: {
            authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
          },
        });
        setquizArray(
          res.data.filter((quiz) => quiz.Category === filterCategory)
        );

        console.log(res.data);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  //Go to leaderboard
  const goToLeaderboard = async (id) => {
    try {
        const res = await axios.get("https://quiz-app-ieqe.onrender.com/quiz/byId/" + id, {
            headers: {
              authorization: localStorage.getItem("token"), // Setting the 'Authorization' header with the token
            },
          });
          const quiz = res.data;
          console.log(quiz);

      localStorage.setItem("path", window.location.pathname);
      navigate("/leaderboard", { state: { id, quiz } });
    } catch (e) {
      alert(e.message);
    }
  };

  //Start Quiz
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
        //Route quiz based on the timer choice
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

    const searchQuiz = async() => {
        console.log(searchPin);
        try {
            if(searchPin !== '') {
                const res = await axios.get('https://quiz-app-ieqe.onrender.com/quiz/byPin/'+searchPin,{
                    headers: {
                        'authorization': localStorage.getItem("token") // Setting the 'Authorization' header with the token
                    }
                });
                setquizArray(res.data.quiz);
                console.log(res.data.quiz);
            } else {
                getQuiz()
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const filterQuiz = async (e) => {
        e.preventDefault();
        getQuiz()
        setFilterModal(false);
    }

  return (
    <div className="main-container">
      <Row className="quiz-category">
        <Col md={4} className="page-title">
          <h3>All Quizzes</h3>
        </Col>
        <Col md={{ span: 3, offset: 5 }}>
          <Button
            variant="primary"
            className="btn filter-btn"
            onClick={() => setFilterModal(true)}
          >
            Filter
          </Button>

          <Modal show={filterModal} onHide={() => setFilterModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Choose Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={filterQuiz}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="quizCategory" className="quiz-label">
                    Quiz Category
                  </Form.Label>
                  <Form.Select
                    id="quizCategory"
                    className="quiz-category-inp"
                    onChange={(e) => setfilterCategory(e.target.value)}
                    required
                  >
                    <option>Select</option>
                    <option value="">All Quizzes</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  className="btn"
                  onClick={() => setFilterModal(false)}
                >
                  Close
                </Button>
                <Button variant="success" className="btn" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
        <Row>
            <div className="col-10 search-bar-col">
                <div className="search">
                    <input type='number' id='search' className='search-box' onInputCapture={(e) => setsearchPin(e.target.value)} placeholder='Search for quiz by pin(6 digits)' /> 
                </div>
            </div>
            <div className='col-2 search-btn-col'>
                <button className='btn btn-primary search-btn' onClick={searchQuiz}>Search</button>
            </div>
        </Row>
      <hr />
      <div>
        <Row xs={1} md={2} className="g-4">
          {quizArray.map((data) => (
            <Col key={data._id}>
              <Card
                className="quiz-card"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  border: "none",
                  padding: "10px",
                }}
              >
                <Card.Body className="card-body-quiz">
                  <Row>
                    <Col md={{ span: 5 }} className="quiz-img">
                      <Card.Img
                        variant="top"
                        src={`https://quiz-app-ieqe.onrender.com/uploads/${data._id}`}
                        onError={(e) => (e.target.src = "quizDefault.png")}
                        className="quiz-img"
                      />
                    </Col>
                    <Col
                      md={{ span: 7 }}
                      className="quiz-card-details"
                      style={{
                        textAlign: "left",
                        lineHeight: "1",
                        color: "grey",
                        fontSize: "14px",
                      }}
                    >
                      <Card.Title className="card-title">
                        <h4>{data.Title}</h4>
                      </Card.Title>
                      <Card.Text className='quiz-details'>
                        Quiz Pin: {data.Quiz_pin} 
                      </Card.Text>
                      <Card.Text className="quiz-details">
                        Category: {data.Category}{" "}
                      </Card.Text>
                      <Card.Text className="quiz-details">
                        Questions: {data.Questions.length}{" "}
                      </Card.Text>{" "}
                      <Card.Text className="quiz-details">
                        Duration:{" "}
                        {data.Timer.TimerDuration
                          ? data.Timer.TimerDuration / 60 + " min"
                          : "No time limit"}
                      </Card.Text>
                      <Card.Text className="quiz-details"></Card.Text>
                      <Card.Text className="quiz-details">
                        Date Created:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(data.Created_at))}
                      </Card.Text>
                      <Button
                        variant="info"
                        className="btn btn-leaderboard"
                        onClick={() => goToLeaderboard(data._id)}
                      >
                        Leaderboard
                      </Button>{" "}
                      <Button
                        variant="success"
                        className="btn"
                        onClick={() => {
                          setModalData(data._id);
                          setStartModal(true);
                        }}
                      >
                        Start Quiz
                      </Button>
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
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}{" "}
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
