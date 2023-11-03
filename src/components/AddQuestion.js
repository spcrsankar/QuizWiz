import React, { useState, useEffect } from "react";
import "./style.css";
import Mcq from "./Mcq";
import TrueFalse from "./TrueFalse";
import Fib from "./Fib";

export default function AddQuestion() {
  const [mcq, setMcq] = useState(true);
  const [tf, setTf] = useState(false);
  const [fib, setFib] = useState(false);
  const [questionType, setQuestionType] = useState(1);

  const changeQuestionFormat = (e) => {
    setQuestionType(e);

    // To render Child Component based on Question Type
    console.log(e);
    switch (e) {
      case "1":
        setMcq(true);
        setTf(false);
        setFib(false);
        break;

      case "2":
        setMcq(false);
        setTf(true);
        setFib(false);
        break;

      case "3":
        setMcq(false);
        setTf(false);
        setFib(true);
        break;

      default:
        break;
    }
  };

  return (
    <div className="question-container">
      <div className="question-box">
        <div className="row">
          <div className="col-4 ques-page">
            <h4>Add Question</h4>
          </div>
          <div className="col-8 ques-type">
            <label htmlFor="questionType" className="">
              Select Question Type
            </label>
            <br />
            <select
              className="form-select input-box"
              id="questionType"
              aria-label="Default select example"
              value={questionType}
              onChange={(e) => changeQuestionFormat(e.target.value)}
            >
              <option value="1">Multiple Choice</option>
              <option value="2">True/False</option>
              <option value="3">Fill-in-the-Blank</option>
            </select>
          </div>
        </div>
        <hr />
        
        {mcq && <Mcq />}
        {tf && <TrueFalse />}
        {fib && <Fib />}
      </div>
    </div>
  );
}
