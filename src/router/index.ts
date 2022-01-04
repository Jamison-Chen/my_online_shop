import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Shop from "../views/Shop.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/shop/:category",
        name: "Shop",
        component: Shop,
    },
    {
        path: "/cart",
        name: "Cart",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
    },
    {
        path: "/product/:productId",
        name: "Product",
        component: () => import("../views/Product.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
