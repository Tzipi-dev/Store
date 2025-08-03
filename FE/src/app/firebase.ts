
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA5bbEmzkLCI_wGCbf0bgKF-dSTe2Esr-s",
  authDomain: "store-46d11.firebaseapp.com",
  projectId: "store-46d11",
  storageBucket: "store-46d11.firebasestorage.app",
  messagingSenderId: "694734655080",
  appId: "1:694734655080:web:dd70bc91fb4192a10b35dd",
  measurementId: "G-J1CHD77JBC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
// firebase.ts



