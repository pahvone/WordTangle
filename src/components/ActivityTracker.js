import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, set, update, onValue } from "firebase/database";



export default class ActivityTracker {
    xpTable = {
        "quiz": 25,
        "forums": 10
    }

    updateXP(type) {
        const db = getDatabase();
        const auth = getAuth();

        var xpAmount = this.xpTable[type]


        if (auth.currentUser === null) {
            return;
        }

        var xpAmount = this.xpTable[type]
        console.log(xpAmount)

        const userId = auth.currentUser.uid;

        let activity = {
            "latest": [],
            "xp": 0,
            "lvl": 0
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                get(ref(db, "/users/" + userId)).then((snapshot) => {

                    //   console.log(activity["xp"])
                    activity = snapshot.val().activity
                    activity.xp += xpAmount;

                    console.log(activity)

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


        if (auth === null) return;
        if (auth.currentUser === null) return;

        const userId = auth.currentUser.uid;

        let activity = {
            latest: [],
            xp: 0,
            lvl: 0
        }
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

                    this.updateXP(_activity)
                });
            }
        });


    }
}
