import React from 'react';
import Vocab from '../vocab/Vocab';

const VocabLesson = () => {
        const Button = ({ text, onClick, style }) => {
        return (
          <button width="100" className={style} onClick={onClick}>
            {text}
          </button>
        );};
    
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
      console.log(quizWords);

      var qIndex = 1;

      const createChoices = () => {
        let choiceElements = [];
        let vocablist = ["yksi", "kaksi", "kolme", "kuusi"];

        for(var i = 0; i < 4; i++){
            var id = i;
            choiceElements.push(
                <tr key={i}>
                    <td colSpan="3">
                        <Button style="styled-button" id={i} text={vocablist[i]} onClick={() => handleChoice(id)} />
                    </td>
                </tr>)
        }
        
        return choiceElements;
      }

      
    
  return (
    <div className="responsive-container2">
        <h1 align="center">Lessonname</h1>

        <table align="center">
            <tbody>
                <tr>
                    <td width="30%" className="text-center" key="word">{qIndex} / {quizWords.length}</td>
                    <td width="40%" className="success">{qWord()}</td>
                    <td width="30%"><Button style="styled-button2" text="Skip" onClick={handleSkip} /></td>
                </tr>
                {createChoices()}
            </tbody>
        </table>

       
    </div>
  );
};

export default VocabLesson;

