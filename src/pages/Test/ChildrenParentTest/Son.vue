<template>
  <div>
    <h1>儿子还剩{{ money }}</h1>
    <button @click="giveFatherMoney(50)">给bb50</button>
  </div>
</template>

<script>
import mixin from "./myMixin";
export default {
  mixins: [mixin],
  name: "Son",
  data() {
    return {
      money: 1000,
    };
  },
  /* methods: {
    giveFatherMoney(money) {
        // this.$parent可以拿到父组件对象，操作父组件对象的数据
        // this.$parent如果拿到的一个父组件对象没问题，如果这个子组件有多个父亲，那么就出问题
      // console.log(this.$parent);
      this.money -= money;
      //   this.$parent.forEach((item) => (item.money += 50));
      this.$parent.money += money;
    },
  }, */
};
</script>

<style>
</style>