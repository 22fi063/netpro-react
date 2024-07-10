// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZFvZ-yRbPdkXfjSdZsPioVUF_kG_Mn5w",
  authDomain: "netpro-df42e.firebaseapp.com",
  projectId: "netpro-df42e",
  storageBucket: "netpro-df42e.appspot.com",
  messagingSenderId: "676427999751",
  appId: "1:676427999751:web:6041ee2505e34bd55658a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication を初期化
const auth = getAuth(app);

export { auth };
