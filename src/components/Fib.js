import React, { useState} from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Fib() {
  const navigate = useNavigate();
  const questionType = 3;
  const [point, setPoint] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const saveQuestion = (e) => {
    e.preventDefault();
    console.log("Save");

    let questionDetails;

    // Question details to forward to Create quiz page
    if (JSON.parse(localStorage.getItem("myBoolean"))) {
      questionDetails = {
        Question_type: questionType,
        Time: Number(document.getElementById("timer").value),
        Score: Number(point),
        Question_text: question,
        Correct_answer: answer,
        Explanation: explanation,
      };
    } else {
      questionDetails = {
        Question_type: questionType,
        Score: Number(point),
        Question_text: question,
        Correct_answer: answer,
        Explanation: explanation,
      };
    }

    console.log(questionDetails);

    localStorage.setItem(
      "questionCount",
      Number(localStorage.getItem("questionCount")) + 1
    );

    const storedArray = JSON.parse(localStorage.getItem("questionArray") || []);
    storedArray.push(questionDetails);
    localStorage.setItem("questionArray", JSON.stringify(storedArray));

    navigate("/create-quiz");
    console.log("Navigate");
  };

  return (
    <div className="fib-page">
      <form onSubmit={saveQuestion}>
        <div className="row">
          {JSON.parse(localStorage.getItem("myBoolean")) && (
            <div className="col">
              <label htmlFor="timer" className="timer">
                Set Timer
              </label>
              <br />
              <select
                className="form-select input-box"
                aria-label="Default select example"
                id="timer"
                required
              >
                <option value="15">15 sec</option>
                <option value="30">30 sec</option>
                <option value="60">1 min</option>
                <option value="120">2 min</option>
              </select>
            </div>
          )}
          <div className="col">
            <label htmlFor="points" className="">
              Points
            </label>
            <br />
            <input
              type="number"
              id="points"
              min="1"
              className="form-control input-box"
              placeholder=""
              onChange={(e) => setPoint(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <br />
        Question
        <br />
        <input
          type="text"
          id="question"
          className="form-control input-box"
          placeholder="Enter the question here..."
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginTop: "10px" }}
          required
        ></input>
        <br />
        Answer
        <br />
        <input
          type="text"
          id="question"
          className="form-control input-box"
          placeholder="Enter answer here..."
          onChange={(e) => setAnswer(e.target.value)}
          style={{ marginTop: "10px" }}
          required
        ></input>
        <br />
        Explanation
        <br />
        <input
          type="text"
          id="questionImg"
          className="form-control input-box"
          placeholder="Add Explanation here..."
          onChange={(e) => setExplanation(e.target.value)}
          style={{ marginTop: "20px" }}
          required
        ></input>
        <br />
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-4 opt-btn-cont">
            <button
              type="button"
              class="btn btn-primary option-btn"
              onClick={() => navigate("/create-quiz")}
            >
              Cancel
            </button>
          </div>
          <div className="col-4 opt-btn-cont">
            <button type="submit" class="btn btn-primary option-btn">
              Save Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
