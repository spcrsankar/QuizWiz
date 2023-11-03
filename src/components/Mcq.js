import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Mcq() {
  const navigate = useNavigate();
  const [option, setOption] = useState(2);
  const questionType = 1;
  const [point, setPoint] = useState(1);
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");

  //To add and remove options from MCQ question format
  const addOption = () => {
    setOption(option + 1);
  };

  const removeOption = () => {
    if (option > 2) {
      setOption(option - 1);
    }
  };

  const saveQuestion = (e) => {
    e.preventDefault();
    console.log("Save");

    const answerOptionsArray = [];

    for (let i = 0; i < option; i++) {
      answerOptionsArray.push(document.getElementById("option" + i).value);
    }

    let questionDetails;

// Question details to forward to Create quiz page
    if (JSON.parse(localStorage.getItem("myBoolean"))) {
      questionDetails = {
        Question_type: questionType,
        Time: Number(document.getElementById("timer").value),
        Score: Number(point),
        Question_text: question,
        Correct_answer:
          answerOptionsArray[
            document.querySelector('input[type="radio"]:checked').value
          ],
        Explanation: explanation,
        Options: answerOptionsArray,
      };
    } else {
      questionDetails = {
        Question_type: questionType,
        Score: Number(point),
        Question_text: question,
        Correct_answer:
          answerOptionsArray[
            document.querySelector('input[type="radio"]:checked').value
          ],
        Explanation: explanation,
        Options: answerOptionsArray,
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
  };

  return (
    <div className="mcq-page">
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
            <label htmlFor="point" className="">
              Points
            </label>
            <br />
            <input
              type="number"
              id="point"
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
        <div className="row">
          <div className="col-9">Answer Options</div>
          <div className="col-3">&nbsp;&nbsp; Mark Correct</div>
        </div>
        {Array.from({ length: option }, (_, i) => (
          <span key={i}>
            <div className="option-row">
              <div className="row">
                <div className="col-9">
                  <input
                    type="text"
                    id={"option" + i}
                    className="form-control input-box"
                    placeholder="Enter option..."
                    required
                  ></input>
                </div>

                <div className="col-3 d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={i}
                    id={i}
                    style={{ marginTop: "15px" }}
                    required
                  />
                </div>
              </div>
            </div>
          </span>
        ))}
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-4 opt-btn-cont">
            <button
              type="button"
              className="btn btn-primary option-btn"
              onClick={addOption}
            >
              Add
            </button>
          </div>
          <div className="col-4 opt-btn-cont">
            <button
              type="button"
              className="btn btn-primary option-btn"
              onClick={removeOption}
            >
              Remove
            </button>
          </div>
        </div>
        <input
          type="text"
          id="explanation"
          className="input-box"
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
              className="btn btn-primary option-btn"
              onClick={() => navigate("/create-quiz")}
            >
              Cancel
            </button>
          </div>
          <div className="col-4 opt-btn-cont">
            <button type="submit" className="btn btn-primary option-btn">
              Save Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
