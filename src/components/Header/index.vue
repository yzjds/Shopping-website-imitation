<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>欢迎</span>
            <a href="javascript:;">{{userInfo.name}}</a>
            <a href="javascript:;" @click="logOut">退出登录</a>
          </p>

          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
          
          
        
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch($event)"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  mounted() {
    // 绑定总线事件
    this.$bus.$on('removeKeyword',this.removeKeyword)
  },
  methods: {
    toSearch() {
    //   console.log(this);

      // 一、路由参数种类：params参数和query参数
      // params参数是属于路径的一部分，路由当中匹配的时候，是要照顾这个参数的
      // query参数是在路径后面，以?分割，?后面的a=b&&c=d就是你的query参数
      // query参数是不属于路径的一部分，路由匹配的时候，不需要关心这个参数

      // 二、路由路径带参数的三种写法
      // 1.字符串写法
      // this.$router.push('/search/'+this.keyWord+'?keyWord='+this.keyWord.toUpperCase())
      // 2.模板字符串写法   //模板字符串的方法我在实验的时候不生效，没有继续追究
      // this.$router.push(`/serach/${this.keyWord}?keyword1=${this.keyWord.toUpperCase()}`)
      // 3.对象写法（重点）
      /* this.$router.push({
                name:'search',
                params:{
                    keyword:''||undefined
                },
                query:{
                    keyword:this.keyWord
                }
            }) */

      // 面试问题3: 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
      // 1.不传params参数
      // 2.首先必须在params参数可传可不穿的前提下，当传递的参数是空串的时候，传递成undefined，就不出问题

      let location = {
        name:'search',
        params:{
          keyword: this.keyWord || undefined,
        }
      }
      if(this.$route.query){
        location.query = this.$route.query
      }

      // 如果是从home页跳search页，就push
      // 如果是search页跳search页，就replace
      if(this.$route.path==='/search'){
        this.$router.replace(location)
      }else{
        this.$router.push(location)
      }
      

      /* 描述: 编程式路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误
		      声明式路由跳转内部已经处理
		原因：vue-router3.1.0之后, 引入了promise的语法
		     如果没有通过参数指定成功或者失败回调函数就返回一个promise且内部会判断如果要跳转的路径和参数都没有变化,
 			会抛出一个失败的promise
		解决: 1：在跳转时指定成功或失败的回调函数, 或者catch处理错误 //下面这个方法在测试的时候不生效
				这个解决办法不好，因为不能一劳永逸，后期如果用到push/repalce还要继续都得写 */
      //   this.$router.push({
      //     name: "search",
      //     params: {
      //       keyword: this.keyWord || undefined,
      //     },
      //     query: {
      //       keyword2: this.keyWord,
      //     },
      //   }).catch(()=>{});
    },

    removeKeyword(){
      this.keyWord = "";
    },

    async logOut(){
      try{
        await this.$store.dispatch('resetUser')
        alert('已经成功退出账号！')
        this.$router.push('/')
      }catch(error){
        alert('退出登录失败！')
      }
    }
  },
  computed:{
    ...mapState({
      userInfo: store=>store.user.userInfo
    })
  }
};
</script>

<style lang='less' scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>