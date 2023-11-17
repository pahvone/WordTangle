import "../vocab/FIN_1.json";

export default class Lesson {
  fileName = "";
  lessonName = "";
  lang = "";
  wordList = [];
  translationList = [];

  constructor(lang, index) {
    this.fileName = lang + "_" + index;
    try {
      var vocabList = require("./" + this.fileName + ".json");
    } catch (error) {
      if (error.code === "MODULE_NOT_FOUND") {
        console.error("Lesson not found");
      }
      return;
    }
    this.lessonName = vocabList.name;

    for (var i = 0; i < vocabList.vocab.length; i++) {
      this.wordList.push(vocabList.vocab[i][0]);
      this.translationList.push(vocabList.vocab[i][1]);
    }
  }
}
