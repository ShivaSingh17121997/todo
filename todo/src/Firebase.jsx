// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_8MKceHnwjdkzQu_m-tcgY-I3Y_TZ0JU",
    authDomain: "fir-database11am.firebaseapp.com",
    projectId: "fir-database11am",
    storageBucket: "fir-database11am.appspot.com",
    messagingSenderId: "848226254662",
    appId: "1:848226254662:web:fbd0d94a0034fd6fe26f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);   // step 1 