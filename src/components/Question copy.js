import React, { useEffect, useRef, useState, useContext } from "react";
import Visualizer from "./Visualizer";
import NextButton from "./NextButton";
import { PostContext } from "./App";

//TODO 1. ⭐Set default volume of autoplay to 50%⭐
//TODO 2. ⛔Move audio controls to the side and remove all buttons except the play/pause button⛔
//TODO 3. ⛔Make audio volume, and mute option a global state using CONTEXT API⛔
//TODO 4. ⛔Add quiz timer and scoring option and make them as global using CONTEXT API⛔
//TODO 5. ⭐ Add classes/styles to right and wrong answers - RESOLVED ⭐
//TODO 6. ⛔Add question timer⛔
//TODO 7. ⭐Move footer to the center of the page in the initial page and remove it from the actual game⭐
//TODO 8. ⛔ Make a Button sub component ⛔
//TODO 9. ⛔Move the "NEXT" button to be in the center of the grid in Question component⛔
//TODO 10.⛔Add project to GitHub⛔
//TODO 11.⛔Add project to the GitHub pages⛔
//TODO 12.⛔Refactor code: check if it is possible to split existing components into smaller components⛔
//TODO 13.⛔Review css styles and add new if it is required (colors, typography etc.)⛔
//TODO 14.⛔Add responsivness to the project (media query)⛔
// import Option from "./Option";

export default function Question({
  question,
  questionNumber,
  options,
  audio,
  dispatch,
  userAnswer,
  correctAnswer,
  questions,
}) {
  // const audioRef = useRef();
  // const random = options.sort(() => Math.floor(Math.random() * 10) + 1);
  const handleStopAudio = () => {
    // visual.playPause();
    // if (audioRef.current) {
    //   audioRef.current.pause();
  };
  // };
  // const postContext = useContext(PostContext);
  // const {
  //   questions,
  //   question,
  //   questionNumber,
  //   options,
  //   audio,
  //   dispatch,
  //   userAnswer,
  //   correctAnswer,
  // } = postContext;

  const hasAnswered = userAnswer !== null;
  return (
    <section className="quiz">
      <header className="quiz_header">
        <h1>Question number {questionNumber}:</h1>
        <p>{question}</p>
      </header>
      <div className="options">
        {/* map method which will filter options, add disabled if the "hasAnswered" is true */}
        {options.map((option, index) => (
          <button
            key={option}
            disabled={hasAnswered}
            //! Double nested ternary operator which will check if the hasAnswer is true (step into nested ternary), or do nothing with class
            //! In case that the answer is true, setp inside and check if the answer that user clicked is the answer that is correct (from the json file)
            className={`btn btn_option btn_option_${index + 1} ${
              hasAnswered
                ? index === userAnswer
                  ? index === correctAnswer
                    ? "correct disabled"
                    : "wrong disabled"
                  : index !== correctAnswer
                  ? "wrong disabled"
                  : "correct disabled"
                : ""
            }`}
            // Dispatch bringing back the payload to the case

            onClick={() => {
              handleStopAudio();

              dispatch({ type: "newUserAnswer", payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <NextButton />
    </section>
  );
}
