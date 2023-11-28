import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";

export default class ActivityTracker {
  async getLatestActivity() {
    const db = getDatabase();
    const auth = getAuth();

    return new Promise((resolve) => {
      if (auth.currentUser === null) {
        resolve(null); // or handle it in some way
      }

      const userId = auth.currentUser.uid;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(db, "/users/" + userId)).then((snapshot) => {
            const activity = snapshot.val().activity["latest"];
            resolve(activity);
          });
        }
      });
    });
  }

  updateLatestActivity(_activity) {
    const db = getDatabase();
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    if (auth.currentUser === null) return;
    let activity = {
      latest: [],
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(db, "/users/" + userId)).then((snapshot) => {
          if (snapshot.val().activity === undefined) {
            console.log("No activities in db");
            activity["latest"].push(_activity);
            console.log(activity);
          } else {
            console.log("Push " + _activity + " to activities");
            activity = snapshot.val().activity;
            activity["latest"].push(_activity);

            if (activity["latest"].length > 3) activity["latest"].shift();
          }

          update(ref(db, "/users/" + userId), {
            activity: activity,
          });
        });
      }
    });
  }
}
