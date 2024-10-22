import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// আপনার ওয়েব অ্যাপের Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDhees1PFT48WEXJ6b_UMreS_Y-o3iNa5A",
  authDomain: "a2browsetools.firebaseapp.com",
  projectId: "a2browsetools",
  storageBucket: "a2browsetools.appspot.com",
  messagingSenderId: "726870199179",
  appId: "1:726870199179:web:58a3b3c7308290444d3d8e"
};

// Firebase ইনিশিয়ালাইজ করুন
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
