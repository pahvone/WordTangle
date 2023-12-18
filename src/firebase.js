import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APP_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const fb = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
/* Commented above because it wasnt used and because of the following warning
Analytics: IndexedDB unavailable or restricted in this environment. 
Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. 
Details: IndexedDB is not available in this environment. (analytics/indexeddb-unavailable).
*/
const auth = getAuth();

export default fb;
