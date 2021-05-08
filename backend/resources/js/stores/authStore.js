const loggedInUserInfo = localStorage.getItem("logged-in-user-info");
const AuthStore = {
    state: {
        loggedInUserInfo: loggedInUserInfo ? JSON.parse(loggedInUserInfo) : null,
        accessToken: localStorage.getItem("access-token"),
        loginError: false,
        loginValidationErrors: [],
        registrationValidationErrors: [],
        isLoggedIn: loggedInUserInfo != null ? true : false,
    },
    getters: {
        isLoggedIn: (state) => {
            return state.isLoggedIn;
        },
        loginValidationErrors: (state) => {
            return state.loginValidationErrors;
        },
        loginError: (state) => {
            return state.loginError;
        },
        accessToken: (state) => {
            return state.accessToken;
        },
        registrationValidationErrors: (state) => {
            return state.registrationValidationErrors;
        },
        loggedInUser: (state) => {
            return state.loggedInUserInfo.user_info;
        }
    },
    mutations: {
        LOGIN_SUCCESS: (state, loginData) => {
            localStorage.setItem("logged-in-user-info", JSON.stringify(loginData));
            localStorage.setItem("access-token", loginData.access_token);
            state.isLoggedIn = true;
            state.loggedInUserInfo = loginData;
            state.accessToken = loginData.access_token;
            app.axios.defaults.headers.common["Authorization"] = "Bearer " + state.accessToken;
        },
        LOGIN_FAILURE: (state, loginFailData) => {
            state.loginError = loginFailData;
            state.loginValidationErrors = [];
        },
        LOGIN_VALIDATION: (state, validationErrors) => {
            state.loginValidationErrors = validationErrors;
            state.loginError = false;
        },
        REGISTRATION_VALIDATION: (state, validationErrors) => {
            state.registrationValidationErrors = validationErrors;
        },
        LOGOUT: (state) => {
            localStorage.removeItem("logged-in-user-info");
            localStorage.removeItem("access-token");
            state.loggedInUserInfo = null;
            app.$router.go();
        }
    },
    actions: {
        login(context, credentials) {
            return app.axios
                .post("users/login", credentials)
                .then((response) => {
                    context.commit("LOGIN_SUCCESS", response.data);
                    return Promise.resolve("logged_in");
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 422) {
                        context.commit("LOGIN_VALIDATION", error.response.data.errors);
                    } else if (error.response.status === 401) {
                        context.commit("LOGIN_FAILURE", error.response.data.message);
                    } else {
                        console.log(error);
                    }
                    return Promise.reject(error);
                });
        },
        logout(context) {
            return app.axios
                .post('users/logout')
                .then(response => {
                    return Promise.resolve(response);
                }).catch(error => {
                    return Promise.reject(error);
                }).finally(() => {
                    context.commit('LOGOUT');
                });

        },
        register(context, userRegistrationData) {
            return app.axios
                .post("registration", userRegistrationData)
                .then((response) => {
                    context.commit("LOGIN_SUCCESS", response.data);
                    return Promise.resolve("registered and loged in");
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        context.commit(
                            "REGISTRATION_VALIDATION",
                            error.response.data.errors
                        );
                    }
                    return Promise.reject(error);
                });
        },
    },
};

export default AuthStore;
