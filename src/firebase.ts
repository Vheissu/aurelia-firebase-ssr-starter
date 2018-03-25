import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Pass in your own configuration options
const config = {
    apiKey: "AIzaSyB1NqbyyeD9UciqrEVXdWGFvWvvoyvqR5M",
    authDomain: "mocks-xyz.firebaseapp.com",
    databaseURL: "https://mocks-xyz.firebaseio.com",
    projectId: "mocks-xyz",
    storageBucket: "mocks-xyz.appspot.com",
    messagingSenderId: "823822156231"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase;
