//这个文件写的都是函数，我们接口请求函数
// 以后，我们的每个接口都对应了一个函数，如果想要拿相关的接口数据，只需要调用相关的接口请求函数

// axios使用  函数使用  对象使用
// 当成函数使用时  三种参数   params参数 query参数 请求体参数
// params参数，是在url当中携带的，属于路径的一部分
// query参数，可以在url中携带，用?分割，后面就是query参数
// 也可以在配置对象当中配置，配置的属性名叫做params
// 请求体参数，在配置对象中data里面配置，请求方式是put和post才有请求体参数

// axios({
//     url:'',
//     method:,
//     params:{
//         // 代表的是query参数
//         name:'zhaoliyin'
//     },
//     data:{
//         // 配的是请求提参数
//     }
// })

import request from './ajax.js';
import mock from './mockAjax.js';

// 请求三级分类列表数据
// /api/product/getBaseCategoryList
// get
// 无参数
export const reqCategoryList = () => {
    return request({
        url: '/product/getBaseCategoryList',
        method: 'get',
        data: {}
    })
}

// 验证请求是否成功
// reqCategoryList()   //这里如果要调用，得把模块引入到main.js中



export const reqBannerList = () => {
    return mock({
        url: '/banner',
    })
}
export const reqFloorList = () => {
    return mock({
        url: '/floor',
    })
}

export const reqSearchSelectorList = (searchParams) => {
    return request({
        url: '/list',
        method: 'post',
        data: searchParams  //serachParams使用户搜索的参数，这个参数是用户在发请求的时候给传递的
    })
}

// 这个请求参数，searchParams必须是一个对象，可以是空对象，但是必须传，不能不穿
// 其实用户发送请求的时候，这个参数给空对象{},也是可以获取到数据的，代表获取商品默认的数据
// 测试
// reqSearchSelectorList({})

// 请求获取详情数据
// return { x: 0, y: 0 }
// GET
export const reqDetailInfo = (skuId) => {
    return request({
        url: `/item/+${skuId}`,
        method: 'get',
    })
}

//   /api/cart/addToCart/{ skuId }/{ skuNum }
//  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 获取购物车列表
// /api/cart/cartList
// get
export const reqShopCartList = () => {
    return request({
        url: 'cart/cartList',
        method: 'get'
    })
}

// 请求修改商品的选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
// GET
export const checkCart = (skuId, isChecked) => {
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 删除单个购物车商品
// /api/cart/deleteCart/{skuId}
// DELETE
export const deleteCart = skuId => {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}


/* /api/user/passport/sendCode/{phone}
获取验证码
get
 */
export const reqCode = phone => {
    return request({
        url: `/user/passport/sendCode/${phone}`,
        method: "get"
    })
}
// /api/user/passport/register
// post
// data
export const reqRegister = userInfo => {
    return request({
        url: "/user/passport/register",
        method: "post",
        data: userInfo
    })
}

// 登录路获取token
// /api/user/passport/login
// POST

export const reqUserToken = userInfo => {
    return request({
        url: "/user/passport/login",
        method: "post",
        data: userInfo
    })
}


// 获取用户信息
// /api/user/passport/auth/getUserInfo
// get
export const reqUserInfo = () => {
    return request({
        url:"/user/passport/auth/getUserInfo",
        method:"get"
    })
}

// 退出登录
// /api/user/passport/logout
// GET
export const UserLogOut = () => {
    return request({
        url:"/user/passport/logout",
        method:"get"
    })
}

// 获取用户地址信息
// /user/userAddress/auth/findUserAddressList
// get
export const reqUserAddressList=()=>{
    return request({
        url:"/user/userAddress/auth/findUserAddressList",
        method:"get"
    })
}
// 测试
// reqUserAddressList()


// 获取订单交易页信息
// /api/order/auth/trade
// GET
export const reqUserOrderTradeList=()=>{
    return request({
        url:"/order/auth/trade",
        method:"get"
    })
}

// 提交订单
// /order/auth/submitOrder?tradeNo={tradeNo}
// post
export const submitOrder=(tradeNo,detailOrder)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:detailOrder
    })
}


// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}
// GET
export const reqPayInfo=(orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}

// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
// GET
export const reqPayStatus=(orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
    })
}

// 请求获取我的订单列表
// /api/order/auth/{page}/{limit}
// GET
export const reqMyOrder=(page,limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
    })
}






