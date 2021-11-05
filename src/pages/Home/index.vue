<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor,index in floorList.data" :key="floor.id" :floor='floor'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// import typeNav from '@/components/TypeNav/type-nav.vue'
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";
import Brand from "@/pages/Home/Brand/index.vue";
import { mapState } from 'vuex';
export default {
  // components: { typeNav },
  name: "Home",
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({
      floorList: (store) => store.home.floorList, //store是...mapState提供的
    }),
  }
};
</script>

<style scoped>
</style>