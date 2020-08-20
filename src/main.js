import Vue from 'vue'
import router from "@/routes/index.js"
import store from "@/stores/index.js"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import '@/assets/css/global.scss'
import App from './App.vue'
import '@/apis/index.js'
import { Plugin } from 'vue-fragment'
import '@/components/icon/index.js'
//引入svg组件
import SvgIcon from '@/components/icon/SvgIcon.vue'
//全局注册icon-svg
Vue.component('svg-icon', SvgIcon)

// 可以帮我们去掉组件的根元素
Vue.use(Plugin)

if (process.env.NODE_ENV === 'development') {
    // import语法不支持这样写
    //require('@/mock/index.js')
}

Vue.use(ElementUI, {size: "small"});
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
