import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKyz-q8ac2JWS9wXH2TWZhaUN_LflY2V4",
  authDomain: "landing3d-ca107.firebaseapp.com",
  projectId: "landing3d-ca107",
  storageBucket: "landing3d-ca107.appspot.com",
  messagingSenderId: "653294735537",
  appId: "1:653294735537:web:a38ad1aa62d8ec6b741290",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
