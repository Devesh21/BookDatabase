import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQKrr_tKdg-oFvh9KcjwPYxQVdICQnr5g",
    authDomain: "book-database-c3a02.firebaseapp.com",
    databaseURL: "https://book-database-c3a02.firebaseio.com",
    projectId: "book-database-c3a02",
    storageBucket: "book-database-c3a02.appspot.com",
    messagingSenderId: "900061462876",
    appId: "1:900061462876:web:f3f7d00c0aff1b5e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();


  export default firebase;