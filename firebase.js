import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBPMnfzmYNbqE0gne384vsE_Bn9N6CQX3U",
    authDomain: "hackathon-b13df.firebaseapp.com",
    projectId: "hackathon-b13df",
    storageBucket: "hackathon-b13df.firebasestorage.app",
    messagingSenderId: "48804668489",
    appId: "1:48804668489:web:d4ab42ad39f0a30da2cb98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export{auth,app,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,import ,onAuthStateChanged}