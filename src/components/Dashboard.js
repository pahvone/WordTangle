import React from "react";
import NavBar from "./NavBar";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

function GetUserData() {
  let userId = auth.currentUser.uid;
  get(child(dbRef, "/users/" + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().username);
        // functionality: snapshot.val().insertvaluetobefetchedhere
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

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

const DashBoard = () => {
  return (
    <div>
      <NavBar />
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
            <div className="title">Hi User!</div>
            <div className="dashline" />
            <div className="latestactivity">Latest activity:</div>
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
          </div>
        </div>

        <div className="boxcontainer">
          <div className="greycontainer">
            <div className="title">DAILY TASKS</div>
            <div className="dashline" />
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
            <div className="latestactivity">Latest activity:</div>
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
  );
};
export default DashBoard;
