const validatorStore = {
    state: {
        validationErrors: [],
        serverError: false
    },
    getters: {
        validationErrors: state => {
            return state.validationErrors;
        },
        serverError: state => {
            return state.serverError;
        }
    },
    mutations: {
        VALIDATION_ERROR: (state, error) => {
            if (error.response.status === 422) {
                state.validationErrors = error.response.data.errors;
            } else if (error.response.status === 401) {
                state.serverError = error.response.data.message;
            } else if (error.response.status === 500) {
                state.serverError = "Sorry Server Error";
            }
        },
        CLEAR_VALIDATION: state => {
            state.validationErrors = [];
            state.serverError = false;
        }
    },
    actions: {}
};

export default validatorStore;
