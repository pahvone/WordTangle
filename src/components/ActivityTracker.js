import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";

export default class ActivityTracker {
  xpTable = {
    quiz: 25,
    forums: 60,
  };

  dailyTaskList = ["quiz", "forums", "dictionary", "minigame"]

  getActivityDesc(act){
    switch(act){
        case "quiz":
            return "Completed a quiz"
        case "forums":
            return "Visited the forums"
        case "dictionary":
            return "Searched the dictionary"
        case "minigame":
            return "Played a mini-game"
    }
  }
  calcXPTresh(lvl, _tresh) {
    if (_tresh === undefined) _tresh = 100;
    var tresh = _tresh + lvl * (_tresh * 0.05);
    return tresh;
  }

  initActivities() {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    let activity = {
        latest: [""],
        dailyTasks: [""],
        xp: 0,
        lvl: 1,
      };

      onAuthStateChanged(auth, (user) => {
        if (user) {
            update(ref(db, "/users/" + userId), {
              activity: activity,
            });
        }
      });
  }

  generateDailyTasks (){
    const db = getDatabase();
    const auth = getAuth();

    let dailyTasks = [{task: "", completed: false}];
    
    let activity = {
      latest: [],
      dailyTasks: [{task: "", completed: false}],
      xp: 0,
      lvl: 1,
    };

        onAuthStateChanged(auth, (user) => {
            const userId = auth.currentUser.uid;
            if (user) {
                get(ref(db, "/users/" + userId)).then((snapshot) => {
                    if (!snapshot.val().activity.dailyTasks.length < 3) {
                        console.log("No daily tasks in db");

                        for (var i = 0; i < 3; i++) {
                            let randomDaily = this.getRandomDaily()
                            dailyTasks[i] = { task: randomDaily, completed: false }
                        }
                    }
                    console.log(dailyTasks)
                    activity = snapshot.val().activity
                    activity["dailyTasks"] = dailyTasks

                    update(ref(db, "/users/" + userId), {
                        activity: activity,
                    });
                }
                )
            }
        });
    }

  getRandomDaily() {
    var rand = Math.floor(Math.random() * (this.dailyTaskList.length - 1)) + 0;
    return this.dailyTaskList[rand]
  }

  updateXP(type) {
    const db = getDatabase();
    const auth = getAuth();

    var xpAmount = this.xpTable[type];

    if (auth.currentUser === null) {
      return;
    }

    var xpAmount = this.xpTable[type];
    const userId = auth.currentUser.uid;

    let activity = {
      latest: [],
      dailyTasks: [],
      xp: 0,
      lvl: 1,
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          activity = snapshot.val().activity;
          activity.xp += xpAmount;
          let tresh = 100; //calc()

          if (activity.xp > tresh) {
            console.log("over");
            activity.lvl++;
            activity.xp = activity.xp - tresh;
          }

          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
        });
      }
    });
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

    let activity = {
      latest: [],
      dailyTasks: [],
      xp: 0,
      lvl: 1,
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          if (snapshot.val().activity === undefined) {
            console.log("No activities in db");
            activity["latest"].push(_activity);
          } else {
            console.log("Push " + _activity + " to activities");
            activity = snapshot.val().activity;
            activity["latest"].push(_activity);

            if (activity["latest"].length > 3) activity["latest"].shift();
          }

          update(ref(db, "/users/" + userId), {
            activity: activity,
          });

          this.updateXP(_activity);
        });
      }
    });
  }
}
