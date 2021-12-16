// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import store from './assets/vuex/Store'
import './assets/css/style.css'
import './assets/fonts/stylesheet.css'
import 'slick-carousel/slick/slick.css'
import './assets/css/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import  {i18n}  from './assets/i18n/i18n'
import FlagICon from 'vue-flag-icon'
import axios from 'axios'
import router from './router/index'
import VueI18n from 'vue-i18n'



const country = localStorage.getItem('lang')
axios.defaults.headers['Accept-Language'] = country
if (country === null){
  localStorage.setItem('lang', 'gb-en')
}
library.add(fas)
Vue.config.productionTip = false
Vue.component('fa', FontAwesomeIcon)
Vue.use(vueResource)
Vue.use(FlagICon)
Vue.use(VueI18n)


// // Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['Accept-Language'] = localStorage.getItem('lang')

  // Do something before request is sent
  // if(config.method === 'post'){
  //   config.data.country = country;
  //   config.data.lang = lang[1];
  // }else if (config.method === 'post'){
  
  // }

  // console.log('config:', config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  router,
  components: { App, },
  template: '<App/>'
})


