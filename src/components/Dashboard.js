import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Settings.css";
import { get, getDatabase, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";
import { useNavigate } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import Shoutbox from "./Shoutbox";

const DashBoard = () => {
  const auth = getAuth();
  const db = getDatabase();

  const [userName, setuserName] = useState(null);
  const [userLangs, setUserLangs] = useState(null);
  const [langButtons, setLangButtons] = useState(null);
  const [activityElements, setActivityElements] = useState([]);
  const [dailyTaskElements, setDailyTasks] = useState(null);
  const [latestQuizElements, setLatestQuizElements] = useState(null);
  const [leaderboardElements, setLeaderBoardElements] = useState(null);
  const [xp, setXP] = useState(0);
  const [lvl, setLvl] = useState(1);
  const [tracker, setTracker] = useState(null);

  const [userAmount, setUserAmount] = useState(0);

  const redirect = useNavigate();

  const flagsAPI = "https://flagsapi.com/";
  const flagStyle = "/flat/64.png";
  const flagStyleSmall = "/flat/32.png";

  const Progress_bar = () => {
    const Parentdiv = {
      height: 35,
      width: "75%",
      backgroundColor: "#DDDDDD",
      borderRadius: 40,
    };

    const Childdiv = {
      height: "100%",
      width: `${xp}%`,
      backgroundColor: "#50FFC0",
      borderRadius: 40,
    };

    const progresstext = {
      padding: 10,
      color: "black",
    };

    return (
      <>
        <div className="" style={Parentdiv}>
          <div style={Childdiv}>
            <span style={progresstext}>{`${xp}`}</span>
          </div>
        </div>
      </>
    );
  };

  const getDailyTasks = async () => {
    let dailyElements = [];
    await tracker.getDailyTasks().then((tasks) => {
      for (var i = 0; i < 3; i++) {
        dailyElements.push(
          <div
            key={"daily" + i}
            className={`dailytask-${
              tasks[i].completed ? "complete" : "incomplete"
            }`}
          >
            {" "}
            {tracker.getActivityDesc(tasks[i].task) +
              ` ${tasks[i].completed ? "(COMPLETE)" : ""}`}
            <span className="xp">{tracker.dailyXPTable[tasks[i].task]} XP</span>
          </div>,
        );
      }
      setDailyTasks(dailyElements);
    });
  };

  const getCurrentLangs = () => {
    let buttonElements = [];

    for (const langObj in userLangs) {
      buttonElements.push(
        <button
          key={"lang" + langObj}
          className="btn"
          onClick={() =>
            redirect("/LearnPage", { state: { language: langObj } })
          }
        >
          <img src={flagsAPI + langObj + flagStyle} />
        </button>,
      );
    }
    setLangButtons(buttonElements);
  };

  const getLatestQuizActivity = async () => {
    await tracker.getLatestQuizActivity().then((qAct) => {
      let latestQuizElements = [];

      qAct.reverse();

      for (var i = 0; i < qAct.length; i++) {
        if (qAct[i].lang === "") break;
        latestQuizElements.push(
          <div key={"act" + i} className={`quizactivity`}>
            <img
              src={flagsAPI + qAct[i].lang + flagStyleSmall}
              style={{ verticalAlign: "middle" }}
            />
            <span>
              {qAct[i].lessonName} ({qAct[i].diff})
            </span>
            <span> (Result: {qAct[i].percentage}%)</span>
            <span>{qAct[i].date}</span>
          </div>,
        );
      }

      setLatestQuizElements(latestQuizElements);
    });
  };

  const getLeaderBoards = async () => {
    const leaderboards = new Leaderboards();
    let lbElements = [];

    await leaderboards.getLeaderboard().then(async (lb) => {
      if (!lb.entries) return;
      let entries = lb.entries;

      try {
        entries.sort((a, b) => b.xpGain - a.xpGain);

        for (var i = 0; i < lb.entries.length; i++) {
          await leaderboards.getUserName(entries[i].id).then((username) => {
            lbElements.push(
              <div className="leaderlist" key={"lbEntry" + i}>
                {" "}
                {i + 1}. {username} (Lvl {entries[i].lvl})
                <span className="xp">{entries[i].xpGain} XP</span>
              </div>,
            );
          });
        }
        setLeaderBoardElements(lbElements);
      } catch (error) {
        console.log(error);
        console.log("Database structure is fkd");
        lbElements.push(
          <>
            <div>Failed to fetch leaderboards</div>
          </>,
        );
        setLeaderBoardElements(lbElements);
        leaderboards.fixStruct(entries);
      }
    });
  };

  const getLatestActivity = async () => {
    await tracker.getActivity().then((act) => {
      const latest = act.latest;
      if (!latest) return;
      latest.reverse();

      setXP(act.xp);
      setLvl(act.lvl);

      let activityElements = [];
      for (var i = 0; i < latest.length; i++) {
        if (latest[i] === "") break;
        activityElements.push(
          <div key={"act" + i} className="activity">
            {">"} {tracker.getActivityDesc(latest[i])}
          </div>,
        );
      }

      setActivityElements(activityElements);
    });
  };

  if (tracker === null) {
    setTracker(new ActivityTracker());
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userId = auth.currentUser.uid;
      if (user) {
        get(ref(db, "/users/" + userId)).then(async (snapshot) => {
          if (snapshot.val().username) setuserName(snapshot.val().username);
          setUserLangs(snapshot.val().langs);
          if (!snapshot.val().activity) {
            await tracker.initActivities().then(async (act) => {
              await tracker.generateDailyTasks().then((act) => {
                getDailyTasks();
              });
            });
          } else {
            // console.log("get latest")
            await getLatestActivity().then(async (act) => {
              await tracker.generateDailyTasks().then((act) => {
                getDailyTasks();
              });
            });
            getLatestActivity();
            getLatestQuizActivity();
            getLeaderBoards();
          }
        });
      }
    });
  }, []);

  if (userLangs !== null && langButtons === null) getCurrentLangs();

  const debugXP = async () => {
    await tracker.debugGetXP(auth.currentUser.uid).then((activity) => {
      setXP(activity.xp);
      setLvl(activity.lvl);
    });
  };

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="dashboardlogo-container">
          <img
            className="app-logo-nonstacked"
            src={nonstackedlogo}
            alt="Word Tangle Logo"
          />

          <span className="dashboardslogan">Your #1 language learning app</span>
        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">Hi {userName}</div>
              <div className="dashline" />
              <div className="latestactivity">Latest activity:</div>
              {activityElements}
            </div>
          </div>

          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">DAILY TASKS</div>
              <div className="dashline" />
              {dailyTaskElements}
              <button
                key={"getexp"}
                className=""
                onClick={() => debugXP()} //redirect learnpage setlang
              >
                Get debug xp here
              </button>
              <div className="row align-items-center">
                <div className="col-md-10 xpbar ">
                  <Progress_bar />
                </div>
                <div className="col-md-2 lvltext">Level {lvl}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboardelements">
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">CONTINUE LEARNING</div>
              <div className="dashline" />
              <div className="latestactivity">Currently learning </div>
              <div>{langButtons}</div>
              <div>Latest quizzes taken: </div>
              <div>{latestQuizElements}</div>
            </div>
          </div>
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">LEADERBOARDS</div>
              <span className="XPgained">
                {"("}XP gained during the last 7 days{")"}
              </span>
              <div className="dashline" />
              {leaderboardElements}
            </div>
          </div>
          <div className="boxcontainer">
            <Shoutbox></Shoutbox>
          </div>
        </div>
        <Shoutbox></Shoutbox>
      </div>
      <Footer />
    </div>
  );
};
export default DashBoard;
