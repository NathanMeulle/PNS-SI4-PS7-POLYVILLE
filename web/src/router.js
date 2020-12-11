import {createWebHistory, createRouter } from "vue-router";
import MyMap from "./components/map/MapPage";
import MyDsl from "./components/MyDsl.vue";


const routes = [
    { path: '/', component: MyMap },
    { path: '/map', component: MyMap },
    { path: '/dsl', component: MyDsl },

]

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
});

export default router;
