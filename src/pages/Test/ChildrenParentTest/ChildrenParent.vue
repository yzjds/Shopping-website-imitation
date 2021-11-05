<template>
  <div>
    <h1>baba有存款{{ money }}</h1>
    <button @click="brrowMoneyFromXM">找小明借钱100</button>
    <button @click="brrowMoneyFromXH">找小红借钱150</button>
    <button @click="brrowMoneyFromAll">找所有孩子借钱200</button>

    <br />
    <Son ref="son"></Son>

    <br />
    <Daugther ref="dau"></Daugther>
  </div>
</template>

<script>
import Son from "./Son.vue";
import Daugther from "./Daugther.vue";

export default {
  name: "ChildrenParent",
  components: { Son, Daugther },
  data() {
    return {
      money: 1000,
    };
  },
  methods: {
    brrowMoneyFromXM() {
      //父亲的钱加100
      this.money += 100;
      //儿子的钱减 100
      this.$refs.son.money -= 100;
    },
    brrowMoneyFromXH() {
      //父亲的钱加150
      this.money += 150;
      //女儿的钱减 150
      this.$refs.dau.money -= 150;
    },
    brrowMoneyFromAll(){
        // 父亲的钱加200；
        this.money += 200;
        // 每个孩子钱减100
        // console.log(this.$children);//this.$children是所有子组件的集合
        // 这个方式虽然可以直接互殴去到所有的子组件对象组成的数组，但是谁在前谁在后不确定
        // 因此官方不建议使用$childern和$parent
        this.$children.forEach(item=>item.money-=100)
    }
  },
};
</script>

<style>
</style>