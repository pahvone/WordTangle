import React, { useState, useRef, useCallback } from "react";
import "./VocabLesson.css";
import Lesson from "../vocab/Vocab";
import VocabQuiz from "./VocabQuiz";
import NavBar from "./NavBar";

class LangPath {}

const LessonPath = (_language) => {
  const [pathLessons, setPathLessons] = useState([]);
  const [lesson, setLesson] = useState({});
  const [language, setLanguage] = useState("");
  const [lessonButtons, setLessonButtons] = useState({});

  const getPathLessons = () => {
    var les = new Lesson("FIN", 1);
    //setPathLessons([les]);

    var buttonElements = [];

    console.log(les.lessonName);

    buttonElements.push(
      <button
        className="btn choice-button w-100 text-center"
        onClick={() => (window.location = "/LessonPage")}
      >
        {les.lessonName}
      </button>,
    );

    setLessonButtons(buttonElements);
  };

  if (language.length === 0) {
    setLanguage("Finnish"); //_language
    getPathLessons();
  }

  return (
    <div>
      <NavBar />
      <div className="container-fluid ">
        <div className="row justify-content-center align-items-center">
          <h1>{language}</h1>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4">{lessonButtons}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonPath;
