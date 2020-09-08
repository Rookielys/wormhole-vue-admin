export const SET_TOKEN = "SET_TOKEN";
export default {
    namespaced: true,
    state: () => ({
        token: null,

    }),
    mutations: {
        [SET_TOKEN] (state, token) {
            state.token = token;
        }
    }
};