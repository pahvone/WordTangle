import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";



const Forums = () => {

  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    if(!loaded){
    let tracker = new ActivityTracker();
    tracker.updateLatestActivity("forums");
    setLoaded(true)
    }
  });

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
          <img className="app-logo" src={logo} alt="Word Tangle Logo" />
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </h3>
        </div>
        <div className="responsive-container">
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. At
            imperdiet dui accumsan sit amet nulla facilisi morbi. Sed augue
            lacus viverra vitae. In fermentum posuere urna nec tincidunt
            praesent semper. Rhoncus urna neque viverra justo nec ultrices dui.
            Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Sed
            tempus urna et pharetra pharetra massa massa ultricies mi. Eget
            mauris pharetra et ultrices neque ornare aenean euismod. Porta nibh
            venenatis cras sed felis eget velit aliquet. Felis eget velit
            aliquet sagittis id. Tincidunt praesent semper feugiat nibh sed
            pulvinar proin gravida hendrerit.
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forums;
