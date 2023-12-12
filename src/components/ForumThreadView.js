import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";
import "./ForumThreadView.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { format } from "prettier";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";

const ForumThreadView = () => {
  const { forum, threadId } = useParams();
  const [replyText, setReplyText] = useState("");
  const [repliesList, setRepliesList] = useState([]);
  const [thread, setThread] = useState({});

  const db = getDatabase();
  const threadRef = ref(db, "/forums/" + forum + "/" + threadId);
  onValue(
    threadRef,
    (snapshot) => {
      getThread(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    },
  );

  function getThread(data) {
    let newData = data;
    const authorDbRef = ref(db, "users/" + data.author + "/username");
    let username = "error";
    onValue(authorDbRef, (snapshot) => {
      username = snapshot.val();
    });
    newData["authorUsername"] = username;
    if (JSON.stringify(newData) != JSON.stringify(thread)) {
      setThread(newData);
    }
    let listOfReplies = [];
    if (typeof data.replies === "object") {
      Object.keys(data.replies).forEach((reply) => {
        const replyObject = data.replies[reply];

        const dbRef = ref(db, "users/" + replyObject.author + "/username");
        let username = "error";
        onValue(dbRef, (snapshot) => {
          username = snapshot.val();
        });

        let newReply = {
          id: reply,
          text: replyObject.text,
          author: replyObject.author,
          authorUsername: username,
          creationDate: replyObject.creationDate,
        };
        listOfReplies.push(newReply);
      });
      if (JSON.stringify(listOfReplies) != JSON.stringify(repliesList)) {
        setRepliesList(listOfReplies);
      }
    }
  }

  function createReply() {
    const auth = getAuth();
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const newReply = {
      author: userId,
      text: replyText,
      creationDate: Date.now(),
    };
    const replyRef = ref(db, "forums/" + forum + "/" + threadId + "/replies");
    const threadRef = ref(db, "forums/" + forum + "/" + threadId);
    const newReplyRef = push(replyRef);
    set(newReplyRef, newReply);
    update(threadRef, { latestPost: Date.now() });
    setReplyText("");
  }
  const dummyReplies = [
    {
      id: 0,
      text: "They do move in herds..",
      poster: "jack daniel enjoyer",
      postDate: Date.now(),
    },
    {
      id: 1,
      text: "No shit mister daniel..",
      poster: "jack daniel hater",
      postDate: Date.now(),
    },
    {
      id: 2,
      text: "That's mr alcoholic to you",
      poster: "jack daniel enjoyer",
      postDate: Date.now(),
    },
  ];

  const dummyThreads = {
    announcements: [
      {
        id: 0,
        title: "We have launched our forums!",
        postText: "hello test test test test test test test test",
        replies: dummyReplies,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "john",
      },
      {
        id: 1,
        title: "We are going bankrupt.",
        postText: "hello test test test test test test test test",
        replies: 5,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "bertha",
      },
    ],
    "finnish-help": [
      {
        id: 0,
        title: "What does 'hyppytyynytyydytys' mean?",
        postText: "hello test test test test test test test test",
        replies: 0,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "mark",
      },
      {
        id: 1,
        title: "How do you say 'the fog is coming'?",
        postText: "hello test test test test test test test test",
        replies: 0,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "maxwell",
      },
    ],
    "finnish-communication": [
      {
        id: 0,
        title: "Hei kaikki, puhutaan suomea!",
        postText: "hello test test test test test test test test",
        replies: 0,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "john",
      },
      {
        id: 1,
        title: "Mikä lempi ruokasi?",
        postText: "hello test test test test test test test test",
        postDate: Date.now(),
        replies: 0,
        latestActivity: Date.now(),
        threadCreator: "simone",
      },
    ],
    general: [
      {
        id: 0,
        title: "I'm really grateful for this wonderful service. :)",
        postText: "hello test test test test test test test test",
        replies: 0,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "totally_not_paid_actor",
      },
    ],
    error: [
      {
        id: 0,
        title: "Welcome to the backrooms.",
        postText: "hello test test test test test test test test",
        replies: 0,
        postDate: Date.now(),
        latestActivity: Date.now(),
        threadCreator: "totally_not_paid_actor",
      },
    ],
  };

  const threadList = dummyThreads["announcements"];

  const threadTimestamp = new Date(thread.creationDate);
  let threadTimestring = threadTimestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedThreadTimestamp =
    threadTimestring + " " + threadTimestamp.toLocaleDateString();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      let tracker = new ActivityTracker();
      tracker.updateLatestActivity("forums");
      setLoaded(true);
    }
  });

  const postColours = ["#bdbf3d", "#838530"];

  return (
    <div>
      <NavBar />
      <div className="pagecontainer">
        <div className="responsive-container">
          <div className="forums">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                justifyContent="space-between"
                container
                className="forum-header-container"
              >
                <Grid item xs={8}>
                  <div className="forum-title-header">
                    <span>
                      <NavLink className="navlink" to={"/Forums"}>
                        Forum Index
                      </NavLink>{" "}
                      &gt;&gt;{" "}
                      <NavLink
                        className="navlink"
                        to={"/Forums/view-forum/" + forum}
                      >
                        {forum.charAt(0).toUpperCase() + forum.slice(1)}
                      </NavLink>{" "}
                      &gt;&gt; Thread
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              justifyContent="space-between"
              container
              className="forum-header-container"
            >
              <Grid item xs={5}>
                {thread.title}
              </Grid>
              <Grid item xs={2}>
                <div className="latest-post-header">Author</div>
              </Grid>
            </Grid>
          </Box>
          <div className="forums">
            <div className="original-post">
              <Box sx={{ flexGrow: 1 }}>
                <div
                  className="subforum"
                  key={thread}
                  style={{ backgroundColor: "fbff50" }}
                >
                  <Grid justifyContent="space-between" container>
                    <Grid item xs={1}>
                      <div className="reply-timestamp">
                        {formattedThreadTimestamp}
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="reply-text">{thread.text}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="latest-post-header">
                        {thread.authorUsername}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </div>
          </div>
          <div className="forums">
            {repliesList.map(function (reply, index) {
              const timestamp = new Date(reply.creationDate);
              let timestring = timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const formattedTimestamp =
                timestring + " " + timestamp.toLocaleDateString();
              return (
                <Box sx={{ flexGrow: 1 }}>
                  <div
                    className="subforum"
                    key={reply.id}
                    style={{
                      backgroundColor: index % 2 ? "#838530" : "#bdbf3d",
                    }}
                  >
                    <Grid justifyContent="space-between" container>
                      <Grid item xs={1}>
                        <div className="reply-timestamp">
                          {formattedTimestamp}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="reply-text">{reply.text}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="latest-post-header">
                          {reply.authorUsername}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              );
            })}
          </div>
          <div className="forums">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                justifyContent="space-between"
                container
                className="forum-header-container"
              >
                <Grid item xs={8}>
                  <div className="forum-title-header">Create Reply</div>
                </Grid>
              </Grid>
            </Box>
            <div className="reply-box">
              <form>
                <label>
                  <textarea
                    value={replyText}
                    name="text"
                    rows="5"
                    cols="35"
                    wrap="soft"
                    onChange={(e) => {
                      setReplyText(e.target.value);
                    }}
                  ></textarea>
                </label>
                <div>
                  <input type="button" value="Submit" onClick={createReply} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForumThreadView;
