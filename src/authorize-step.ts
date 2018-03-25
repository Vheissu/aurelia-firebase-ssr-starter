import { Redirect } from 'aurelia-router';

import firebase from './firebase';

export class AuthorizeStep {
    run(navigationInstruction, next) {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                let currentRoute = navigationInstruction.config;
                let loginRequired = currentRoute.auth && currentRoute.auth === true;

                if (!user && loginRequired) {
                    return resolve(next.cancel(new Redirect('')));
                }

                return resolve(next());
            });
        });
    }
}
