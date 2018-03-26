export interface RepoInterface {
    name: string;
    repoUrl: string;
}

export interface State {
    user: null;
    repos: RepoInterface[];
}

export const initialState: State = {
    user: null,
    repos: []
};
