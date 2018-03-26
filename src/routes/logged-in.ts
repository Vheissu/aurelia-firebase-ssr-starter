import { autoinject } from 'aurelia-framework';
import { Redirect, Router } from 'aurelia-router';

import firebase from '../firebase';
import { Store } from 'aurelia-store';
import { State } from '../store/state';

@autoinject()
export class LoginIn {
    private currentUser = {};
    private state: State;

    constructor(private store: Store<State>, private router: Router) {
        this.store.state.subscribe((state: State) => {
            this.state = state;

            console.log(state.user);
        });
    }

    logout() {
        firebase.auth().signOut().then(() => {
            this.router.navigate('/');
        });
    }
}
