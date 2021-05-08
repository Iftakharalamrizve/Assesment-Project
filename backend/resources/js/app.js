//initialize vue js in laravel project
import Vue from "vue";
import App from "./components/App";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios";
import VueAxios from "vue-axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    closeOnClick: true,
    timeout: 5000,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};
Vue.use(Toast, options);

Vue.use(VueAxios, axios);

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: routes
});
// vuex install and use
import { store } from "./stores/index";
axios.defaults.baseURL = "http://localhost:9005/api/v1/";
Vue.prototype.$baseURL = "http://localhost:9005/";
if (store.getters.accessToken) {
    axios.defaults.headers.common["Authorization"] =
        "Bearer " + store.getters.accessToken;
}
//to set up axios interceptors
axios.interceptors.request.use(
    config => {
        store.commit("SHOW_LOADER");
        return config;
    },
    error => {
        store.commit("HIDE_LOADER");
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        store.commit("HIDE_LOADER");
        return response;
    },
    error => {
        store.commit("HIDE_LOADER");
        return Promise.reject(error);
    }
);
window.store = store;
const app = new Vue(
    Vue.util.extend(
        {
            router,
            store
        },
        App
    )
).$mount("#app");
window.app = app;
