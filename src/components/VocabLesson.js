import React from 'react';
import Lesson from '../vocab/Vocab';
import './VocabLesson.css';
import { random } from 'node-forge';


const VocabLesson = () => {
        const quizWords = [];
        const lesson = new Lesson("Lesson1"); //TESTI
        var qIndex = 0;

        const qWord = () => {
            return (
                <div className="wordcontainer">{lesson.wordList[0]}</div>
            )
        }

        const handleChoice = (e) => {
            console.log("choice " + e);
        };

        const handleSkip = () => {
            console.log("skip");
        };

        const createRandomizedQuizOrder = () => {
            for(var i = 0; i < lesson.wordList.length; i++){
                const j = Math.floor(Math.random() * (i + 1));
            [lesson.wordList[i], lesson.wordList[j]] = [lesson.wordList[j], lesson.wordList[i]];
            [lesson.translationList[i], lesson.translationList[j]] = [lesson.translationList[j], lesson.translationList[i]];
            }

            console.log(lesson.wordList);
            console.log(lesson.translationList);
        }

        createRandomizedQuizOrder();

        const randNumber = () => {
            return Math.floor(Math.random() * (lesson.wordList.length - 0 + 1)) + 0;
        }


      const createWrongAnswers = (exclude) => {
        let indexes = [];
        
        for(var i = 0; i < 3; i++){
            let randIndex = randNumber();

            while(indexes.includes(randIndex) || randIndex == exclude) { 
                randIndex = randNumber();
            }
            indexes.push(randIndex);
        }

        return indexes;
      }

      const createChoices = () => {
        let choiceElements = [];

        

        choiceElements.push(
            <div key={"button0"} className='row'>
                <div className="col-md-10 text-center">
                    <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(0)}>{lesson.translationList[qIndex][0]}
                    </button>
                </div>
            </div>
            );

        let wrongAnswers = createWrongAnswers(qIndex);

        for(var i = 0; i < 3; i++){
            (function (index) {
            choiceElements.push(
                <div key={"button" + (i + 1)} className='row'>
                    <div className="col-md-10 text-center">
                        <button className="btn choice-button w-100 text-center" onClick={() => handleChoice(index)}>{lesson.translationList[wrongAnswers[i]][0]}
                        </button>
                    </div>
                </div>
                );
            })(i);
        }
        
        return choiceElements;
      }

      
  return (
    <div className='container-fluid '>
        <h1 align="center">{lesson.lessonName}</h1>

        <div className='row justify-content-center align-items-center'>  
            <div className='col-2'>{qIndex + 1} / {lesson.wordList.length}</div>
            <div className='col-md-5'>{qWord()}</div>
            <div className='col-md-3'><button className="btn skip-button w-100 text-center" onClick={() => handleSkip()}>Skip</button></div>
        </div>
        <div className='row justify-content-center'> 
            <div className='col-md-4'>{createChoices()}</div>
        </div>
    </div>
  );
};

export default VocabLesson;

