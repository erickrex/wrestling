import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCv6n-_I2GYAB_bEEBUh5R6IJ3q-RU0h2M",
    authDomain: "wrestling-d4cdd.firebaseapp.com",
    projectId: "wrestling-d4cdd",
    storageBucket: "wrestling-d4cdd.appspot.com",
    messagingSenderId: "858556567346",
    appId: "1:858556567346:web:945fcad7a48643c16b112b",
  };

//initializing firebase
firebase.initializeApp(firebaseConfig)


//initializing firestore service
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

export {projectFirestore, projectAuth, timestamp, projectStorage}