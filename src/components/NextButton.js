import React from "react";

export default function NextButton({
  dispatch,
  index,
  userAnswer,
  numberOfQuestions,
  audio,
}) {
  const isLastQuestion = index === numberOfQuestions - 1;
  if (userAnswer === null) return null;
  if (index < numberOfQuestions - 1)
    return (
      <button
        className="btn btn_secondary"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next question
      </button>
    );
  if ((index = numberOfQuestions))
    return (
      <button
        className="btn btn_secondary"
        onClick={() =>
          dispatch({
            type: "finish",
            audio: isLastQuestion ? null : audio,
          })
        }
      >
        Finish quiz
      </button>
    );
}
