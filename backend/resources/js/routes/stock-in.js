import LayoutTemplate from "../components/layouts/LayoutTemplate";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import multiguard from 'vue-router-multiguard';
import AddProduct from '../components/pages/stock-in/purchases/AddPurchase';
const stockInRoutes = [
    {
        path: "/stock-in",
        component: LayoutTemplate,
        children: [
            {
                path: "add-purchase",
                name: "add-purchase",
                component: AddProduct,
                beforeEnter:multiguard([IsAuthenticated]),
                meta: {
                    title: "Purchase Entry",
                    subTitle: "",
                    breadcrumbs: [{ name: "Purchase Entry", active: true }],
                    access: [] //insert the roles that will get access
                }
            },


        ]
    }
];
export default stockInRoutes;
