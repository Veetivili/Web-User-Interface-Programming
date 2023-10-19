// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebaseConfig";
// Required for side-effects
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
