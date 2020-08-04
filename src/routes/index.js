import Vue from 'vue'
import VueRouter from "vue-router"
import _ from 'lodash'
import ViewUI from "view-design"

Vue.use(VueRouter);

// 所有路由
let routes = [];

// 返回的是一个函数
// 返回的模块没有顺序，需要手动整理
const moduleLoader = require.context('./modules', false, /.*Routes\.js$/);
_.forEach(moduleLoader.keys(), item => {
    routes = _.concat(routes, moduleLoader(item).default)
});

const router = new VueRouter({
    routes,
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