import "../vocab/FI.json";

export default class Lesson {
  fileName = "";
  lessonName = "";
  lang = "";
  wordList = [];
  translationList = [];

  constructor(lang, index) {
    try {
      var vocabList = require("./" + lang + ".json");
    } catch (error) {
      if (error.code === "MODULE_NOT_FOUND") {
        console.error("Lesson not found");
      }
      return;
    }
    this.lessonName = vocabList.lessons[index].name;
    var vocab = vocabList.lessons[index].vocab;

    for (var i = 0; i < vocab.length; i++) {
      this.wordList.push(vocab[i][0]);
      this.translationList.push(vocab[i][1]);
    }
  }
}
