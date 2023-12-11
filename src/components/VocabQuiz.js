import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";
import Lesson from "../vocab/Vocab";
import "./VocabLesson.css";
import ActivityTracker from "./ActivityTracker";

const VocabQuiz = ({ lang, diff, index}) => {
  const [qIndex, setIndex] = useState(0);
  const [prevQIndex, setPrevQIndex] = useState(-1)

  const [lesson, setLesson] = useState(null);
  const [qState, setQState] = useState(0);
  const [result, setResult] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [inputMode, setInputMode] = useState(0);
  const [qWord, setQWord] = useState("")

  const textInputRef = useRef(null);
  const [choiceElements, setChoiceElements] = useState(null);

  const [strikeMode, setStrikeMode] = useState(false);
  const [strikes, setStrikes] = useState(3);

  const [timerMode, setTimerMode] = useState(false)
  const [seconds, setSeconds] = useState(10)

  const nav = useNavigate();
  const db = getDatabase();
  const auth = getAuth();



  useEffect(() => {
    if (qState === 0 && lesson === null) setLesson(new Lesson(lang, "beginner", index));
    else if (qState === 0 && lesson != null)  createRandomizedQuizOrder();
    else if (qState === 2) {
      if (checkEnd()) endQuiz()
      else if (qIndex !== prevQIndex) newWord()
    }
    setPrevQIndex(qIndex);
    if (timerMode) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1)
        } else {
          clearInterval(interval)
          endQuiz()
        }
      }, 1000);
      return () => clearInterval(interval)
    }

  }, [qIndex, qState, lesson, seconds]);

  const start = () => {
    setQState(2)
    newWord()
  }

  const proceed = () => {
    setIndex(qIndex + 1)
    if (timerMode) setSeconds(10)
  }

  const newWord = () => {
    setQWord(lesson.wordList[qIndex])
    createChoices(0);
  }

  const checkEnd = () => {
    return (strikeMode && strikes === 0) || (lesson.wordList.length !== 0 && qIndex >= lesson.wordList.length);
  }

  const endQuiz = () => {
    setQState(3)
    let percentage = Math.round((correctCount / lesson.wordList.length) * 100);
    const userId = auth.currentUser.uid;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then(async (snapshot) => {
          var currLang = snapshot.val().currentLang;
          var langs = snapshot.val().langs;

          if (percentage > langs[currLang].lessonProg[diff][index]) {
            langs[currLang].lessonProg[diff][index] = percentage;
          }
          let currentDate = new Date();
          const timestamp = currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
          //console.log(timestamp);
          let latestQ = {
            lang: lang,
            diff: diff,
            lessonName: lesson.lessonName,
            percentage: percentage,
            date: timestamp,
          };

          let activity = snapshot.val().activity;

          if (!activity.latestQuizActivity) {
            console.log("no latestq");
            activity = {
              latest: [""],
              latestQuizActivity: [{ lang: "", diff: "", lessonName: "" }],
              dailyTasks: [{ task: "", completed: false }],
              dailyGenDate: "",
              xp: 0,
              lvl: 1,
            };
            activity.latest = snapshot.val().activity.latest;
            activity.latestQuizActivity = [
              { lang: "", diff: "", lessonName: "" },
            ];
            activity.dailyTasks = snapshot.val().activity.dailyTasks;
            activity.dailyGenDate = snapshot.val().activity.dailyGenDate;
            activity.xp = snapshot.val().activity.xp;
            activity.lvl = snapshot.val().activity.lvl;
          }

          activity["latestQuizActivity"].push(latestQ);

          if (activity["latestQuizActivity"].length > 3)
            activity["latestQuizActivity"].shift();

          await update(ref(db, "/users/" + userId), {
            langs: langs,
            activity: activity,
          }).then(() => {
            let tracker = new ActivityTracker();
            tracker.updateLatestActivity("quiz");
          });
        });
      }
    });
  };

  const handleSwitchInputMode = useCallback(() => {
    setInputMode((prevInputModeRef) => (prevInputModeRef === 0 ? 1 : 0));
  }, [setInputMode]);

  //Handles multiple choice answers
  const handleChoice = (index) => {
    handleResult(index === 0 ? "Correct" : "Incorrect");
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
    } else if (result === "Incorrect") {
      setResult(
        "Incorrect. Correct answer is '" +
        lesson.translationList[qIndex][0] +
        "'",
      );
      if (strikeMode) {
        var s = strikes;
        s -= 1;
        console.log(s);
        setStrikes(s);
        if (s === 0) endQuiz();
      }
    }

    proceed()
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
    //setIndex(qIndex + 1);
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
    //setIndex(qIndex + 1);
    setResult(
      "Correct answer would've been '" +
      lesson.translationList[qIndex][0] +
      "'",
    );
  };

  const getSeconds = () => {
    if (!timerMode) return
    return <div><span>{seconds}</span></div>
  }

  const getStrikes = () => {
    if (!strikeMode) return "";

    let hearts = [];

    for (var i = 0; i < strikes; i++) {
      hearts.push(
        <img
          key={"strike" + i}
          src={require("../img/heart.png")}
          width="30px"
          alt="Heart"
        />,
      );
    }
    return <div className="heartscontainer">{hearts}</div>;
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

    setChoiceElements(choices)
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
    //var qWord = lesson.wordList[qIndex];
    //createChoices(qWordSwitch);

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
          <div className="quiztext col-md-2">
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
          <div className="col-md-4">{userInput(0)}</div>
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
    let elements = []

    elements.push(
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
        elements.push(
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
    setChoiceElements(elements)
    createRandomizedChoiceOrder(elements);
  };

  const lessonTitle = () => {
    return (<h1 className="lessontitle" align="center">
      {lesson.lessonName} {getStrikes()} {getSeconds()}
    </h1>)
  }


  const singleResult = () => {
    return (<div className="row justify-content-center align-items-center">
      <div className="quiztext col-md-4">{result}</div>
    </div>)
  }

  const inputSwitch = () => {
    return (<div className="row my-5 justify-content-center">
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
    </div>)
  }

  const results = () => {
    return (
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <div className="quiztext col-md-4 text-center">
            <p>{strikeMode ? "You striked out!" : ""}</p>
            You got {correctCount} out of {lesson.wordList.length} correct
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">{backButton()}</div>
        </div>
      </div>
    )
  }

  const backButton = () => {
    return (
      <button
        className="btn choice-button w-100 text-center"
        onClick={() => {
          nav("/LearnPage");
        }}
      >
        Back to lesson path
      </button>
    );
  };

  const options = () => {
    return (
      <div className="row">
        <div className="col-md-2" />
        <div className="quiztext text-center align-items-center justify-content-center col-md-6">
          <h1 className="lessontitle" align="center">
            {lesson.lessonName} ({lesson.lang} {diff})
          </h1>

          <h1 className="lessontitle" align="center">
            QUIZ OPTIONS
          </h1>
          <div>
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={strikeMode}
                onChange={() => setStrikeMode(!strikeMode)}
                style={{ transform: "scale(1.5)" }}
              />
              <span style={{ marginLeft: "8px" }}>3 strikes mode</span>
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="checkbox2"
                checked={timerMode}
                onChange={() => setTimerMode(!timerMode)}
                style={{ transform: "scale(1.5)" }}
              />
              <span style={{ marginLeft: "8px" }}>Timer mode</span>
            </label>
          </div>
          <button
            className="btn choice-button w-100 text-center"
            onClick={(e) => start()}
          >
            Start quiz
          </button>
          {backButton()}
        </div>
        <div className="col-md-2" />
      </div>
    );
  };

  if (qState === 1) return options();
  if (qState === 2) return (
    <div className="quizelements">
      <div className="container-fluid ">
        {lessonTitle()}
        {quizWord()}
        {singleResult()}
        {inputSwitch()}
      </div>
    </div>
  );
  if (qState === 3) return results()

};

export default VocabQuiz;