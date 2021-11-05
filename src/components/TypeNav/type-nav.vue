<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div v-show="isShow" class="sort">
            <div class="all-sort-list2" @click="toSearch($event)">
              <div
                class="item"
                :class="{ item_on: currentindex === index }"
                @mouseenter="moveInItem(index)"
                v-for="(c1, index) in categoryList.data"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- 利用自定义标签 -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                      class="fore"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentindex: -1,
      isShow: true,
    };
  },
  // 组件在挂载完成的时候，就立马发请求获取数据，存储到vuex里面，而不是vue组件里面
  beforeMount() {
    
  },
  mounted() {
    // dispatch是分发和触发的意思，和emit单词意思一样
    // 本质其实就是在调用指定的action函数
    if (this.$route.path !== "/home"&&this.$route.path !=="/") {
      this.isShow = false;
    }

    
  },

  methods: {
    // 没节流的时候
    // moveInItem(index){
    //   this.currentindex = index;
    //   console.log(index);
    // }

    moveInItem: throttle(
      function (index) {
        this.currentindex = index;
        // console.log(index);
      },
      50,
      { trailing: false }
    ),

    // event是事件对象
    // 每一次触发事件的时候，系统（浏览器内核）都会把这个触发事件相关的所有信息，封装为一个对象
    // 在浏览器调用回调函数的时候，自动传递给回调函数的第一个形参
    toSearch(event) {
      // console.log(this);
      // 事件委派click的回调函数
      const targetNode = event.target;
      // console.log(result);
      let data = targetNode.dataset; //获取当前目标元素身上的data-属性  组成的对象

      // 如果点的是a标签，那么参数已经带过来了，就在我们的data当中
      let { category1id, category2id, category3id, categoryname } = data;

      if (categoryname) {
        // categoryName存在就证明点击的就是a标签
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };
        // 确定一级还是二级还是三级
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 找到所有的query参数后，最后把query放大location里面
        location.query = query;

        // 跳转之前，要合并原来过来时候带的params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }

        // 最终把location对象就构造好了，跳转
        if(this.$route.path==='/search'){
          this.$router.replace(location);
        }else{
          this.$router.push(location);
        }
        
      }
    },

    leaveDiv() {
      this.currentindex = -1;
      if (this.$route.path !== "/home" && this.$route.path !=="/") {
        this.isShow = false;
      }
    },

    
  },
  // 从vuex当中把数据捞到vue组件当中使用
  // 以后只要从vuex拿的是数据（state和getters当中的东西）,都在computed当中拿
  // 以后只要从vuex拿的是方法（actions和mutations当中的东西），都在methods当中去拿，一般用的很少
  computed: {
    // 函数内部可以是数组也可以是对象
    // 是数组必须满足的条件：
    // 1、数组直接就是总的state当中的数据，不能是模块里面的
    // 2、数组当中的名字必须和state当中的名字一致
    // ...mapState(['categoryList'])//不能写成这个样子，因为categoryList,不是state.categoryList，而是state.home.categotyList
    ...mapState({
      categoryList: (store) => store.home.categoryList, //store是...mapState提供的
    }),
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.sort-enter {
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to {
        height: 460px;
        opacity: 1;
      }
      &.sort-enter-active {
        transition: all 0.5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 616px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .item_on {
          background-color: hotpink;
          .item-list {
            display: block;
          }
        }
      }
    }
  }
}
</style>