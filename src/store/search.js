
import { reqSearchSelectorList } from '@/api/index';
// vuex当中的4个核心概念
const state = {
    // 存数据
    SearchSelectorList:{}
}

const mutations = {
    // 直接修改数据
    RECEIVE_SEARCHSELECTORLIST(state,SearchSelectorList){
        state.SearchSelectorList = SearchSelectorList
    }
}

const actions = {
    // 与组件当中用户对接
    // 一般是异步发请求
    // 提交mutations

    async getSearchSelectorList({ commit },searchParams) {
        const result = await reqSearchSelectorList(searchParams);
        if (result.code === 200) {
            commit('RECEIVE_SEARCHSELECTORLIST', result.data)
        }
    }


}

const getters = {
    // 后面用来简化数据操作
    // 为什么要getters,是因为我们获取的数据内部结构比较复杂，使用起来不方便，甚至会出现小问题（假报错）
    // 所以我们拿到复杂的数据之后，会把这个数据先做计算，计算出来我们要直接使用的数据，简化数据操作
    attrsList(state){
        return state.SearchSelectorList.attrsList || []//是为了后期不出现假报错，所以给[]
    },
    goodsList(state){
        return state.SearchSelectorList.goodsList  || []
    },
    trademarkList(state){
        return state.SearchSelectorList.trademarkList || []
    }


}

export default {
    state,
    mutations,
    actions,
    getters
}