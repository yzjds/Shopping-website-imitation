<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(skuinfo, index) in CartInfoList"
          :key="skuinfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="skuinfo.isChecked === 1"
              @click="changeCheck(skuinfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="skuinfo.imgUrl" />
            <div class="item-msg">{{ skuinfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ skuinfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(skuinfo, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="skuinfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum(skuinfo, $event.target.value * 1, false)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(skuinfo, 1, true)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ skuinfo.cartPrice * skuinfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteOneCart(skuinfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ changeNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
      // 这边不需要根据请求的成功或失败有后续的操作，所以我们没必要去拿结果
      // 只需要发请求，让数据存储在vuex里面
    },

    async changeCartNum(cart, disNum, flag) {
      // flag是用于判断用户是点击+-进来的还是输入框失去焦点进来的
      // 获取原来半身的量
      let originNum = cart.skuNum;
      if (flag) {
        // 证明点是点击+-进来的，那么我们得保证最终的总数量最少是1

        if (originNum + disNum < 1) {
          // 证明原本的数量变化之后，比1还小，那么我们应该修正disNum
          // 如果最终比1还小，那么disNum就应该修正，修正的结果让他们最终刚好是1
          // 修正disnum
          disNum = 1 - originNum;
        }
      } else {
        // 证明这个里面传递的是input输入的值，disNum它代表最终的值
        if (disNum < 1) {
          //disNum此时代表的是最终的值
          disNum = 1 - originNum; //disNum代表的是变化的量
        } else {
          disNum = disNum - originNum; //等号左边的disNum代表的是变化的量，等号右边的disNum代表是最终的值
        }
      }
      // 经历了上面的if-else  到这里disnum肯定是变化的量，不管是点击=-还是输入框输入，都是正确的变化的量
      // 发请求修改数量
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 如果请求成功重新获取购物车列表数据
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },

    async changeCheck(cart) {
      /* let ischecked = cart.isChecked;
      if (ischecked === 1) {
        ischecked = 0;
      } else{
        ischecked = 1;
      } */
      try {
        await this.$store.dispatch("changeCheckCart", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        // alert('修改成功')
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },

    async deleteOneCart(skuinfo) {
      if (confirm("确定不要了？")) {
        try {
          await this.$store.dispatch("deleteOneCart", skuinfo.skuId);
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      }
    },

    async deleteCheckedCart() {
      let promises = [];
      this.CartInfoList.forEach((item) => {
        if (item.isChecked === 0) return;
        else {
          let promise = this.$store.dispatch("deleteOneCart", item.skuId);
          promises.push(promise);
        }
      });
      try {
        await Promise.all(promises);
        alert("全部删除");
        this.getShopCartList()
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    ...mapGetters(["ShopCartList"]),
    CartInfoList() {
      return this.ShopCartList.cartInfoList || [];
    },

    //计算已选择商品数量
    changeNum() {
      return this.CartInfoList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },

    // 计算总价
    allMoney() {
      return this.CartInfoList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre += item.skuNum * item.skuPrice;
        }
        return pre;
      }, 0);
    },

    // 计算全选和不全选
    allChecked: {
      get() {
        // 读取的
        return this.CartInfoList.every((item) => item.isChecked === 1);
      },
      async set(val) {
        // val 获取 到的是用户点击全选之后，多选框的checked属性值，它是个布尔值
        // 写的 修改
        // 在这里我们发送请求，修改所有的购物车的选中状态
        let ischecked = val ? 1 : 0;
        try {
          const result = await this.$store.dispatch(
            "changeCheckCartAll",
            ischecked
          );
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>