// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH144KqQmtmOr8Z2tQb3fyFCbG46a1noc",
  authDomain: "travelnet-82c4b.firebaseapp.com",
  projectId: "travelnet-82c4b",
  storageBucket: "travelnet-82c4b.appspot.com",
  messagingSenderId: "945252896033",
  appId: "1:945252896033:web:a9a15eb5f38c26b610c260",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function SignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  // return signOut(auth);
}
