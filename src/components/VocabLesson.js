import React from 'react';
import Vocab from '../vocab/Vocab';
import './VocabLesson.css';
const VocabLesson = () => {
  
        const qWord = () => {
            return (
                <div className="wordcontainer">6</div>
            )
        }

        const handleChoice = (e) => {
            console.log("choice " + e);
        };

        const handleSkip = () => {
            console.log("skip");
        };

      const quizWords = [];
    
      const vocab = new Vocab(); //TESTI
      quizWords.push(vocab.getVocab());

      quizWords.fill(["sana", "word"], 5, 20);
      console.log(quizWords[0][0]);

      var qIndex = 1;

      const createChoices = () => {
        let choiceElements = [];
        let vocablist = ["yksi", "kaksi", "kolme", "kuusi"];

        for(var i = 0; i < 4; i++){
            var id = i;
            choiceElements.push(
                <div key={"button" + i} className='row'>
                <div className="col-md-10 text-center"><button className="btn btn-primary choice-button w-100 text-center" onClick={() => handleChoice(id)}>{vocablist[i]}</button></div>
                </div>
                )
        }
        
        return choiceElements;
      }

      
  return (
    <div className='container-fluid '>
        <h1 align="center">Lessonname</h1>

        <div className='row justify-content-center align-items-center'>  
            <div className='col-2'>{qIndex} / {quizWords.length}</div>
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

