// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//引用axios
import axios from 'axios'
Vue.prototype.$axios = axios;

import Vuex from 'vuex';
import store from './store/store'

import Vant from 'vant'
Vue.use(Vant)
import 'vant/lib/vant-css/index.css'
import './assets/font.css'

//使用动画 过渡
import animition from 'animate.css'
Vue.use(animition)


import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import clipboard from 'clipboard'
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

//or you can set componentName default componentName is vue-seamless-scroll
Vue.use(scroll,{componentName: 'scroll-seamless'})

// Vue.prototype.$urls = '';
Vue.prototype.$url = '';


import { PullRefresh } from 'vant';
Vue.use(PullRefresh);


Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
