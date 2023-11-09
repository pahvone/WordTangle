
import "../vocab/Lesson1.json";

export default class Lesson {
    lessonName = "";
    wordList = [];
    translationList = [];

    constructor(name){
        this.lessonName = name;

        var vocabList = require('./' + this.lessonName + '.json');

       for(var i = 0; i < vocabList.vocab.length; i++){
            this.wordList.push(vocabList.vocab[i][0]);
            this.translationList.push(vocabList.vocab[i][1]);
       }
    }

}