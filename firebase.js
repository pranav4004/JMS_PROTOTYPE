// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc,query,where,Timestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGPSpDTV8LBvHikhksje37h7sNjlAMhEk",
    authDomain: "inventorysystem-cf77a.firebaseapp.com",
    projectId: "inventorysystem-cf77a",
    storageBucket: "inventorysystem-cf77a.firebasestorage.app",
    messagingSenderId: "407390134112",
    appId: "1:407390134112:web:9755f2fbb9ea4e4be64805",
    measurementId: "G-QWZ2VW46ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore modules
export { db, collection, getDocs,addDoc,doc,updateDoc,deleteDoc,query,where,Timestamp };