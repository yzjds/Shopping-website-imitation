import { reqAddOrUpdateShopCart } from '@/api/index';
import { reqShopCartList } from '@/api/index';
import { checkCart } from "@/api/index"
import { deleteCart } from "@/api/index"
// vuex当中的4个核心概念
const state = {
    // 存数据
    ShopCartList: []
}

// state是vuex存储数据的地方，但是这个state并不是永久存储
// 当我们刷新页面或者重新启动项目（可以认为刷新页面就是重启了一下项目）
// 那么vuex当中所有的数据，都要重新初始化，重新发请求去获取
// state里面的数据一开始是有的，只不过是我们初始化的（我们在一开始的时候给定义空的数组或者对象，这些就是初始化的数据），不是请求回来的
// 但是state这个初始化的数据，也会影响组件（组件也是可以后去这个初始化数据）

// 就是因为vue和vuex没办法去永久存储数据，才有以下两个存储方案
// localStorage
// sessionStorage

const mutations = {
    // 直接修改数据
    RECEIVE_SHOPCARTLIST(state, ShopCartList) {
        state.ShopCartList = ShopCartList
    }
}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations

    // async 函数称作异步函数，一般内部都是异步操作的
    // async 函数返回值，一定是promise对象，不看return
    // 返回的promise对象的成功和失败结果，要看return
    // return的结果如果是非promise对象，那么promise一定是成功的，成功的结果就是return的结果
    // return的结果如果是promise对象，那么要看这个return后面的promise对象是成功的 还是失败的
    // 如果return的promise对象是成功的，那么promise对象就是成功的，成功的结果就是return的promise的成功结果
    // 如果return的promise对象是失败的，那么promise对象就是失败的，失败的原因就是return的promise的失败的原因

    // 如果没有return结果是抛出错误，promise也是失败的，原因就是抛出的错误原因

    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return 'ok'
        } else {
            // return 'failed'
            return Promise.reject(new Error('failed'))
        }
    },

    async getShopCartList({ commit }) {
        const result = await reqShopCartList();
        if (result.code == 200) {
            commit('RECEIVE_SHOPCARTLIST', result.data)
        }
    },

    async changeCheckCart({ commit }, { skuId, isChecked }) {
        const result = await checkCart(skuId, isChecked);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // async await 相关
    // promise基础用法
    //  then和catch链式调用（中断）
    // Promise.reject()
    // Promise.resolve()
    // Promise.race()
    // Promise.all()

    // 使用Promise.all，采用单个修改的接口去修改多个，但是真正不是这样做的
    // 真正就应该有一个修改多个接口
    // Promise.all()是promise的一个api
    // 功能：批量处理多个promise对象
    // 参数：promise对象的数组
    // 返回值：返回一个新的promise对象

    // 新的promise对象是成功还是失败
    // 只有所有的promise都成功才成功 只要有一个失败了就直接失败
    // 新的promise对象成功的结果：是参数promise对象数组当中每个promise对象成功的结果组成的数组
    // 新的promise对象失败的结果：是参数promise对象数组当中第一个失败的promise对象失败的原因

    changeCheckCartAll({commit,state,getters,dispatch},isChecked){
        let promises = [];
        // getters.ShopCartList.cartInfoList获取到的就是我们的购物车列表数据
        getters.ShopCartList.cartInfoList.forEach(item=>{
            if(item.isChecked === isChecked)  return //如果发现其中的每个购物车数据已经和要改变的状态一样，那就不用请求改变了
            else{
               let promise = dispatch('changeCheckCart',{skuId:item.skuId,isChecked})
               promises.push(promise)
            }   
        })
        return Promise.all(promises)
    },

    
    async deleteOneCart({commit},skuId){
        const result = await deleteCart(skuId)
        if(result.code ==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }

}

const getters = {
    // 后面用来简化数据操作
    ShopCartList(state) {
        // 为了解决假报错
        return state.ShopCartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}