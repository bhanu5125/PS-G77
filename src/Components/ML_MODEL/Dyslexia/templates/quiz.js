import { React, useState, useEffect } from "react";
import axios from "axios";
import "./curve.css";
import oimage from "../assets/o-image.png";
import { useNavigate } from "react-router-dom";
import image0 from "../assets/0-image.png";
import grapes from "../assets/grapeimg.png";
import Gimage from "../assets/g-image.png";
import Simage from "../assets/s-image.png";
import Cat from "../assets/cat.png";
import Bimage from "../assets/B-image.png";
import Dog from "../assets/dog.png";
import Righthand from "../assets/righthand.png";
import Lefthand from "../assets/lefthand.png";
import Ssound from "../assets/s-sound.mp3";
import lakesound from "../assets/lake-sound.mp3";

function DQuiz() {
  const [questions] = useState([
    {
      id: 1,
      text: "Check whether these two alphabets are same or not?",
      options: ["Yes", "No"],
      answer: "Yes",
      img1: oimage,
      img2: image0,
      mp3: "null",
    },
    {
      id: 2,
      text: "Guess the fruit in the picture below.",
      options: ["Grapes", "Orange", "Banana", "Mango"],
      answer: "Grapes",
      img1: grapes,
      img2: "null",
      mp3: "null",
    },
    {
      id: 3,
      text: "Check whether these two alphabets are same or not?",
      options: ["Yes", "No"],
      answer: "No",
      img1: Gimage,
      img2: Simage,
      mp3: "null",
    },
    {
      id: 4,
      text: "Which letter is G?",
      options: ["First", "Second"],
      answer: "First",
      img1: Gimage,
      img2: oimage,
      mp3: "null",
    },
    {
      id: 5,
      text: "Which letter CAT starts with?",
      options: ["K", "S", "C"],
      answer: "C",
      img1: Cat,
      img2: "null",
      mp3: "null",
    },
    {
      id: 6,
      text: "What is the smaller version of this letter?",
      options: ["d", "b"],
      answer: "b",
      img1: Bimage,
      img2: "null",
      mp3: "null",
    },
    {
      id: 7,
      text: "What do you hear?",
      options: ["F", "S"],
      answer: "S",
      mp3: Ssound,
      img1: "null",
      img2: "null",
    },
    {
      id: 8,
      text: "What do you see in the picture?",
      options: ["DOG", "GOD"],
      answer: "DOG",
      img1: Dog,
      img2: "null",
      mp3: "null",
    },
    {
      id: 9,
      text: "Which hand is left and Which hand is right?",
      options: [
        "First one is right and next one is left",
        "First one is left and next one is right",
      ],
      answer: "First one is right and next one is left",
      img1: Righthand,
      img2: Lefthand,
      mp3: "null",
    },
    {
      id: 10,
      text: "What do you hear?",
      options: ["CAKE", "LAKE", "TAKE", "FAKE"],
      answer: "LAKE",
      mp3: lakesound,
      img1: 'null',
      img2: 'null',
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [Prediction, setPrediction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleRadioChange = (option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = option;

      return updatedAnswers;
    });
  };


  const progress = ((currentQuestionIndex + 1) / 10) * 100;
  const handleNext = () => {
    setAnimate(true);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setAnimate(false), 1000);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const selectedOption = answers[currentQuestionIndex];
    const modelValues = answers.map((selectedOption, index) =>
      selectedOption === questions[index].answer ? 4 : 0
    );

    try {
      const response = await axios.post("http://127.0.0.1:5001/quizz", {
        answers: modelValues,
      });
      setSubmitted(true);
      navigate("/DSurvey", { state: { vals: response.data.scr } });
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
    <div className="servey d-flex align-items-center justify-content-center  z-2 ">
      <div className="d-flex  mt-5 shadow-lg rounded-5 flex-column w-50  gap-3  pt-5 ps-5  h-100">
        <div className="progress-container">
          <div
            className={`progress-bar ${animate ? "animate" : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2>Survey Form</h2>
        <form onSubmit={handleSubmit}>
          {questions.length > 0 && (
            <div className="d-flex flex-column align-items-start justify-content-center h-100">
              <div className="d-flex  flex-row gap-3">
                {questions[currentQuestionIndex].img1 != "null" ? (
                  <img
                    src={questions[currentQuestionIndex].img1}
                    className="img5"
                  ></img>
                ) : null}
                {questions[currentQuestionIndex].img2 != "null" ? (
                  <img
                    src={questions[currentQuestionIndex].img2}
                    className="img5"
                  ></img>
                ) : null}
                {questions[currentQuestionIndex].mp3 != "null" ? (
                  <audio controls>
                    <source
                      type="audio/mp3"
                      src={questions[currentQuestionIndex].mp3}
                    ></source>
                  </audio>
                ) : null}
              </div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {questions[currentQuestionIndex].text}
              </p>

              {questions[currentQuestionIndex].options.map((option) => (
                <label
                  key={option}
                  className="d-flex  flex-row gap-1 m-1"
                  style={{ fontFamily: "Poppins", fontSize: "18px" }}
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleRadioChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={handlePrev}
              className=" btn"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className=" btn"
              disabled={
                currentQuestionIndex === questions.length - 1 ||
                answers[currentQuestionIndex] === undefined
              }
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 && (
              <button
                className="btn  "
                disabled={answers[currentQuestionIndex] === undefined}
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DQuiz;
