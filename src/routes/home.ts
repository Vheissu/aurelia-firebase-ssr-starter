import { autoinject, computedFrom } from 'aurelia-framework';
import { Redirect } from 'aurelia-router';

import { Store } from 'aurelia-store';
import { State } from './../store/state';
import firebase from '../firebase';

@autoinject()
export class Home {
    private state: State;

    constructor(private store: Store<State>) {
        this.store.state.subscribe((state: State) => {
            this.state = state;
        });
    }

    async canActivate() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    resolve(new Redirect('logged-in'));
                } else {
                    resolve();
                }
            });
        });
    }

    @computedFrom('state.user')
    get userIsLoggedIn() {
        return this.state.user || false;
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);
    }

    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    register(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}
