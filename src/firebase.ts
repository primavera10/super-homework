import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDM8f8ZaubFUqdl3TNCXy4V6pnRfHywgCE",
    authDomain: "super-homework.firebaseapp.com",
    projectId: "super-homework",
    storageBucket: "super-homework.appspot.com",
    messagingSenderId: "936889458041",
    appId: "1:936889458041:web:e105d95751682e185be3a8",
    measurementId: "G-VBEEX8Z86W"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);


