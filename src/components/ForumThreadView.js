import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../img/WTlogo_stacked_white_bordered.png";
import Footer from "./Footter";
import ActivityTracker from "./ActivityTracker";
import "./ForumThreadView.css";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ForumThreadView = () => {
  const auth = getAuth();
  const navigate = useNavigate();
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

  const Button = ({ text, onClick }) => {
    return (
      <button className="styled-button" onClick={onClick}>
        {text}
      </button>
    );
  };

  function getThread(data) {
    if (data == null) {
      return;
    }
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
          edited: replyObject.edited,
        };
        listOfReplies.push(newReply);
      });
    }
    if (JSON.stringify(listOfReplies) != JSON.stringify(repliesList)) {
      setRepliesList(listOfReplies);
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

  const [editText, setEditText] = useState(null);
  const [editing, setEditing] = useState(null);

  function submitEdit(id = null) {
    if (editText == "") {
      setEditing(null);
      return;
    }
    const db = getDatabase();

    if (!id) {
      let dbRef;
      dbRef = ref(db, "/forums/" + forum + "/" + threadId);
      update(dbRef, {
        text: editText,
        edited: true,
      });
    } else {
      let dbRef;
      dbRef = ref(db, "/forums/" + forum + "/" + threadId + "/replies/" + id);
      update(dbRef, {
        text: editText,
        edited: true,
      });
    }
    setEditing(null);
  }

  const [openDeleteThreadPopup, setOpenDeleteThreadPopup] = useState(false);
  const [openDeleteReplyPopup, setOpenDeleteReplyPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  function handleDelete(confirmed = false) {
    setOpenDeleteThreadPopup(false);
    setOpenDeleteReplyPopup(false);
    if (!confirmed) {
      setDeleteId(null);
    } else {
      let dbRef;
      if (!deleteId) {
        let path = "/Forums/view-forum/" + forum;
        navigate(path);
        dbRef = ref(db, "/forums/" + forum + "/" + threadId);
        set(dbRef, null);
      } else {
        setDeleteId(null);
        dbRef = ref(
          db,
          "/forums/" + forum + "/" + threadId + "/replies/" + deleteId,
        );
        set(dbRef, null);
      }
    }
  }

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
              <Grid
                item
                style={{ textAlign: "left", paddingLeft: "16px" }}
                xs={8}
              >
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
                    <Grid item xs={8}>
                      <div className="reply-text">
                        {thread.author == auth.currentUser.uid ? (
                          editing == threadId ? (
                            <textarea
                              value={editText}
                              name="text"
                              rows="5"
                              cols="35"
                              wrap="soft"
                              onChange={(e) => {
                                setEditText(e.target.value);
                              }}
                            ></textarea>
                          ) : (
                            <div>
                              {thread.text}
                              <span style={{ fontSize: 12 }}>
                                {" "}
                                {thread.edited ? "edited" : ""}
                              </span>
                            </div>
                          )
                        ) : (
                          "test"
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className="thread-buttons">
                          {thread.author == auth.currentUser.uid 
                          ? editing == threadId 
                          ? <div className="thread-buttons">
                            <button className="round-button" onClick={() => submitEdit()}>
                            ✔
                              </button>
                            <button className="round-button" onClick={() => setEditing(null)}>
                            🗙
                              </button>
                            </div>
                           : (
                            <div>
                              <button
                                className="round-button"
                                onClick={() => {
                                  setEditing(threadId);
                                  setEditText(thread.text);
                                }}
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="round-button"
                                onClick={() => {
                                  setEditing(null);
                                  setEditText(null);
                                  setOpenDeleteThreadPopup(true);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                              <Dialog
                                open={openDeleteThreadPopup}
                                onClose={() => {
                                  handleDelete();
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Confirm deletion of thread?"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    This action is irreversible.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <button
                                    className="styled-critical-warning-button"
                                    onClick={() => handleDelete(true)}
                                    autoFocus
                                  >
                                    Agree
                                  </button>
                                  <button
                                    className="styled-button"
                                    onClick={() => {
                                      handleDelete();
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          )
                         : 
                          ""
                        }
                      </div>
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
                <Box key={reply.id} sx={{ flexGrow: 1 }}>
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
                      <Grid item xs={7}>
                        <div className="reply-text">
                          {reply.author == auth.currentUser.uid ? (
                            editing == reply.id ? (
                              <textarea
                                value={editText}
                                name="text"
                                rows="5"
                                cols="35"
                                wrap="soft"
                                onChange={(e) => {
                                  setEditText(e.target.value);
                                }}
                              ></textarea>
                            ) : (
                              <div>
                                {reply.text}
                                <span style={{ fontSize: 12 }}>
                                  {" "}
                                  {reply.edited ? "edited" : ""}
                                </span>
                              </div>
                            )
                          ) : (
                            "test"
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                      <div className="thread-buttons">
                          {reply.author == auth.currentUser.uid 
                          ? editing == reply.id 
                          ? <div className="thread-buttons">
                            <button className="round-button" onClick={() => submitEdit(reply.id)}>
                            ✔
                              </button>
                              <button className="round-button" onClick={() => {setEditText(null); setEditing(null)}}>
                              🗙
                                </button>
                                
                              </div>
                             : (
                              <div>
                                <button
                                  className="round-button"
                                  onClick={() => {
                                    setEditing(reply.id);
                                    setEditText(reply.text);
                                  }}
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  className="round-button"
                                  onClick={() => {
                                    setEditing(null);
                                    setEditText(null);
                                    setDeleteId(reply.id);
                                    setOpenDeleteReplyPopup(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            )
                           : (
                            ""
                          )}
                        </div>
                        <Dialog
                          open={openDeleteReplyPopup}
                          onClose={() => {
                            handleDelete();
                          }}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm deletion of reply?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              This action is irreversible.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <button
                              className="styled-critical-warning-button"
                              onClick={() => {
                                handleDelete(true);
                              }}
                              autoFocus
                            >
                              Agree
                            </button>
                            <button
                              className="styled-button"
                              onClick={() => {
                                handleDelete();
                              }}
                            >
                              Cancel
                            </button>
                          </DialogActions>
                        </Dialog>
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
                  <button
                    className="styled-button"
                    onClick={(e) => {
                      e.preventDefault();
                      createReply();
                    }}
                  >
                    Submit
                  </button>
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
