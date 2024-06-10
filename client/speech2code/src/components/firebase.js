// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  #enter the api key
  apiKey: "Enter your api key", 
  authDomain: "Enter your information",
  projectId: "speech2script-28719",
  storageBucket: "speech2script-28719.appspot.com",
  messagingSenderId: "Enter your information",
  appId:"Enter your information",
  measurementId:"Enter your information",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
