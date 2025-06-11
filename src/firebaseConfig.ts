import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDadkmYJYi8fy5zcSPzBec0OZAkShNeapQ",
  authDomain: "ice-cream-boat-tracker.firebaseapp.com",
  databaseURL: "https://ice-cream-boat-tracker-default-rtdb.firebaseio.com",
  projectId: "ice-cream-boat-tracker",
  storageBucket: "ice-cream-boat-tracker.appspot.com",
  messagingSenderId: "563587087367",
  appId: "1:563587087367:web:5b29e6d9f975690214fea2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
