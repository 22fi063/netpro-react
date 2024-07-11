// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7okdGZtHxftPVicQ94B03f2NgERuJp_8",
  authDomain: "netpro-login.firebaseapp.com",
  projectId: "netpro-login",
  storageBucket: "netpro-login.appspot.com",
  messagingSenderId: "42771495264",
  appId: "1:42771495264:web:3ecae54c594647f7d20605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication を初期化
const auth = getAuth(app);

export { auth };

