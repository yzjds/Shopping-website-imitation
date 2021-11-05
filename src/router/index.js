// 2.引入并声明使用
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes.js'
import store from '@/store'

/* 面试问题1: 
        描述: 编程式路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误
              声明式路由跳转内部已经处理

        原因：vue-router3.1.0之后, 引入了promise的语法
             如果没有通过参数指定成功或者失败回调函数就返回一个promise且内部会判断如果要跳转的路径和参数都没有变化,
                会抛出一个失败的promise

        解决: 
            (还有一种解决方法，使用低版本的vue，不推荐这种方法)
            1：在跳转时指定成功或失败的回调函数, 或者catch处理错误
                这个解决办法不好，因为不能一劳永逸，后期如果用到push/repalce还要继续都得写  //到调用push那里去看
            2: 修改Vue原型上的push和replace方法 (优秀) */
// 修改Vue原型上的push和replace方法 (优秀) 
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onResolve, onReject) {
    if (onResolve === undefined && onReject === undefined) {
        return originPush.call(this, location).catch(() => { })
    } else {
        return originPush.call(this,location, onResolve, onReject)
    }
}
const orginReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve === undefined && onReject === undefined) {
        return orginReplace.call(this, location).catch(() => { })
    } else {
        return orginReplace.call(this,location, onResolve, onReject)
    }
}

let router = new VueRouter({
    routes,
    // 配置滚动行为，跳转到新的路由界面滚动条的位置
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
      }
})

router.beforeEach(async(to, from, next) => {
    // ...
    let token = store.state.user.token;
    let userInfo = store.state.user.userInfo;
    if(token){
        if(to.path === "/login"){
            next("/")
        }else{
            if(userInfo.name){
                next()
            }else{
                try{
                    await store.dispatch('getUserInfo')
                    next();
                }catch(error){
                    // 如果出错说明token过期，要删除token,并且要删除local中的token
                    store.dispatch("clearToken");
                    localStorage.removeItem("TOKEN_KEY");
                    alert('您的账号已过期，请重新登陆')
                    next('/login')
                }
            }
        }
    }else{
        // 用户根本没登录
        // 目前我们什么都不做，直接放行，后面我们是需要添加功能的
        // 如果用户访问的交易相关 支付相关 个人中心相关，那么我们呢跳转到登录页面
        let startPath = to.path
        if(startPath.indexOf("/pay") !== -1 || startPath.indexOf("/trade") !== -1 || startPath.startsWith("/center")){
            // 这里更人性化的一点是，如果用户没有登录，将用户要访问的路径加到query参数里面跳转到login页面，等登录成功了做处理
            next("/login?redirect="+startPath);
        }else{
            next();
        }
        
    }
  })

  // 3.向外暴露一个路由器对象
export default router