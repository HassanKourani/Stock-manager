import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDeFZKvO4WzuruUyjphd3QvPRK_1e17R70",
  authDomain: "stockmanagment-9d679.firebaseapp.com",
  projectId: "stockmanagment-9d679",
  storageBucket: "stockmanagment-9d679.appspot.com",
  messagingSenderId: "458469314047",
  appId: "1:458469314047:web:b3caea448b8b59a6b9abca",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
