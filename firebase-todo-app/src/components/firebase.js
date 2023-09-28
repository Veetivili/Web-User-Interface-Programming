import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

  export const firebaseConfig = {
    apiKey: "AIzaSyDn93grMq0tpplOXKAkF8JDjM3HTJntqWs",
    authDomain: "todo-d8397.firebaseapp.com",
    projectId: "todo-d8397",
    storageBucket: "todo-d8397.appspot.com",
    messagingSenderId: "512369308810",
    appId: "1:512369308810:web:ee83a341e03c2000f3e973",
    measurementId: "G-46Z9JKDJV0"
  };
  
  // Initialize Firebase
  //export const db = getFirestore(app);
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);