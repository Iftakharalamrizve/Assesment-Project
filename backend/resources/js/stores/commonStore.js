const commonStore = {
    state: {
        showLoader: false,
    },
    getters: {

    },
    mutations: {
        SHOW_LOADER(state) {
            state.showLoader = true;
        },
        HIDE_LOADER(state) {
            state.showLoader = false;
        },
    },
    actions: {

    }
}

export default commonStore;
