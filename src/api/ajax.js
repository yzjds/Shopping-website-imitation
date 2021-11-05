//这个文件是对axios进行二次封装
// 配置基础路径和超时限制
// 添加进度条信息  nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误，具体请求也可以选择处理或不处理


import axios from 'axios';

// 引入nprogress相关的js和css
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store'

// 以后对axios进行二次封装，不会在axios身上直接去封装，而是创建一个新的axios实例进行封装
// axios.create()创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
    // 配置基础路径和超时限
    baseURL: '/api',//设置，当前项目当中所有接口路径的公共路径，基础路径
    timeout: 20000,//当ajax请求超时设置的这个时间就会报错
})

// 添加进度条信息功能  nprogress
// 以后如果你想对axios添加额外的功能或者时给请求头添加额外的信息
// 必然用到axios的请求拦截器和响应拦截器

// 请求拦截器
service.interceptors.request.use(
    // 请求 拦截器当中成功的回调
    function (config) {
        // config其实就是我们的请求报文
        //  这个请求报文，最后一定要返回去，因为还要继续往下走
        // 在这里我们可以添加额外的功能，也可以个I请求头添加需要的数据

        // 在请求头内部需要添加临时标识，后期每个请求都会带上这个临时标识,header中的userTempId这个是要和后端人员确认的，叫什么名字是提前约定好的
        let userTempId = store.state.user.userTempId;
        if (userTempId) {
            config.headers.userTempId = userTempId;
        }

        //如果有token的话，在header中加上token
        let token = store.state.user.token;
        if(token){
            config.headers.token = token
        }

        NProgress.start();//开启进度条
        return config;
    },
//   请求拦截器这部分失败的回调一般不写，因为失败了，也就没有下文了
  /* , function (error) {
    // Do something with request error
    return Promise.reject(error);
  } */);

// 响应拦截器
// 返回的相应不再需要从data属性当中那数据，而是响应就是我们要的数据
service.interceptors.response.use(
    function (response) {
        // response其实就是我们的响应报文
        // 这里我们也是可以添加额外的功能或者对响应报文进行处理

        NProgress.done();//停止进度条
        // 响应报文中最关心的就是data对象
        return response.data;// 返回的相应不再需要从data属性当中那数据，而是响应就是我们要的数据

    },
    function (error) {


        NProgress.done();//停止进度条（进度条不能一直开着，成功得停，失败也得停）

        // 可以统一处理错误
        alert('发送ajax请求错误' + error.message || '未知错误')
        // 统一处理完成之后，这个错误可以让后继续处理
        // return Promise.reject(new Error('发送ajax请求失败'))//后面想继续处理这个错误，返回失败的promise
        // 也可以不让后面继续处理这个错误，终端promise链
        // return new Promise(()=>{});  //返回的pedding状态的promise，代表中断promise链，后期就没有办法处理了
    });

export default service; //把封装号的axios实例， 暴露出去,后面去用