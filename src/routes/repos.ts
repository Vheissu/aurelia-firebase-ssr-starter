import { autoinject, computedFrom } from 'aurelia-framework';
import { State } from '../store/state';
import { Store } from 'aurelia-store';
import { loadRepos } from 'store/actions';

@autoinject()
export class Repos {
    private state: State;

    constructor(private store: Store<State>) {
        this.store.state.subscribe((state: State) => {
            this.state = state;
        });
    }

    async activate() {
        await this.store.dispatch(loadRepos);
    }

    @computedFrom('state.repos')
    get repos() {
        return this.state.repos;
    }
}
