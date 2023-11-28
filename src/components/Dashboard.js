import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Settings.css";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fb from "../firebase";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";

const DashBoard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dbRef = ref(getDatabase(fb));
  const db = getDatabase();

  const [userName, setuserName] = useState(null);
  const [userLangs, setUserLangs] = useState(null);
  const [langButtons, setLangButtons] = useState(null);
  const [activityElements, setActivityElements] = useState([]);
  const [dailyTasks, setDailyTasks] = useState(null);
  const [xp, setXP] = useState(0);
  const [lvl, setLvl] = useState(1);

  let tracker = null;

  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  //testi

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

    const lvlText = {
      padding: 10,
      color: "black",
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
    tracker = new ActivityTracker();
    let activity = await tracker.getLatestActivity();

    for (var i = 0; i < 3; i++) {
      dailyElements.push(
        <div className="dailytask">
          {" "}
          {tracker.getActivityDesc(activity.dailyTasks[i].task)}
          <span className="xp">10XP</span>
        </div>,
      );
    }
    setDailyTasks(dailyElements);
  };

  const getCurrentLangs = () => {
    let flagsAPI = "https://flagsapi.com/";
    let flagStyle = "/flat/64.png";

    let buttonElements = [];

    for (const langObj in userLangs) {
      buttonElements.push(
        <button
          key={"lang" + langObj}
          className="btn"
          onClick={() => console.log("sdf")} //redirect learnpage setlang
        >
          <img src={flagsAPI + langObj + flagStyle} />
        </button>,
      );
    }
    setLangButtons(buttonElements);
  };
  const getProgress = () => {};

  const getLeaderBoards = () => {
    onAuthStateChanged(auth, (user) => {
      const userId = auth.currentUser.uid;
      /*
      if (user) {
        get(ref(db, "/leaderboards/" + userId)).then((snapshot) => {
          console.log(snapshot.val())
        });
      }*/
    });

    return (
      <>
        {" "}
        <div className="leaderlist">
          {" "}
          1. Kyle
          <span className="xp">25XP</span>
        </div>
        <div className="leaderlist">
          {" "}
          2. Eric
          <span className="xp">15XP</span>
        </div>
        <div className="leaderlist">
          {" "}
          3. Stan
          <span className="xp">10XP</span>
        </div>
        <div className="leaderlist">
          {" "}
          3. Juu
          <span className="xp">10XP</span>
        </div>
      </>
    );
  };

  const calcLvl = (activity) => {
    console.log(activity);
  };

  const getLatestActivity = async () => {
    const tracker = new ActivityTracker();
    const activity = await tracker.getLatestActivity();
    const latest = activity.latest;
    latest.reverse();

    setXP(activity.xp);
    setLvl(activity.lvl);

    let activityElements = [];
    for (var i = 0; i < latest.length; i++) {
      if (latest[i] === "") break;
      activityElements.push(
        <div key={"act" + i} className="activity">
          {">"} {latest[i]}
          <span className="xp">{tracker.xpTable[latest[i]]} XP</span>
        </div>,
      );
    }

    setActivityElements(activityElements);
  };

  useEffect(() => {
    if (tracker === null) {
      tracker = new ActivityTracker();
    }
    onAuthStateChanged(auth, (user) => {
      const userId = auth.currentUser.uid;
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          setuserName(snapshot.val().username);
          setUserLangs(snapshot.val().langs);
          if (!snapshot.val().activity) tracker.initActivities();
          else {
            getLatestActivity();
            tracker.generateDailyTasks();
          }
          getDailyTasks();
        });
      }
    });
  }, []);

  if (userLangs !== null && langButtons === null) getCurrentLangs();

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
              {dailyTasks}
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
            </div>
          </div>
          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">LEADERBOARDS</div>
              <span className="XPgained">
                {"("}XP gained during the last 7 days{")"}
              </span>
              <div className="dashline" />
              {getLeaderBoards()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DashBoard;
