import LayoutTemplate from "../components/layouts/LayoutTemplate";
import DashboardPage from "../components/pages/dashboard";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import multiguard from 'vue-router-multiguard';
const commonRoutes = [
    {
        path: "/",
        component: LayoutTemplate,
        children: [
            {
                path: "/",
                name: "dashboard-page",
                component: DashboardPage,
                beforeEnter:multiguard([IsAuthenticated]),
            },


        ]
    }
];
export default commonRoutes;
