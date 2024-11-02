import React, { useState, useEffect } from "react";
import { questions } from "../Data/Data";
import QuestionList from "./QuestionList";
import "./quiz.css";
import Score from "./Score";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setQuizStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const [highScore, setHighScore] = useState(0); //changes

  const handleClick = (option) => {
    setSelectedOption(option);
    setCurrentAnswer(questions[count].answer);
    if (option === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setCount((prev) => prev + 1);
    setSelectedOption(null);
    setCurrentAnswer(null);
    setCurrentQuestionIndex((index) => index + 1);
  };

  const handleStartQuiz = () => {
    if (userName.trim() !== "") {
      setQuizStarted(true);
      const storedHighScore = localStorage.getItem(`${userName}-highScore`); //changes
      if (storedHighScore) {
        //changes
        setHighScore(parseInt(storedHighScore, 10));
      } else {
        setHighScore(0); // No high score for this user yet
      }
    } else {
      alert("Please enter your name to start the quiz.");
    }
  };

  useEffect(() => {
    console.log("outside");
    if (currentQuestionIndex >= questions.length) {
      console.log("inside");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`${userName}-highScore`, score); // Save new high score for this user changes
      }
    }
  }, [currentQuestionIndex, score, highScore, userName]);

  return (
    <>
      {!isQuizStarted ? (
        <div className="start-quiz">
          <h2>Welcome to the React Quiz!</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : currentQuestionIndex < questions.length ? (
        <div>
          <p className="timer">Time left:{timer}</p>
          <QuestionList
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            handleClick={handleClick}
            currentAnswer={currentAnswer}
            selectedOption={selectedOption}
          />
          <button
            className={currentAnswer === null ? "button-disable" : "button"}
            disabled={currentAnswer === null}
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      ) : (
        <div>
          <Score score={score} highScore={highScore} />
        </div>
      )}
    </>
  );
};

export default Quiz;
