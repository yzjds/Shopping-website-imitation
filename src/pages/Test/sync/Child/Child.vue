<template>
  <div>
      <span>小明每次花100元</span>
      <button @click="$emit('update:money',money-100)">花钱</button>
      <span>还剩{{money}}元</span>
      <!-- <input type="text" :value="money" @input="$emit('upadte:money',$event.target.value)"> -->
  </div>
</template>

<script>
export default {
    name:"Child",
    props:['money']
    
}
</script>

<style>

</style>