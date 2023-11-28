import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Settings.css";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fb from "../firebase";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";
import Footer from "./Footter";

const DashBoard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dbRef = ref(getDatabase(fb));
  const db = getDatabase();

  const [userName, setuserName] = useState(null);
  const [userLangs, setUserLangs] = useState(null);
  const [langButtons, setLangButtons] = useState(null);

  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  //testi

  const Progress_bar = ({ progress }) => {
    const Parentdiv = {
      height: 35,
      width: "75%",
      backgroundColor: "#DDDDDD",
      borderRadius: 40,
    };

    const Childdiv = {
      height: "100%",
      width: `${progress}%`,
      backgroundColor: "#50FFC0",
      borderRadius: 40,
    };

    const progresstext = {
      padding: 10,
      color: "black",
    };

    return (
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}>{`${progress}%`}</span>
        </div>
      </div>
    );
  };

  const getDailyTasks = () => {
    return (
      <>
        {" "}
        <div className="dailytask">
          {" "}
          Completed a quiz
          <span className="xp">10XP</span>
        </div>
        <div className="dailytask">
          {" "}
          Played a mini-game
          <span className="xp">10XP</span>
        </div>
        <div className="dailytask">
          {" "}
          Browse the dictionary
          <span className="xp">10XP</span>
        </div>
      </>
    );
  };

  const getCurrentLangs = () => {
    let flagsAPI = "https://flagsapi.com/";
    let flagStyle = "/flat/64.png";

    let buttonElements = [];

    console.log(userLangs);

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
    console.log(buttonElements);
    setLangButtons(buttonElements);
  };
  const getProgress = () => {};

  const getLatestActivity = () => {
    return (
      <>
        <div className="activity">
          {">"} Completed a quiz
          <span className="xp">25XP</span>
        </div>
        <div className="activity">
          {">"} Played a mini-game
          <span className="xp">15XP</span>
        </div>
        <div className="activity">
          {">"} Posted in the forums
          <span className="xp">10XP</span>
        </div>
      </>
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userId = auth.currentUser.uid;
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          setuserName(snapshot.val().username);
          setUserLangs(snapshot.val().langs);
        });
      }
    });
  }, []);

  console.log("render");
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
              {getLatestActivity()}
            </div>
          </div>

          <div className="boxcontainer">
            <div className="greycontainer">
              <div className="title">DAILY TASKS</div>
              <div className="dashline" />
              {getDailyTasks()}
              <div className="xpbar">
                <Progress_bar progress="40" />
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DashBoard;
