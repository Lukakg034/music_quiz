import React from "react";

export default function Finish({ dispatch }) {
  return (
    <>
      <div>🎉 You have finished quiz! 🎉</div>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn_secondary"
      >
        Restart quiz
      </button>
    </>
  );
}
