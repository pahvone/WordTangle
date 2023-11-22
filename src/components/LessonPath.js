import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./VocabLesson.css";
import "../App.css";
import Lesson from "../vocab/Vocab";
import NavBar from "./NavBar";
import Footer from "./Footter";
import LangPath from "./LangPath";

const LessonPath = (_language) => {
  const [pathLessons, setPathLessons] = useState([]);
  const [lesson, setLesson] = useState({});
  const [langPath, setLangPath] = useState(null);
  const [lessonsLoaded, setLessonsLoaded] = useState(false);
  const [lessonButtons, setLessonButtons] = useState([]);
  const [beginnerButtons, setBeginnerButtons] = useState([]);
  const [intermediateButtons, setIntermediateButtons] = useState([]);
  const [advacedButtons, setAdvancedButtons] = useState([]);
  const [flagMenu, setFlagMenu] = useState(false);

  const nav = useNavigate();

  const toggleDropdown = () => {
    setFlagMenu(!flagMenu);
  };

  const startLesson = (_index, _diff) => {
    nav(
      `/LessonPage?lang=` +
        langPath.lang +
        "&diff=" +
        _diff +
        "&index=" +
        _index,
    );
  };

  const getPathLessons = () => {
    var _beginnerButtons = [];
    var _intermediateButtons = [];
    var _advancedButtons = [];

    //console.log(langPath.lessons["intermediate"].length);

    //Beginner lessons//
    var lessons = langPath.lessons["beginner"];

    for (let i = 0; i < lessons.length; i++) {
      var buttonKey = "lessonbutton" + "complete" + i; //from state
      _beginnerButtons.push(
        <button
          key={buttonKey}
          className="lessonbutton-complete text-center"
          onClick={() => startLesson(i, "beginner")}
        >
          {" "}
          {lessons[i].name}{" "}
        </button>,
      );
    }

    //Intermediate lessons//
    lessons = langPath.lessons["intermediate"];

    for (let i = 0; i < lessons.length; i++) {
      _intermediateButtons.push(
        <button
          key="lessonbutton-incomplete"
          className="lessonbutton-incomplete text-center"
          onClick={() => startLesson(i, "intermediate")}
        >
          {" "}
          {lessons[i].name}{" "}
        </button>,
      );
    }

    //Advanced lessons//
    lessons = langPath.lessons["advanced"];

    for (let i = 0; i < lessons.length; i++) {
      _advancedButtons.push(
        <button
          key="lessonbutton-disabled"
          className="lessonbutton-disabled text-center"
          onClick={() => startLesson(i, "advanced")}
        >
          {" "}
          {lessons[i].name}{" "}
        </button>,
      );
    }

    setBeginnerButtons(_beginnerButtons);
    setIntermediateButtons(_intermediateButtons);
    setAdvancedButtons(_advancedButtons);

    setLessonsLoaded(true);
  };

  if (langPath === null) {
    setLangPath(new LangPath("FI"));
  } else if (!lessonsLoaded) getPathLessons();

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="lessonstitle">
              LESSONS &gt;&gt;
              <span className="language-title">
                {" "}
                {langPath === null ? "No language chosen" : langPath.langDesc}
              </span>
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
      </div>
      <Footer />
    </div>
  );
};

export default LessonPath;
