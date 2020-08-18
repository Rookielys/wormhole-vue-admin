import Vue from 'vue'
import VueRouter from "vue-router"
import _ from 'lodash'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import loginRoutes from "@/routes/modules/login.js"
import notFoundRoutes from "@/routes/modules/404.js"

Vue.use(VueRouter);
NProgress.configure({easing: 'ease', speed: 500, showSpinner: false})
// 所有路由
let routes = [];

routes = _.concat(routes, loginRoutes);

// 路由要动态挂载不需要在这里扫描
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
    NProgress.start();
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
})

export default router;