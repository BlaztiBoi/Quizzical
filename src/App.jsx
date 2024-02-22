/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { decode } from "html-entities";

import "./App.css";
import MainMenu from "./Components/MainMenu";

import { nanoid } from "nanoid";
import Loading from "./Components/Loading";

function App() {
  const [options, setOptions] = useState({});
  const [gameStart, setGameStart] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rawQuizData, setRawQuizData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    if (gameStart === true) {
      const test = {
        amount: "12",
        category: "10",
        difficulty: "medium",
        type: "any",
      };
      const questionAmount = options.amount;
      const questionCategory =
        options.category === "any" ? "" : `&category=${options.category}`;
      const questionDifficulty =
        options.difficulty === "any" ? "" : `&difficulty=${options.difficulty}`;
      const questionType =
        options.type === "any" ? "" : `&type=${options.type}`;

      const fetchLink = `https://opentdb.com/api.php?amount=${questionAmount}${questionCategory}${questionDifficulty}${questionType}`;

      fetch(fetchLink)
        .then((response) => response.json())
        .then((data) => {
          setDataLoaded(true);
          const quizz = data.results.map((quiz) => {
            let answers =
              quiz.type === "boolean"
                ? ["True", "False"]
                : [quiz.correct_answer, ...quiz.incorrect_answers];
            quiz.answers =
              quiz.type !== "boolean" ? shuffleArray(answers) : answers;
            quiz.id = nanoid();
            quiz.question;
            return quiz;
          });
          const renderedQuiz = quizz.map((quiz) => {
            const q = { id: quiz.id, answers: [], question: quiz.question };
            quiz.answers.map((answ) => {
              const correctAns = answ === quiz.correct_answer ? true : false;
              q.answers.push({
                answer: answ,
                isHeld: false,
                correct: correctAns,
              });
            });
            return q;
          });
          setRawQuizData(quizz);
          setQuizData(renderedQuiz);
        });
    }
  }, [gameStart]);

  function startGame(formData) {
    setGameStart(true);
    setOptions(formData);
  }
  function renderQuiz(quiz) {
    const { question, answers, id } = quiz;
    if (!gameFinished) {
      return (
        <div key={quiz.id} id={quiz.id} className="quiz-container">
          <h4>{decode(question)}</h4>
          {answers.map((Ans, i) => (
            <button
              key={i}
              onClick={() => answerBtnClicked({ id, btn_index: i })}
              className={Ans.isHeld ? "selected" : ""}
            >
              {decode(Ans.answer)}
            </button>
          ))}
          <hr></hr>
        </div>
      );
    } else
      return (
        <div key={quiz.id} id={quiz.id} className="quiz-container">
          <h4>{decode(question)}</h4>
          {answers.map((Ans, i) => (
            <button
              key={i}
              className={
                Ans.correct === true && Ans.isHeld === true
                  ? "correct"
                  : Ans.correct === true && Ans.isHeld === false
                  ? "correct"
                  : Ans.correct === false && Ans.isHeld
                  ? "incorrect"
                  : Ans.correct === false && Ans.isHeld === false
                  ? "neutral"
                  : "neutral"
              }
            >
              {decode(Ans.answer)}
            </button>
          ))}
          <hr></hr>
        </div>
      );
  }

  function answerBtnClicked(btnData) {
    let newQuizData = [];
    let QuizData = [...quizData];

    QuizData.forEach((quiz) => {
      if (quiz.id === btnData.id) {
        const isHeld = quiz.answers[btnData.btn_index].isHeld;
        quiz.answers.forEach((answer) => (answer.isHeld = false));
        quiz.answers[btnData.btn_index].isHeld = !isHeld;
        newQuizData.push(quiz);
      } else newQuizData.push(quiz);
    });

    setQuizData(newQuizData);
  }
  function checkAnswerBtnClicked() {
    setGameFinished(true);
    quizData.forEach((quiz) => {
      quiz.answers.forEach((answer) =>
        answer.isHeld && answer.correct
          ? setScore((prevScore) => prevScore + 1)
          : ""
      );
    });
  }

  function resetGame() {
    setGameStart(false);
    setQuizData(false);
    setRawQuizData([]);
    setQuizData([]);
    setGameFinished(false);
    setScore(0);
    setDataLoaded(false);
  }

  return (
    <main>
      {!gameStart && <MainMenu startGame={startGame} />}
      {!dataLoaded && gameStart && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {gameStart && (
        <div className="quizs-container">
          {quizData.map((quiz) => renderQuiz(quiz))}
          {dataLoaded && !gameFinished && (
            <button className="btn-secondary" onClick={checkAnswerBtnClicked}>
              Check Answers
            </button>
          )}
          {gameFinished && (
            <div className="result-container">
              <h3>
                You scored {score}/{quizData.length} correct answers
              </h3>{" "}
              <button className="btn-secondary" onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
      {!gameStart && (
        <div className="footer">Developed by Blazt ( Design from scimba )</div>
      )}
    </main>
  );
}

export default App;
