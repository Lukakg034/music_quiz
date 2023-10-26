import { createContext, useReducer } from "react";

//1 Create context
export const PostContext = createContext();

const initialState = {
  // Quiz status: "loading", "ready", "active", "finished", "error"
  questions: [],
  status: "loading",
  index: 0,
  questionNumber: 0,
  audio: null,
  userAnswer: null,
  correctAnswer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "quizError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newUserAnswer":
      // console.log("User selected option: ", action.payload);
      return { ...state, userAnswer: action.payload };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        userAnswer: null,
        audio: state.questions[state.index + 1].audio,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Action unknown");
  }
}
export default function AppProvider({ children }) {
  const [{ questions, status, index, userAnswer, audio }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <PostContext.Provider
      value={{
        questions: questions,
        status: status,
        index: index,
        userAnswer: userAnswer,
        audio: audio,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
