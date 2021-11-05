<template>
  <div>
    <child>
      <template>
        <h1>我是默认插槽</h1>
      </template>
    </child>
    <child>
      <template slot="杨幂">
        <h1>我是具名插槽</h1>
      </template>
    </child>
    <List :todos="todos">
      <template slot-scope="{todo,index}"> 
          <!-- 解构赋值 -->
        <!-- scopeProps最终是一个对象，接受子组件作用域插槽回传给父组件的数据组成的对象
            {
                todo:todo,
                index:index
            }
             -->
        <!-- <span :style="{color:scopeProps.todo.isComplete?'green':'red'}">{{scopeProps.todo.text}}</span> -->
        <!-- <button @click="show(scopeProps)">显示</button> -->
        <span>{{ index + 1 }}</span>
        <span :style="{ color: index % 2 === 0 ? 'green' : 'red' }">{{
          todo.text
        }}</span>
      </template>
    </List>
  </div>
</template>

<script>
import Child from "./Child.vue";
import List from "./List.vue";
export default {
  name: "ScopSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "ccc", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },
  components: {
    Child,
    List,
  },
  methods:{
      show(scopeProps){
          console.log(scopeProps);
      }
  }
};
</script>

<style>
</style>