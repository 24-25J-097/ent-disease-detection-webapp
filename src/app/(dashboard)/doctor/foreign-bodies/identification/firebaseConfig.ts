// removed for now -contact me if you need it
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAKKlcEwvJmronu_IRGC4zwp_ZJgf4bRWc",
    authDomain: "research-project-1163b.firebaseapp.com",
    projectId: "research-project-1163b",
    storageBucket: "research-project-1163b.firebasestorage.app",
    messagingSenderId: "117038659872",
    appId: "1:117038659872:web:45921de58ce65ae4b13f45",
    measurementId: "G-67VCMEGC36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };