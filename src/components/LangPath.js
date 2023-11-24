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
  lessonProg = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };

  constructor(langPath) {
    this.lang = langPath.lang;

    for (var i = 0; i < langPath.lessons["beginner"].length; i++) {
      this.lessonProg.beginner.push(0);
    }
    for (var i = 0; i < langPath.lessons["intermediate"].length; i++) {
      this.lessonProg.intermediate.push(0);
    }
    for (var i = 0; i < langPath.lessons["advanced"].length; i++) {
      this.lessonProg.advanced.push(0);
    }
  }
}

export default LangPath;
