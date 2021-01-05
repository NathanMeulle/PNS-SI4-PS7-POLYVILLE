import {createWebHistory, createRouter } from "vue-router";
import MyMap from "./components/map/MapPage";
import MyDsl from "./components/MyDsl.vue";
import Help from "./components/DSL/Help";
import Macro from "./components/DSL/Macro";
import EventPage from "./components/Event/EventPage.vue";
import HelpEvent from "@/components/Event/HelpEvent";


const routes = [
    { path: '/', component: MyMap },
    { path: '/map', component: MyMap },
    { path: '/dsl', component: MyDsl },
    { path: '/dsl/aide', component: Help },
    { path: '/dsl/macro', component: Macro},
    { path: '/eventPage', component: EventPage},
    { path: '/eventPage/aide', component: HelpEvent}

];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes,
});

export default router;
