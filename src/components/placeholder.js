import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import Footer from "./Footter";
import Popup from "./Popup";


const Tester = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
      <button onClick={setIsOpenPopup.bind(this, true)}>Open Popup</button>
      {isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup}/>}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tester;
