<template>
  <div>
      <h2>我爱你中国</h2>
      <!-- 插槽，就给给父组件到时候使用子组件，留得坑，需要父组件传递东西填这个坑 -->
      <slot>默认插槽没给值</slot>
      <!-- 具名插槽 -->
      <slot name="杨幂">具名插槽没给值</slot>
      
  </div>
</template>

<script>
export default {
    name:"Child"
}
</script>

<style>

</style>