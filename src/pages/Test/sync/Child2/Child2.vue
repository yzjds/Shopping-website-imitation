<template>
  <div>
      <span>小明每次花100元</span>
      <button @click="$emit('input',value-100)">花钱</button>
      <span>还剩{{value}}元</span>
      <!-- <input type="text" :value="money" @input="$emit('update:money',$event.target.value)"> -->
  </div>
</template>

<script>
export default {
    name:"Child2",
    props:['value']
    
}
</script>

<style>

</style>