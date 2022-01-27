import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Homepage from "../views/Homepage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Homepage,
    },
    {
        path: "/:category",
        name: "Categorized",
        component: () => import("../views/CategorizedPage.vue"),
    },
    {
        path: "/search-result",
        name: "SearchResult",
        component: () => import("../views/SearchResultPage.vue"),
    },
    {
        path: "/product/:productId",
        name: "Product",
        component: () => import("../views/Product.vue"),
    },
    {
        path: "/cart",
        name: "Cart",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Cart.vue"),
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: () => import("../views/Checkout.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
