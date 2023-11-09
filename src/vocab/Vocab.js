
export class Lesson {
    lessonName = "";
    wordList = [20];
    translationList = [20];

    constructor(name){
        this.lessonName = name;
    }

    addWords(words, translations){
        this.wordList = words;
        this.translationList = translations;
    }
}

export default class Vocab {
    
    lessons = [];

    constructor(){
        const les = new Lesson("Vocab 1");
        les.addWords([["yksi", "one"], ["kaksi", "two"], ["kolme", "three"],["neljä", "four"]])
        this.lessons.push(les);
    }
    createVocab = () => {
        
    }

    getVocab = () => {
        return this.lessons;
    }
}