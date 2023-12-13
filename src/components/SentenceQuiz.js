import React, { useState, useRef, useCallback, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, update } from "firebase/database";
import Lesson from "../vocab/Vocab";
import "./VocabLesson.css";
import ActivityTracker from "./ActivityTracker";

const SentenceQuiz = () => {
    
}

export default SentenceQuiz;