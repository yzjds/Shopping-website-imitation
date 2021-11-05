import {reqUserOrderTradeList} from "@/api"

// vuex当中的4个核心概念
const state = {
    // 存数据
    userOrderTrade: {}
}

const mutations = {
    // 直接修改数据
    RECEVICE_USERORDERTRADE(state, userOrderTrade) {
        state.userOrderTrade = userOrderTrade
    }


}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations
    async getUserOrderTrade({ commit }) {
        const result = await reqUserOrderTradeList();
        if (result.code === 200) {
            commit('RECEVICE_USERORDERTRADE', result.data)
        }
    }


}

const getters = {
    // 后面用来简化数据操作
    detailArrayList(state){
        return state.userOrderTrade.detailArrayList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}