import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyAhRxgklwCbmetZeAvCIem8SubYodk9ijg",
    authDomain: "gifted-chat-dcfb8.firebaseapp.com",
    projectId: "gifted-chat-dcfb8",
    storageBucket: "gifted-chat-dcfb8.appspot.com",
    messagingSenderId: "1086894622040",
    appId: "1:1086894622040:web:cca4251d760384c6a1912d"
  };

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };