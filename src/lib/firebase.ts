
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4788691955-90656",
  "appId": "1:1037369889300:web:f4caa0b536e09ee1170d01",
  "storageBucket": "studio-4788691955-90656.firebasestorage.app",
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "authDomain": "studio-4788691955-90656.firebaseapp.com",
  "measurementId": "G-WP8EV5JVPF",
  "messagingSenderId": "1037369889300"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.languageCode = 'it';
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// Initialize Analytics if it's supported
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, auth, db, analytics, googleProvider };
