import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBB44d9OffYElzhYADHtgOJSlbvVpql_NM",
  authDomain: "bookdatabase-4b8ea.firebaseapp.com",
  databaseURL: "https://bookdatabase-4b8ea.firebaseio.com",
  projectId: "bookdatabase-4b8ea",
  storageBucket: "bookdatabase-4b8ea.appspot.com",
  messagingSenderId: "1058660854900",
  appId: "1:1058660854900:web:381bac5a4c865552"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();

export default firebase;