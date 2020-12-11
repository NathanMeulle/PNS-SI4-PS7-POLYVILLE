import {createWebHistory, createRouter } from "vue-router";
import MyMap from "./components/map/MapPage";
import MyStats from "./components/MyStats.vue";
import MyDsl from "./components/MyDsl.vue";
import Help from "@/components/DSL/Help";


const routes = [
    { path: '/', component: MyMap },
    { path: '/map', component: MyMap },
    { path: '/stats', component: MyStats },
    { path: '/dsl', component: MyDsl },
    { path: '/dsl/aide', component: Help },

]

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
});

export default router;
