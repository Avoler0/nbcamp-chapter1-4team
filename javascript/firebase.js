import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
  

const firebaseConfig = {
  apiKey: "AIzaSyDspAV1LiugBcx69J0dWIk979EKColRCMY",
  authDomain: "nbcamp4dollar.firebaseapp.com",
  projectId: "nbcamp4dollar",
  storageBucket: "nbcamp4dollar.appspot.com",
  messagingSenderId: "903810170431",
  appId: "1:903810170431:web:d06256df539d9edb0e828a",
  measurementId: "G-LBRL46HQYD",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);