import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";
import "./ForumIndex.css";
import { getDatabase, ref, onValue } from "firebase/database";

const ForumIndex = () => {

  const db = getDatabase();
  const announcementsRef = ref(db, 'forums/announcements/latestPost')
  const upcomingFeaturesRef = ref(db, 'forums/upcoming-features/latestPost')
  const finnishHelpRef = ref(db, 'forums/finnish-help/latestPost')
  const spanishHelpRef = ref(db, 'forums/spanish-help/latestPost')
  const finnishCommunicationRef = ref(db, 'forums/finnish-communication/latestPost')
  const spanishCommunicationRef = ref(db, 'forums/spanish-communication/latestPost')
  const generalRef = ref(db, 'forums/general/latestPost')
  const [announcementsLatestPost, setAnnouncementsLatestPost] = useState(null)
  const [upcomingFeaturesLatestPost, setUpcomingFeaturesLatestPost] = useState(null)
  const [finnishHelpLatestPost, setFinnishHelpLatestPost] = useState(null)
  const [spanishHelpLatestPost, setSpanishHelpLatestPost] = useState(null)
  const [finnishCommunicationLatestPost, setFinnishCommunicationLatestPost] = useState(null)
  const [spanishCommunicationLatestPost, setSpanishCommunicationLatestPost] = useState(null)
  const [generalLatestPost, setGeneralLatestPost] = useState(null)

  onValue(announcementsRef, (snapshot) => {
    updateLatestPost(snapshot.val(), announcementsLatestPost, setAnnouncementsLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(upcomingFeaturesRef, (snapshot) => {
    updateLatestPost(snapshot.val(), upcomingFeaturesLatestPost, setUpcomingFeaturesLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(finnishHelpRef, (snapshot) => {
    updateLatestPost(snapshot.val(), finnishHelpLatestPost, setFinnishHelpLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(spanishHelpRef, (snapshot) => {
    updateLatestPost(snapshot.val(), spanishHelpLatestPost, setSpanishHelpLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(finnishCommunicationRef, (snapshot) => {
    updateLatestPost(snapshot.val(), finnishCommunicationLatestPost, setFinnishCommunicationLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(spanishCommunicationRef, (snapshot) => {
    updateLatestPost(snapshot.val(), spanishCommunicationLatestPost, setSpanishCommunicationLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  onValue(generalRef, (snapshot) => {
    updateLatestPost(snapshot.val(), generalLatestPost, setGeneralLatestPost)
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 

  function updateLatestPost(newValue, oldValue, updateFunction){
    if(newValue!=oldValue){
      updateFunction(newValue)
    }
  }
  

  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const [practiceIsOpen, setPracticeIsOpen] = useState(false);
  const [communityIsOpen, setCommunityIsOpen] = useState(false);
  const languageStyles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: languageIsOpen ? 114 : 0,
    },
  });
  const practiceStyles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: practiceIsOpen ? 114 : 0,
    },
  });
  const communityStyles = useSpring({
    config: config.stiff,
    from: {
      height: 0,
    },
    to: {
      height: communityIsOpen ? 57 : 0,
    },
  });

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      let tracker = new ActivityTracker();
      tracker.updateLatestActivity("forums");
      setLoaded(true);
    }
  });

  const news = [
    {
      id: 0,
      title: "Announcements",
      description: "News of new features",
      latestPost: Date(),
      route: "/Forums/view-forum/announcements",
    },
    {
      id: 1,
      title: "Upcoming Features",
      description: "This is what we have planned!",
      latestPost: Date(),
      route: "/Forums/view-forum/upcoming-features",
    },
  ];
  const languageHelp = [
    {
      id: 0,
      title: "Finnish",
      description: "Get help with Finnish questions!",
      latestPost: Date.now(),
      route: "/Forums/view-forum/finnish-help",
    },
    {
      id: 1,
      title: "Spanish",
      description: "Get help with Spanish questions!",
      latestPost: Date.now(),
      route: "/Forums/view-forum/spanish-help",
    },
  ];
  const practiceTogether = [
    {
      id: 0,
      title: "Write Finnish only",
      description: "Communicate in Finnish only!",
      latestPost: Date.now(),
      route: "/Forums/view-forum/finnish-communication",
    },
    {
      id: 1,
      title: "Write Spanish only",
      description: "Communicate in Spanish only!",
      latestPost: Date.now(),
      route: "/Forums/view-forum/spanish-communication",
    },
  ];
  const community = [
    {
      id: 0,
      title: "General",
      description: "Get to know other users! :)",
      latestPost: Date.now(),
      route: "/Forums/view-forum/general",
    },
  ];
  const postColours = ["#bdbf3d", "#838530"];

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
          <div className="forum-header-container">
            <div className="forum-title-header">
              <span>NEWS</span>
            </div>
            <div className="latest-post-header">Latest Post</div>
          </div>

          <div className="forums">
            {news.map(function (forum, index) {
              let timestamp = Date.now()
              if(forum.title=="Announcements"){
                timestamp = new Date(announcementsLatestPost)
              }
              else {
                timestamp = new Date(upcomingFeaturesLatestPost)
              }
              let timestring = timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const formattedTimestamp =
                timestring + " " + timestamp.toLocaleDateString();
              return (
                <div
                  className="subforum"
                  key={forum.id}
                  style={{ backgroundColor: index % 2 ? "#838530" : "#bdbf3d" }}
                >
                  <div className="header">
                    <div className="navlink">
                      <NavLink to={forum.route}>{forum.title}</NavLink>
                    </div>
                    <div className="latest-post">{formattedTimestamp}</div>
                  </div>
                  <div className="description">{forum.description}</div>
                </div>
              );
            })}
          </div>
          <div className="language-help">
            <div
              className="forum-header-container"
              onClick={() => setLanguageIsOpen((x) => !x)}
            >
              <div className="forum-title-header">
                LANGUAGE HELP{" "}
                <span style={{ fontSize: 12, color: "gray" }}>
                  [{languageIsOpen ? "collapse" : "expand"}]
                </span>
              </div>
              <div className="latest-post-header">
                {languageIsOpen ? "Latest Post" : ""}
              </div>
            </div>
            <animated.div style={{ overflow: "hidden", ...languageStyles }}>
              <div className="forums">
                {languageHelp.map(function (forum, index) {
                  let timestamp = Date.now()
                  if(forum.title=="Finnish"){
                    timestamp = new Date(finnishHelpLatestPost)
                  }
                  else {
                    timestamp = new Date(spanishHelpLatestPost)
                  }
                  let timestring = timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const formattedTimestamp =
                    timestring + " " + timestamp.toLocaleDateString();
                  return (
                    <div
                      className="subforum"
                      key={forum.id}
                      style={{
                        backgroundColor: index % 2 ? "#838530" : "#bdbf3d",
                      }}
                    >
                      <div className="header">
                        <div className="navlink">
                          <NavLink to={forum.route}>{forum.title}</NavLink>
                        </div>
                        <div className="latest-post">{formattedTimestamp}</div>
                      </div>
                      <div className="description">{forum.description}</div>
                    </div>
                  );
                })}
              </div>
            </animated.div>
            <div className="practice-together">
              <div
                className="forum-header-container"
                onClick={() => setPracticeIsOpen((x) => !x)}
              >
                <div className="forum-title-header">
                  PRACTICE TOGETHER{" "}
                  <span style={{ fontSize: 12, color: "gray" }}>
                    [{practiceIsOpen ? "collapse" : "expand"}]
                  </span>
                </div>
                <div className="latest-post-header">
                  {practiceIsOpen ? "Latest Post" : ""}
                </div>
              </div>
              <animated.div style={{ overflow: "hidden", ...practiceStyles }}>
                <div className="forums">
                  {practiceTogether.map(function (forum, index) {
                    let timestamp = Date.now()
                    if(forum.title=="Write Finnish only"){
                      timestamp = new Date(finnishCommunicationLatestPost)
                    }
                    else {
                      timestamp = new Date(spanishCommunicationLatestPost)
                    }
                    let timestring = timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const formattedTimestamp =
                      timestring + " " + timestamp.toLocaleDateString();
                    return (
                      <div
                        className="subforum"
                        key={forum.id}
                        style={{
                          backgroundColor: index % 2 ? "#838530" : "#bdbf3d",
                        }}
                      >
                        <div className="header">
                          <div className="navlink">
                            <NavLink to={forum.route}>{forum.title}</NavLink>
                          </div>
                          <div className="latest-post">
                            {formattedTimestamp}
                          </div>
                        </div>
                        <div className="description">{forum.description}</div>
                      </div>
                    );
                  })}
                </div>
              </animated.div>
              <div className="community">
                <div
                  className="forum-header-container"
                  onClick={() => setCommunityIsOpen((x) => !x)}
                >
                  <div className="forum-title-header">
                    COMMUNITY{" "}
                    <span style={{ fontSize: 12, color: "gray" }}>
                      [{communityIsOpen ? "collapse" : "expand"}]
                    </span>
                  </div>
                  <div className="latest-post-header">
                    {communityIsOpen ? "Latest Post" : ""}
                  </div>
                </div>
                <animated.div
                  style={{ overflow: "hidden", ...communityStyles }}
                >
                  <div className="forums">
                    {community.map(function (forum, index) {
                      const timestamp = new Date(generalLatestPost);
                      let timestring = timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const formattedTimestamp =
                        timestring + " " + timestamp.toLocaleDateString();
                      return (
                        <div
                          className="subforum"
                          key={forum.id}
                          style={{
                            backgroundColor: index % 2 ? "#838530" : "#bdbf3d",
                          }}
                        >
                          <div className="header">
                            <div className="navlink">
                              <NavLink to={forum.route}>{forum.title}</NavLink>
                            </div>
                            <div className="latest-post">
                              {formattedTimestamp}
                            </div>
                          </div>
                          <div className="description">{forum.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForumIndex;
