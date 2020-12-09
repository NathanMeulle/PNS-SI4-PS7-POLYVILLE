import {createWebHistory, createRouter } from "vue-router";
import MyMap from "./components/MyMap.vue";
import MyStats from "./components/MyStats.vue";
import MyDsl from "./components/MyDsl.vue";


const routes = [
    { path: '/', component: MyMap },
    { path: '/map', component: MyMap },
    { path: '/stats', component: MyStats },
    { path: '/dsl', component: MyDsl },

]

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
});

export default router;