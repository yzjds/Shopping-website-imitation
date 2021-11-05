<template>
    <a href="javascript:;" :title="title" style="margin-right:10px">
        <el-button v-bind="$attrs" v-on="$listeners" size="mini"></el-button>
    </a>
  
</template>

<script>
export default {
    name:"HintButton",
    data(){
        return{
        
        }
    },
    props:['title'],
    mounted() {
        // console.log(this.$attrs,this.$listeners);
    },

}
</script>

<style>

</style>