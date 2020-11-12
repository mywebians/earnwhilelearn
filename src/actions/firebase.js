import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsinCPH6agaEwKVT0O306_ciVHxxW5Lbk",
    authDomain: "earn-while-learn-7a304.firebaseapp.com",
    databaseURL: "https://earn-while-learn-7a304.firebaseio.com",
    projectId: "earn-while-learn-7a304",
    storageBucket: "earn-while-learn-7a304.appspot.com",
    messagingSenderId: "477794894346",
    appId: "1:477794894346:web:76e5ee69df9f74240695f3",
    measurementId: "G-7SNG9Q5WB4"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;