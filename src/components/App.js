import { useContext, createContext, useEffect, useReducer } from "react";

import "./style.css";
import Header from "./Header";
// import Footer from "./Footer";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Option from "./Option";
import Question from "./Question";
import ButtonAnswer from "./ButtonAnswer";
import NextButton from "./NextButton";
import Finish from "./Finish";
import Visualizer from "./Visualizer";
import Volume from "./Volume";

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

function App() {
  const [{ questions, status, index, userAnswer, audio }, dispatch] =
    useReducer(reducer, initialState);
  // Creating context
  const AudioContext = createContext();

  const numberOfQuestions = questions.length;

  //Fetching as soon as the page renders
  useEffect(function () {
    const fetchingData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); //Setting timeout on fetch call
        const response = await fetch("/data/quizData.json");
        const data = await response.json();
        //Dispatching data from fetch
        dispatch({ type: "dataReceived", payload: data.questions });
      } catch (error) {
        dispatch({ type: "quizError" });
      }
    };
    fetchingData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}

        {status === "active" && (
          //The key prop will force the audio element to be re-rendered with new song
          <>
            <Question
              questions={questions}
              audio={questions[index].audio}
              key={questions[index].questionNumber}
              correctAnswer={questions[index].correctAnswer}
              dispatch={dispatch}
              options={questions[index].options}
              userAnswer={userAnswer}
              questionNumber={questions[index].questionNumber}
              question={questions[index].question}
            />
            <NextButton
              dispatch={dispatch}
              index={index}
              userAnswer={userAnswer}
              numberOfQuestions={numberOfQuestions}
              audio={audio}
            />
            <Visualizer audio={questions[index].audio} />
          </>
        )}
        {status === "finished" && <Finish dispatch={dispatch} />}
      </Main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
