import React, { useState } from 'react';
import Lesson from '../vocab/Vocab';
import './VocabLesson.css';
import { random } from 'node-forge';


const VocabLesson = () => {
    const [qIndex, setIndex] = useState(0);
    const [lesson, setLesson] = useState(null)
    const [qState, setQState] = useState(0);
    const [result, setResult] = useState("")
    const [correctCount, setCorrectCount] = useState(0)

    const choiceElements = [];



    const endQuiz = () => {
        if (lesson.wordList.length != 0 && qIndex >= lesson.wordList.length) return true
        else return false;
    }

    const handleChoice = (index) => {
        console.log("choice " + index);

        if(index == 0) {
            setResult("Correct!")
            setCorrectCount(correctCount + 1)
        }
        else setResult("Incorrect. Correct answer is '" + lesson.translationList[qIndex][0] + "'")
        setIndex(qIndex + 1);

    };

    const handleSkip = () => {
        console.log("skip");
        setIndex(qIndex + 1);
        console.log("qindex " + qIndex);
        setResult("Correct answer would've been '" + lesson.translationList[qIndex][0] + "'")
    };

    const randNumber = () => {
        return Math.floor(Math.random() * (lesson.wordList.length - 1 + 1)) + 0;
    }

    const createRandomizedQuizOrder = () => {
        for (var i = 0; i < lesson.wordList.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [lesson.wordList[i], lesson.wordList[j]] = [lesson.wordList[j], lesson.wordList[i]];
            [lesson.translationList[i], lesson.translationList[j]] = [lesson.translationList[j], lesson.translationList[i]];
        }

        //console.log(lesson.wordList);
        //console.log(lesson.translationList);

    }

    const createRandomizedChoiceOrder = (choices) => {
        for (var i = 0; i < choices.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }

        console.log(choices)
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

        console.log(choiceElements)

    }

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
                        <div className='col-md-4'>{choiceElements}</div>
                    </div>
                    <div className='row justify-content-center'>
                    <div className='col-md-4'>{result}</div>
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

