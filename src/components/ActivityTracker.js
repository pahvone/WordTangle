import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";

export class Activity {
  latest = [""];
  latestQuizActivity = [{ lang: "", diff: "", lessonName: "" }];
  dailyTasks = [{ task: "", completed: false }];
  dailyGenDate = "";
  xp = 0;
  lvl = 1;
}
export default class ActivityTracker {
  dailyXPTable = {
    quiz: 25,
    forums: 15,
    dictionary: 10,
    minigame: 30,
  };

  dailyTaskList = ["quiz", "forums", "dictionary", "minigame"];

  getActivityDesc(act) {
    switch (act) {
      case "quiz":
        return "Completed a quiz";
      case "forums":
        return "Visited the forums";
      case "dictionary":
        return "Searched the dictionary";
      case "minigame":
        return "Played a mini-game";
    }
  }

  calcXPTresh(lvl, _tresh) {
    if (_tresh === undefined) _tresh = 100;
    var tresh = _tresh + lvl * (_tresh * 0.05);
    return tresh;
  }

  debugGetXP() {
    const db = getDatabase();
    const auth = getAuth();

    const userId = auth.currentUser.uid;
    let activity = null;
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            activity = snapshot.val().activity;
            activity.xp += 40;
            let tresh = 100; //calc()

            if (activity.xp > tresh) {
              activity.lvl++;
              activity.xp = activity.xp - tresh;
            }
            // console.log("Updating daily completion to db");
            update(ref(db, "/users/" + userId), {
              activity: activity,
            });

            resolve(activity);
          });
        }
      });
    });
  }

  async initActivities() {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    let activity = new Activity();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            if (snapshot.val().activity) return snapshot.val().activity;
          });
          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
          resolve(activity);
        }
      });
    });
  }

  getLatestQuizActivity() {
    const db = getDatabase();
    const auth = getAuth();

    let activity = new Activity();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        const userId = auth.currentUser.uid;
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            activity = snapshot.val().activity;
            if (!activity.latestQuizActivity) {
              console.log("no latestq");
              activity = new Activity();
              activity.latest = snapshot.val().activity.latest;
              activity.latestQuizActivity = [
                { lang: "", diff: "", lessonName: "" },
              ];
              activity.dailyTasks = snapshot.val().activity.dailyTasks;
              activity.dailyGenDate = snapshot.val().activity.dailyGenDate;
              activity.xp = snapshot.val().activity.xp;
              activity.lvl = snapshot.val().activity.lvl;
            }
            console.log(activity);
            resolve(activity.latestQuizActivity);
          });
        }
      });
    });
  }

  generateDailyTasks() {
    const db = getDatabase();
    const auth = getAuth();

    let dailyTasks = [{ task: "", completed: false }];

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    let act = new Activity();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        const userId = auth.currentUser.uid;
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            act = snapshot.val().activity;

            var newDailies = false;

            if (snapshot.val().activity.dailyTasks.length !== 3) {
              //console.log("No daily tasks in db");
              newDailies = true;
            } else {
              let lastGen = snapshot.val().activity.dailyGenDate;

              /*
            console.log(
              "Previous dailies were generated on " +
                lastGen +
                " vs " +
                timestamp,
            );*/

              if (timestamp !== lastGen) {
                console.log("New date, generate new dailies");
                newDailies = true;
              }
            }

            if (newDailies) {
              console.log("Generate new dailies");
              for (var i = 0; i < 3; i++) {
                let randomDaily = this.getRandomDaily(dailyTasks);
                dailyTasks[i] = { task: randomDaily, completed: false };
              }
              act.dailyGenDate = timestamp;
              act["dailyTasks"] = dailyTasks;
            }

            update(ref(db, "/users/" + userId), {
              activity: act,
            });

            resolve(act);
          });
        }
      });
    });
  }

  getRandomDaily(dailyTasks) {
    let rand = Math.floor(Math.random() * (this.dailyTaskList.length - 1)) + 0;

    for (var i = 0; i < dailyTasks.length; i++) {
      if (dailyTasks[i].task === this.dailyTaskList[rand]) {
        i--;
        rand = Math.floor(Math.random() * (this.dailyTaskList.length - 1)) + 0;
        //console.log(this.dailyTaskList[rand] + " is already a daily task")
      }
    }
    return this.dailyTaskList[rand];
  }

  async getDailyTasks() {
    const db = getDatabase();
    const auth = getAuth();

    return new Promise((resolve) => {
      const userId = auth.currentUser.uid;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            if (!snapshot.val().activity.dailyTasks) return;
            const dailyTasks = snapshot.val().activity.dailyTasks;
            resolve(snapshot.val().activity.dailyTasks);
          });
        }
      });
    });
  }

  completeDailyTask(task) {
    const db = getDatabase();
    const auth = getAuth();

    const userId = auth.currentUser.uid;
    let activity = null;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          activity = snapshot.val().activity;
          let dailys = activity.dailyTasks;
          let complete = false;
          for (var i = 0; i < dailys.length; i++) {
            if (dailys[i].task === task && !dailys[i].completed) {
              dailys[i].completed = true;
              complete = true;
              //console.log(task + " is completed");
              break;
            }
          }
          activity.dailyTasks = dailys;
          if (!complete) return;

          activity.xp += this.dailyXPTable[task];
          let tresh = 100; //calc()

          if (activity.xp > tresh) {
            activity.lvl++;
            activity.xp = activity.xp - tresh;
          }
          // console.log("Updating daily completion to db");
          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
        });
      }
    });

    //console.log("complete daily done");
  }

  async getLatestActivity() {
    const db = getDatabase();
    const auth = getAuth();

    return new Promise((resolve) => {
      if (auth.currentUser === null) {
        resolve(null);
      }

      const userId = auth.currentUser.uid;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            if (!snapshot.val().activity) return;
            // console.log("Getting activity")
            const activity = snapshot.val().activity;
            resolve(activity);
          });
        }
      });
    });
  }

  updateLatestActivity(_activity) {
    const db = getDatabase();
    const auth = getAuth();

    if (auth === null) return;
    if (auth.currentUser === null) return;

    const userId = auth.currentUser.uid;

    var xpAmount = this.dailyXPTable[_activity];

    let activity = new Activity();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          if (snapshot.val().activity === undefined) {
            console.log("No activities in db");
            activity["latest"].push(_activity);
          } else {
            activity = snapshot.val().activity;
            activity["latest"].push(_activity);

            if (activity["latest"].length > 3) activity["latest"].shift();
          }

          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
          this.completeDailyTask(_activity);
        });
      }
    });
  }
}
