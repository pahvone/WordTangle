import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import "./Hangman.css"

const Hangman = ({ back }) => {
    const [secretWord, setSecretWord] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [answerLine, setAnswerLine] = useState([])
    const [hangmanParts, setHangmanParts] = useState([])
    const [visibleParts, setVisibleParts] = useState([])
    const [started, setStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [win, setWin] = useState(null)

    const [letterButtons, setLetterButtons] = useState([])


    useEffect(() => {
        if (!started) {
            let word = "hangman" //generate randomly from appropriate lessons
            setSecretWord(word)
            generateLine(word)
            generateHangmanParts()
            generateLetterButtons()
            setStarted(true)
        }
        else {
            generateLetterButtons()
            
            if(!answerLine.includes("_")){
                setWin(true)
                setGameOver(true)
            }
            
            if(visibleParts.length === hangmanParts.length){
                setWin(false)
                setGameOver(true)
            }
        }

        

    }, [secretWord, guessedLetters, answerLine])

    const generateLetterButtons = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split(''); //get lang specific alphabet
        let buttons = []
        alphabet.map(letter => (
            buttons.push(
          <button
            key={letter}
            className="letter-button"
            onClick={() => handleButtonClick(letter)
            }
            disabled={guessedLetters.includes(letter)}
          >
            {letter}
          </button>)
        ));

        setLetterButtons(buttons)
      };
      

    const handleButtonClick = letter => {
        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);
        checkLetter(letter)
      };


    const generateLine = (word) => {
        var line = []
        for (var i = 0; i < word.length; i++) {
            line.push("_")
        }
        setAnswerLine(line)
    }

    const generateHangmanParts = () => {
        var parts = []

        parts.push(<div class="hangman-post" />)
        parts.push(<div class="hangman-post-top" />)
        parts.push(<div class="hangman-post-support" />)
        parts.push(<div class="hangman-rope" />)
        parts.push(<div class="hangman-head" />)
        parts.push(<div class="hangman-torso" />)
        parts.push(<div class="hangman-left-arm" />)
        parts.push(<div class="hangman-right-arm" />)
        parts.push(<div class="hangman-left-leg" />)
        parts.push(<div class="hangman-right-leg" />)

        setHangmanParts(parts)
    }

    const backButton = () => {
        return (<button
            className="btn choice-button w-100 text-center"
            onClick={(e) => {
                if(gameOver) back(e)
                else if (window.confirm("Are you sure you want to go back to lessons?")) back(e);
            }}
        >
            Back to lessons
        </button>)
    }


    const checkLetter = (letter) => {
        let newLine = []
        let chars = secretWord.split('')
        let found = false;

        for (var i = 0; i < secretWord.length; i++) {
            if (answerLine[i] === "_") {
                if (chars[i].toLocaleLowerCase() === letter.toLocaleLowerCase()) {
                    found = true;
                    newLine.push(letter)
                }
                else newLine.push("_")
            }
            else newLine.push(answerLine[i])
        }
        if(!found) handleIncorrect()
        setAnswerLine(newLine)
    }

    const handleIncorrect = () => {
        let parts = visibleParts
        parts.push(hangmanParts[visibleParts.length])
        setVisibleParts(parts)
    }

    const victoryScreen = () => {
        return(<div className="greycontainer">Voitit jee :)</div>)
    }

    const lossScreen = () => {
        return(<div className="greycontainer">Hävisit :(</div>)
    }
    
    const gameScreen= () => {
        return(<>
        <div className="dashboardelements">
            <div className="greycontainer">
                <div class="hangman-container">
                    {visibleParts}
                </div>
                <div className="answerline">{answerLine}</div>
            </div>
        </div>
        <div className="dashboardelements">
            <div class="hangman-container">
                <div className="greycontainer">
                    {letterButtons}</div>
            </div>
        </div></>)
    }

    return (<>
        <div className="dashboardelements">
            <div> {backButton()}</div>
        </div>
        <div className="dashboardelements">
        {gameOver ? (win ? victoryScreen() : lossScreen()) : "" }
        </div>
        {gameScreen()}
    </>
    )
}

export default Hangman