// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkZvz3c6yG4XTKvTBnK6C6fZKRQav8v18",
    authDomain: "ff1-mods.firebaseapp.com",
    projectId: "ff1-mods",
    storageBucket: "ff1-mods.firebasestorage.app",
    messagingSenderId: "310072623270",
    appId: "1:310072623270:web:702e3f0e35d53c9d37f467",
    measurementId: "G-0JYRS9EBRK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const to_snake_case = (str) =>
  str
    .replace(/\s+/g, "_")
    .replace(/[^\w\s]/g, "")
    .toLowerCase();

export function logPageView(pageName) {
  logEvent(analytics, to_snake_case(pageName), {
    Page: pageName,
  });
}
