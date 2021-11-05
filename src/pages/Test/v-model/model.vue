<template>
  <div>
    <h1>我爱你{{ msg }}</h1>
    <br />
    <!-- 我爱你<input type="text" v-model="msg" /> -->
    我爱你<input type="text" :value="msg" @input="msg=$event.target.value">
  </div>
</template>

<script>
import index from '@/components/Footer/index.vue';
export default {
  components: { index },
  name: "Model",
  data() {
    return {
      msg: "赵丽颖",
    };
  },
};
</script>

<style>
</style>