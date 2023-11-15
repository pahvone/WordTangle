import React, { useState } from "react";
import NavBar from "./NavBar";
import VocabQuiz from "./VocabQuiz";

const LessonPage = () => {
  return (
    <div>
      <NavBar />
      <div>
        <VocabQuiz />
      </div>
    </div>
  );
};

export default LessonPage;
