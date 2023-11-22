import React, { useState, useRef, useCallback } from "react";
import "./VocabLesson.css";
import "../App.css";
import Lesson from "../vocab/Vocab";
import VocabQuiz from "./VocabQuiz";
import NavBar from "./NavBar";
import Footer from "./Footter";

class LangPath {}

const LessonPath = (_language) => {
  const [pathLessons, setPathLessons] = useState([]);
  const [lesson, setLesson] = useState({});
  const [language, setLanguage] = useState("");
  const [lessonButtons, setLessonButtons] = useState([]);
  const [beginnerButtons, setBeginnerButtons] = useState([]);
  const [intermediateButtons, setIntermediateButtons] = useState([]);
  const [advacedButtons, setAdvancedButtons] = useState([]);
  const [flagMenu, setFlagMenu] = useState(false);

  const toggleDropdown = () => {
    setFlagMenu(!flagMenu);
  };

  const getPathLessons = () => {
    var les = new Lesson("FIN", 1);
    //setPathLessons([les]);

    var buttonElements = [];

    var _beginnerButtons = [];
    var _intermediateButtons = [];
    var _advancedButtons = [];

    console.log(les.lessonName);

    _beginnerButtons.push(
      <button
        key="lessonbutton-complete"
        className="lessonbutton-complete text-center"
        onClick={() => (window.location = "/LessonPage")}
      >
        {" "}
        {les.lessonName}{" "}
      </button>,
    );

    _intermediateButtons.push(
      <button
        key="lessonbutton-incomplete"
        className="lessonbutton-incomplete text-center"
        onClick={() => (window.location = "/LessonPage")}
      >
        {" "}
        {les.lessonName}{" "}
      </button>,
    );

    _advancedButtons.push(
      <button
        key="lessonbutton-disabled"
        className="lessonbutton-disabled text-center"
        onClick={() => (window.location = "/LessonPage")}
      >
        {" "}
        {les.lessonName}{" "}
      </button>,
    );

    setBeginnerButtons(_beginnerButtons);
    setIntermediateButtons(_intermediateButtons);
    setAdvancedButtons(_advancedButtons);
  };

  if (language.length === 0) {
    setLanguage("Finnish"); //_language
    getPathLessons();
  }

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="dashboardelements">
          <div className="boxcontainer">

            <div className="lessonstitle">LESSONS &gt;&gt;
              <span className="language-title"> {language}</span>
              <button className="btn" onClick={toggleDropdown}>
                {" "}
                <img src="https://flagsapi.com/FI/flat/64.png" />
              </button>
              <div className="flag-dropdown-container">
                {flagMenu && (
                  <div className="flag-dropdown-content">
                    <p>
                      <img src="https://flagsapi.com/BE/flat/64.png" />
                    </p>
                    <p>
                      <img src="https://flagsapi.com/GR/flat/64.png" />
                    </p>
                    <p>
                      <img src="https://flagsapi.com/ES/flat/64.png" />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="greycontainer">
              <div className="difficulty-title">Beginner</div>
              <div className="dashline" />
              <div>{beginnerButtons}</div>
            </div>
          </div>
        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="difficulty-title">Intermediate</div>
              <div className="dashline" />
              <div>{intermediateButtons}</div>
            </div>
          </div>
        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="difficulty-title">Advanced</div>
              <div className="dashline" />
              <div>{advacedButtons}</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LessonPath;
