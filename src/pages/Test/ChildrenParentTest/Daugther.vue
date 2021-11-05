<template>
  <div>
    <h1>女儿还剩{{ money }}</h1>
    <button @click="giveFatherMoney(100)">给爸爸100</button>
  </div>
</template>

<script>
import mixin from "./myMixin";
export default {
  name: "Daugther",
  mixins: [mixin],
  data() {
    return {
      money: 1000,
    };
  },
  methods: {
    /* giveFatherMoney() {
      // console.log(this.$parent);
      this.money -= 100;
      //   this.$parent.forEach((item) => (item.money += 50));
      this.$parent.money += 100;
    }, */
  },
};
</script>

<style>
</style>