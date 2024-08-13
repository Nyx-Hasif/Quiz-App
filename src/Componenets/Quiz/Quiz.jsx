import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        //this conditional will stop after reaching the last question putting -1 in index to stop the function
        setResult(true);//to show the result after click last question UI !
        return 0; //to stop the function below
      }
      setIndex(++index);
      setQuestion(data[index]);
      setlock(false);
      ArrayOption.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setlock(false);
    setScore(0);
    setResult(false);

  }

  //get answer option when u commit wrong answer only
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let ArrayOption = [option1, option2, option3, option4];

  //lock answer option only 1 answer can be selected
  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setScore(++score);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        ArrayOption[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />
      {/* show result is result is true in if condition above when after last question is answered */}
      {result ? (
        <>
          <h2>
            Score: {score} out of {data.length}
          </h2>
          <button onClick={reset}>Try Again</button>
        </>
      ) : (
        <>
          {/* show question when result in false state */}
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>

          <div className="index">
            {index + 1} of {data.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
