import React, { useState } from 'react';
import Lesson from '../vocab/Vocab';
import './VocabLesson.css';
import { random } from 'node-forge';


const VocabLesson = () => {
    const [qIndex, setIndex] = useState(0);
    const [lesson, setLesson] = useState(null)
    const [qState, setQState] = useState(0);
    const choiceElements = [];



    const endQuiz = () => {
        if (lesson.wordList.length != 0 && qIndex >= lesson.wordList.length) return true
        else return false;
    }

    const handleChoice = (e) => {
        console.log("choice " + e);
    };

    const handleSkip = () => {
        console.log("skip");
        setIndex(qIndex + 1);
        console.log("qindex " + qIndex);
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

        console.log(lesson.wordList);
        console.log(lesson.translationList);


    }

    const createWrongAnswers = (exclude) => {
        console.log("createWrongAnswers()")
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

        choiceElements.push(
            <div key={"button0"} className='row'>
                <div className="col-md-10 text-center">
                    <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(0)}>{lesson.translationList[qIndex][0]}
                    </button>
                </div>
            </div>
        );

        let wrongAnswers = createWrongAnswers(qIndex);

        for (var i = 0; i < 3; i++) {
            (function (index) {
                choiceElements.push(
                    <div key={"button" + (i + 1)} className='row'>
                        <div className="col-md-10 text-center">
                            <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(index + 1)}>{lesson.translationList[wrongAnswers[i]][0]}
                            </button>
                        </div>
                    </div>
                );
            })(i);
        }

    }

    console.log("qstate " + qState)
    if (qState == 0 && lesson == null) {
        console.log("here")
        setLesson(new Lesson("Lesson1"));

    }
    else if (qState == 0 && lesson != null) {
        createRandomizedQuizOrder()
        setQState(1);
    }
    else if (qState == 1) {
        if (!endQuiz()) {
            console.log("quizIndex " + qIndex + " word " + lesson.wordList[qIndex])
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
                </div>
            );
        }
        else {
            return ("voitit pelin");
        }
    }

};

export default VocabLesson;

