import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "images-searcher-151c7.firebaseapp.com",
  databaseURL: "https://images-searcher-151c7-default-rtdb.firebaseio.com",
  projectId: "images-searcher-151c7",
  storageBucket: "images-searcher-151c7.appspot.com",
  messagingSenderId: "740266636808",
  appId: "1:740266636808:web:f238a35e98334df86b03bd"
}

firebase.initializeApp(config);

export default firebase;