<template>
  <div>
      <el-button type="warning" icon="el-icon-warning">警告</el-button>
      <el-button type="danger" >危险</el-button>
      <el-button type="success">成功</el-button>
      <el-button type="info">信息</el-button>
      <HintButton type="danger" title="删除" icon="el-icon-delete"></HintButton>
      <HintButton type="success" title="添加" icon="el-icon-plus"></HintButton>
      <HintButton type="warning" title="修改" icon="el-icon-edit"></HintButton>
  </div>
</template>

<script>
import HintButton from "./HintButton.vue"
export default {
    name:"AttrsListenerTest",
    components:{
        HintButton,
    },
    methods:{
        test(){},
    }
}
</script>

<style>

</style>