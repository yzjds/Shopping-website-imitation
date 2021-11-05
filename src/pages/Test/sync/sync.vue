<template>
  <div>
      <!-- <h1>我有{{money}}钱</h1> -->
    <!-- <Child :money="money" @upadte:money="money=$event"></Child> -->
    <!-- <Child2 :value="money" @input="money=$event"></Child2> -->
    <Child2 v-model="money"></Child2>
    <Child :money.sync="money"></Child>
  </div>
</template>

<script>
import Child from "./Child/Child.vue"
import Child2 from "./Child2/Child2.vue"
export default {
    name:"Sync",
    data(){
        return{
            money:1000,
        }
    },
    components:{
        Child,
        Child2,
    }
}
</script>

<style>

</style>