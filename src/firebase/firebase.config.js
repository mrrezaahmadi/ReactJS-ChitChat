import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB7CTiBHh3Crp1X-SaVDr9aVe_eFFoiMiM",
    authDomain: "slack-clone-5a3c7.firebaseapp.com",
    databaseURL: "https://slack-clone-5a3c7.firebaseio.com",
    projectId: "slack-clone-5a3c7",
    storageBucket: "slack-clone-5a3c7.appspot.com",
    messagingSenderId: "723050505366",
    appId: "1:723050505366:web:5b6e3097fccc1deff60eb7",
    measurementId: "G-ZCT34C84CR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase