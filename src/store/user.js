// 这个是user模块的vuex模块
import { getUserTempId } from '@/utils/userabout'
import { reqCode } from '@/api/index'
import { reqRegister } from '@/api/index'
import { reqUserToken } from '@/api/index'
import { reqUserInfo } from '@/api/index'
import { UserLogOut } from '@/api/index'
import { reqUserAddressList } from '@/api/index'

// vuex当中的4个核心概念
const state = {
    // 存数据
    // getUserTempId()这个函数就是专门用来生成用户的临时标识的
    userTempId: getUserTempId(),
    code: "",
    token: localStorage.getItem("TOKEN_KEY"),
    userInfo: {},
    userAddress:[]
}

const mutations = {
    // 直接修改数据
    RECEVICE_REQCODE(state, code) {
        state.code = code
    },

    RECEVICE_REQTOKEN(state, token) {
        state.token = token
    },

    RECEVICE_REQUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    RESETTOKEN(state) {
        state.token = ""
    },

    RESETUSER(){
        state.token = "";
        state.userInfo = {};
        localStorage.removeItem("TOKEN_KEY")
    },

    RECEVICE_USERADDRESSLIST(state,userAddress){
        state.userAddress = userAddress
    }   

    
}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations
    async getCode({ commit }, phone) {
        const result = await reqCode(phone)
        if (result.code === 200) {
            commit('RECEVICE_REQCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async registerUser({ commit }, userInfo) {
        const result = await reqRegister(userInfo)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async getUserToken({ commit }, userInfo) {
        const result = await reqUserToken(userInfo)
        if (result.code === 200) {
            commit("RECEVICE_REQTOKEN", result.data.token)
            localStorage.setItem("TOKEN_KEY",result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async getUserInfo({ commit }) {
        const result = await reqUserInfo();
        if (result.code === 200) {
            commit("RECEVICE_REQUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // 清除token
    async clearToken({ commit }) {
        commit("RESETTOKEN")
    },

    // 退出登录后，清除token,用户信息，以及localstorage中的token
    async resetUser({ commit }) {
        const result = await UserLogOut();
        if (result.code === 200) {
            commit("RESETUSER")
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },


    async reqUserAddressList({ commit }) {
        const result = await reqUserAddressList();
        if(result.code === 200){
            commit("RECEVICE_USERADDRESSLIST",result.data)
        }
        
    },


}

const getters = {
    // 后面用来简化数据操作
}

export default {
    state,
    actions,
    mutations,
    getters
}