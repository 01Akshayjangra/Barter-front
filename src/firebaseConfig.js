import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyARXE19XNfrQiDR3FYbJbqBYHRkmD_7Hm4",
    authDomain: "barter-46c7f.firebaseapp.com",
    projectId: "barter-46c7f",
    storageBucket: "barter-46c7f.appspot.com",
    messagingSenderId: "209226376925",
    appId: "1:209226376925:web:8e2f18f7e42ec68b3c9d34",
    measurementId: "G-5QFVSVCG24"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase;