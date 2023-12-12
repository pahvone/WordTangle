import React, { useState, useEffect } from "react";
import "./Hangman.css";
import ActivityTracker from "./ActivityTracker";

const Hangman = ({ langPath, userLangs, back }) => {
  const [secretWord, setSecretWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [answerLine, setAnswerLine] = useState([]);
  const [hangmanParts, setHangmanParts] = useState([]);
  const [visibleParts, setVisibleParts] = useState([]);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(null);

  const [letterButtons, setLetterButtons] = useState([]);

  const [translation, setTranslation] = useState("");

  //For determining appropriate words
  const getProgMean = (list, diff, viableWords) => {
    //console.log(langPath)
    //let mean = 0
    /*
        for(var i = 0; i < list.length; i++){
            if(diff === "beginner") {
                for(var j = 0; i < langPath.lessons["intermediate"][i].vocab[j].length; i++){
                    viableWords.push(langPath.lessons["beginner"][i].vocab[j])
                }
            }
            mean += list[i]
        }*/
    //return (mean / list.length)
  };

  const generateWord = () => {
    let viableWords = [];
    for (var j = 0; j < langPath.lessons["beginner"].length; j++) {
      for (var i = 0; i < langPath.lessons["beginner"][j].vocab.length; i++) {
        console.log(langPath.lessons["beginner"][j].vocab[i]);
        viableWords.push(langPath.lessons["beginner"][j].vocab[i]);
      }
    }
    let rand = Math.floor(Math.random() * viableWords.length);
    let word = viableWords[rand][0]; // Corrected line
    setTranslation(viableWords[rand][1][0]);
    return word;
  };

  useEffect(() => {
    // console.log(userLangs[langPath.lang], langPath)
    if (!started) {
      var word = generateWord();
      setSecretWord(word);
      generateLine(word);
      generateHangmanParts();
      generateLetterButtons();
      setStarted(true);
    } else {
      generateLetterButtons();

      if (!answerLine.includes("_")) {
        setWin(true);
        setGameOver(true);
        const tracker = new ActivityTracker();
        tracker.updateLatestActivity("minigame");
      }

      if (visibleParts.length === hangmanParts.length) {
        setWin(false);
        setGameOver(true);
      }
    }
  }, [secretWord, guessedLetters, answerLine, started]);

  const generateLetterButtons = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split(""); //get lang specific alphabet
    let buttons = [];
    alphabet.map((letter) =>
      buttons.push(
        <button
          key={letter}
          className="letter-button"
          onClick={() => handleButtonClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>,
      ),
    );

    setLetterButtons(buttons);
  };

  const handleButtonClick = (letter) => {
    if (gameOver) return;
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    checkLetter(letter);
  };

  const generateLine = (word) => {
    console.log(word);
    var line = [];
    for (var i = 0; i < word.length; i++) {
      line.push("_");
    }
    setAnswerLine(line);
  };

  const generateHangmanParts = () => {
    var parts = [];

    parts.push(<div class="hangman-post" />);
    parts.push(<div class="hangman-post-top" />);
    parts.push(<div class="hangman-post-support" />);
    parts.push(<div class="hangman-rope" />);
    parts.push(<div class="hangman-head" />);
    parts.push(<div class="hangman-torso" />);
    parts.push(<div class="hangman-left-arm" />);
    parts.push(<div class="hangman-right-arm" />);
    parts.push(<div class="hangman-left-leg" />);
    parts.push(<div class="hangman-right-leg" />);

    setHangmanParts(parts);
  };

  const backButton = () => {
    return (
      <button
        className="btn choice-button w-100 text-center"
        onClick={(e) => {
          if (gameOver) back(e);
          else if (
            window.confirm("Are you sure you want to go back to lessons?")
          )
            back(e);
        }}
      >
        Back to lessons
      </button>
    );
  };

  const checkLetter = (letter) => {
    let newLine = [];
    let chars = secretWord.split("");
    let found = false;

    for (var i = 0; i < secretWord.length; i++) {
      if (answerLine[i] === "_") {
        if (chars[i].toLocaleLowerCase() === letter.toLocaleLowerCase()) {
          found = true;
          newLine.push(letter);
        } else newLine.push("_");
      } else newLine.push(answerLine[i]);
    }
    if (!found) handleIncorrect();
    setAnswerLine(newLine);
  };

  const handleIncorrect = () => {
    let parts = visibleParts;
    parts.push(hangmanParts[visibleParts.length]);
    setVisibleParts(parts);
  };

  const victoryScreen = () => {
    return (
      <div className="greycontainer">
        <p className="gameovertitle">You win!</p>
        <p className="gameover">
          Correct answer was <b>{secretWord}</b> ({translation})
        </p>
      </div>
    );
  };

  const lossScreen = () => {
    return (
      <div className="greycontainer">
        <p className="gameovertitle">You lost!</p>
        <p className="gameover">
          Correct answer was <b>{secretWord}</b> ({translation})
        </p>
      </div>
    );
  };

  const gameScreen = () => {
    return (
      <>
        <div className="dashboardelements">
          <div className="greycontainer">
            <div class="hangman-container">{visibleParts}</div>
            <div className="answerline">{answerLine}</div>
          </div>
        </div>
        <div className="dashboardelements">
          <div class="hangman-container">
            <div className="greycontainer">{letterButtons}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="dashboardelements">
        <div> {backButton()}</div>
      </div>
      <div className="dashboardelements">
        {gameOver ? (win ? victoryScreen() : lossScreen()) : ""}
      </div>
      {gameScreen()}
    </>
  );
};

export default Hangman;
