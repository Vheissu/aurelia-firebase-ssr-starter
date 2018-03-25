import { autoinject, PLATFORM, computedFrom } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

import { AuthorizeStep } from './authorize-step';

import { Store } from 'aurelia-store';

import { State } from './store/state';
import { updateUser } from './store/actions';

import firebase from './firebase';

@autoinject()
export class App {
    private router: Router;
    private state: State;

    constructor(private store: Store<State>) {
        this.store.state.subscribe((state: State) => {
            this.state = state;
        });

        firebase.auth().onAuthStateChanged(user => {
            this.store.dispatch(updateUser, user);
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia Firebase SSR';
        config.options.pushState = true;
        config.options.root = '/';

        config.map([
            { name: 'home', route: [''], moduleId: PLATFORM.moduleName('./routes/home'), title: 'Home' },
            { name: 'logged-in', route: 'logged-in', moduleId: PLATFORM.moduleName('./routes/logged-in'), title: 'Logged In', nav: false, auth: true }
        ]);

        config.mapUnknownRoutes(PLATFORM.moduleName('./routes/not-found'));

        config.addPipelineStep('authorize', AuthorizeStep);

        this.router = router;
    }
}
