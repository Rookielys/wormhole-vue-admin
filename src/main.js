import Vue from 'vue'
import router from "@/routes/index.js"
import store from "@/stores/index.js"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import '@/assets/css/global.scss'
import App from './App.vue'
import '@/apis/index.js'

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
