import React, { useState, useEffect } from "react";
import fb from "../firebase";
import NavBar from "./NavBar";
import "./Settings.css";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import nonstackedlogo from "../img/wtlogo_nonstacked.png";
import Footer from "./Footter";
import { ServerTimestamp } from "firebase/database";

const auth = getAuth();
const db = getDatabase(fb);
const current_time = serverTimestamp();

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
    const auth = getAuth();
    const shoutsRef = fb.database().ref("shouts/");
    const newShoutRef = shoutsRef.push();
    newShoutRef.set({
      user: auth.currentUser.uid,
      message: newShout,
      timestamp: current_time,
    });
    setNewShout("");
  };

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div classname="responsive-container">
          {shouts.map((shout) => (
            <li key={shout.timestamp}>{shout.message}</li>
          ))}
          <p />
          <input type="text" value={newShout} onChange={handleInputChange} />
          <button onClick={handleAddShout}>Add Shout</button>
          <p />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shoutbox;
