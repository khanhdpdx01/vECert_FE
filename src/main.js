import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import VueCookies from 'vue-cookies'
import 'vue-toast-notification/dist/theme-sugar.css';
import setUpInterceptor from './services/setUpInterceptor';

Vue.config.productionTip = false
Vue.use(VueToast, {
  duration: 1000,
  position: 'top-right',
});
Vue.use(VueCookies);

setUpInterceptor(router, VueCookies, localStorage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
