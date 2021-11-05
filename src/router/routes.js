// import Home from '@/pages/Home'

const Home = () =>  import('@/pages/Home') //import函数可以让文件单独打包，并且动态加载
const Login = () =>  import('@/pages/Login') 
const Register = () =>  import('@/pages/Register') 
const Search = () =>  import('@/pages/Search') 
const Detail = () =>  import('@/pages/Detail') 
const AddCartSuccess = () =>  import('@/pages/AddCartSuccess') 
const ShopCart = () =>  import('@/pages/ShopCart') 
const Pay = () =>  import('@/pages/Pay') 
const PaySuccess = () =>  import('@/pages/PaySuccess') 
const Trade = () =>  import('@/pages/Trade') 
const Center = () =>  import('@/pages/Center') 
const MyOrder = () =>  import('@/pages/Center/MyOrder') 
const GroupOrder = () =>  import('@/pages/Center/GroupOrder') 
const Test = () =>  import('@/pages/Test') 

// 使用import from 这样的方式是同步执行，将所有的路由组件一次性打包在一个大的文件当中
// 这样打包之后，打包出来的文件体积比较大，当浏览器在访问这个文件加载的时候，效率不高

// 所以我们就想办法将所有的路由组件，分别打包为一个小的文件
// 浏览器在访问那个组件的时候，再去加载哪一个小的文件，效率就会提升

// 这个过程就是我们所说的路由懒加载

// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Trade from '@/pages/Trade'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'
export default [
    {
        path: '/home',
        component: Home,
        // component后面可以是一个组件，也可以是一个函数
        // 这个函数当用户第一访问Home组件的时候，就会执行Home函数
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHidden: true
        },

        // 路由独享守卫
        // 这里可以省略不写，因为这里和全局路由守卫中的功能重复
        /* beforeEnter: (to, from, next) => {
            // ...
            // 只有没登录才能到登录的界面
            let token = store.state.user.token;
            if(token){
                next('/')
            }else{
                next()
            }
        } */
    },
    {
        path: '/search/:keyword?',//加?代表params可传可不传
        component: Search,
        name: 'search',//给路由命名
        // props://这个props是我们在路由组件中操作params参数和query参数的简化方法
        // props:true,//会默认的把传递过来的params参数，额外的映射为组件当中的属性去操作
        // props:{username:'zhaoliying'}//传递一个对象，传递的是额外你需要的静态数据，不需要就不用
        /* props: (route) => {
            return {
                keyword: route.params.keyword,
                keyword2: route.query.keyword2
            }
        } */
    },
    {
        path: '/register',
        component: Register,
        //路由对象当中的元配置项，可以配置我们所需要的任何数据
        meta: {
            isHidden: true
        }
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/detail/:goodsId',
        component: Detail,
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            // 只有携带了skuNum和sessionStorage内部有skuInfo数据 才能看到添加购物车成功的界面
            let skuNum = to.query.skuNum;
            let skuInfo = sessionStorage.getItem('SKUINFO');
            if (skuNum && skuInfo) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: "/pay",
        component: Pay,
        beforeEnter(to, from, next) {
            if (from.path === '/shopcart') {
                next()
            } else {
                alert('只有从交易界面才能进到支付界面')
                next(false)
            }
        }

    },
    {
        path: "/paysuccess",
        component: PaySuccess
    },
    {
        path: "/trade",
        component: Trade,
        // 路由独享守卫
        // 组件内守卫，它的执行时机是create之前的，也就是说组件还没有被创建呢
        // 因此如果这个守卫内部使用到this，不能直接使用
        // 如果你非要使用组件对象实例，那么在守卫当中得传一个回调函数
        // next(vm=>{
        // 通过`vm`访问组件实例
        // })
        /* beforeEnter: (to, from, next)=>{
            // 只有从购物车界面才能跳到交易页面
            if(from.path === '/shopcart'){
                next();
            }else{
                alert('只有从购物车界面才能跳转到交易界面')
                next(false);
            }
        } */
    },
    {
        path: "/center",
        component: Center,
        children: [
            {
                path: "myorder",
                component: MyOrder
            },
            {
                path: "grouporder",
                component: GroupOrder
            },
            {
                path: "",//这个是刚跳转进center后，没有指定具体的二级路由，然后给的空的
                redirect: 'myorder'
            }
        ]

    },

    {
        path:'/Test',
        component:Test,
    }

]
