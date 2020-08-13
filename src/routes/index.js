import Vue from 'vue'
import VueRouter from "vue-router"
import _ from 'lodash'
import ViewUI from "view-design"
import loginRoutes from "@/routes/modules/login.js"
import notFoundRoutes from "@/routes/modules/404.js"

Vue.use(VueRouter);

// 所有路由
let routes = [];

routes = _.concat(routes, loginRoutes);

// 返回的是一个函数
// 返回的模块没有顺序，需要手动整理
const moduleLoader = require.context('./modules', false, /.*Routes\.js$/);
_.forEach(moduleLoader.keys(), item => {
    routes = _.concat(routes, moduleLoader(item).default)
});

routes = _.concat(routes, notFoundRoutes);

const router = new VueRouter({
    routes,
    // 去掉不影响页面跳转
    base: '/wormhole-admin/',
    mode: "hash"
});

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach((to, from) => {
    ViewUI.LoadingBar.finish();
})

export default router;