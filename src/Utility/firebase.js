import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0fAUzfhhRgVivmhrj2Mq3ItHM4CBoDeo",
  authDomain: "clone-827c3.firebaseapp.com",
  projectId: "clone-827c3",
  storageBucket: "clone-827c3.appspot.com",
  messagingSenderId: "174617714197",
  appId: "1:174617714197:web:34fc71348b7de054c8781c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
