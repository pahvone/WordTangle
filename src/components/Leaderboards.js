import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, update } from "firebase/database";

export class LeaderboardEntry {
  userName = "";
  xpGain = 0;
  lvl = 0;
  currentLang = "";

  constructor(name, gain, lvl, lang) {
    this.userName = name;
    this.xpGain = gain;
    this.lvl = lvl;
    this.currentLang = lang;
  }
}

export default class Leaderboards {
  async newLeaderBoards() {
    const currentDate = new Date();

    this.updateLeaderboards();
  }

  async updateLeaderboards() {
    const db = getDatabase();
    const auth = getAuth();
    //const userId = auth.currentUser.uid;

    let test1 = new LeaderboardEntry("raito", 100, 2);
    let test2 = new LeaderboardEntry("joku", 50, 3);
    let test3 = new LeaderboardEntry("blaa", 400, 6);

    const entries = [test1, test2, test3];

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          update(ref(db, "/leaderboards/"), {
            entries: entries,
          });
          resolve(entries);
        }
      });
    });
  }

  async getLeaderboards() {
    const db = getDatabase();
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/leaderboards/")).then((snapshot) => {
            resolve(snapshot.val());
          });
        }
      });
    });
  }
}
