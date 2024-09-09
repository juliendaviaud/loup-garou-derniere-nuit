// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKEQSRD-s1ic8-oUKXVP61NFwuOLYuRyo",
  authDomain: "loup-garou-derniere-nuit.firebaseapp.com",
  databaseURL: "https://loup-garou-derniere-nuit-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loup-garou-derniere-nuit",
  storageBucket: "loup-garou-derniere-nuit.appspot.com",
  messagingSenderId: "1078958094882",
  appId: "1:1078958094882:web:f17f3dd9553e8de034e87b",
  measurementId: "G-832HTPB7EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);