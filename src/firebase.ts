import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Pass in your own configuration options
const config = {
    apiKey: "AIzaSyDO0qFKD3epgUWyzcySSbwk-lRFZ38m92w",
    authDomain: "built-with-aurelia-6ef02.firebaseapp.com",
    databaseURL: "https://built-with-aurelia-6ef02.firebaseio.com",
    projectId: "built-with-aurelia-6ef02",
    storageBucket: "built-with-aurelia-6ef02.appspot.com",
    messagingSenderId: "380305050522"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase;
