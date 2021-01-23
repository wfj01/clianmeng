import Vue from 'vue'
import App from './App'
import {
	myRequest
} from './api/index.js'
import Base64 from "@/base64/base64.js";
// 在main.js注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.$myRuquest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
