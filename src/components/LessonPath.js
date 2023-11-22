import React, { useState, useRef, useCallback } from "react";
import "./VocabLesson.css";
import "../App.css";
import Lesson from "../vocab/Vocab";
import VocabQuiz from "./VocabQuiz";
import NavBar from "./NavBar";
import Footer from "./Footter";

class LangPath { }

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
        key="uniquefunnyid" //required for testing for each item
        /*
        i can handle it in the future when you add more
        just posting error here for context:
        */
        /*
        Warning: Each child in a list should have a unique "key" prop.

        Check the render method of `LessonPath`. See https://reactjs.org/link/warning-keys for more information.
          at button
          at LessonPath (D:\S23proj\WordTangle\src\components\LessonPath.js:11:49)
          at Router (D:\S23proj\WordTangle\node_modules\react-router\lib\components.tsx:383:13)
          at BrowserRouter (D:\S23proj\WordTangle\node_modules\react-router-dom\index.tsx:717:3)
        */
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
      <div className="pagecontainer">

        <div className="dashboardelements">
          <div className="boxcontainer">

            <div className="title">LESSONS &gt;&gt; {language} </div>
            <div className="greycontainer">
              <div className="difficulty-title">Beginner</div>
              <div className="dashline" />
              <div >{lessonButtons}</div>
            </div>
          </div>

        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="difficulty-title">Intermediate</div>
              <div className="dashline" />
              <div >{lessonButtons}</div>
            </div>
          </div>
        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="difficulty-title">Advanced</div>
              <div className="dashline" />
              <div >{lessonButtons}</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LessonPath;
