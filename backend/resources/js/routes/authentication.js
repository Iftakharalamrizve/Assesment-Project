import PublicLayoutTemplate from "../components/layouts/PublicLayoutTemplate";
import LoginPage from '../components/pages/authentication/Login';
import IfNotAuthenticated from "../middlewares/IfNotAuthenticated";
import multiguard from 'vue-router-multiguard';
const authentication = [{
    path: '/login',
    component: PublicLayoutTemplate,
    children: [{
        path: '/login',
        name: 'login-page',
        component: LoginPage,
        beforeEnter:multiguard([IfNotAuthenticated]),
    }]
}];
export default authentication;
