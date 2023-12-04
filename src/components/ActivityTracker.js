import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, update } from "firebase/database";

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

  async updateActivity(activity) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
          resolve(activity);
        }
      });
    });
  }

  async getActivity() {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            resolve(snapshot.val().activity);
          });
        }
      });
    });
  }

  async debugGetXP() {
    let activity = null;
    activity = await this.getActivity();

    activity.xp += 40;
    let tresh = 100; //calc()

    if (activity.xp > tresh) {
      activity.lvl++;
      activity.xp = activity.xp - tresh;
    }

    this.updateActivity(activity);
    return activity;
  }

  async initActivities() {
    let activity = new Activity();

    await this.getActivity().then((_activity) => {
      if (_activity) return _activity;
    });
    await this.updateActivity(activity).then((_act) => {
      return _act;
    });
  }

  async getLatestQuizActivity() {
    return new Promise(async (resolve) => {
      await this.getActivity().then((_activity) => {
        if (!_activity.latestQuizActivity) {
          console.log("no latestq");
          let activity = new Activity();
          activity.latest = _activity.activity.latest;
          activity.latestQuizActivity = [
            { lang: "", diff: "", lessonName: "" },
          ];
          activity.dailyTasks = _activity.dailyTasks;
          activity.dailyGenDate = _activity.dailyGenDate;
          activity.xp = _activity.xp;
          activity.lvl = _activity.lvl;
        }
        resolve(_activity.latestQuizActivity);
      });
    });
  }

  async generateDailyTasks() {
    let dailyTasks = [{ task: "", completed: false }];

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    let newDailies;

    return new Promise(async (resolve) => {
      await this.getActivity().then(async (_activity) => {
        if (_activity.dailyTasks.length !== 3) {
          newDailies = true;
        } else {
          let lastGen = _activity.dailyGenDate;

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
          _activity.dailyGenDate = timestamp;
          _activity["dailyTasks"] = dailyTasks;
        }
        await this.updateActivity(_activity).then((act) => {
          resolve(act);
        });
      });
    });
  }

  getRandomDaily(dailyTasks) {
    let rand = Math.floor(Math.random() * (this.dailyTaskList.length - 1)) + 0;

    for (var i = 0; i < dailyTasks.length; i++) {
      if (dailyTasks[i].task === this.dailyTaskList[rand]) {
        i--;
        rand = Math.floor(Math.random() * (this.dailyTaskList.length - 1)) + 0;
      }
    }
    return this.dailyTaskList[rand];
  }

  async getDailyTasks() {
    return new Promise((resolve) => {
      this.getActivity().then((activity) => {
        if (!activity.dailyTasks) return;
        resolve(activity.dailyTasks);
      });
    });
  }

  async completeDailyTask(task) {
    this.getActivity().then(async (activity) => {
      let dailys = activity.dailyTasks;
      let complete = false;
      for (var i = 0; i < dailys.length; i++) {
        if (dailys[i].task === task && !dailys[i].completed) {
          dailys[i].completed = true;
          complete = true;
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
      this.updateActivity(activity);
    });
  }

  async updateLatestActivity(_activity) {
    await this.getActivity().then((activity) => {
      if (activity === undefined) {
        console.log("No activities in db");
        activity["latest"].push(_activity);
      } else {
        activity["latest"].push(_activity);

        if (activity["latest"].length > 3) activity["latest"].shift();
      }

      this.updateActivity(activity);
      this.completeDailyTask(_activity);
    });
  }
}
