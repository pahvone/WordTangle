import React, { useState } from "react";
import NavBar from "./NavBar";
import VocabQuiz from "./VocabQuiz";
import Footer from "./Footter";
import { useLocation } from "react-router-dom";

const LessonPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div>
          <VocabQuiz
            lang={queryParams.get("lang")}
            diff={queryParams.get("diff")}
            index={queryParams.get("index")}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonPage;
