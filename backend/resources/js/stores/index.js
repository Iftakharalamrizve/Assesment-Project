import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "./authStore";
import validatorStore from "./validator";
import commonStore from './commonStore'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        AuthStore,
        validatorStore,
        commonStore,
    }
});
