import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCPNuozb6nZvna9y7OAq43lQEX3fY9OlNQ",
    authDomain: "react-slack-clone-61212.firebaseapp.com",
    databaseURL: "https://react-slack-clone-61212.firebaseio.com",
    projectId: "react-slack-clone-61212",
    storageBucket: "react-slack-clone-61212.appspot.com",
    messagingSenderId: "54199345513",
    appId: "1:54199345513:web:6c2e4f076d811c57cd1df8",
    measurementId: "G-1QRLRQT0J4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase