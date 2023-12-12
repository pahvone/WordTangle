import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";
import "./VocabLesson.css";
import "../App.css";
import NavBar from "./NavBar";
import Footer from "./Footter";
import { LangPath, UserLangs as UserLangs } from "./LangPath";
import Lessons from "./Lessons";
import DictionarySearch from "./DictionaryModule";
import VocabQuiz from "./VocabQuiz";

const LearnPage = (_language) => {
  const [langPathSelected, setLangPathSelected] = useState(null);
  const [langPath, setLangPath] = useState(null);
  const [currentLang, setCurrentLang] = useState(null);
  const [userLangs, setUserLangs] = useState(null);

  const [langSelection, setLangSelection] = useState(false);

  const [quizRunning, setQuizRunning] = useState(false);
  const [quizParams, setQuizParams] = useState(null);

  const [learnTab, setLearnTab] = useState("lessons");
  const [loaded, setLoaded] = useState(false);

  const db = getDatabase();
  const auth = getAuth();

  const { state } = useLocation();

  const flagsAPI = "https://flagsapi.com/";
  const flagStyle = "/flat/64.png";
  const [flagMenu, setFlagMenu] = useState(false);

  useEffect(() => {
    if (!quizRunning) {
      if (
        state &&
        state.language &&
        currentLang &&
        currentLang !== state.language
      ) {
        setLang(state.language);
        state.language = null;
      } else if (!state || !currentLang) {
        onAuthStateChanged(auth, (user) => {
          const userId = auth.currentUser.uid;
          if (user) {
            get(ref(db, "/users/" + userId)).then((snapshot) => {
              if (snapshot.val().langs === undefined) {
                setLangPathSelected(false);
                setLangSelection(true);
                setLoaded(true);
              } else {
                setLoaded(false);
                initLangPath(snapshot.val());
              }
            });
          }
        });
      }
    }
  }, [quizRunning]);

  const toggleDropdown = () => {
    setFlagMenu(!flagMenu);
  };

  const initLangPath = (data) => {
    if (loaded) return;
    setUserLangs(data.langs);
    setLangPath(new LangPath(data.currentLang));
    setCurrentLang(data.currentLang);
    setLangPathSelected(true);
    setLoaded(true);
  };

  if (langPathSelected && userLangs && userLangs[currentLang]) {
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
  }

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
    setLoaded(false);
    setLangPathSelected(false);
    console.log("Set lang to " + lang);

    let newLangPath = new LangPath(lang);
    setCurrentLang(lang);
    setLangPath(newLangPath);
    await updateLangsToDB(newLangPath).then(() => {
      setLangPathSelected(true);
      setLangSelection(false);
      //setLoaded(true);

      if (flagMenu) toggleDropdown();
    });
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
        <>
          <span className="lessonstitle">
            {" "}
            {langPathSelected === false
              ? "No language chosen"
              : langPath.langDesc}
          </span>
          {langPathSelected === false ? "" : langDropDown()}
        </>
      );
    }
  };

  const learningButtons = () => {
    return (
      <div className="boxcontainer">
        <button
          className={`btn learningbutton${
            learnTab === "lessons" ? "-active" : ""
          }`}
          onClick={() => setLearnTab("lessons")}
        >
          LESSONS
        </button>

        <button
          className={`btn learningbutton${
            learnTab === "dictionary" ? "-active" : ""
          }`}
          onClick={() => setLearnTab("dictionary")}
        >
          DICTIONARY
        </button>
      </div>
    );
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

  const startQ = (params) => {
    const par = {
      lang: currentLang,
      diff: params._diff,
      index: params._index,
    };
    setQuizParams(par);
    setQuizRunning(true);
  };

  const abortQuiz = (e) => {
    e.preventDefault();
    setQuizRunning(false);
    setQuizParams(null);
  };

  const langModule = () => {
    return (
      <>
        {langPathSelected ? (
          learnTab === "lessons" ? (
            <Lessons
              onPassParams={startQ}
              currentLang={currentLang}
              userLangs={userLangs}
              langPath={langPath}
            />
          ) : (
            <DictionarySearch currentLang={currentLang} />
          )
        ) : (
          languageSelection()
        )}
      </>
    );
  };

  const loadingSpinner = () => {
    return <Spinner animation="border" role="status" />;
  };

  if (quizRunning) {
    return (
      <div>
        <NavBar />
        <div className="pagecontainer">
          <VocabQuiz
            back={abortQuiz}
            lang={currentLang}
            diff={quizParams.diff}
            index={quizParams.index}
          />
        </div>
        <Footer />
      </div>
    );
  } else
    return (
      <div>
        <NavBar />
        <div className="pagecontainer">
          {loaded ? (
            <>
              <div className="dashboardelements">
                <div className="boxcontainer">{lessonsTitle()}</div>
              </div>
              <div className="dashboardelements">
                <div>
                  {langPathSelected ? learningButtons() : { loadingSpinner }}
                </div>
              </div>
              <div className="dashboardelements">
                <div>{loaded ? langModule() : { loadingSpinner }}</div>
              </div>{" "}
              s
            </>
          ) : (
            <div className="dashboardelements align-items-center w-100">
              {loadingSpinner}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
};

export default LearnPage;
