import Vue from 'vue'
import router from "@/routes/index.js"
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App.vue'

Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
