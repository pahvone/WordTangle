import React, { useState } from 'react';
import Lesson from '../vocab/Vocab';
import './VocabLesson.css';


const VocabLesson = () => {
    const [qIndex, setIndex] = useState(0);
    const [lesson, setLesson] = useState(null)
    const [qState, setQState] = useState(0);
    const [result, setResult] = useState("")
    const [correctCount, setCorrectCount] = useState(0)
    const [inputMode, setInputMode] = useState(1)
    const [textInput, setTextInput] = useState("")

    const choiceElements = [];


    const endQuiz = () => {
        if (lesson.wordList.length != 0 && qIndex >= lesson.wordList.length) return true
        else return false;
    }
    
    const switchInputModeButton = () => {

        if(inputMode == 0){
            return(<button className="btn skip-button w-100 text-center" onClick={() => setInputMode(1)}>Answer in writing</button>)
        }
        else {
            return(<button className="btn skip-button w-100 text-center" onClick={() => setInputMode(0)}>Multiple choice answers</button>)
        }
        
    }

    //Handles multiple choice answers
    const handleChoice = (index) => {
        if(index == 0) handleResult(true)
        else handleResult(false)
    };

    const handleResult = (result) => {
        if(result == true) {
            setResult("Correct!")
            setCorrectCount(correctCount + 1)
        }
        else setResult("Incorrect. Correct answer is '" + lesson.translationList[qIndex][0] + "'")
        setIndex(qIndex + 1);
    }

    //Handles text input answers
    const handleTextInput = (event) => {
        event.preventDefault();
        console.log(textInput + " vs " + lesson.translationList[qIndex][0])

        if(textInput == lesson.translationList[qIndex][0] || (textInput == lesson.translationList[qIndex][1]))
            handleResult(true);
        else handleResult(false);

        setTextInput("")
        setIndex(qIndex + 1);
    }

    //Returns a text input form if inputMode == 1
    const userInput = () => {
        if(inputMode == 0) return choiceElements
        else return (
            <div>
                <span className="align-middle">
                    <div className="formDiv">
                    <form onSubmit={handleTextInput}>
                        <p><input className="form-control form-control-lg" type="text" id="char" value={textInput} onChange={(e) => setTextInput(e.target.value)} required></input></p>
                        <p><button type="submit" className="btn styled-button w-100">Submit</button></p>
                    </form>
                    </div>
                    </span>
            </div>

            
        );
    }

    const handleSkip = () => {
        setIndex(qIndex + 1);
        setResult("Correct answer would've been '" + lesson.translationList[qIndex][0] + "'")
    };

    const randNumber = () => {
        return Math.floor(Math.random() * (lesson.wordList.length - 1 + 1)) + 0;
    }

    //Randomizes the order of the entries in the quiz
    const createRandomizedQuizOrder = () => {
        for (var i = 0; i < lesson.wordList.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [lesson.wordList[i], lesson.wordList[j]] = [lesson.wordList[j], lesson.wordList[i]];
            [lesson.translationList[i], lesson.translationList[j]] = [lesson.translationList[j], lesson.translationList[i]];
        }

        for(var i = 0; i < lesson.wordList.length; i++){
            if(randNumber() > 10){
                var temp = lesson.wordList[i]
                lesson.wordList[i] = lesson.translationList[i][0]
                lesson.translationList[i][0] = temp
            }
        }

       // console.log(lesson.wordList);
       // console.log(lesson.translationList);

    }

    //Randomizes the order of the multiple choices
    const createRandomizedChoiceOrder = (choices) => {
        for (var i = 0; i < choices.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }
    }

    const createWrongAnswers = (exclude) => {
        let indexes = [];

        for (var i = 0; i < 3; i++) {
            let randIndex = randNumber();

            while (indexes.includes(randIndex) || randIndex == exclude) {
                randIndex = randNumber();
            }
            indexes.push(randIndex);
        }

        return indexes;
    }

    const createChoices = () => {
        let word = lesson.translationList[qIndex][0];

        choiceElements.push(
            <div key={"button0"} className='row'>
                <div className="col-md-10 text-center">
                    <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(0)}>{word}
                    </button>
                </div>
            </div>
        );

        let wrongAnswers = createWrongAnswers(qIndex);
        
        for (var i = 0; i < 3; i++) {
            word = lesson.translationList[wrongAnswers[i]][0];

            (function (index) {
                choiceElements.push(
                    <div key={"button" + (i + 1)} className='row'>
                        <div className="col-md-10 text-center">
                            <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(index + 1)}>{word}
                            </button>
                        </div>
                    </div>
                );
            })(i);
        }

        createRandomizedChoiceOrder(choiceElements);

       // console.log(choiceElements)

    }

    //////////////////////////////////////////////////////////

    //Quiz state machine

    if (qState == 0 && lesson == null) {
        setLesson(new Lesson("Lesson1"));
    }
    else if (qState == 0 && lesson != null) {
        createRandomizedQuizOrder()
        setQState(1);
    }
    else if (qState == 1) {
        if (!endQuiz()) {
            //console.log("quizIndex " + qIndex + " word " + lesson.wordList[qIndex])
            createChoices()

            return (
                <div className='container-fluid '>
                    <h1 align="center">{lesson.lessonName}</h1>

                    <div className='row justify-content-center align-items-center'>
                        <div className='col-2'>{qIndex + 1} / {lesson.wordList.length}</div>
                        <div className='col-md-5 wordcontainer'>{lesson.wordList[qIndex]}</div>
                        <div className='col-md-3'><button className="btn skip-button w-100 text-center" onClick={() => handleSkip()}>Skip</button></div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>{userInput()}</div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>{result}</div>
                    </div>
                    <div className='row my-5 justify-content-center'>
                        <div className='col-md-4'>{switchInputModeButton()}</div>
                    </div>
                </div>
            );
        }
        else {
            return (
            <div className='container-fluid '>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-md-4'>
                    You got {correctCount} out of {lesson.wordList.length} correct
                    </div>
                </div>
            </div>);
        }
    }

};

export default VocabLesson;

