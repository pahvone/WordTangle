import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";
import "./VocabLesson.css";
import "../App.css";
import NavBar from "./NavBar";
import Footer from "./Footter";
import { LangPath, UserLangs as UserLangs } from "./LangPath";

const LessonPath = (_language) => {
  const [langPathSelected, setLangPathSelected] = useState(null);
  const [langPath, setLangPath] = useState(null);
  const [lessonsLoaded, setLessonsLoaded] = useState(false);

  const [langSelection, setLangSelection] = useState(false);

  const [currentLang, setCurrentLang] = useState(null);
  const [userLangs, setUserLangs] = useState(null);

  const [lessonButtons, setLessonButtons] = useState({
    beginner: [],
    intermediate: [],
    advanced: [],
  });

  const [flagMenu, setFlagMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const db = getDatabase();
  const auth = getAuth();

  const { state } = useLocation();

  const redirect = useNavigate();
  const flagsAPI = "https://flagsapi.com/";
  const flagStyle = "/flat/64.png";

  const LessonButton = ({ className, onClick, text, disabled }) => (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );

  const toggleDropdown = () => {
    setFlagMenu(!flagMenu);
  };

  const startLesson = (_index, _diff) => {
    redirect(`/LessonPage?lang=${langPath.lang}&diff=${_diff}&index=${_index}`);
  };

  const allComplete = (difficulty) => {
    if (difficulty === "beginner") return true;
    let allComplete = true;

    if (difficulty === "intermediate") {
      for (
        var i = 0;
        i < userLangs[currentLang].lessonProg["beginner"].length;
        i++
      ) {
        if (userLangs[currentLang].lessonProg["beginner"][i] !== 100)
          allComplete = false;
      }
    } else if (difficulty === "advanced") {
      for (
        var i = 0;
        i < userLangs[currentLang].lessonProg["intermediate"].length;
        i++
      ) {
        if (userLangs[currentLang].lessonProg["intermediate"][i] !== 100)
          allComplete = false;
      }
    }
    return allComplete;
  };

  const createLessonButtons = (lessons, difficulty, onClick, prog) => {
    return lessons.map((lesson, index) => (
      <LessonButton
        key={`lessonbutton-${difficulty}-${index}`}
        className={`lessonbutton-${
          !allComplete(difficulty)
            ? "disabled"
            : prog[index] === 100
              ? "complete"
              : "incomplete"
        }`}
        onClick={() => onClick(index, difficulty.toLowerCase())}
        text={lesson.name + " (" + prog[index] + "%)"}
        disabled={!allComplete(difficulty)}
      />
    ));
  };

  const generateLessonButtons = (lang) => {
    let lessonProg = userLangs[lang].lessonProg;

    setLessonButtons({
      ...lessonButtons,
      beginner: createLessonButtons(
        langPath.lessons["beginner"],
        "beginner",
        startLesson,
        lessonProg.beginner,
      ),
      intermediate: createLessonButtons(
        langPath.lessons["intermediate"],
        "intermediate",
        startLesson,
        lessonProg.intermediate,
      ),
      advanced: createLessonButtons(
        langPath.lessons["advanced"],
        "advanced",
        startLesson,
        lessonProg.advanced,
      ),
    });

    setLessonsLoaded(true);
    setLoaded(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userId = auth.currentUser.uid;
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          if (snapshot.val().langs === undefined) {
            setLangPathSelected(false);
            setLangSelection(true);
          } else {
            initLangPath(snapshot.val());
          }
        });
      }
    });
  }, []);

  const initLangPath = (data) => {
    setUserLangs(data.langs);
    setLangPath(new LangPath(data.currentLang));
    setCurrentLang(data.currentLang);
    setLangPathSelected(true);
  };

  if (
    langPathSelected &&
    !lessonsLoaded &&
    userLangs &&
    userLangs[currentLang]
  ) {
    generateLessonButtons(currentLang);
  }

  const lessonContainers = () => {
    return (
      <>
        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Beginner</div>
            <div className="dashline" />
            <div>{lessonButtons.beginner}</div>
          </div>
        </div>

        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Intermediate</div>
            <div className="dashline" />
            <div>{lessonButtons.intermediate}</div>
          </div>
        </div>

        <div className="lessoncontainer">
          <div className="greycontainer">
            <div className="difficulty-title">Advanced</div>
            <div className="dashline" />
            <div>{lessonButtons.advanced}</div>
          </div>
        </div>
      </>
    );
  };

  const updateLangsToDB = async (newLangPath) => {
    const userId = auth.currentUser.uid;

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            if (!snapshot.val().langs) {
              console.log("No langs in db, creating");

              let langs = {};
              langs[newLangPath.lang] = {
                lessonProg: {
                  beginner: [],
                  intermediate: [],
                  advanced: [],
                },
              };

              langs[newLangPath.lang] = new UserLangs(newLangPath);

              update(ref(db, "/users/" + userId), {
                langs: langs,
                currentLang: newLangPath.lang,
              });

              setUserLangs(langs);
            } else {
              if (!snapshot.val().langs[newLangPath.lang]) {
                console.log("Lang not currently in db, creating");
                let langs = userLangs;

                langs[newLangPath.lang] = {
                  lessonProg: {
                    beginner: [],
                    intermediate: [],
                    advanced: [],
                  },
                };

                langs[newLangPath.lang] = new UserLangs(newLangPath);
                update(ref(db, "/users/" + userId), {
                  langs: langs,
                  currentLang: newLangPath.lang,
                });

                setUserLangs(langs);
              } else {
                console.log("Lang in db, switching");
                update(ref(db, "/users/" + userId), {
                  currentLang: newLangPath.lang,
                });
              }
              resolve(newLangPath);
            }
          });
        }
      });
    });
  };

  const setLang = async (lang) => {
    console.log("Set lang to " + lang);

    let newLangPath = new LangPath(lang);
    setCurrentLang(lang);
    setLangPath(newLangPath);

    updateLangsToDB(newLangPath)
      setLangPathSelected(true);
      setLangSelection(false);
      setLoaded(true);

      if (flagMenu) toggleDropdown();
      setLessonsLoaded(false);

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

  const lessonsTitle = () => {
    if (loaded) {
      return (
        <div className="lessonstitle">
          LESSONS &gt;&gt;
          <span className="language-title">
            {" "}
            {langPathSelected === false
              ? "No language chosen"
              : langPath.langDesc}
          </span>
          {langPathSelected === false ? "" : langDropDown()}
        </div>
      );
    }
  };

  const languageSelection = () => {
    if (!langSelection) return;

    return (
      <div className="lessoncontainer">
        <div className="greycontainer">
          <div className="difficulty-title">Please choose a language</div>
          <div className="dashline" />
          {/* <div>
              Start learning new languages now!!!!!!!{" "}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqiP3Z1VUfzab1N2SpD1IJhzfkyuN3TjmT8jyseqS&s" />
      </div> */}
          <div>{getLangFlags()}</div>
        </div>
      </div>
    );
  };

  if (
    state &&
    state.language &&
    currentLang &&
    currentLang !== state.language
  ) {
    console.log(state.language + " in state, current lang " + currentLang);
    setLang(state.language);
    state.language = null;
  }

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="dashboardelements">
          <div className="boxcontainer">{lessonsTitle()}</div>
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
