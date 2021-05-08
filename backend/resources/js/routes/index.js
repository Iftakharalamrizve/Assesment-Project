import authentication from './authentication';
import commonRoutes from './common';
import masterRoutes from "./master";
import stockInRoutes from "./stock-in";
const routes = [
    ...authentication,
    ...commonRoutes,
    ...masterRoutes,
    ...stockInRoutes,
]

export default routes;
