import { reqDetailInfo } from '@/api/index';
// vuex当中的4个核心概念
const state = {
    // 存数据
    detailInfo: {}
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
    RECEIVE_DETAILINFO(state, detailInfo) {//state里面的数据哪里来的？就是被mutations中这个方法存进去的
        state.detailInfo = detailInfo
    }
}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations

    async getDetailInfo({ commit }, skuId) {
        // 发请求数据，提交给mutations,存储到state
        // await和async作用
        // 可以通过同步代码实现异步效果，可读性强
        // .then.catch不是说不能用，而是可读性不强，里面还是有异步代码（异步回调函数）

        const result = await reqDetailInfo(skuId);
        if (result.code === 200) {
            commit('RECEIVE_DETAILINFO', result.data)
        }
    },



}

const getters = {
    // 后面用来简化数据操作
    categoryView() {
        return state.detailInfo.categoryView || {};
    },
    skuInfo() {
        // 当请求的数据回来skuInfo才会是真正的对象
        // 当请求的数据没回来skuInfo就是undefined
        // 这里或一个{}，目的就是为了不给组件传递undefined,否则使用skuInfo.xxx就会报销
        // 因此我们这里或一个{}，即使数据没获取回来，但是我们给组件的不是undefiend,保证不会出错
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}