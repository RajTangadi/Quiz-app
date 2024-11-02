import React, { useEffect, useState } from "react";
import "./quiz.css";

const QuestionList = ({
  question,
  options,
  handleClick,
  currentAnswer,
  selectedOption,
}) => {
  return (
    <>
      <div>
        <h2>{question}</h2>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleClick(option, index)}
              className={
                selectedOption === option
                  ? option !== currentAnswer
                    ? "incorrect" // red background for incorrect answer
                    : "correct" // green background for correct answer
                  : currentAnswer === option
                  ? "correct" // Highlight correct answer after wrong answer is selected
                  : ""
              }
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuestionList;
