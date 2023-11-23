import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./VocabLesson.css";
import "../App.css";
import NavBar from "./NavBar";
import Footer from "./Footter";
import LangPath from "./LangPath";

const LessonPath = (_language) => {
  const [langPathSelected, setLangPathSelected] = useState(null);
  const [langPath, setLangPath] = useState(null);
  const [lessonsLoaded, setLessonsLoaded] = useState(false);
  const [beginnerButtons, setBeginnerButtons] = useState([]);
  const [intermediateButtons, setIntermediateButtons] = useState([]);
  const [advancedButtons, setAdvancedButtons] = useState([]);
  const [flagMenu, setFlagMenu] = useState(false);

  const nav = useNavigate();
  const flagsAPI = "https://flagsapi.com/";
  const flagStyle = "/flat/64.png";

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

    console.log(langPath);
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
    if (langPathSelected === null) {
      // get current langpath from database
      // setLangPath(new LangPath("FI"));
      // setLangPathSelected(true)
    } else if (langPathSelected === false) {
    }

    // if no langpath in db
    // setLangPathSelected(false)
  } else if (!lessonsLoaded) getPathLessons();

  const lessonContainers = () => {
    return (
      <>
        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Beginner</div>
            <div className="dashline" />
            <div>{beginnerButtons}</div>
          </div>
        </div>

        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Intermediate</div>
            <div className="dashline" />
            <div>{intermediateButtons}</div>
          </div>
        </div>

        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Advanced</div>
            <div className="dashline" />
            <div>{advancedButtons}</div>
          </div>
        </div>
      </>
    );
  };
  const setLang = (lang) => {
    setLangPath(new LangPath(lang));
    setLangPathSelected(true);
  };

  const getLangFlags = () => {
    //get these from some db
    let langs = ["FI", "ES"];

    let langFlags = [];

    for (let i = 0; i < langs.length; i++) {
      langFlags.push(
        <button
          key={"lang" + i}
          className="btn"
          onClick={() => setLang(langs[i])}
        >
          <img src={flagsAPI + langs[i] + flagStyle} />
        </button>,
      );
    }

    return langFlags;
  };

  const langDropDown = () => {
    //get these from some db
    let langs = ["FI", "ES"];

    let langFlags = [];

    var exclude = 0;

    for (let i = 0; i < langs.length; i++) {
      if (langPath.lang === langs[i]) {
        exclude = i;
        break;
      }
    }

    for (let i = 0; i < langs.length; i++) {
      console.log(langs[i]);
      if (i != exclude) {
        langFlags.push(
          <p key={"dropdownflag" + i}>
            <button
              key={"lang" + i}
              className="btn"
              onClick={() => setLang(langs[i])}
            >
              <img src={flagsAPI + langs[i] + flagStyle} />
            </button>
          </p>,
        );
      }
    }
    return (
      <>
        <button className="btn" onClick={toggleDropdown}>
          {" "}
          <img src={flagsAPI + langPath.lang + flagStyle} />
        </button>

        <div className="flag-dropdown-container">
          {flagMenu && <div className="flag-dropdown-content">{langFlags}</div>}
        </div>
      </>
    );
  };

  const languageSelection = () => {
    return (
      <div className="lessoncontainer">
        <div className="greycontainer">
          <div className="difficulty-title">Please choose a language</div>
          <div className="dashline" />
          <div>
            Start learning new languages now!!!!!!!{" "}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqiP3Z1VUfzab1N2SpD1IJhzfkyuN3TjmT8jyseqS&s" />
          </div>
          <div>{getLangFlags()}</div>
        </div>
      </div>
    );
  };

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
              {langPath === null ? "" : langDropDown()}
            </div>
          </div>
        </div>

        <div className="lessonselements">
          {langPathSelected ? lessonContainers() : languageSelection()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonPath;
