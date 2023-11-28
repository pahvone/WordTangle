import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";

export default class ActivityTracker {
  xpTable = {
    quiz: 25,
    forums: 60,
  };

  calcXPTresh(lvl, _tresh) {
    if (_tresh === undefined) _tresh = 100;
    var tresh = _tresh + lvl * (_tresh * 0.05);
    return tresh;
  }
  /*
  calcXp (activity) {
    let xp = activity.xp;
    let lvl = activity.lvl;

    let tresh = this.calcXPTresh(lvl)

    if(xp > tresh) {
        lvl++
        console.log("level up")
        console.log("xp " + xp + " vs trsh " + resh)
        xp = xp - this.calcXPTresh(lvl - 1);
    }

    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;


    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          activity = snapshot.val().activity;
          activity.xp = xp;
          activity.lvl = lvl;

          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
        });
      }
    });

    return [xp, lvl];
  }*/

  calcLvl(activity) {
    /*var lvl = activity.lvl

    if(activity.xp > 100) lvl++ //TEST tresh VAL 100
    setXP(activity.xp)
    setLvl(lvl)*/
    //update to db
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
