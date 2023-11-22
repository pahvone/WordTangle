import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Lesson from "../vocab/Vocab";
import "./VocabLesson.css";

const VocabLesson = ({lang, diff, index}) => {
  const [qIndex, setIndex] = useState(0);
  const [lesson, setLesson] = useState(null);
  const [qState, setQState] = useState(0);
  const [result, setResult] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [inputMode, setInputMode] = useState(0);
  const [wordGenerated, setWordGenerated] = useState(false);

  const textInputRef = useRef(null);

  const choiceElements = [];

  const nav = useNavigate();

  const endQuiz = () => {
    if (lesson.wordList.length !== 0 && qIndex >= lesson.wordList.length)
      return true;
    else return false;
  };

  const handleSwitchInputMode = useCallback(() => {
    setInputMode((prevInputModeRef) => (prevInputModeRef === 0 ? 1 : 0));
  }, [setInputMode]);

  //Handles multiple choice answers
  const handleChoice = (index) => {
    if (index === 0) handleResult("Correct");
    else handleResult("Incorrect");
  };

  const handleResult = (result) => {
    if (result === "Correct") {
      setResult("Correct!");
      setCorrectCount(correctCount + 1);
    } else if (result === "Typoed") {
      setResult(
        "You might have a typo. You answered '" +
          textInputRef.current.value +
          "'. Correct answer is '" +
          lesson.translationList[qIndex][0] +
          "'",
      );
      setCorrectCount(correctCount + 1);
    } else if (result === "Incorrect")
      setResult(
        "Incorrect. Correct answer is '" +
          lesson.translationList[qIndex][0] +
          "'",
      );

    setIndex(qIndex + 1);
    setWordGenerated(false);
  };

  //Handles text input answers
  const handleTextInput = (event, qWordSwitch) => {
    event.preventDefault();

    //later for iterating through all possible answers
    /*for(var i = 0; i < lesson.translationList[qIndex].length; i++){
            
        }*/
    let compareTo = "";
    if (qWordSwitch === 0) compareTo = lesson.translationList[qIndex];
    else compareTo = lesson.wordList[qIndex];
    var correct = false;

    if (Array.isArray(compareTo))
      correct =
        textInputRef.current.value === compareTo[0] ||
        textInputRef.current.value === compareTo[1];
    else
      correct =
        textInputRef.current.value === compareTo ||
        textInputRef.current.value === compareTo;

    if (!correct) {
      //Check for typos
      const input = textInputRef.current.value.split("");
      let typoCompare = "";
      if (Array.isArray(compareTo)) typoCompare = compareTo[0].split("");
      else typoCompare = compareTo.split("");

      let typoCount = 0;

      for (
        let i = 0, j = 0;
        i < input.length && j < typoCompare.length;
        i++, j++
      ) {
        if (input[i] !== typoCompare[j]) {
          typoCount++;
          if (input.length > typoCompare.length) j--;
          else if (input.length < typoCompare.length) i--;
        }
        if (typoCount < 2) handleResult("Typoed");
        if (typoCount > 1) handleResult("Incorrect");
      }
    } else {
      handleResult("Correct");
    }

    textInputRef.current.value = "";
    setIndex(qIndex + 1);
  };

  //Returns a text input form if inputMode == 1
  const userInput = (qWordSwitch) => {
    if (inputMode === 0) return choiceElements;
    else
      return (
        <div>
          <span className="align-middle">
            <div className="formDiv">
              <form onSubmit={(e) => handleTextInput(e, qWordSwitch)}>
                <p>
                  <input
                    ref={textInputRef}
                    className="form-control form-control-lg"
                    type="text"
                    id="char"
                    required
                  ></input>
                </p>
                <p>
                  <button type="submit" className="btn styled-button w-100">
                    Submit
                  </button>
                </p>
              </form>
            </div>
          </span>
        </div>
      );
  };

  const handleSkip = () => {
    setIndex(qIndex + 1);
    setResult(
      "Correct answer would've been '" +
        lesson.translationList[qIndex][0] +
        "'",
    );
  };

  const randNumber = (max) => {
    return Math.floor(Math.random() * (max - 1 + 1)) + 0;
  };

  //Randomizes the order of the entries in the quiz
  const createRandomizedQuizOrder = () => {

    for (var i = 0; i < lesson.wordList.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [lesson.wordList[i], lesson.wordList[j]] = [
        lesson.wordList[j],
        lesson.wordList[i],
      ];
      [lesson.translationList[i], lesson.translationList[j]] = [
        lesson.translationList[j],
        lesson.translationList[i],
      ];
    }

    setQState(1);

    //console.log(lesson.wordList);
    //console.log(lesson.translationList);
  };

  //Randomizes the order of the multiple choices
  const createRandomizedChoiceOrder = (choices) => {
    for (var i = 0; i < choices.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
  };

  //Generate unique wrong answers from the rest of the wordlist
  const createWrongAnswers = (exclude) => {
    let indexes = [];

    for (var i = 0; i < 3; i++) {
      let randIndex = randNumber(lesson.wordList.length);

      while (indexes.includes(randIndex) || randIndex === exclude) {
        randIndex = randNumber(lesson.wordList.length);
      }
      indexes.push(randIndex);
    }
    return indexes;
  };

  //Generate the currently quizzed word
  const quizWord = () => {
    //if(wordGenerated == true) return;

    let qWordSwitch = 0;
    var qWord = lesson.wordList[qIndex];
    createChoices(qWordSwitch);

    // randomly switch quizzed word to the other lang.
    // currently changing input mode breaks this because re-render
    /*
        let qWordSwitch = Math.floor(Math.random() * 2);
        console.log("quizword() " + qWordSwitch);
        createChoices(qWordSwitch)
        var qWord = ""


        if (qWordSwitch == 0) qWord = lesson.wordList[qIndex]
        else qWord = lesson.translationList[qIndex][0]*/
    //setWordGenerated(true);

    return (
      <div>
        <div className="row justify-content-center align-items-center">
          <div className="quiztext col-2">
            {qIndex + 1} / {lesson.wordList.length}
          </div>
          <div className="col-md-5 wordcontainer">{qWord}</div>
          <div className="col-md-3">
            <button
              className="btn skip-button w-100 text-center"
              onClick={() => handleSkip()}
            >
              Skip
            </button>
          </div>
        </div>
        <div className="row my-5 justify-content-center">
          <div className="col-md-4">{userInput(qWordSwitch)}</div>
        </div>
      </div>
    );
  };

  //Generate answer choices for the currently quizzed word
  const createChoices = (qWordSwitch) => {
    let word = "";
    word = lesson.translationList[qIndex][0];

    if (qWordSwitch === 0) word = lesson.translationList[qIndex][0];
    else if (qWordSwitch === 1) word = lesson.wordList[qIndex];

    choiceElements.push(
      <div key={"button0"} className="row">
        <div className="col-md-10 text-center">
          <button
            className="btn choice-button w-100 text-center"
            onClick={() => handleChoice(0)}
          >
            {word}
          </button>
        </div>
      </div>,
    );

    let wrongAnswers = createWrongAnswers(qIndex);

    for (var i = 0; i < 3; i++) {
      word = lesson.translationList[wrongAnswers[i]][0];
      if (qWordSwitch === 0) word = lesson.translationList[wrongAnswers[i]][0];
      else if (qWordSwitch === 1) word = lesson.wordList[wrongAnswers[i]];

      (function (index) {
        choiceElements.push(
          <div key={"button" + (i + 1)} className="row">
            <div className="col-md-10 text-center">
              <button
                className="btn choice-button w-100 text-center"
                onClick={() => handleChoice(index + 1)}
              >
                {word}
              </button>
            </div>
          </div>,
        );
      })(i);
    }

    createRandomizedChoiceOrder(choiceElements);
  };

  //////////////////////////////////////////////////////////

  //Quiz state machine

  if (qState === 0 && lesson === null) {
    setLesson(new Lesson(lang, "beginner", index)); // < get index from LessonPath

  } else if (qState === 0 && lesson != null) {
    createRandomizedQuizOrder();
  } 
  else if (qState === 1) {
    if (!endQuiz()) {
      //console.log("quizIndex " + qIndex + " word " + lesson.wordList[qIndex])

      return (
        <div className="quizelements">
          <div className="container-fluid ">
            <h1 className="lessontitle" align="center">
              {lesson.lessonName}
            </h1>

            {quizWord()}
            <div className="row justify-content-center align-items-center">
              <div className="quiztext col-md-4">{result}</div>
            </div>
            <div className="row my-5 justify-content-center">
              <div className="col-md-4">
                {" "}
                <button
                  className="btn skip-button w-100 text-center"
                  onClick={handleSwitchInputMode}
                >
                  {inputMode === 0
                    ? "Answer in writing"
                    : "Multiple choice answers"}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid ">
          <div className="row justify-content-center align-items-center">
            <div className="quiztext col-md-4">
              You got {correctCount} out of {lesson.wordList.length} correct
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4">
              <button
                className="btn choice-button w-100 text-center"
                onClick={() => {nav("/LessonPath")}}
              >
                Back to lesson path
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default VocabLesson;
