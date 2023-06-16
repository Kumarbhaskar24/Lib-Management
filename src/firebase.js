import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCnjziT_iquAPTVumXqgxplJAyDXWieIQU",
    authDomain: "library-management-8ea58.firebaseapp.com",
    databaseURL: "https://library-management-8ea58-default-rtdb.firebaseio.com/",
    projectId: "library-management-8ea58",
    storageBucket: "library-management-8ea58.appspot.com",
    messagingSenderId: "445400586069",
    appId: "1:445400586069:web:2c9e012f5a469a94e2c1dc",
    measurementId: "G-HD6V4NKTTY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const Provider=new GoogleAuthProvider();

