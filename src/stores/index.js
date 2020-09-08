import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import authc from "@/stores/modules/authc";

Vue.use(Vuex)

// 所有模块
let modules = {};

// 返回的是一个函数
const moduleLoader = require.context('./modules', false, /.*\.js$/);
_.forEach(moduleLoader.keys(), item => {
    // 文件名当模块名
    let s = item.lastIndexOf("/");
    let e = item.lastIndexOf(".");
    let name = item.substring(s + 1, e);
    modules[name] = moduleLoader(item).default;
});

const store = new Vuex.Store({
    modules,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        paths: ['authc.token']
    })]
});
// console.log(store)
export default store;