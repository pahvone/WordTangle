export class LangPath {
  langJSON = null;
  lang = "";
  langDesc = "";
  lessons = [];

  constructor(_lang) {
    try {
      this.langJSON = require("../vocab/" + _lang + ".json");
      this.lang = this.langJSON.lang;
      this.langDesc = this.langJSON.langDesc;
      this.lessons = this.langJSON.lessons;
    } catch (error) {
      if (error.code === "MODULE_NOT_FOUND") {
        console.error("Lesson not found");
      }
      return;
    }
  }
}

export class UserLangs {
  lang = "";
  lessonProg = [[]]; //["100%", "56%", "60%"], ["30%", "10%", "0%"], ["0%", "0%", "0%"]

  constructor(lang) {
    this.lang = lang;
  }
}

export default LangPath;
