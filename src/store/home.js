import { reqCategoryList } from '@/api/index';
import { reqBannerList } from '@/api/index';
import { reqFloorList } from '@/api/index';
// vuex当中的4个核心概念
const state = {
    // 存数据
    categoryList: [],//这里的数据定义为数据还是对象要看最后的返回结果data是数据还是对象再定义
    bannerList: [],
    floorList: [],
}

const mutations = {
    // 直接修改数据
    RECEIVE_CATEGORYLIST(state, categoryList) {//state里面的数据哪里来的？就是被mutations中这个方法存进去的
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state, bannerList) {//state里面的数据哪里来的？就是被mutations中这个方法存进去的
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state, floorList) {//state里面的数据哪里来的？就是被mutations中这个方法存进去的
        state.floorList = floorList
    },
}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations

    async getCategoryList({ commit }) {
        // 发请求数据，提交给mutations,存储到state
        // await和async作用
        // 可以通过同步代码实现异步效果，可读性强
        // .then.catch不是说不能用，而是可读性不强，里面还是有异步代码（异步回调函数）

        const result = await reqCategoryList();
        if (result.code === 200) {
            commit('RECEIVE_CATEGORYLIST', result)
        }
    },

    async getbannerList({ commit }) {
        // 发请求数据，提交给mutations,存储到state
        // await和async作用
        // 可以通过同步代码实现异步效果，可读性强
        // .then.catch不是说不能用，而是可读性不强，里面还是有异步代码（异步回调函数）

        const result = await reqBannerList();
        if (result.code === 200) {
            commit('RECEIVE_BANNERLIST', result)
        }
    },

    async getFloorList({ commit }) {
        // 发请求数据，提交给mutations,存储到state
        // await和async作用
        // 可以通过同步代码实现异步效果，可读性强
        // .then.catch不是说不能用，而是可读性不强，里面还是有异步代码（异步回调函数）

        const result = await reqFloorList();
        if (result.code === 200) {
            commit('RECEIVE_FLOORLIST', result)
        }
    },



}

const getters = {
    // 后面用来简化数据操作

}

export default {
    state,
    mutations,
    actions,
    getters
}