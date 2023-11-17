import React, { useState } from "react";
import NavBar from "./NavBar";
import VocabQuiz from "./VocabQuiz";
import Footer from "./Footter";

const LessonPage = () => {
  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
      <div>
        <VocabQuiz />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LessonPage;
