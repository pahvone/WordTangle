import ConfettiExplosion from 'react-confetti-explosion';
import { useState } from "react";
import ActivityTracker from "./ActivityTracker";
import { getAuth, onAuthStateChanged } from "firebase/auth";




const Popup = ({ setIsOpenPopup}) => {
  const auth = getAuth();
  const [tracker, setTracker] = useState(null);
  const [currentLvl,setcurrentLvl] = useState(0);
  const popupText = "Terve!";
  const [isExploding, setIsExploding] = useState(false);

  const CheckLvlUp = async () => {
   await tracker.debugGetXP(auth.currentUser.uid).then((activity) => {
    setcurrentLvl(activity.lvl)
    
    if (activity.lvl > currentLvl) {
      console.log('Level up!');
    } 
  });
};


  


  
  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    > 

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "250px",
          padding: "20px 10px",
          animation: "dropTop .1s linear"
        }}
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
        >
          <h1 style={{ margin: 0 }}>Well done!</h1>
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10
            }}
          >
          </div>
        </div>
        <div className="confettiposition">
        {setIsExploding && 
          <ConfettiExplosion
          force={0.7}
          particleCount={350}
          duration={3000}
          width={1800}
          zIndex={-1}
          colors={[
            '#50ffc0',
            '#fbff50',
            '#dddddd',
            '#8E59FF']}
          />} 
        </div>
        {/* Body */}
        <div>
          <p>
          <span>{popupText}
          </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Popup;
