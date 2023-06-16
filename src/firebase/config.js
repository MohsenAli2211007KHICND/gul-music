import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRWhlfbY4Cze-5MMbzvad4-eX58dWdauE",
    authDomain: "gul-music-46089.firebaseapp.com",
    projectId: "gul-music-46089",
    storageBucket: "gul-music-46089.appspot.com",
    messagingSenderId: "625113829745",
    appId: "1:625113829745:web:e20e5d00819c92d7b1e6d0",
    measurementId: "G-T14V00689N"
  };

  firebase.initializeApp(firebaseConfig)
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, projectStorage, timeStamp }