import firebase from '../firebase';
import store from './store';

import { UPDATE_USER, LOAD_REPOS } from './constants';

const DB: firebase.firestore.Firestore = firebase.firestore();

export function updateUser(state, user) {
    return { ...state, ...{ user } };
}

export async function loadRepos(state) {
    const LOADED_REPOS = await DB.collection('repos').get();

    let repos = [];

    LOADED_REPOS.docs.forEach(d => repos.push(d.data()));

    return { ...state, ...{ repos } };
}

store.registerAction(UPDATE_USER, updateUser);
store.registerAction(LOAD_REPOS, loadRepos);
