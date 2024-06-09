// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3lmL_8xTG2cdU85eXnd6O_RfXthz62N0",
  authDomain: "speech2script-28719.firebaseapp.com",
  projectId: "speech2script-28719",
  storageBucket: "speech2script-28719.appspot.com",
  messagingSenderId: "449115647735",
  appId: "1:449115647735:web:24c40b30018d162b83adf2",
  measurementId: "G-EB7PZV8PMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
