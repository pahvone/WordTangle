import React, { useState, useEffect } from "react";
import fb from "../firebase";
import NavBar from "./NavBar";
import "./Settings.css";
import { getDatabase, serverTimestamp, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";
import Footer from "./Footter";
import "./Shoutbox.css";
import moment from "moment";

const auth = getAuth();
const current_time = serverTimestamp();

const Button = ({ text, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {text}
    </button>
  );
};

const Shoutbox = () => {
  const [shouts, setShouts] = useState([]);
  const [newShout, setNewShout] = useState("");

  useEffect(() => {
    const shoutsRef = fb.database().ref("shouts");
    shoutsRef.on("value", (snapshot) => {
      const shoutsData = snapshot.val();
      if (shoutsData) {
        const shoutsArray = Object.values(shoutsData);
        setShouts(shoutsArray);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    setNewShout(e.target.value);
  };

  const handleAddShout = () => {
    const db = getDatabase();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.val().username) resolve(snapshot.val().username);
            const username = snapshot.val().username;
            const convertedtimestamp = current_time.toLocaleString();
            const auth = getAuth();
            const shoutsRef = fb.database().ref("shouts/");
            const newShoutRef = shoutsRef.push();
            newShoutRef.set({
              user: auth.currentUser.uid,
              message: newShout,
              timestamp: current_time,
              nickname: username,
              convertedtimestamp: moment().format("MMMM Do YYYY, H:mm:ss"),
            });
            setNewShout("");
          });
        }
      });
    });
  };

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <img
          className="app-logo-nonstacked"
          src={nonstackedlogo}
          alt="Word Tangle Logo"
        />
        <div classname="responsive-container">
          {shouts.map((shout) => (
            <li key={shout.timestamp}>
              {" "}
              {shout.nickname} ({shout.convertedtimestamp}) : {shout.message}
            </li>
          ))}
          <p />
          <input type="text" value={newShout} onChange={handleInputChange} />
          <br></br>
          <Button onClick={handleAddShout} text="Add Shout"></Button>
          <p />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shoutbox;
