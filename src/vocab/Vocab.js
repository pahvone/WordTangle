
import "../vocab/FIN_1.json";

export default class Lesson {
    fileName = "";
    lessonName = "";
    lang = "";
    wordList = [];
    translationList = [];

    constructor(lang, index){
        this.fileName = lang + "_" + index;
        var vocabList = require('./' + this.fileName + '.json');
        this.lessonName = vocabList.name;
        
       for(var i = 0; i < vocabList.vocab.length; i++){
            this.wordList.push(vocabList.vocab[i][0]);
            this.translationList.push(vocabList.vocab[i][1]);
       }
    }

}