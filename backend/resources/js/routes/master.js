import LayoutTemplate from "../components/layouts/LayoutTemplate";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import multiguard from 'vue-router-multiguard';

import BusinessSettings from "../components/pages/master/BusinessSettings";
import  ProductCateory from "../components/pages/master/ProductCategory";
import  Warehouse from "../components/pages/master/Warehouse";
import Supplier from "../components/pages/master/Supplier";
import ProductListPage from "../components/pages/product/index";

const masterRoutes = [{
    path: "/master",
    component: LayoutTemplate,
    children: [
        {
            path: "business-settings",
            name: "business-settings",
            component: BusinessSettings,
            beforeEnter: multiguard([IsAuthenticated]),
            meta: {
                title: "Business Settings",
                subTitle: "",
                breadcrumbs: [{ name: "Business Settings", active: true }],
                access: [] //insert the roles that will get access
            }
        },
        {
            path: "product-category",
            name: "product-category",
            component: ProductCateory,
            beforeEnter: multiguard([IsAuthenticated]),
            meta: {
                title: "Product Categories",
                subTitle: "",
                breadcrumbs: [{ name: "Product Category", active: true }],
                access: [] //insert the roles that will get access
            }

        },
        {
            path: "warehouses",
            name: "warehouses",
            component: Warehouse,
            beforeEnter: multiguard([IsAuthenticated]),
            meta: {
                title: "Warehouses",
                subTitle: "",
                breadcrumbs: [{ name: "Warehouses", active: true }],
                access: [] //insert the roles that will get access
            }

        },
        {
            path: "suppliers",
            name: "suppliers",
            component: Supplier,
            beforeEnter:multiguard([IsAuthenticated]),
            meta: {
                title: "Suppliers",
                subTitle: "",
                breadcrumbs: [{ name: "Suppliers", active: true }],
                access: [] //insert the roles that will get access
            }
        },
        {
            path: "product-list",
            name: "product-list",
            component: ProductListPage,
            beforeEnter:multiguard([IsAuthenticated]),
            meta: {
                title: "Products",
                subTitle: "",
                breadcrumbs: [{ name: "Products", active: true }],
                access: [] //insert the roles that will get access
            }
        }
    ]
}];
export default masterRoutes;
