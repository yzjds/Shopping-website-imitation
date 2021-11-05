import Vue from 'vue'
// import App from './App.vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import MyPagination from "@/components/Pagination"

import "@/utils/validate"


// 如果不通过vuex来获取数据，可以在vue函数原型上定义一个$API来操作和获取请求
import * as API from '@/api'

import { MessageBox, Message } from 'element-ui';
import { Button} from 'element-ui';
Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// 图片懒加载
import VueLazyload from "vue-lazyload"
import loading from "@/assets/cat.gif"
// 在图片界面没有进入到可视范围前不加载，在没有得到图片前先显示loading图片
Vue.use(VueLazyload,{//内部自定义了一个指令lazy
  loading,//指定未加载得到图片之前的loading图
})



import '@/mock/mockServer'//引入mockServer，让模拟的接口生效

// import '@/api'//这样写直接去找api下的index.js

// 第二种验证方式
// import {reqCategoryList} from '@/api/index'
// reqCategoryList();

import TypeNav from '@/components/TypeNav/type-nav.vue'
// @是一个别名，是个小名 代表的就是我们的src的路径
import SlideLoop from '@/components/SlideLoop'

Vue.config.productionTip = false;

// 全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components，注册在全局
Vue.component('TypeNav',TypeNav)
Vue.component('SlideLoop',SlideLoop)
Vue.component('MyPagination',MyPagination)

//安装事件总线
// Vue.prototype.$Bus = this;

var a = 100;
new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this;//安装总线 代表任意组件内部都可以通过this.$bus访问到vm实例
    Vue.prototype.$API = API;//在vue原型上加入一个$API,并将获取到的api函数存进去，这样在组件里面调用直接可以用$API.函数名()来调用
  },
  render: h => h(App),
  router,//我们所有的组件都可以使用this.$router 和 this.$route
  store,//注册上我们所有的组件都可以拿到this.$store
}).$mount('#app')
