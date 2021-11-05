<template>
  <div>
      <Model/>
      <Sync/>
      <AttrsListenerTest/>
      <ChildrenParent/>
      <ScopSlotTest/>
  </div>
</template>

<script>
import Model from "./v-model/model.vue"
import Sync from "./sync/sync.vue"
import AttrsListenerTest from "./AttrsListenerTest/AttrsListenerTest.vue"
import ChildrenParent from "./ChildrenParentTest/ChildrenParent.vue"
import ScopSlotTest from "./ScopSlotTest/ScopSlotTest.vue"
export default {
    name:"Test",
    components:{
        Model,
        Sync,
        AttrsListenerTest,
        ChildrenParent,
        ScopSlotTest
    }
}
</script>

<style>

</style>