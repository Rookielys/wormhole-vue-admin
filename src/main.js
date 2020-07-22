import Vue from 'vue'
import router from "@/routes/index.js"
//import store from "@/stores/index.js";
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App.vue'
import '@/apis/index.js'
if (process.env.NODE_ENV === 'development') {
  // import语法不支持这样写
  require('@/mock/index.js')
}

Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
  router,
  //store,
  render: h => h(App),
}).$mount('#app')
