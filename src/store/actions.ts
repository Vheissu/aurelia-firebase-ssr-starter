import store from './store';

import { UPDATE_USER } from './constants';

function updateUser(state, user) {
    return { ...state, ...{ user } };
}

store.registerAction(UPDATE_USER, updateUser);
