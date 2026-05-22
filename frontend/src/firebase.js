import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwwimH-VAxBRxXwAdttq_-ZwOz7TWiQVQ",
  authDomain: "sypsy-front-bkend.firebaseapp.com",
  projectId: "sypsy-front-bkend",
  storageBucket: "sypsy-front-bkend.firebasestorage.app",
  messagingSenderId: "913000654648",
  appId: "1:913000654648:web:b3d52944161e26123fc3cd",
  measurementId: "G-QSVSFZ1WDG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

