// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvJZ0V7-Aa4jrOUmWsmADkEGL-YCN58O8",
  authDomain: "nt-test-skooldio.firebaseapp.com",
  projectId: "nt-test-skooldio",
  storageBucket: "nt-test-skooldio.appspot.com",
  messagingSenderId: "613236083982",
  appId: "1:613236083982:web:d2c0b59e16614e4f18db5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
