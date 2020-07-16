import Vue from 'vue'
import VueRouter from "vue-router";
import baseRoutes from "@/routes/baseRoutes.js";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: baseRoutes
});

export default router;