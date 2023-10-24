import React from "react";

export default function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="startScreen">
      <h1>
        There are {numberOfQuestions} questions to test your music knowledge
      </h1>
      <button
        className="btn btn_option btn_start"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
}
